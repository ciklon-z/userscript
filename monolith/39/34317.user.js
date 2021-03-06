// DGWeb Hijri English user script
// version 1.0.0.0
// 2008−09−20
// Copyright (c) 2008, Shamim Rezaie
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DGWeb.Hijri.EN", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Hijri.EN
// @namespace     http://dgweb.rezaie.info
// @description   English language pack for the Hijri (Islamic) DGWeb extension
// @include       *
// ==/UserScript==


if (typeof unsafeWindow.DGWeb == "undefined") {
	unsafeWindow.DGWeb = {};
}

if (typeof unsafeWindow.DGWeb.namespace == "undefined") {
	unsafeWindow.DGWeb.namespace = function(a) {
		var o=null, i, d;

		    d=a.split(".");
		    o=unsafeWindow.DGWeb;

		    for (i=0; i<d.length; i=i+1) {
		        o[d[i]]=o[d[i]] || {};
		        o=o[d[i]];
		    }
		return o;
	};
}


unsafeWindow.DGWeb.namespace("Lang.Hijri");

unsafeWindow.DGWeb.Lang.Hijri.NAME = "Hijri";

// full month names
unsafeWindow.DGWeb.Lang.Hijri._MN = new Array
("Muḥarram",
 "Ṣafar",
 "Rabī' I",
 "Rabī' al Thānī",
 "Jumādā I",
 "Jumādā al-akhir",
 "Rajab",
 "Sha'abān",
 "Ramaḍān",
 "Shawwal",
 "Dhu al-Qi'dah",
 "Dhu al-Hijjah");

unsafeWindow.DGWeb.Lang.Hijri.MM_FORMAT = "%M1 – %M2";
unsafeWindow.DGWeb.Lang.Hijri.YY_FORMAT = "%Y1 – %Y2";
unsafeWindow.DGWeb.Lang.Hijri.DM_FORMAT = "%D %M";
unsafeWindow.DGWeb.Lang.Hijri.DMY_FORMAT = "%D %M %Y";
unsafeWindow.DGWeb.Lang.Hijri.MMY_FORMAT = "%M1 – %M2 %Y";
unsafeWindow.DGWeb.Lang.Hijri.MMYY_FORMAT = "%M1 %Y1 – %M2 %Y2";

unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber = function(num) {
	return num;
}

