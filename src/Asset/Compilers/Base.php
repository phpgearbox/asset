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
	protected $file;

	protected $source = '';

	protected $assetType;

	protected $debug;

	protected $destination;

	public function __construct($file, $asset_type, $debug, $destination)
	{
		$this->file = new SplFileInfo($file);

		if (!$this->file->isDir())
		{
			$this->source = file_get_contents($this->file->getPathname());
		}

		$this->assetType = $asset_type;

		$this->debug = $debug;

		$this->destination = $destination;
	}

	public function compile()
	{
		if ($this->doWeNeedToMinify($this->file))
		{
			return $this->getMinifier($this->source)->minify();
		}

		return $this->source."\n\n";
	}

	protected function getMinifier($source)
	{
		$minifier = '\Gears\Asset\Minifiers\\'.ucfirst($this->assetType);

		if (!class_exists($minifier))
		{
			throw new RuntimeException
			(
				'Minification is not supported for type: '.$this->assetType
			);
		}

		return new $minifier($source);
	}

	protected function doWeNeedToMinify($file)
	{
		return
		(
			!$this->debug &&
			!Str::contains($file->getFilename(), '.min.')
		);
	}
}
