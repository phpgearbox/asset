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

namespace Gears\Asset\Compilers;

use SplFileInfo;
use RuntimeException;
use Gears\String\Str;
use Gears\Asset\Contracts\Compiler;
use Gears\Asset\Contracts\Minifier;

class Base implements Compiler
{
    /**
     * We represent the source file that needs to be compiled.
     *
     * @var SplFileInfo
     */
    protected $file;

    /**
     * We represent the final destination asset file that will be created.
     *
     * @var SplFileInfo
     */
    protected $destination;

    /**
     * If the $file is indeed a file we will read it's contents into this
     * property. Remember it's possible that we are given a folder...
     *
     * @var string
     */
    protected $source = '';

    /**
     * This basically tells us if we are allowed to minify the compiled source.
     *
     * @var bool
     */
    protected $debug;

    /**
     * Only applies when building css assets.
     * Used in conjuction with: ```vladkens/autoprefixer-php```.
     *
     * @var bool
     */
    protected $autoprefix;

    public function __construct(SplFileInfo $file, SplFileInfo $destination, bool $debug, bool $autoprefix)
    {
        $this->file = $file;

        if (!$this->file->isDir())
        {
            $this->source = file_get_contents($this->file->getPathname());
        }

        $this->destination = $destination;

        $this->debug = $debug;

        $this->autoprefix = $autoprefix;
    }

    /**
     * @inheritDoc
     *
     * This implementation caters for both standard native Css and Js files
     * that don't need any compiling as such. The less and sass compilers
     * extend the css compiler.
     */
    public function compile(): string
    {
        if ($this->doWeNeedToMinify($this->file))
        {
            $src = $this->getMinifier($this->file, $this->source)->minify();

            // Remove any source mappings, they cause 404 errors.
            // One of the benefits of using this Robo Task is that it is super
            // easy to switch between a minifed asset and a non minified asset.
            $src = preg_replace('/^\/\/# sourceMappingURL.*$/m', '', $src);

            // TODO: generate our own source maps... sounds like a challenge :)
        }
        else
        {
            $src = $this->source;
        }

        return $src."\n\n";
    }

    /**
     * Creates the minfier object.
     *
     * @param  SplFileInfo $file   The original source file.
     * @param  string      $source The source code to minify.
     * @return Minifier            A minifier for the given destination type.
     */
    protected function getMinifier(SplFileInfo $file, string $source): Minifier
    {
        $minifier = '\Gears\Asset\Minifiers\\';
        $minifier .= ucfirst($this->destination->getExtension());

        if (!class_exists($minifier))
        {
            throw new RuntimeException
            (
                'Minification is not supported for type: '.
                $this->destination->getExtension()
            );
        }

        return new $minifier($file, $source);
    }

    /**
     * Based on if we are in debug mode and if the file is already minfied or
     * not, this tells us if we actually need to perform any minification.
     *
     * @param  SplFileInfo $file The original source file.
     * @return bool              If true we will run the minifier.
     */
    protected function doWeNeedToMinify(SplFileInfo $file): bool
    {
        return
        (
            !$this->debug &&
            !Str::s($file->getFilename())->contains('.min.')
        );
    }
}
