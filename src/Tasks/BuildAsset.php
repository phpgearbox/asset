<?php declare(strict_types=1);
////////////////////////////////////////////////////////////////////////////////
// __________ __             ________                   __________
// \______   \  |__ ______  /  _____/  ____ _____ ______\______   \ _______  ___
//  |     ___/  |  \\____ \/   \  ____/ __ \\__  \\_  __ \    |  _//  _ \  \/  /
//  |    |   |   Y  \  |_> >    \_\  \  ___/ / __ \|  | \/    |   (  <_> >    <
//  |____|   |___|  /   __/ \______  /\___  >____  /__|  |______  /\____/__/\_ \
//                \/|__|           \/     \/     \/             \/            \/
// -----------------------------------------------------------------------------
//          Designed and Developed by Brad Jones <brad @="bjc.id.au" />
// -----------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////

namespace Gears\Asset\Tasks;

use Robo;
use SplFileInfo;
use RuntimeException;
use Gears\Asset\Contracts\Compiler;
use Symfony\Component\Finder\Finder;

class BuildAsset extends Robo\Task\BaseTask implements Robo\Contract\BuilderAwareInterface
{
    use Robo\Common\BuilderAwareTrait;

    /**
     * This should be set the final location of the asset.
     * Eg: ```./assets/script.min.js```
     *
     * @var SplFileInfo
     */
    protected $destination;

    /**
     * An array of source file / folder paths, that will be
     * concatenated together to build the final asset.
     *
     * @var string[]
     */
    protected $source;

    /**
     * If this is set to true, we will not minify the asset.
     * Thus allowing for easier debugging during in development.
     *
     * **Defaults to:** ```false```
     *
     * @var bool
     */
    protected $debug = false;

    /**
     * If a valid file path is provided, we will search and replace the file
     * for the asset filename and update it with a filename that includes a
     * timestamp.
     *
     * We will obviously also save the asset with this time stamped filename
     * too. This provides us with a way to bust the client side cache.
     *
     * **IMPORTANT: The asset filename must be unique in the template file.**
     *
     * **Defaults to:** ```null```
     *
     * @var null|string
     */
    protected $template = null;

    /**
     * If set to true we will also output a gzipped version of the asset so that
     * you can setup your webserver to serve the pre gzipped version of the
     * asset instead of doing it on the fly.
     *
     * **Defaults to:** ```false```
     *
     * @var bool
     */
    protected $gz = false;

    /**
     * Only applies when building css assets. If set to true the default we will
     * automatically prefix the built css using ```vladkens/autoprefixer-php```.
     *
     * If set to false we will not do any prefixing.
     *
     * If set to a string or an array, we will perform prefixing and pass the
     * value through to the setBrowsers method of the Autoprefixer class,
     * allowing you to easily configure the prefixer.
     *
     * **Defaults to:** ```true```
     *
     * @var bool
     */
    protected $autoprefix = true;

    /**
     * BuildAssetTask Constructor.
     *
     * @param string $destination  The path to where we will save the built asset.
     */
    public function __construct(string $destination)
    {
        $this->destination = new SplFileInfo($destination);
    }

    /**
     * Set the source(s) of the asset.
     *
     * @param  string|string[]|Finder $value Can be a single path to a folder or
     *                                       file, an array of files of folders,
     *                                       or a Finder instance.
     *
     * @return BuildAsset                    Returns our self for method chaining.
     */
    public function source($value): self
    {
        if ($value instanceof Finder)
        {
            $this->source = [];

            foreach ($value as $fileInfo)
            {
                $this->source[] = $fileInfo->getRealpath();
            }
        }
        else
        {
            if (!is_array($value)) $value = [$value];

            if (count($value) === 0) throw new \UnexpectedValueException;

            if (!is_string($value[0])) throw new \UnexpectedValueException;

            $this->source = $value;
        }

        return $this;
    }

    /**
     * Debug setter.
     *
     * @param  bool $value
     * @return self
     */
    public function debug(bool $value): self
    {
        $this->debug = $value; return $this;
    }

    /**
     * Template setter.
     *
     * @param  string $value
     * @return self
     */
    public function template(string $value): self
    {
        $this->template = $value; return $this;
    }

    /**
     * Gz Setter.
     *
     * @param  bool $value
     * @return self
     */
    public function gz(bool $value): self
    {
        $this->gz = $value; return $this;
    }

    /**
     * Autoprefix Setter.
     *
     * @param  bool $value
     * @return self
     */
    public function autoprefix(bool $value): self
    {
        $this->autoprefix = $value; return $this;
    }

