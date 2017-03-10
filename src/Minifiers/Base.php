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

namespace Gears\Asset\Minifiers;

use SplFileInfo;
use Gears\String\Str;
use Gears\Asset\Contracts\Minifier;

abstract class Base implements Minifier
{
    /**
     * This contains the source code to be minfied.
     *
     * @var string
     */
    protected $source;

    /**
     * We represent the source file that needs to be minified.
     *
     * @var SplFileInfo
     */
    protected $file;

    public function __construct(SplFileInfo $file, string $source)
    {
        $this->file = $file;
        $this->source = $source;
    }

    public function minify(): string
    {
        $min = $this->lookForPreMinifiedAsset();

        if ($min === false)
        {
            return $this->mini();
        }

        return $min;
    }

    /**
     * This must be defined in any child classes.
     *
     * @return string The minfied source code.
     */
    abstract protected function mini(): string;

    /**
     * If we can find a pre-minified version of the file lets use that,
     * no point doing more work than we have to. Plus the vendor supplied
     * minified versions will probably be better optimised.
     *
     * @return string|bool Either preminified source code or false.
     */
    private function lookForPreMinifiedAsset()
    {
        $min_path = (string)Str::s($this->file->getRealPath())->replace
        (
            '.'.$this->file->getExtension(),
            '.min.'.$this->file->getExtension()
        );

        if (!file_exists($min_path)) return false;

        return file_get_contents($min_path);
    }
}
