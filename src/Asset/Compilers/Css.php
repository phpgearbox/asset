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

use Gears\String as Str;
use Gears\Asset\Compilers\Base;

class Css extends Base
{
	public function compile()
	{
		$replaced_paths = [];

		$css_asset_root = realpath($this->file->getPath());

		$destination_root = realpath($this->destination->getPath());

		preg_match_all('/url\([\'"]?(.*?)[\'"]?\)/', $this->source, $matches);
		
		foreach ($matches[1] as $key => $match)
		{
			$fileinfo = pathinfo($match);

			if (in_array($fileinfo['dirname'], $replaced_paths))
			{
				continue;
			}

			if (Str::contains($fileinfo['extension'], '?#'))
			{
				continue;
			}

			if (Str::contains($fileinfo['extension'], 'svg#'))
			{
				$fileinfo['extension'] = 'svg';
			}

			$css_asset_path = realpath
			(
				$css_asset_root.'/'.
				$fileinfo['dirname'].'/'.
				$fileinfo['filename'].'.'.
				$fileinfo['extension']
			);

			$css_asset_path = $this->find_relative_path
			(
				$destination_root,
				$css_asset_path
			);

			$css_asset_path = pathinfo($css_asset_path, PATHINFO_DIRNAME);

			$this->source = Str::replace
			(
				$this->source,
				$fileinfo['dirname'],
				$css_asset_path
			);

			$replaced_paths[] = $fileinfo['dirname'];
		}

		return parent::compile();
	}

	/**
	* 
	* Find the relative file system path between two file system paths
	*
	* @param  string  $frompath  Path to start from
	* @param  string  $topath    Path we want to end up in
	*
	* @return string             Path leading from $frompath to $topath
	*/
	private function find_relative_path ( $frompath, $topath )
	{
		$from = explode( DIRECTORY_SEPARATOR, $frompath ); // Folders/File
		$to = explode( DIRECTORY_SEPARATOR, $topath ); // Folders/File
		$relpath = '';

		$i = 0;
		// Find how far the path is the same
		while ( isset($from[$i]) && isset($to[$i]) ) {
		    if ( $from[$i] != $to[$i] ) break;
		    $i++;
		}
		$j = count( $from ) - 1;
		// Add '..' until the path is the same
		while ( $i <= $j ) {
		    if ( !empty($from[$j]) ) $relpath .= '..'.DIRECTORY_SEPARATOR;
		    $j--;
		}
		// Go to folder from where it starts differing
		while ( isset($to[$i]) ) {
		    if ( !empty($to[$i]) ) $relpath .= $to[$i].DIRECTORY_SEPARATOR;
		    $i++;
		}

		// Strip last separator
		return substr($relpath, 0, -1);
	}
}