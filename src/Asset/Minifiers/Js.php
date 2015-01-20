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

use Patchwork\JSqueeze;
use Gears\Asset\Minifiers\Base;

/**
 * Class: Js
 * =============================================================================
 * Basically this class is just a wrapper for the js minifier.
 * The idea being that we have one place to edit if we want to use
 * one of the many other minifers out there.
 */
class Js extends Base
{
	protected function mini()
	{
		$jz = new JSqueeze();
		return $jz->squeeze($this->source);
	}
}