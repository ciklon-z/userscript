// ==UserScript==
// @name       TSW Builder Local Deck Storage
// @namespace  http://sehversuche.de/
// @version    0.4
// @description Save decks on http://www.tsw-builder.com/ to your local browser storage
// @match      http://www.tsw-builder.com/*
// @match      http://test.tsw-builder.com/*
// @match      http://tsw.sehversuche.de/builder/*
// @copyright  2012+, rudolfson
// ==/UserScript==

// load store.js + json2 as minimalized version
/* Copyright (c) 2010-2012 Marcus Westin */
this.JSON||(this.JSON={}),function(){function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)r=rep[n],typeof r=="string"&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(){function u(){try{return r in t&&t[r]}catch(e){return!1}}function a(){try{return i in t&&t[i]&&t[i][t.location.hostname]}catch(e){return!1}}var e={},t=window,n=t.document,r="localStorage",i="globalStorage",s="__storejs__",o;e.disabled=!1,e.set=function(e,t){},e.get=function(e){},e.remove=function(e){},e.clear=function(){},e.transact=function(t,n,r){var i=e.get(t);r==null&&(r=n,n=null),typeof i=="undefined"&&(i=n||{}),r(i),e.set(t,i)},e.getAll=function(){},e.serialize=function(e){return JSON.stringify(e)},e.deserialize=function(e){return typeof e!="string"?undefined:JSON.parse(e)};if(u())o=t[r],e.set=function(t,n){if(n===undefined)return e.remove(t);o.setItem(t,e.serialize(n))},e.get=function(t){return e.deserialize(o.getItem(t))},e.remove=function(e){o.removeItem(e)},e.clear=function(){o.clear()},e.getAll=function(){var t={};for(var n=0;n<o.length;++n){var r=o.key(n);t[r]=e.get(r)}return t};else if(a())o=t[i][t.location.hostname],e.set=function(t,n){if(n===undefined)return e.remove(t);o[t]=e.serialize(n)},e.get=function(t){return e.deserialize(o[t]&&o[t].value)},e.remove=function(e){delete o[e]},e.clear=function(){for(var e in o)delete o[e]},e.getAll=function(){var t={};for(var n=0;n<o.length;++n){var r=o.key(n);t[r]=e.get(r)}return t};else if(n.documentElement.addBehavior){var f,l;try{l=new ActiveXObject("htmlfile"),l.open(),l.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),l.close(),f=l.w.frames[0].document,o=f.createElement("div")}catch(c){o=n.createElement("div"),f=n.body}function h(t){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(o),f.appendChild(o),o.addBehavior("#default#userData"),o.load(r);var i=t.apply(e,n);return f.removeChild(o),i}}function p(e){return"_"+e}e.set=h(function(t,n,i){n=p(n);if(i===undefined)return e.remove(n);t.setAttribute(n,e.serialize(i)),t.save(r)}),e.get=h(function(t,n){return n=p(n),e.deserialize(t.getAttribute(n))}),e.remove=h(function(e,t){t=p(t),e.removeAttribute(t),e.save(r)}),e.clear=h(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute(i.name);e.save(r)}),e.getAll=h(function(t){var n=t.XMLDocument.documentElement.attributes;t.load(r);var i={};for(var s=0,o;o=n[s];++s)i[o]=e.get(o);return i})}try{e.set(s,s),e.get(s)!=s&&(e.disabled=!0),e.remove(s)}catch(c){e.disabled=!0}e.enabled=!e.disabled,typeof module!="undefined"&&typeof module!="function"?module.exports=e:typeof define=="function"&&define.amd?define(e):this.store=e}()

// boilerplate greasemonkey to wait until jQuery is defined...
function GM_wait()
{
    if (typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.make_button == 'undefined')
    {
        window.setTimeout(GM_wait,500);
    }
    else
    {
        proceed();
    }
}
GM_wait();

// here the main function begins after assuring everything needed is loaded
function proceed()
{
    if (store.enabled)
    {
        $ = unsafeWindow.jQuery;
        $('#extra_top_bar').before('<div id="a_bars_top_left_decks" class="button_holder"><div><select id="deck_list"/></div><div><button id="deck_load_button">Load</button><button id="deck_save_button">Save</button><button id="deck_delete_button">Delete</button></div></div>');
        unsafeWindow.make_button('#deck_load_button', loadSelectedDeck);
        unsafeWindow.make_button('#deck_save_button', saveCurrentDeck);
        unsafeWindow.make_button('#deck_delete_button', deleteSelectedDeck);
        refreshDeckList();
    }
    else
    {
        console.error("Local storage is not available.");
    }
}

// save the current deck to local storage
function saveCurrentDeck()
{
    var selected = getSelectedDeck();
    var deckName = selected.text();
    if (selected.val() == 'create')
    {
        deckName = prompt("Deck Name:");
    }
    if (!deckName) return;
    
    var hash = window.location.href.split('#')[1];
    var decks = loadDecks();
    decks[deckName] = hash;
    store.set('decks', decks);

    refreshDeckList(hash);
}

// load the selected deck
function loadSelectedDeck()
{
    var selected = getSelectedDeck();
    if (selected.val() == 'create')
    {
        return;
    }
    window.location.href = window.location.href.split('#')[0] + '#' + selected.val();
    window.location.reload();
}

// deletes the selected deck
function deleteSelectedDeck()
{
    var selected = getSelectedDeck();
    if (selected.val() == 'create')
    {
        return;
    }
    
    var decks = loadDecks();
    delete decks[selected.text()];
    store.set('decks', decks);
    
    refreshDeckList();
}

// refresh the list of decks
function refreshDeckList(selected)
{
    var decks = loadDecks();
    var deckList = $('#deck_list');
    deckList.empty();
    $('<option />', {value: 'create', text: 'New ...'}).appendTo(deck_list);
    for (deck in decks)
    {
        $('<option />', {value: decks[deck], text: deck}).appendTo(deck_list);
    }
    if (selected)
    {
        deckList.val(selected);
    }
}

// load the decks from the store
function loadDecks()
{
    var decks = store.get('decks');
    if (!decks)
    {
        return new Object();
    }
    else
    {
        return decks;
    }
}

// get the current value from the dropdown list
function getSelectedDeck()
{
    return $('#deck_list :selected');
}