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

use Robo;
use Gears\Asset;
use League\Container;
use Symfony\Component\Console;
use PHPUnit\Framework\TestCase;

class AssetTest extends TestCase implements Container\ContainerAwareInterface
{
    use Asset\loadTasks;
    use Robo\TaskAccessor;
    use Robo\Task\File\loadTasks;
    use Container\ContainerAwareTrait;

    public function setUp()
    {
        $this->setContainer
        (
            Robo\Robo::createDefaultContainer
            (
                null, new Console\Output\NullOutput
            )
        );
    }

    public function collectionBuilder()
    {
        $tasks = new \Robo\Tasks();
        $builder = $this->getContainer()->get('collectionBuilder', [$tasks]);
        $tasks->setBuilder($builder);
        return $builder;
    }

    public function testSingleJsAsset()
    {
        $this->taskBuildAsset('./tests/output/single.js')
            ->source('./vendor/bower/jquery/dist/jquery.js')
        ->run();

        $this->assertFileExists('./tests/output/single.js');

        $this->assertFileEquals
        (
            './tests/expected/single.js',
            './tests/output/single.js'
        );
    }

    public function testFolderJsAsset()
    {
        $this->taskBuildAsset('./tests/output/folder.js')
            ->source('./vendor/bower/bootstrap/js')
        ->run();

        $this->assertFileExists('./tests/output/folder.js');

        $this->assertFileEquals
        (
            './tests/expected/folder.js',
            './tests/output/folder.js'
        );
    }

    public function testSingleCssAsset()
    {
        $this->taskBuildAsset('./tests/output/single.css')
            ->source('./vendor/bower/bootstrap/dist/css/bootstrap.css')
            ->autoprefix(true)
        ->run();

        $this->assertFileExists('./tests/output/single.css');

        $this->assertFileEquals
        (
            './tests/expected/single.css',
            './tests/output/single.css'
        );
    }

    public function testFolderCssAsset()
    {
        $this->taskBuildAsset('./tests/output/folder.css')
            ->source('./vendor/bower/pure')
            ->autoprefix(true)
        ->run();

        $this->assertFileExists('./tests/output/folder.css');

        $this->assertFileEquals
        (
            './tests/expected/folder.css',
            './tests/output/folder.css'
        );
    }

    public function testLessAsset()
    {
        $this->taskBuildAsset('./tests/output/less.css')
            ->source('./vendor/bower/bootstrap/less/bootstrap.less')
            ->autoprefix(true)
        ->run();

        $this->assertFileExists('./tests/output/less.css');

        $this->assertFileEquals
        (
            './tests/expected/less.css',
            './tests/output/less.css'
        );
    }

    public function testScssAsset()
    {
        $this->taskBuildAsset('./tests/output/scss.css')
            ->source('./vendor/bower/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
            ->autoprefix(true)
        ->run();

        $this->assertFileExists('./tests/output/scss.css');

        $this->assertFileEquals
        (
            './tests/expected/scss.css',
            './tests/output/scss.css'
        );
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
            ->autoprefix(true)
        ->run();

        $this->assertFileExists('./tests/output/many.css');

        $this->assertFileEquals
        (
            './tests/expected/many.css',
            './tests/output/many.css'
        );
    }

    public function testFinderAsset()
    {
        $finder = new \Symfony\Component\Finder\Finder();
        $finder->files()->in('./vendor/bower/pure')->name('*.css')->sortByName();
        $this->taskBuildAsset('./tests/output/finder.css')->source($finder)->autoprefix(true)->run();

        $this->assertFileExists('./tests/output/finder.css');

        $this->assertFileEquals
        (
            './tests/expected/finder.css',
            './tests/output/finder.css'
        );
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
        $this->taskBuildAsset('./tests/output/gzipped.js')
            ->source('./vendor/bower/jquery/dist/jquery.js')
            ->gz(true)
        ->run();

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
        $this->taskBuildAsset('./tests/output/debug.js')
            ->source('./vendor/bower/jquery/dist/jquery.js')
            ->debug(true)
        ->run();

        $this->assertFileExists('./tests/output/debug.js');

        $this->assertFileEquals
        (
            './tests/expected/debug.js',
            './tests/output/debug.js'
        );
    }

    public function testCssPathReplacement()
    {
        $this->taskBuildAsset('./tests/output/css-path-replacement.css')
            ->source('./tests/input/css-path-replacement.css')
            ->debug(true)
        ->run();

        $this->assertFileExists('./tests/output/css-path-replacement.css');

        $this->assertFileEquals
        (
            './tests/expected/css-path-replacement.css',
            './tests/output/css-path-replacement.css'
        );
    }
}
