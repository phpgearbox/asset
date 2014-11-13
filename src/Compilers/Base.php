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

use RuntimeException;
use Gears\String as Str;
use Gears\Asset\Contracts\Compiler;

class Base implements Compiler
{
	protected $filePath;

	protected $fileContents;

	protected $minifier = false;

	public function __construct($file, $asset_type, $debug)
	{
		$this->filePath = $file;

		$this->fileContents = file_get_contents($this->filePath);

		if (!$debug && !Str::contains($this->filePath, '.min.'))
		{
			$this->minifier = '\Gears\Asset\Minifiers\\'.ucfirst($asset_type);

			if (!class_exists($this->minifier))
			{
				throw new RuntimeException
				(
					'Minification is not supported for type: '.$asset_type
				);
			}
		}
	}

	public function compile()
	{
		if ($this->minifier !== false)
		{
			$minifier = $this->minifier;
			$minifier = new $minifier($this->fileContents);
			return $minifier->minify();
		}
		else
		{
			return $this->fileContents."\n\n";
		}
	}
}
