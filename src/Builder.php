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

use RuntimeException;
use Robo\Result;
use Robo\Output;
use Robo\Task\FileSystem;
use Robo\Task\Shared\DynamicConfig;
use Robo\Task\Shared\TaskInterface;
use Symfony\Component\Finder\Finder;

trait Builder
{
	protected function taskBuildAsset($destination)
	{
		return new BuildAssetTask($destination);
	}
}

class BuildAssetTask implements TaskInterface
{
	// Import some additional traits
	use Output;
	use FileSystem;
	use DynamicConfig;

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
	 * Usage Example:
	 * -------------------------------------------------------------------------
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

		// Make sure source is an array
		if (!is_array($this->source)) $this->source = [$this->source];

		// Loop through the source files
		foreach ($this->source as $file)
		{
			// Not all source files are the same, some need special treatment.
			$source_type = pathinfo($file, PATHINFO_EXTENSION);

			// If the ext is empty it should be a folder
			if (empty($source_type))
			{
				if (is_dir($file))
				{
					$source_type = 'folder';
				}
				else
				{
					throw new RuntimeException
					(
						'The source file type has not been detected! - '.
						'('.$file.')'
					);
				}
			}

			// Which compiler will we use?
			$compiler_type = '\Gears\Asset\Compilers\\'.ucfirst($source_type);

			// Does the compiler exist
			if (!class_exists($compiler_type))
			{
				throw new RuntimeException
				(
					'The source file type is not supported! - ('.$file.')'
				);
			}

			// Run the compiler
			$compiler = new $compiler_type($file, $asset_type, $this->debug);
			$asset_contents .= $compiler->compile();
		}

		// If a template file has been set lets update it
		if ($this->template !== false && file_exists($this->template))
		{
			// Grab the asset name
			$asset_name = pathinfo($this->destination, PATHINFO_FILENAME);
			$asset_name_quoted = preg_quote($asset_name, '/');

			// Create our regular expression
			$search_for =
			'/'.
				$asset_name_quoted.'\..*?\.'.$asset_type.'|'.
				$asset_name_quoted.'\..*?\.min\.'.$asset_type.'|'.
				$asset_name_quoted.'\.min\.'.$asset_type.'|'.
				$asset_name_quoted.'\.'.$asset_type.
			'/';

			// This is the new asset name
			$replace_with = $asset_name.'.'.time().'.'.$asset_type;

			// Run the search and replace
			$this->taskReplaceInFile($this->template)
				->regex($search_for)
				->to($replace_with)
			->run();

			// Grab the asset base dir
			$asset_base_dir = pathinfo($this->destination, PATHINFO_DIRNAME);

			// Update the final asset filename to match
			$this->destination = $asset_base_dir.'/'.$replace_with;

			// Delete any old assets
			$files_to_delete = new Finder();
			$files_to_delete->files();
			$files_to_delete->name($asset_name.'.*.'.$asset_type);
			$files_to_delete->name($asset_name.'.*.'.$asset_type.'.gz');
			$files_to_delete->in($asset_base_dir);
			foreach ($files_to_delete as $file_to_delete)
			{
				unlink($file_to_delete->getPathname());
			}
		}

		// Now write the asset
		if (file_put_contents($this->destination, $asset_contents) === false)
		{
			throw new RuntimeException
			(
				'Failed to write asset: '.$this->destination
			);
		}

		// Create a gzipped version of the asset
		if ($this->debug === false && $this->gz === true)
		{
			$gz_file_name = $this->destination.'.gz';

			$gz_contents = gzencode($asset_contents);

			if (file_put_contents($gz_file_name, $gz_contents) === false)
			{
				throw new RuntimeException
				(
					'Failed to write gzipped version of asset: '.
					$gz_file_name
				);
			}
		}

		// If we get to here assume everything worked
		return Result::success($this);
	}
}