// script that refreshes defined pages in a defined amount of time
// version 1.0

// 24.09.2006
// Copyright (c) 2006, Stefan Oderbolz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Browse ImmoScout", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Auto Refresher 20s
// @namespace     http://www.readmore.ch
// @description   Refresh every 1 seconds the defined pages 
// @include       
// ==/UserScript==

// How often is page refreshed (in ms)

 var time = 30000.1; //= 10.1sec			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;