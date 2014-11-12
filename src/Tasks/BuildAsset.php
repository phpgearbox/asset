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

use RuntimeException;
use Robo\Result;
use Robo\Output;
use Robo\Task\FileSystem;
use Robo\Task\Shared\DynamicConfig;
use Robo\Task\Shared\TaskInterface;
use Symfony\Component\Finder\Finder;
use Gears\Asset\Compilers;
use Gears\Asset\Minifiers;
use Gears\Asset\Compressors\Gz;

trait BuildAsset
{
	protected function taskBuildAsset($destination)
	{
		return new BuildAssetTask($destination);
	}
}

class BuildAssetTask implements TaskInterface
{
	use Output;
	use FileSystem;
	use DynamicConfig;

	private $destination;
	private $source;
	private $debug = false;
	private $template = false;

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
		$this->destination = $destination;
	}

	/**
	 * Method: run
	 * =========================================================================
	 * The main run method.
	 * 
	 * Example usage:
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
		// Initialise  the asset
		$asset_contents = '';

		// What sort of asset are we building
		$asset_type = pathinfo($this->destination, PATHINFO_EXTENSION);

		// Make sure we know how to build this type of asset
		if ($asset_type != 'js' && $asset_type != 'css')
		{
			throw new RuntimeException('Invalid asset type!');
		}

		// Make sure source is an array
		if (!is_array($this->source))
		{
			$this->source = [$this->source];
		}

		// Loop through the source files
		foreach ($this->source as $file)
		{
			// Grab the source file extension
			$source_ext = pathinfo($file, PATHINFO_EXTENSION);

			switch ($source_ext)
			{
				// If the ext is empty it should be a folder
				case '':

					// Find all the files of the asset type below this folder
					$finder = new Finder();
					$files = $finder
						->files()
						->name('*.'.$asset_type)
						->in($this->source)
						->sortByName()
					;

					// Loop through each file and add it to our asset
					foreach ($files as $file)
					{
						$asset_contents .= $file->getContents()."\n\n";
					}

				break;

				// Less files need to be compiled before they can be added
				case 'less':

					$asset_contents .= Compilers\Less::input($file)."\n\n";

				break;

				// Sass files need to be compiled before they can be added
				case 'sccs':

					$asset_contents .= Compilers\Sass::input($file)."\n\n";

				break;

				// It is a bower package
				case 'bower':

					$asset_contents .= Compilers\Bower::input($file)."\n\n";

				break;

				// We assume we have been given a specific single file.
				default:

					$asset_contents .= file_get_contents($file)."\n\n";

				break;
			}
		}

		// Check if we are in debug mode
		if (!$this->debug)
		{
			// Minify the asset
			$minifier = 'Minifiers\\'.$asset_type;
			$asset_contents = $minifier::input($minifier);

			// We will also provide a compressed version the asset
			$asset_contents_compressed = Gz::input($asset_contents);

			// Now write the asset
			file_put_contents($this->destination, $asset_contents);
			file_put_contents($this->destination.'.gz', $asset_contents_compressed);
		}
		else
		{
			// Now write the asset
			file_put_contents($this->destination, $asset_contents);
		}

		// If a template file has been set lets update it
		if ($this->template)
		{
			$asset_name = pathinfo($this->destination, PATHINFO_FILENAME);
			$asset_name_quoted = preg_quote($asset_name, '/');

			$this->taskReplaceInFile($this->template)
				->regex('/'.$asset_name_quoted.'\..*?\.'.$asset_type.'|'.$asset_name_quoted.'\.'.$asset_type.'/')
				->to($asset_name.'.'.time().'.'.$asset_type)
			->run();
		}

		// If we get to here assume everything worked
		return Result::success($this);
	}
}