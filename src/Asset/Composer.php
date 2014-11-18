<?php namespace Gears\Asset;
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

use Composer\Script\Event;

/**
 * Class: Composer
 * =============================================================================
 * Because the composer plugin **fxp/composer-asset-plugin** needs to be
 * installed before trying to run composer on bower / npm dependencies.
 * We install the plugin globally.
 * 
 * For more info see:
 * https://github.com/francoispluchino/composer-asset-plugin/issues/7
 * 
 * > NOTE: That while we provide the functionality here, and an example of the
 * > script hooks to create. It is up to the project owner to add his own script
 * > hooks because composer script hooks are only executed for the root package.
 */
class Composer
{
	public static function installFxpPlugin(Event $event)
	{
		echo "\n";
		echo ">>> Installing fxp/composer-asset-plugin Globally\n";
		echo "================================================================================\n";
		system(self::findComposer().' global require "fxp/composer-asset-plugin=1.*@beta"');
		echo "================================================================================\n\n";
	}

	public static function updateFxpPlugin(Event $event)
	{
		echo "\n";
		echo ">>> Updating fxp/composer-asset-plugin Globally\n";
		echo "================================================================================\n";
		system(self::findComposer().' global update "fxp/composer-asset-plugin"');
		echo "================================================================================\n\n";
	}

	private static function findComposer()
	{
		return realpath($_SERVER['SCRIPT_NAME']);
	}
}