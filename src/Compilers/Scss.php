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
use Leafo\ScssPhp\Compiler as Scss_Parser;

class Scss extends Base
{
	public function compile()
	{
		$parser = new Scss_Parser();
		$parser->setImportPaths(pathinfo($this->filePath, PATHINFO_DIRNAME));
		$this->fileContents = $parser->compile($this->fileContents);
		return parent::compile();
	}
}