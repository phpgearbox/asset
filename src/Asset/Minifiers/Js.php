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

use JShrink\Minifier as JsMin;
use Gears\Asset\Minifiers\Base;
use Gears\Asset\Contracts\Minifier;

class Js implements Minifier
{
	use Base;

	/**
	 * Property: $source
	 * =========================================================================
	 * This contains the source js code to be minfied.
	 */
	protected $source;

	/**
	 * Property: $file
	 * =========================================================================
	 * 
	 */
	protected $file;

	/**
	 * Method: __construct
	 * =========================================================================
	 * Basically this class is just a wrapper for the js minifier.
	 * The idea being that we have one place to edit if we want to use
	 * one of the many other minifers out there.
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 *  - $source: The source js to be minified.
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
			return JsMin::minify($this->source);
		}

		return $min;
	}
}