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

use Gears\Asset\Compilers\Css;
use Less_Parser;

/**
 * Class: Less
 * =============================================================================
 * Compilies less source into css before returning
 * control to the parent Css Compiler.
 */
class Less extends Css
{
	public function compile()
	{
		$parser = new Less_Parser();
		$parser->SetImportDirs([$this->file->getPath() => '']);
		$parser->parse($this->source);
		$this->source = $parser->getCss();
		return parent::compile();
	}
}