    /**
     * The main run method.
     *
     * ```php
     * $this->taskBuildAsset('/path/to/asset.js')
     * 		->source
     * 		([
     * 			'/path/to/asset1.js',
     * 			'/path/to/asset2.js',
     * 			'/path/to/asset3.js',
     * 			'/path/to/assetetc.js'
     * 		])
     * ->run();
     * ```
     * @return Robo\Result
     */
    public function run(): Robo\Result
    {
        // Touch the destination so that "realpath" works.
        $result = $this->collectionBuilder()->taskFilesystemStack()
            ->mkdir($this->destination->getPath())
            ->touch($this->destination->getPathname())
        ->run()->wasSuccessful();

        // Plus this should error out early if we can't write to the file
        if (!$result)
        {
            throw new RuntimeException
            (
                'We can not write to the destination file: '.
                $this->destination->getPathname()
            );
        }

        // Initialise the asset, this is what we will eventually
        // write to the file-system at the end of this method.
        $asset_contents = '';

        // Loop through the source files
        foreach ($this->source as $file)
        {
            // Tell the world what we are doing
            $this->printTaskInfo('Compiling - <info>'.$file.'</info>');

            // Run the compiler for each file
            $asset_contents .= $this->getCompiler(new SplFileInfo($file))->compile();
        }

        // If a template file has been set lets update it
        if ($this->template !== null && file_exists($this->template))
        {
            $this->updateTemplateFile();
        }

        // Now write the asset
        $this->writeAsset($asset_contents);

        // If we get to here assume everything worked
        return \Robo\Result::success($this);
    }

    /**
     * Creates a new compiler based on the file extension type.
     *
     * @param  SplFileInfo $file
     * @return Compiler
     */
    protected function getCompiler(SplFileInfo $file): Compiler
    {
        // Grab the source type
        $source_type = $this->getSourceType($file);

        // Which compiler will we use?
        $compiler_type = '\Gears\Asset\Compilers\\';
        $compiler_type .= ucfirst($source_type);

        // Does the compiler exist
        if (!class_exists($compiler_type))
        {
            throw new RuntimeException
            (
                'The source file type is not supported! - ('.$file.')'
            );
        }

        // Return the compiler
        return new $compiler_type
        (
            $file,
            $this->destination,
            $this->debug,
            $this->autoprefix
        );
    }

    /**
     * Determins the type of source we are dealing file.
     *
     * Normally this is as simple as looking at the file extension,
     * however a folder doesn't have one of those so we mimic it here.
     *
     * @param  SplFileInfo $file
     * @return string
     */
    protected function getSourceType(SplFileInfo $file): string
    {
        if ($file->isDir()) return 'folder';
        return $file->getExtension();
    }

    /**
     * So that we can bust the client cache in browser, we will rename the
     * asset filename, using a timestamp. But we also need to update the
     * HTML that includes the asset into the web page.
     * This method does all that for us.
     *
     * @return void
     */
    protected function updateTemplateFile()
    {
        // Tell the world what we are doing
        $this->printTaskInfo('Updating template file - <info>'.$this->template.'</info>');

        // Get some details about the asset
        $asset_ext = $this->destination->getExtension();
        $asset_name = $this->destination->getBasename('.'.$asset_ext);
        $asset_name_quoted = preg_quote($asset_name, '/');

        // Create our regular expression
        $search_for =
        '/'.
            $asset_name_quoted.'\..*?\.'.$asset_ext.'|'.
            $asset_name_quoted.'\..*?\.min\.'.$asset_ext.'|'.
            $asset_name_quoted.'\.min\.'.$asset_ext.'|'.
            $asset_name_quoted.'\.'.$asset_ext.
        '/';

        // This is the new asset name
        $replace_with = $asset_name.'.'.time().'.'.$asset_ext;

        // Run the search and replace
        $this->collectionBuilder()
            ->taskReplaceInFile($this->template)
            ->regex($search_for)
            ->to($replace_with)
        ->run();

        // Grab the asset base dir
        $asset_base_dir = $this->destination->getPath();

        // Update the final asset filename to match
        $this->destination = new SplFileInfo($asset_base_dir.'/'.$replace_with);

        // Delete any old assets
        $files_to_delete = new Finder();
        $files_to_delete->files();
        $files_to_delete->name($asset_name.'.'.$asset_ext);
        $files_to_delete->name($asset_name.'.*.'.$asset_ext);
        $files_to_delete->name($asset_name.'.*.'.$asset_ext.'.gz');
        $files_to_delete->in($asset_base_dir);
        $files_to_delete->depth('== 0');
        foreach ($files_to_delete as $file_to_delete)
        {
            unlink($file_to_delete->getPathname());
        }
    }

    /**
     * The business end, finally lets actually save the
     * compiled / minified asset.
     *
     * @param string $asset_contents
     */
    protected function writeAsset(string $asset_contents)
    {
        // Tell the world what we are doing
        $this->printTaskInfo('Writing to final asset - <info>'.$this->destination->getPathname().'</info>');

        // Write the normal asset
        if (file_put_contents($this->destination->getPathname(), $asset_contents) === false)
        {
            throw new RuntimeException
            (
                'Failed to write asset: '.$this->destination->getPathname()
            );
        }

        // Create a gzipped version of the asset
        if ($this->debug === false && $this->gz === true)
        {
            $gz_file_name = $this->destination->getPathname().'.gz';

            $gz_contents = gzencode($asset_contents);

            // Tell the world what we are doing
            $this->printTaskInfo('Writing gzipped version of final asset - <info>'.$gz_file_name.'</info>');

            if (file_put_contents($gz_file_name, $gz_contents) === false)
            {
                throw new RuntimeException
                (
                    'Failed to write gzipped version of asset: '.
                    $gz_file_name
                );
            }
        }
    }
}
