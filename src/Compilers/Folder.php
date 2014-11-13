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
use Symfony\Component\Finder\Finder;

class Folder implements Compiler
{
	private $files;

	private $minifier = false;

	public function __construct($folder, $asset_type, $debug)
	{
		$this->files = new Finder();
		$this->files->files();
		$this->files->name('*.'.$asset_type);
		$this->files->in($folder);
		$this->files->sortByName();

		if (!$debug)
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
		$compiled = '';

		foreach ($this->files as $file)
		{
			if ($this->minifier !== false && !Str::contains($file->getFilename(), '.min.'))
			{
				$minifier = $this->minifier;
				$minifier = new $minifier($file->getContents());
				$compiled .= $minifier->minify();
			}
			else
			{
				$compiled .= $file->getContents()."\n\n";
			}
		}

		return $compiled;
	}
}