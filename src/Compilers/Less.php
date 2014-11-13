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

use Gears\Asset\Compilers\Base;
use Less_Parser;

class Less extends Base
{
	public function compile()
	{
		$parser = new Less_Parser();
		$base_dir = pathinfo($this->filePath, PATHINFO_DIRNAME);
		$parser->SetImportDirs([$base_dir => '']);
		$parser->parse($this->fileContents);
		$this->fileContents = $parser->getCss();
		return parent::compile();
	}
}