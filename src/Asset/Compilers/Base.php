<?php namespace Gears\Asset\Compilers;
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
use Gears\String as Str;
use Gears\Asset\Contracts\Compiler;

class Base implements Compiler
{
	/**
	 * Property: $file
	 * =========================================================================
	 * This will contain an instance of ```SplFileInfo```.
	 * We represent the source file that needs to be compiled.
	 */
	protected $file;

	/**
	 * Property: $destination
	 * =========================================================================
	 * This will contain an instance of ```SplFileInfo```.
	 * We represent the final destination asset file that will be created.
	 */
	protected $destination;

	/**
	 * Property: $source
	 * =========================================================================
	 * If the [Property: $file](#) is indeed a file we will read it's contents
	 * into this property. Remember it's possible that we are given a folder...
	 */
	protected $source = '';

	/**
	 * Property: $debug
	 * =========================================================================
	 * This basically tells us if we are allowed to minify the compiled source.
	 */
	protected $debug;

	/**
	 * Method: __construct
	 * =========================================================================
	 * We inject some intial data and thats about it.
	 *
	 * Paramters:
	 * -------------------------------------------------------------------------
	 *  - $file: The path to the source file we need to compile.
	 *  - $destination: The final destination ```SplFileInfo``` object.
	 *  - $debug: A simple true or false
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * void
	 */
	public function __construct($file, $destination, $debug)
	{
		$this->file = new SplFileInfo($file);

		if (!$this->file->isDir())
		{
			$this->source = file_get_contents($this->file->getPathname());
		}

		$this->destination = $destination;

		$this->debug = $debug;
	}

	/**
	 * Method: compile
	 * =========================================================================
	 * This implementation caters for both standard native Css and Js files
	 * that don't need any compiling as such. The less and sass compilers
	 * extend the css compiler.
	 * 
	 * > NOTE: Down the track coffee script / dart / other such
	 * > languages could be added for javascript in a similar manner.
	 *
	 * Paramters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * string
	 */
	public function compile()
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
	 * Method: getMinifier
	 * =========================================================================
	 * Creates the minfier object.
	 *
	 * Paramters:
	 * -------------------------------------------------------------------------
	 *  - $source: The source code to minify.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * An instance of a ```Gears\Asset\Minifiers```
	 */
	protected function getMinifier($file, $source)
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
	 * Method: doWeNeedToMinify
	 * =========================================================================
	 * Based on if we are in debug mode and if the file is already minfied or
	 * not, this tells us if we actually need to perform any minification.
	 *
	 * Paramters:
	 * -------------------------------------------------------------------------
	 *  - $file: A ```SplFileInfo``` object.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * boolean
	 */
	protected function doWeNeedToMinify($file)
	{
		return
		(
			!$this->debug &&
			!Str::contains($file->getFilename(), '.min.')
		);
	}
}
