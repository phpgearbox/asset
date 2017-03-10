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

namespace Gears\Tests;

use PHPUnit\Framework\TestCase;

class AssetTest extends TestCase
{
    public function testSingleJsAsset()
    {
        $results = $this->callRoboTask('test:single-js-asset');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/single.js');

        $this->assertFileEquals
        (
            './tests/expected/single.js',
            './tests/output/single.js'
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

        $this->assertFileExists('./tests/output/single.css');

        $this->assertFileEquals
        (
            './tests/expected/single.css',
            './tests/output/single.css'
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

    public function testScssAsset()
    {
        $results = $this->callRoboTask('test:scss-asset');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/scss.css');

        $this->assertFileEquals
        (
            './tests/expected/scss.css',
            './tests/output/scss.css'
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

    public function testFinderAsset()
    {
        $results = $this->callRoboTask('test:finder-asset');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/finder.css');

        $this->assertFileEquals
        (
            './tests/expected/finder.css',
            './tests/output/finder.css'
        );
    }

    public function testTemplate()
    {
        $results = $this->callRoboTask('test:template');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/template.html');

        $contents = file_get_contents('./tests/output/template.html');

        if (preg_match('/<script src="\.\/template\.(.*?)\.js"><\/script>/s', $contents, $match) === 1)
        {
            $this->assertFileExists('./tests/output/template.'.$match[1].'.js');
        }
        else
        {
            $this->fail();
        }
    }

    public function testGz()
    {
        $results = $this->callRoboTask('test:gz');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/gzipped.js');
        $this->assertFileExists('./tests/output/gzipped.js.gz');

        $this->assertFileEquals
        (
            './tests/expected/gzipped.js.gz',
            './tests/output/gzipped.js.gz'
        );
    }

    public function testDebug()
    {
        $results = $this->callRoboTask('test:debug');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/debug.js');

        $this->assertFileEquals
        (
            './tests/expected/debug.js',
            './tests/output/debug.js'
        );
    }

    public function testCssPathReplacement()
    {
        $results = $this->callRoboTask('test:css-path-replacement');

        $this->assertEmpty($results['stderr']);

        $this->assertFileExists('./tests/output/css-path-replacement.css');

        $this->assertFileEquals
        (
            './tests/expected/css-path-replacement.css',
            './tests/output/css-path-replacement.css'
        );
    }

    private function callRoboTask($task)
    {
        $cmd = './robo '.$task;
        $descriptorspec = [1 => ["pipe", "w"], 2 => ["pipe", "w"]];
        $process = proc_open($cmd, $descriptorspec, $pipes);

        if (is_resource($process))
        {
            $output = [];

            $output['stdout'] = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            $output['stderr'] = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            proc_close($process);

            return $output;
        }
        else
        {
            throw new \Exception('Failed to start process.');
        }
    }
}
