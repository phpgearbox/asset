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

use Gears\String as Str;
use Gears\Asset\Compilers\Base;
use Symfony\Component\Filesystem\Filesystem;

/**
 * Class: Css
 * =============================================================================
 * Normally css files will reference other assets, such as images and fonts.
 *
 * When we build a new asset from the source css and that asset is saved
 * else where in our project, the paths to these other "binary" assets
 * may no longer point to the correct place.
 *
 * This compiler takes care of this issues for us.
 *
 * > NOTE: We do make the assumption however that the fonts and images are
 * > indeed located in the public web accessible document root. If your assets
 * > are not it is on you to move / copy them at build time.
 *
 * _Further to the above you might be interested in this:
 * https://github.com/francoispluchino/composer-asset-plugin/blob/master/Resources/doc/index.md#define-a-custom-directory-for-the-assets-installation_
 */
class Css extends Base
{
	public function compile()
	{
		// Run the parent compiler first, so that we are dealing with the
		// final/minfied source. If were to perform our link replacing before
		// then the minfier might find a pre-minified asset and simply use that.
		$source = parent::compile();

		// A list of paths that we have replaced,
		// no point doing more work than need be.
		$replaced_paths = [];

		// Grab the real paths to both the source file and the destination asset
		$css_asset_root = realpath($this->file->getPath());
		$destination_root = realpath($this->destination->getPath());

		// Lets find some urls in our css
		preg_match_all('/url\([\'"]?(.*?)[\'"]?\)/', $source, $matches);

		// Loop through the matches
		foreach ($matches[1] as $key => $match)
		{
			// Split the match into an array of file path parts
			$fileinfo = pathinfo($match);

			// Skip this if it has the same base path as a previous asset
			if (in_array($fileinfo['dirname'], $replaced_paths))
			{
				continue;
			}

			// Fonts in css sometimes contain some funny charcters that are not
			// part of the file name but are just there to deal with, yep you
			// guessed it... IE :(
			if (Str::contains($fileinfo['extension'], '?#'))
			{
				continue;
			}

			// SVG fonts can have some sort of ID, I am no expert on this but
			// for our purposes we can safely ignore the id..
			if (Str::contains($fileinfo['extension'], 'svg#'))
			{
				$fileinfo['extension'] = 'svg';
			}

			// Create the real path to the actual asset
			$css_asset_path = realpath
			(
				$css_asset_root.'/'.
				$fileinfo['dirname'].'/'.
				$fileinfo['filename'].'.'.
				$fileinfo['extension']
			);

			// Sometimes we don't get it right. Perhaps the URL was pointing to
			// somewhere on the web. In any case if can't find the actual file
			// on the filesystem its time to move on.
			if ($css_asset_path === false)
			{
				continue;
			}

			// Now lets calulate the relative path between the destination
			// location and the actual asset location.
			$css_asset_path = (new Filesystem())->makePathRelative
			(
				$css_asset_path,
				$destination_root
			);

			// We only want the base path, not the filename, etc...
			$css_asset_path = pathinfo($css_asset_path, PATHINFO_DIRNAME);

			// Fix for windows enviroments
			$css_asset_path = Str::replace
			(
				$css_asset_path,
				'\\',
				'/'
			);

			// Do some search and replacing
			$source = Str::replace
			(
				$source,
				$fileinfo['dirname'],
				$css_asset_path
			);

			// Add the replaced path to our list
			$replaced_paths[] = $fileinfo['dirname'];
		}

		// Return the css source with correct paths.
		return $source;
	}
}
