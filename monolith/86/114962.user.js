//Code Developed by Manak Kapoor. InstallButtonAdder
// ==UserScript==
// @name          UserScripts++[Spanish]
// @description   Añade un botón de instalación en la siguiente lista de todos los scripts en userscripts.org
// @version                1.0.3
// @include       *userscripts*
// ==/UserScript==
//Please contact manak.kapoor@gmail.com for more information.
/*
 *  This work is licensed under a Creative Commons
 * Attribution-NonCommercial-NoDerivs 3.0 Unported License
 * http://creativecommons.org/licenses/by-nc-nd/3.0/
 *
 * UNLESS OTHERWISE MUTUALLY AGREED BY THE PARTIES IN WRITING,
 * LICENSOR OFFERS THE WORK AS-IS AND MAKES NO REPRESENTATIONS
 * OR WARRANTIES OF ANY KIND CONCERNING THE WORK, EXPRESS, IMPLIED,
 * STATUTORY OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, WARRANTIES
 * OF TITLE, MERCHANTIBILITY, FITNESS FOR A PARTICULAR PURPOSE,
 * NONINFRINGEMENT, OR THE ABSENCE OF LATENT OR OTHER DEFECTS,
 * ACCURACY, OR THE PRESENCE OF ABSENCE OF ERRORS, WHETHER OR NOT
 * DISCOVERABLE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF
 * IMPLIED WARRANTIES, SO SUCH EXCLUSION MAY NOT APPLY TO YOU.
 * EXCEPT TO THE EXTENT REQUIRED BY APPLICABLE LAW, IN NO EVENT
 * WILL LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY FOR ANY SPECIAL,
 * INCIDENTAL, CONSEQUENTIAL, PUNITIVE OR EXEMPLARY DAMAGES ARISING
 * OUT OF THIS LICENSE OR THE USE OF THE WORK, EVEN IF LICENSOR HAS
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */
function getElementsByClassName( strClassName, obj ) {
 var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}

 /*var newdiv=getElementsByClassName("wide forums",document.body)[0];
 newdiv.setAttribute('id','reqTable');*/

 var allScripts=getElementsByClassName("title",document.body);
 var allBoxes=getElementsByClassName("script-meat",document.body);
 var length=allScripts.length;
 for(var i=0;i<=length;i++)
 {
 var g=allScripts[i];
 var url=g.href;
 //alert(g.href);
 var integer=url.match(/\d+/);
 //alert(integer);
 var installurl="/scripts/source/"+integer.toString()+".user.js";
var sourceurl="/scripts/review/"+integer.toString();
var reviewurl="/scripts/reviews/"+integer.toString();
var fanurl="/scripts/fans/"+integer.toString()+"#";
 g=allBoxes[i];
 g.innerHTML=g.innerHTML+"<td class='inv lp'><a href='"+installurl+ "' style='color:black;'>[Instalar]</a> | <a href='"+sourceurl+ "' style='color:black;'>[Fuente]</a> | <a href='"+reviewurl+ "' style='color:black;'>[Comentarios]</a> | <a href='"+fanurl+ "' style='color:black;'>[Favorecer]</a></td>";
 }
