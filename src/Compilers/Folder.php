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

use Gears\Asset\Compilers\Base;
use Symfony\Component\Finder\Finder;

/**
 * Instead of providing individual files, one may provide a path to a folder.
 * We will then loop through each file below this folder, concatenating and
 * minifying as we go.
 *
 * > NOTE: This only works for native css and js source files.
 * > For example you would not provide a folder to a bunch of less files.
 * > You would provide the direct path to a single less file that then imports
 * > other less files, just like bootstrap does.
 *
 * **Order of Concatenation:** Also please pay attention to filenames of your
 * files, as this will determine the order they are concatenated together.
 */
class Folder extends Base
{
    public function compile(): string
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
                $this->source .= $this->getMinifier($file, $file->getContents())->minify();
            }
            else
            {
                $this->source .= $file->getContents()."\n\n";
            }
        }

        return $this->source;
    }
}
