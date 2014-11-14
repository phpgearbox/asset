<?php
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

/*
 * Include our local composer autoloader just in case
 * we are called with a globally installed version of robo.
 */
require_once(__DIR__.'/vendor/autoload.php');

class RoboFile extends Robo\Tasks
{
	use Gears\Asset;

	/**
	 * Method: test
	 * =========================================================================
	 * This will run our unit / acceptance testing. All the *gears* within
	 * the **PhpGearBox** utlise PhpUnit as the basis for our testing with the
	 * addition of the built in PHP Web Server, making the acceptance tests
	 * almost as portable as standard unit tests.
	 *
	 * Just run: ```php ./vendor/bin/robo test```
	 *
	 * Parameters:
	 * -------------------------------------------------------------------------
	 * n/a
	 *
	 * Returns:
	 * -------------------------------------------------------------------------
	 * void
	 */
	public function test()
	{
		$this->taskCleanDir('./tests/output')->run();

		$this->taskPHPUnit()->arg('./tests')->run();
	}

	public function testSingleJsAsset()
	{
		$this->taskBuildAsset('./tests/output/jquery.js')
			->source('./tests/source/jquery.js')
		->run();
	}

	public function testFolderJsAsset()
	{
		$this->taskBuildAsset('./tests/output/folder.js')
			->source('./tests/source/folder')
		->run();
	}

	public function testSingleCssAsset()
	{
		$this->taskBuildAsset('./tests/output/bootstrap.css')
			->source('./tests/source/bootstrap.css')
		->run();
	}

	public function testFolderCssAsset()
	{
		$this->taskBuildAsset('./tests/output/folder.css')
			->source('./tests/source/folder')
		->run();
	}

	public function testLessAsset()
	{
		$this->taskBuildAsset('./tests/output/less.css')
			->source('./tests/source/less/bootstrap.less')
		->run();
	}

	public function testScssAsset()
	{
		$this->taskBuildAsset('./tests/output/scss.css')
			->source('./tests/source/scss/_bootstrap.scss')
		->run();
	}

	public function testManyAssets()
	{
		$this->taskBuildAsset('./tests/output/many.css')
			->source
			([
				'./tests/source/folder',
				'./tests/source/less/bootstrap.less',
				'./tests/source/scss/_bootstrap.scss'
			])
		->run();
	}
}