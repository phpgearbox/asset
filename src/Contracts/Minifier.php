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

namespace Gears\Asset\Contracts;

use SplFileInfo;

interface Minifier
{
    /**
     * Minifier constructor.
     *
     * @param SplFileInfo $file   The original source file.
     * @param string      $source The compiled source code.
     */
    public function __construct(SplFileInfo $file, string $source);

    /**
     * Each minifier must provide a method that is called
     * that will actually perform the minification.
     *
     * @return string The minified code.
     */
    public function minify(): string;
}
