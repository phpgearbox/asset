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

use Gears\Asset\Contracts\Compiler;
use Symfony\Component\Finder\Finder;

class Bower implements Compiler
{
	public function __construct($file, $asset_type, $debug)
	{
		
	}

	public function compile()
	{
		
	}
}

/*
 * if the asset is js then only select the js files from bower.json main array
 * if the asset is css then only select the css files from bower.json main array
 * we would need to assume the order of the array is the correct order.
 * the issue is that not all packages have a "main" section in their bower.json file
 * some packages I have seen listing vendor libs in their main arrays, this would potentially cause all sorts of conflicts
 * plus there are other issues to worry about such as fonts, images, etc
 */