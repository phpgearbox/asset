The Asset Gear
================================================================================
[![Build Status](https://travis-ci.org/phpgearbox/asset.svg?branch=master)](https://travis-ci.org/phpgearbox/asset)
[![Latest Stable Version](https://poser.pugx.org/gears/asset/v/stable.svg)](https://packagist.org/packages/gears/asset)
[![Total Downloads](https://poser.pugx.org/gears/asset/downloads.svg)](https://packagist.org/packages/gears/asset)
[![License](https://poser.pugx.org/gears/asset/license.svg)](https://packagist.org/packages/gears/asset)

**An Asset Minification Pipleine for the [Robo](http://robo.li/) Task Runner.**

This project is a complete rewrite and rethink of an older project of mine
called [AssetMini](https://github.com/brad-jones/assetmini). With the invention
of the modern day task runner it was about time I updated the way my assets
were minified.

The main driving force behind this rewrite was to remove the load from the
server and give it back to the developers machine. Thus reducing the possibility
of issues on the production server.

How to Install
--------------------------------------------------------------------------------
Installation via composer is easy:

	composer require gears/asset:*

How to Use
--------------------------------------------------------------------------------
The first thing is that I make an assumption you know what the
_Robo Task Runner_ is and how the basics of it work. If this is not you,
please head over to the robo website and familiarises yourself: http://robo.li/

In your ```RoboFile.php``` you need to import the
```Gears\Asset``` trait like so:

```php
class RoboFile extends Robo\Tasks
{
	use Gears\Asset;
}
```

If you have robo installed globally but you have required gears/asset at the
project level. Then when you call robo the composer autoloader for your project
will not fire. I suggest adding the following to the top of your RoboFile.php

```php
/*
 * Include our local composer autoloader just in case
 * we are called with a globally installed version of robo.
 */
require_once(__DIR__.'/vendor/autoload.php');
```

Currently the Gears\Asset trait only provides one new task method.
Below are some examples of how you might use the task and it's various options.

```php
<?php
/*
 * Include our local composer autoloader just in case
 * we are called with a globally installed version of robo.
 */
require_once(__DIR__.'/vendor/autoload.php');

class RoboFile extends Robo\Tasks
{
	use Gears\Asset;

	public function minExample1()
	{
		$this->taskBuildAsset('./public/assets/script.js')
			->source
			([
				'/path/to/jquery.js',
				'/path/to/jquery/plugins',
				'/path/to/main.js'
			])
		->run();
	}

	public function minExample2()
	{
		$this->taskBuildAsset('./public/assets/style.css')
			->source
			([
				'/path/to/normalize.css',
				'/path/to/other/styles'
			])
		->run();
	}

	public function minExample3()
	{
		$this->taskBuildAsset('./public/assets/style.css')
			->source('/path/to/a/single/source/folder/or/file')
		->run();
	}

	public function minExample4()
	{
		$this->taskBuildAsset('./public/assets/style.css')
			->source
			([
				'/path/to/a/pre-minified/asset.min.css',
				'/can/be/concatenated/along/with/other/stylesheets'
			])
		->run();
	}

	public function minExample5()
	{
		$this->taskBuildAsset('./public/assets/not-minified.css')
			->source('/path/to/bootstrap.css')
			->debug(true)
		->run();
	}

	public function minExample6()
	{
		$this->taskBuildAsset('./public/assets/gzipped.css')
			->source('/path/to/bootstrap.css')
			->gz(true)
		->run();
	}

	public function minExample7()
	{
		$this->taskBuildAsset('./public/assets/boostrap.css')
			->source('/path/to/bootstrap.less')
		->run();
	}

	public function minExample8()
	{
		$this->taskBuildAsset('./public/assets/boostrap.css')
			->source('/path/to/bootstrap.scss')
		->run();
	}

	public function minExample9()
	{
		$this->taskBuildAsset('./public/assets/script.js')
			->source('/path/to/source/assets')
			->template('/path/to/html/view/header.php')
		->run();

		$this->taskBuildAsset('./public/assets/styles.css')
			->source('/path/to/source/assets')
			->template('/path/to/html/view/header.php')
		->run();
	}
}
```

**TODO: Write some better documentation, the above is a super quick guide...**

--------------------------------------------------------------------------------
Developed by Brad Jones - brad@bjc.id.au