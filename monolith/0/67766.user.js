// ==UserScript==
// @name                KASKUS Signature Auto Paste
// @description         Pasang signature di kaskus secara Otomatis TAnpa Membebani ServerKaskus Sendiri :D
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              JagoWand 
// ==/UserScript==

var signature = "Isi Dengan Signature Ente :D";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)