// ==UserScript==
// @name       Remove ads on xhamster
// @namespace  None
// @version    1.00
// @grant       none
// @description  View some protect cams without passwords
// @match      http://xhamster.com*
// @copyright  2013+, None

// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

/**
Change Log:
Date      Version    Notes
20130314  1.0.4      *auto refresh image fix.
20130314  1.0.3      *auto refresh image (dont work yet).
20130313  1.0.2      *fix problem list load.
20130313  1.0.1      *open cams.
**/

//wait for jQuery to be loaded
function waitForJquery(){
	if (typeof unsafeWindow.jQuery == 'undefined') {  
		window.setTimeout(waitForJquery, 100);
	} else {
		$ = unsafeWindow.jQuery;
		// remove ads and flash player
		$('.sponsorBottom').remove();
		//$('.playerSwf').width(350px);
		$('.adVideo.adVideo2').remove();
	}
}
waitForJquery();	

// remove  links
function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
}
removeElement( document.getElementById('adTop') );
removeElement( document.getElementById('adBottom') );
removeElement( document.getElementById('sponsorBottom') );
removeElement( document.getElementById('footer') );
removeElement( document.getElementById('related') );


(function () {
var get_url = function () { 
    var scripts = document.getElementsByTagName('script');
    var scriptslen = scripts.length; 
    for (var i = 0; i < scriptslen; i++) { 
        if (scripts[i].text.indexOf('flashvars') != -1) {
            var svr = scripts[i].text.split("'srv': '")[1].split("',")[0];
            var file = scripts[i].text.split("'file': '")[1].split("',")[0];

            if (file.indexOf('http%3A%2F%2F') == 0 && file.match(/clients\.cdn[0-9]+\.com%2F/)) {
                return unescape(file);
            } else {
                return svr + '/key=' + file;
            }
        }
    }
};

var add_to_page = function (url) {
    // find the table where we'll add links
    var xpres = document.evaluate("//table[@id='content']/tbody/tr", document, null, XPathResult.ANY_TYPE, null);
    var container = xpres.iterateNext();
    
    var append_tr_td_with = function () {
        var obj = arguments[0];
        var td = document.createElement("td");
        td.colSpan = 2;
        td.appendChild(obj);
        var tr = document.createElement("tr");
        tr.appendChild(td);
        var fn = arguments[1];
        if (fn != null) {
            fn(tr, td);
        }
        container.parentNode.insertBefore(tr, container);
    };
    
    var mk_ta = function (value, rows, cols, readOnly) {
        var ta = document.createElement("textarea");
        ta.value = value;
        ta.rows = rows;
        ta.cols = cols;
        ta.readOnly = readOnly;
        ta.spellcheck = false;
        return ta;
    };

    var lnk_dl = document.createElement("a");
    lnk_dl.appendChild(document.createTextNode("Download this video"));
    lnk_dl.href = url;

    append_tr_td_with(lnk_dl, function (tr, td) {
        td.style.textAlign = 'center';
    });
    
    var txt_raw_url = mk_ta(url, 2, 132, true);
    append_tr_td_with(txt_raw_url);
    
    var txt_add_to_fn = mk_ta('', 1, 132, false);
    append_tr_td_with(txt_add_to_fn);
    
    var txt_lftp_cmd = mk_ta('', 3, 132, true);
    var txt_lftp_cmd_click_selected_count = 0;
    
    function txt_lftp_cmd_click_handler() {
        txt_lftp_cmd_click_selected_count++;
        if (txt_lftp_cmd_click_selected_count < 2) {
            txt_lftp_cmd.select();
        } else {
            txt_lftp_cmd.removeEventListener('click', txt_lftp_cmd_click_handler);
        }
    }
    
    txt_lftp_cmd.addEventListener('click', txt_lftp_cmd_click_handler);
    append_tr_td_with(txt_lftp_cmd);
    
    var update_lftp_cmd = function () {
        var url = txt_raw_url.value;
        if (url.length < 1) {
            return;
        }

        var add = txt_add_to_fn.value.trim();
        var dest = '';
        var first_q = url.indexOf('?');
        if (add.length > 0 || first_q > -1) {
            var fn_end = first_q;
            if (fn_end === -1) {
                // no parameters in url
                fn_end = url.length;
            }
            var last_slash_idx = url.lastIndexOf('/', fn_end);
            var fn_beginning = last_slash_idx + 1;
            var fn = url.substring(fn_beginning, fn_end);
            if (last_slash_idx > -1) {
                dest = ' -o "' + fn + '"';
            }
            if (add.length > 0) {
                // console.log(fn.substring(fn.length - 4, fn.length) + '::' + fn.substring(0, fn.length - 4));
                var add_replaced = '';
                for (var add_i = 0; add_i < add.length; add_i++) {
                    if (add.charAt(add_i) == ' ' || add.charAt(add_i) == '\n' || add.charAt(add_i) == '\r') {
                        add_replaced += '_';
                    } else {
                        add_replaced += add.charAt(add_i);
                    }
                }
                
                if (fn.substring(fn.length - 4, fn.length) === '.flv') {
                    dest = ' -o "' + fn.substring(0, fn.length - 4) + '_' + add_replaced + '.flv"';
                }
            }
        }
        
        txt_lftp_cmd.value = 'get -c "' + url + '"' + dest + ' &';
    };
    
    if (url.match(/\/[0-9]+\.flv/)) {
        // a video with no info in the filename
        var elems_title = document.evaluate("//div[@class='TitleBar']//th[@class='mTitle']/h1", document, null, XPathResult.ANY_TYPE, null);
        var titleh1 = elems_title.iterateNext();
        txt_add_to_fn.value = titleh1.textContent;
    }

    txt_add_to_fn.addEventListener('keyup', update_lftp_cmd);

    update_lftp_cmd();
    txt_lftp_cmd.select();
};

add_to_page(get_url());
}());




















