// ==UserScript==
// @name        Cyberrepublik Fight Page[Eat Food]
// @namespace   CyberrepublikFHP
// @include     http://www.cyberrepublik.com/en/battle/*
// @homepage    http://userscripts.org/users/Mertcane
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright   2012, Mertcane (mertcane@gmail.com)
// @version       1
// ==/UserScript==


var user_id;


var regexi = /en\/profile\/(\d*)/;
$('.avt_txt').html().match(regexi);
user_id = RegExp.$1;

$('.links').prepend('<a onclick="eat_food();" id="Mertcane-Eat_Food" href="javascript:void(0)">Eat Food</a>');


document.getElementById('Mertcane-Eat_Food').addEventListener('click', eat_food, false);


function eat_food(a) {

GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.cyberrepublik.com/en/consume-food",
  data: "user="+user_id+"&food=7",
   headers: {
					"Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.cyberrepublik.com/en/consume-food"

                  },
  	onload: function(e) { alert('Ok.'); }
    
});
    
}