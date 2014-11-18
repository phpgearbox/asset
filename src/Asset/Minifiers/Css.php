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

use CssMin;
use Gears\Asset\Minifiers\Base;

/**
 * Class: Css
 * =============================================================================
 * Basically this class is just a wrapper for the css minifier.
 * The idea being that we have one place to edit if we want to use
 * one of the many other minifers out there.
 */
class Css extends Base
{
	protected function mini()
	{
		return CssMin::minify($this->source);	
	}
}