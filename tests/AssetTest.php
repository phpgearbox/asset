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

class AssetTest extends PHPUnit_Framework_TestCase
{
	public function testSingleJsAsset()
	{
		$results = $this->callRoboTask('test:single-js-asset');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/jquery.js');

		$this->assertFileEquals
		(
			'./tests/expected/jquery.js',
			'./tests/output/jquery.js'
		);
	}

	public function testFolderJsAsset()
	{
		$results = $this->callRoboTask('test:folder-js-asset');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/folder.js');

		$this->assertFileEquals
		(
			'./tests/expected/folder.js',
			'./tests/output/folder.js'
		);
	}

	public function testSingleCssAsset()
	{
		$results = $this->callRoboTask('test:single-css-asset');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/bootstrap.css');

		$this->assertFileEquals
		(
			'./tests/expected/bootstrap.css',
			'./tests/output/bootstrap.css'
		);
	}

	public function testFolderCssAsset()
	{
		$results = $this->callRoboTask('test:folder-css-asset');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/folder.css');

		$this->assertFileEquals
		(
			'./tests/expected/folder.css',
			'./tests/output/folder.css'
		);
	}

	public function testLessAsset()
	{
		$results = $this->callRoboTask('test:less-asset');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/less.css');

		$this->assertFileEquals
		(
			'./tests/expected/less.css',
			'./tests/output/less.css'
		);
	}

	public function testBowerAsset()
	{
		$results = $this->callRoboTask('test:bower-asset');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/bower.js');

		$this->assertFileEquals
		(
			'./tests/expected/bower.js',
			'./tests/output/bower.js'
		);
	}

	public function testManyAssets()
	{
		$results = $this->callRoboTask('test:many-assets');

		$this->assertEmpty($results['stderr']);

		$this->assertFileExists('./tests/output/many.css');

		$this->assertFileEquals
		(
			'./tests/expected/many.css',
			'./tests/output/many.css'
		);
	}

	private function callRoboTask($task)
	{
		$cmd = 'php ./vendor/bin/robo '.$task;
		$descriptorspec = [1 => ["pipe", "w"], 2 => ["pipe", "w"]];
		$process = proc_open($cmd, $descriptorspec, $pipes);

		if (is_resource($process))
		{
			$output = [];

			$output['stdout'] = stream_get_contents($pipes[1]);
			fclose($pipes[1]);

			$output['stderr'] = stream_get_contents($pipes[2]);
			fclose($pipes[2]);

			proc_close($process);

			return $output;
		}
		else
		{
			throw new Exception('Failed to start process.');
		}
	}
}