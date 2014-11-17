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

use Gears\String as Str;

trait Base
{
	protected function lookForPreMinifiedAsset()
	{
		$min_path = Str::replace
		(
			$this->file->getRealPath(),
			'.'.$this->file->getExtension(),
			'.min.'.$this->file->getExtension()
		);

		if (!file_exists($min_path)) return false;

		return file_get_contents($min_path);
	}
}