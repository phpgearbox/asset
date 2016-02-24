The Asset Gear
================================================================================
[![Build Status](https://travis-ci.org/phpgearbox/asset.svg?branch=master)](https://travis-ci.org/phpgearbox/asset)
[![Latest Stable Version](https://poser.pugx.org/gears/asset/v/stable.svg)](https://packagist.org/packages/gears/asset)
[![Total Downloads](https://poser.pugx.org/gears/asset/downloads.svg)](https://packagist.org/packages/gears/asset)
[![License](https://poser.pugx.org/gears/asset/license.svg)](https://packagist.org/packages/gears/asset)
[![HHVM Tested](http://hhvm.h4cc.de/badge/gears/asset.svg?style=flat)](http://hhvm.h4cc.de/package/gears/asset)

**An Asset Minification Pipeline for the [Robo](http://robo.li/) Task Runner.**

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

	composer require gears/asset

How to Use
--------------------------------------------------------------------------------
The first thing is that I make an assumption you know what the
_Robo Task Runner_ is and how the basics of it work. If this is not you,
please head over to the robo website and familiarise yourself: http://robo.li/

In your ```RoboFile.php``` you need to import the ```Gears\Asset``` trait like so:

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

### Asset Destination
The very first argument you must supply is the final destination of the asset
you are building. This can either be a relative path to the current working
directory or an absolute path.

```php
$this->taskBuildAsset('/where/do/you/want/me');
```

### Asset Type
The task is smart and will detect what sort of asset you are trying to build
based on file extensions. It goes without saying that you __CAN NOT MIX__
asset types in one build task.

For example this is invalid:

```php
$this->taskBuildAsset('script.js')->source('styles.css')->run();
```

### Asset Source
The task needs to know what source files will be used to build the final asset.  
You can supply the source files in a number of ways.

* __Single Source File:__  
  The simplest asset is one which has only one source file.
  All this would do is run ```unbuilt.js``` through the configured Js Minifier.

  ```php
  $this->taskBuildAsset('built.js')->source('unbuilt.js')->run();
  ```

* __Single Source Folder:__  
  Instead of a source file you can define a folder.
  The task will search for files in the folder that have the same extension as
  the destination file.

  ```php
  $this->taskBuildAsset('built.css')->source('/my/styles')->run();
  ```

  > NOTE: Files inside folders are sorted by name. So you could manipulate the
  > order that files are concatenated together by prefixing a numeric index to
  > each source file.

* __Many Sources:__  
  You can supply any array of source files and/or folders.

  ```php
  $this->taskBuildAsset('built.js')->source
  ([
	  '/js/jquery.js',
	  '/js/jquery/plugins',
	  '/js/main.js'
  ])->run();
  ```

* __Symfony Finder:__  
  The last option is to supply your own configured Finder instance.

  ```php
  $this->taskBuildAsset('built.js')
  ->source
  (
  	(new Finder)
		->files()
  		->in('/path/to/assets')
  		->name('*.js')
  		->sortByName()
  )
  ->run();
  ```

  > For documentation on the Finder refer to:
  > http://symfony.com/doc/current/components/finder.html

### Css Transpilation:
The task supports transpiling both [Less](http://lesscss.org/)
and [Scss](http://sass-lang.com/) to Css.

If are building a css asset, this happens automatically for you.
Any of your source files that are detected with a ```less``` or ```scss``` file
extension will be transpiled with either:

* [less.php](https://github.com/oyejorge/less.php)
* [scssphp](https://github.com/leafo/scssphp)

> NOTE: You can not supply a folder of less or scss files.
> If you did have a folder of such source files you could configure a Finder
> instance to find those files. Each file would be transpiled in isolation and
> then the output concatenated.

### Js Transpilation:
To save any future questions, I don't believe there is any point in supporting
say [TypeScript](http://www.typescriptlang.org/) or [Babel](https://babeljs.io/)
simply because, to run both of those transpiliers you must have
[node](https://nodejs.org) installed.

And if you have node, and you are programming in TypeScript or ES6 then chances
are you will probably already be using Gulp or Grunt.

### Options

* __Debug:__  
  By default the task will always minify your css or js asset. If you wish to
  only build the asset, which will just concatenate the source files. You can
  set debug to true like this:

  ```php
  $this->taskBuildAsset(...)->source(...)->debug(true)->run();
  ```

* __Gz:__  
  Optionally the task can create a gzipped version of the final asset. This is
  so that web servers can be configured to server the pre gzipped version of the
  file instead of gzipping the file on the fly.

  ```php
  $this->taskBuildAsset(...)->source(...)->gz(true)->run();
  ```

* __AutoPrefix:__  
  If building a css asset, the task will automatically run a css autoprefixer
  before outputting the file. Autoprefixing parses CSS and adds vendor prefixes
  to CSS rules using values from http://caniuse.com/

  > For more info see: https://github.com/vladkens/autoprefixer-php

  To turn this feature off:

  ```php
  $this->taskBuildAsset(...)->source(...)->autoprefix(false)->run();
  ```

* __Template:__  
  This is a cache busting feature. If you provide a valid file path to a HTML
  template. The task will then save the final asset with the current unix
  time-stamp between it's base name and it's extension.

  For example: ```script.1456298250.js```

  It will then search and replace the template file for any references to the
  asset. The task is smart and uses a regular expression. So if your template
  contained the asset name without the time-stamp or it contained the asset name
  with a previously built time-stamp it will still update the reference.

  ```php
  $this->taskBuildAsset(...)->source(...)->template('view.html')->run();
  ```

  > NOTE: The template does not have to strictly be a HTML file. It could be any
  > text based file. So it will work just fine with view frameworks like
  > Laravel Blade, Twig, Plates, Foil, etc.

--------------------------------------------------------------------------------
Developed by Brad Jones - brad@bjc.id.au
