<?php namespace Gears\Asset\Minifiers;
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

use Gears\String as Str;
use Gears\Asset\Contracts\Minifier;

abstract class Base implements Minifier
{
	/**
	 * Property: $source
	 * =========================================================================
	 * This contains the source code to be minfied.
	 */
	protected $source;

	/**
	 * Property: $file
	 * =========================================================================
	 * This will contain an instance of ```SplFileInfo```.
	 * We represent the source file that needs to be minified.
	 */
	protected $file;

	/**
	 * Method: __construct
	 * =========================================================================
	 * Basically this class is just a wrapper for the css minifier.
	 * The idea being that we have one place to edit if we want to use
	 * one of the many other minifers out there.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $file: An instance of ```SplFileInfo```.
	 *  - $source: The source code to be minified.
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * void
	 */
	public function __construct($file, $source)
	{
		$this->file = $file;
		$this->source = $source;
	}

	/**
	 * Method: minify
	 * =========================================================================
	 * The method to call to actually do the minifying.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * string
	 */
	public function minify()
	{
		$min = $this->lookForPreMinifiedAsset();

		if ($min === false)
		{
			return $this->mini();
		}

		return $min;
	}

	/**
	 * Method: mini
	 * =========================================================================
	 * This must be defined in any child classes.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * string
	 */
	abstract protected function mini();

	/**
	 * Method: lookForPreMinifiedAsset
	 * =========================================================================
	 * If we can find a pre-minified version of the file lets use that,
	 * no point doing more work than we have to. Plus the vendor supplied
	 * minified versions will probably be better optimised. 
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * mixed
	 */
	private function lookForPreMinifiedAsset()
	{
		$min_path = Str::replace
		(
			$this->file->getRealPath(),
			'.'.$this->file->getExtension(),
			'.min.'.$this->file->getExtension()
		);

		if (!file_exists($min_path)) return false;

		return file_get_contents($min_path);
	}
}