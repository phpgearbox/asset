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

interface Compiler
{
    /**
     * Compiler constructor.
     *
     * @param SplFileInfo $file        The source file we need to compile.
     * @param SplFileInfo $destination The final destination of the asset.
     * @param bool        $debug       Are we going to produce a production ready build or not?
     * @param bool        $autoprefix  Applies only to css assets.
     */
    public function __construct(SplFileInfo $file, SplFileInfo $destination, bool $debug, bool $autoprefix);

    /**
     * Each compiler must provide a method that is called
     * that will actually perform the compilation.
     *
     * @return string The compiled code.
     */
    public function compile(): string;
}
