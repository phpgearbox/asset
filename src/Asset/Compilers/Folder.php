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
use Symfony\Component\Finder\Finder;

class Folder extends Base
{
	public function compile()
	{
		$files = new Finder();
		$files->files();
		$files->name('*.'.$this->destination->getExtension());
		$files->in($this->file->getPathname());
		$files->sortByName();

		foreach ($files as $file)
		{
			if ($this->doWeNeedToMinify($file))
			{
				$this->source .= $this->getMinifier($file->getContents())->minify();
			}
			else
			{
				$this->source .= $file->getContents()."\n\n";
			}
		}
		
		return $this->source;
	}
}