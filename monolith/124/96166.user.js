// ==UserScript==
// @name           klanz
// @namespace      klanz
// @description    klanz
// @include        http://klanz.ru/*
// @include        http://www.klanz.ru/* 
// ==/UserScript==


(function(){

var last_time = new Date();
 
 
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

var a = getElementsByClassName("write_to_opponent", null);
//alert(a + " " + a.length);
if (a.length > 0)
{

	function MouseMove(ev){
		last_time = new Date();
		//alert(last_time);
	}
	//document.onmousemove = MouseMove;
	//window.onmousemove = MouseMove;
	//window.addEventListener("mousemove", MouseMove, false);
	window.addEventListener('mousemove',MouseMove,false);
	
	setInterval(function()
	{
		//alert("new date " + " " + (new Date()) + " last time " + last_time + " num of seconds " + ((new Date())-last_time)/1000)  ;
		if (((new Date())-last_time)/1000 > 2 * 60)
		{
			last_time = new Date();
			alert("Надо заглянуть в бой в Klanz!");
		}
	},15000);



}


})();