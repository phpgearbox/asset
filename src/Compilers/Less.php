<?php declare(strict_types=1);
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

namespace Gears\Asset\Compilers;

use Gears\Asset\Compilers\Css;
use Less_Parser;

/**
 * Compilies less source into css before returning
 * control to the parent Css Compiler.
 */
class Less extends Css
{
    public function compile(): string
    {
        $parser = new Less_Parser();
        $parser->SetImportDirs([$this->file->getPath() => '']);
        $parser->parse($this->source);
        $this->source = $parser->getCss();
        return parent::compile();
    }
}
