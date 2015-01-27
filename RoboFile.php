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

		exit($this->taskPHPUnit()->arg('./tests')->run()->getExitCode());
	}

	/*
	 * The following tests are about testing the functionality of Gears\Asset.
	 * Some of the compiled assets that these create will not actually work
	 * inside a browser.
	 */

	public function testSingleJsAsset()
	{
		$this->taskBuildAsset('./tests/output/single.js')
			->source('./vendor/bower/jquery/dist/jquery.js')
		->run();
	}

	public function testFolderJsAsset()
	{
		$this->taskBuildAsset('./tests/output/folder.js')
			->source('./vendor/bower/bootstrap/js')
		->run();
	}

	public function testSingleCssAsset()
	{
		$this->taskBuildAsset('./tests/output/single.css')
			->source('./vendor/bower/bootstrap/dist/css/bootstrap.css')
		->run();
	}

	public function testFolderCssAsset()
	{
		$this->taskBuildAsset('./tests/output/folder.css')
			->source('./vendor/bower/pure')
		->run();
	}

	public function testLessAsset()
	{
		$this->taskBuildAsset('./tests/output/less.css')
			->source('./vendor/bower/bootstrap/less/bootstrap.less')
		->run();
	}

	public function testScssAsset()
	{
		$this->taskBuildAsset('./tests/output/scss.css')
			->source('./vendor/bower/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
		->run();
	}

	public function testManyAssets()
	{
		$this->taskBuildAsset('./tests/output/many.css')
			->source
			([
				'./vendor/bower/pure',
				'./vendor/bower/bootstrap/less/bootstrap.less',
				'./vendor/bower/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
			])
		->run();
	}

	public function testTemplate()
	{
		$this->taskWriteToFile('./tests/output/template.html')
			->line('<script src="./template.js"></script>')
		->run();

		$this->taskBuildAsset('./tests/output/template.js')
			->source('./vendor/bower/jquery/dist/jquery.js')
			->template('./tests/output/template.html')
		->run();
	}

	public function testGz()
	{
		$this->taskBuildAsset('./tests/output/gzipped.js')
			->source('./vendor/bower/jquery/dist/jquery.js')
			->gz(true)
		->run();
	}

	public function testDebug()
	{
		$this->taskBuildAsset('./tests/output/debug.js')
			->source('./vendor/bower/jquery/dist/jquery.js')
			->debug(true)
		->run();
	}
}