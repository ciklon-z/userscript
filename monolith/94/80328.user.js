// ==UserScript==
// @name          4chan Konata Skin
// @namespace     http://userstyles.org
// @description	  ｷﾀ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━(ﾟ∀ﾟ)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━!
// @author        Quiche
// @homepage      http://userstyles.org/styles/9587
// @include       http://4chan.org/*
// @include       https://4chan.org/*
// @include       http://*.4chan.org/*
// @include       https://*.4chan.org/*
// ==/UserScript==

by Vekter (Spacialvekter@gmail.com)

Most of this code cribbed from Shizor, most credit goes to him.*/



@namespace url(http://www.w3.org/1999/xhtml);



@-moz-document domain(4chan.org){





body[bgcolor] 

  { background: url("http://filesmelt.com/dl/1277740438737.jpg") top left no-repeat fixed #cc5553 !important;

    font: 100%/1.4 Helvetica, Arial, sans-serif !important;

	color: #FFFFFF !important;}



.filesize {

	font: 100%/1.4 Helvetica, Arial, sans-serif !important;

	color: #FFFFFF !important; }

	

.omittedposts, .abbr {

	color: #FFFFFF !important}



.rules {

	font-size: 8pt !important;

	color: #FFFFFF !important;

}



a 

  { color: #FFFFFF !important; 

    font-weight: 700 !important; }



a:visited

  { font-weight: 200 !important;

    opacity: 0.75 !important; }



.logo 

  { margin-bottom: 25px !important; 

    text-align: right !important;

    width: auto !important;

    margin: 0 30px 0 0 !important;

	color: #000000 !important;}



.logo img 

  { float: left !important;

    clear: left !important; }



.logo font { margin: 0 !important; }



.logo font b span, html > body > table > tbody > tr > th > font

  { font: 200 100%/1.4 Helvetica, Arial, sans-serif !important;

	color: #000000 !important;}



.logo font b span 

  { color: #32CD32 !important;

    font-weight: 700 !important;

    font-size: 150% !important; }



html > body > table > tbody > tr > td,

html > body > table > tbody > tr > th

  { opacity: 0.50 !important;

    -moz-border-radius: 10px !important; }





html > body > table > tbody > tr > td { padding: 0.25em 0 !important; }



html > body > table > tbody > tr > td:hover, 

html > body > table > tbody > tr > td:focus,

html > body > table > tbody > tr > th:hover

  { opacity: 1.00 !important; }



.doubledash { display: none; }



.postarea > form > table > tbody > tr { opacity: 0.5 !important; }

.postarea > form > table > tbody > tr:hover { opacity: 1.00 !important; }



.postblock 

  { background-color: #000000!important;

    border-color: #1EDC96!important;

    color: #FFFFFF !important; 

    padding-top: 0.1850em !important;

    -moz-border-radius: 10px 0 0 10px !important;

    vertical-align: top !important;

    text-align: right !important; }



.inputtext, input[name="upfile"]

  { width: 100% !important;

    -moz-border-radius: 0 10px 10px 0 !important; }



textarea.inputtext

  { height: 200px !important; }



.deletebuttons .inputtext { width: 100px !important; -moz-border-radius: 10px !important; }



.pages { position: relative !important; }

.pages a, .pages b { padding: 0 0.25em !important; }

.pages a:visited { font-style: normal !important; }



.pages b { font-size: 150% !important; margin-top: 0.25em !important;  }



.commentpostername a.linkmail[href="mailto:sage"]:after

  { content: " (???)"; }



.filetitle 

  { font-size: 125% !important;

    font-weight: 100 !important; 

    display: block;

    clear: right !important;}



.reply, .replyhl, .pages

  { border: 1px solid !important;

    /* border-width: 1px 2px 2px 1px !important;

    border-style: solid !important; */

    -moz-border-radius: 0 40px !important;

    padding: 0 30px 20px 0 !important;

	color: #FFFFFF !important;

	border-color: #1EDC96 !important;

	}



.reply, .pages

  { background-color: #000000 !important;

    border-color: #1EDC96 !important;

	border: 2px solid !important;}



.replyhl

  { background-color: #008000!important;

    border-color: #ffffff !important;

    color: #FFFFFF !important; }



.reply .unkfunc, .replyhl .unkfunc 

	{margin-left: 1em !important; }



.replyhl .unkfunc { color: #6a6ac9 !important; }



.pages

  { padding: 5px !important; }



.postername, .commentpostername 

  { font-size: 125% !important; 

    text-shadow: 5px 5px 10px #ffffff!important; }



.postertrip 

  { color: #ffffff !important; 

    opacity: 0.5 !important; }



.replyhl .postertrip { color: #ffffff !important; }



.replyhl .commentpostername { color: #ffffff !important; }



.replyhl a { color: #ffffff !important; }



hr 

  { border-color: #e10912 !important; 

    width: 100% !important;

    clear: both !important;

	color: #1EDC96 !important;	}



/* 4chan extension */



DIV[class="4chan_ext_hiddenthreadinfo"] .reply

  { padding: 0 !important; 

    border: 0 none !important;

    -moz-border-radius: 0 !important;

    background-color: transparent !important; }



.reply .postblock { text-align: center !important; }



SPAN[class="4chan_win_header_buttons"]

  { right: 34px !important; }



SPAN[style="border: thin solid black; padding: 3px; z-index: 100; position: absolute; right: 10px; top: 0px;"][class="reply"],

SPAN[style="border: thin solid black; padding: 3px; position: absolute; right: 10px;"][class="reply"] 

{ padding: 0 !important;

  -moz-border-radius: 0 5px !important; }



#twi_table_div 

  { border: 0 none !important; 

    opacity: 0.90 !important; }



#twi_table_div .postername,

#twi_table_div .postertrip,

#twi_table_div .filetitle

  { font-size: 100% !important; }



#twi_table_div > .postblock 

  { border-color: #000000!important;

    border-width: 1px 1px 0 1px !important;

    -moz-border-radius: 10px 10px 0 0 !important;

    text-align: center !important; }



#twi_table_div table .postblock 

  { -moz-border-radius: 0 !important;

    background-color: #e10912!important; 

    margin: 0 !important;

    color: #000000 !important;

    text-align: center !important; }



#twi_table_div > #twi_table

  { border-width: 0 1px 1px 1px !important;

    -moz-border-radius: 0 0 10px 10px !important; 

    padding: 0 0 5px 0 !important;

    opacity: 1.00 !important; }

}