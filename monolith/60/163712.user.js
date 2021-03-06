// ==UserScript==
// @name           MeetMe Secret Admirer Cheat
// @description    Highlights your secret admirer so you don't have to guess.
// @include        http://*match.meetme.com/board*
// @version    1.0
// ==/UserScript==
//
// Date: 	3/31/2013
// Author:	WatsonTheSimpleScripter

var bActive = false;

window.addEventListener("load", findMatch, false);
window.addEventListener("DOMNodeInserted", findMatch, false);
try {
	window.addEventListener("DOMSubtreeModified", findMatch, false);
} catch(e) {}

function findMatch(e) {
	if (bActive) return;

	bActive = true;
	var mm = document.getElementById("matchBoard");
	if(mm) {
		matchBoard = mm.getAttribute("class");
		images = document.getElementsByTagName("img");
		for (i = 0; i < images.length; i++) {
			try {
				matchImg = images[i].getAttribute("id");
				if(matchImg.indexOf("matchId")>=0) {
					bg = images[i].parentNode.parentNode;
					if(isMatch(matchBoard, matchImg)) {
						bg.style.backgroundColor = "#00DD00";
						bg.style.border="1px solid #009966";
                        bg.style.color = "#000000";
                    }else{
                        //bg.style.visibility = "hidden";
                        bg.style.color = "#FFFFFF";
                        bg.style.backgroundColor = "#000000";
						bg.style.border="1px solid #FF0000";
                    }
				}
			} catch(e) {}
		}
	}
	bActive = false;
}

function isMatch(matchBoard, matchImg) {
	var id=parseInt(matchImg.substr(8));
	var comb=id^parseInt(matchBoard.substr(8));
	var flag=true,i;
	for(i=0; i<4; i++) {
		if((comb&(0xf<<i))>>i!=15) {
			flag=false;
			break
		}
	}
	flag=flag&&((0x0f00|15|0xf000|comb|0x00f0)==((1<<16)-1));
	return flag;
}