// ==UserScript==
// @name           Make Sarah a Peggy
// @namespace      http://
// @include        http://*
// @include        https://*
// @copyright      Anders Kusk
// @version        0.1
// ==/UserScript==

var words = { "Sarah Palin" : "Peggy Hill"};
String.prototype.prepareRegex = function() { return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1"); };

function isOkTag(tag) { return (",pre,code,input,button,textarea,".indexOf(","+tag+",") == -1); }

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

// skift titlen
var matches = { "^https://[^ ]*": "[^ ]*Sarah Palin", "^http://[^ ]*": "[^ ]*Sarah Palin" };
for (var url in matches) { document.title = document.title.replace(new RegExp(matches[url],'i'),"Peggy Hill"); }
for (var url in matches) { document.title = document.title.replace(new RegExp(matches[url],'i'),"Peggy Hill"); }