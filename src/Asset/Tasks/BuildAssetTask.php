<?php namespace Gears\Asset\Tasks;
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

use SplFileInfo;
use RuntimeException;
use Symfony\Component\Finder\Finder;

class BuildAssetTask extends \Robo\Task\BaseTask
{
	// Import some additional traits
	use \Robo\Task\File\loadTasks;
	use \Robo\Task\FileSystem\loadTasks;
	use \Robo\Common\DynamicParams;

	/**
	 * Property: destination
	 * =========================================================================
	 * This should be set the final location of the asset.
	 * Eg: ```./assets/script.min.js```
	 */
	private $destination;

	/**
	 * Property: source
	 * =========================================================================
	 * This can either be a single source file or folder. Or you may provide an
	 * array of files and folders. Giving you ultimate control of the order
	 * the source files are concatenated together, especially important for
	 * javascript.
	 *
	 * Usage Example:
	 * -------------------------------------------------------------------------
	 * **Single source file**
	 *
	 * ```php
	 * $this->taskBuildAsset('/path/to/asset.js')
	 * 		->source('/path/to/jquery.js')
	 * ->run();
	 * ```
	 *
	 * **A single folder**
	 *
	 * ```php
	 * $this->taskBuildAsset('/path/to/asset.js')
	 * 		->source('/path/to/source/javascript')
	 * ->run();
	 * ```
	 *
	 * > NOTE: Files inside folders are sorted by name. So you could manipulate
	 * > the order that files are concatenated together by prefixing a numeric
	 * > index to each source file.
	 *
	 * **Many sources**
	 *
	 * ```php
	 * $this->taskBuildAsset('/path/to/asset.js')
	 * 		->source
	 * 		([
	 * 			'/path/to/jquery.js',
	 * 			'/path/to/jquery/plugins',
	 * 			'/path/to/main.js'
	 * 		])
	 * ->run();
	 * ```
	 */
	private $source;

	/**
	 * Property: debug
	 * =========================================================================
	 * If this is set to true, we will not minify the asset.
	 * Thus allowing for easier debugging during in development.
	 *
	 * **Defaults to:** ```false```
	 */
	private $debug = false;

	/**
	 * Property: template
	 * =========================================================================
	 * If a valid file path is provided, we will search and replace the file
	 * for the asset filename and update it with a filename that includes a
	 * timestamp.
	 *
	 * We will obviously also save the asset with this time stamped filename
	 * too. This provides us with a way to bust the client side cache.
	 *
	 * **IMPORTANT: The asset filename must be unique in the template file.**
	 */
	private $template = false;

	/**
	 * Property: gz
	 * =========================================================================
	 * If set to true we will also output a gzipped version of the asset so that
	 * you can setup your webserver to serve the pre gzipped version of the
	 * asset instead of doing it on the fly.
	 *
	 * **Defaults to:** ```false```
	 */
	private $gz = false;

	/**
	 * Property: autoprefix
	 * =========================================================================
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
	 */
	private $autoprefix = true;

	/**
	 * Method: __construct
	 * =========================================================================
	 * Simply takes in the destination option.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $destination: The path to where we will save the built asset.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * void
	 */
	public function __construct($destination)
	{
		$this->destination = new SplFileInfo($destination);

		// Touch the destination so that "realpath" works.
		$result = $this->taskFileSystemStack()
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
	}

	/**
	 * Method: source
	 * =========================================================================
	 * This ensures the source value will always be an array,
	 * even if someone is lazy and only enters a single string.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $value: A string or array.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * self
	 */
	public function source($value)
	{
		if (!is_array($value)) $value = [$value];
		$this->source = $value;
		return $this;
	}

	/**
	 * Method: run
	 * =========================================================================
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
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * ```Robo\Result```
	 */
	public function run()
	{
		// Initialise  the asset, this is what we will eventually
		// write to the file-system at the end of this method.
		$asset_contents = '';

		// Loop through the source files
		foreach ($this->source as $file)
		{
			// Tell the world what we are doing
			$this->printTaskInfo('Compiling - <info>'.$file.'</info>');

			// Run the compiler for each file
			$asset_contents .= $this->getCompiler($file)->compile();
		}

		// If a template file has been set lets update it
		if ($this->template !== false && file_exists($this->template))
		{
			$this->updateTemplateFile();
		}

		// Now write the asset
		$this->writeAsset($asset_contents);

		// If we get to here assume everything worked
		return \Robo\Result::success($this);
	}

	/**
	 * Method: getCompiler
	 * =========================================================================
	 * This will return a compiler object, based on the input source file.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $file: The file/folder path of the source.
	 *
	 * Throws:
	 * -------------------------------------------------------------------------
	 *  - RuntimeException: In the event the compiler type doesn't exist.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * One of the ```Gears\Asset\Compilers```, setup and ready to compile.
	 */
	private function getCompiler($file)
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
	 * Method: getSourceType
	 * =========================================================================
	 * As a folder does not have a file extension we need to mimic it.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $file: The file/folder path of the source.
	 *
	 * Throws:
	 * -------------------------------------------------------------------------
	 *  - RuntimeException: In the event the extension is empty
	 *    and the path does not appear to be a folder.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 *  - string: The file extension or folder if its a folder.
	 */
	private function getSourceType($file)
	{
		// Grab the file extension
		$ext = pathinfo($file, PATHINFO_EXTENSION);

		// If the ext is empty it should be a folder
		if (empty($ext))
		{
			if (!is_dir($file))
			{
				throw new RuntimeException
				(
					'The source file type has not been detected! - '.
					'('.$file.')'
				);
			}

			$ext = 'folder';
		}

		// Return the type of the source file
		return $ext;
	}

	/**
	 * Method: updateTemplateFile
	 * =========================================================================
	 * So that we can bust the client cache in browser, we will rename the
	 * asset filename, using a timestamp. But we also need to update the
	 * HTML that includes the asset into the web page.
	 * This method does all that for us.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * void
	 */
	private function updateTemplateFile()
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
		$this->taskReplaceInFile($this->template)
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
		foreach ($files_to_delete as $file_to_delete)
		{
			unlink($file_to_delete->getPathname());
		}
	}

	/**
	 * Method: writeAsset
	 * =========================================================================
	 * The business end, finally lets actually save the
	 * compiled / minified asset.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $asset_contents: The contents of the asset.
	 *
	 * Throws:
	 * -------------------------------------------------------------------------
	 *  - RuntimeException: If we failed to write either the standard
	 *    or gzipped asset.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * void
	 */
	private function writeAsset($asset_contents)
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
