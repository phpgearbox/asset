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
use Leafo\ScssPhp\Compiler as Scss_Parser;

/**
 * Compilies Sass into css before returning control to the parent Css Compiler.
 *
 * > NOTE: This only caters for ```scss``` files not ```sass``` files.
 */
class Scss extends Css
{
    public function compile(): string
    {
        $parser = new Scss_Parser();
        $parser->setImportPaths($this->file->getPath());
        $this->source = $parser->compile($this->source);
        return parent::compile();
    }
}
