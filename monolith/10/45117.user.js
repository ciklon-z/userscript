// ==UserScript==
// @name           FarmingMachine
// @author         Sowrov (inital contribution by FDisk, Fuji)
// @description    Farming Machine, Start it At your RallyPoint ;). Add new farm at any village description page (from Map)
// @include        http://*.travian.*/build.php?*gid=16*
// @include        http://*.travian.*/build.php?*id=39*
// @include        http://*.travian.*/a2b.php*
// @include        http://*.travian.*/karte.php*
// @exclude        http://forum.travian.*
// @email          sowrov@ymail.com
// @version        4.3.0
// ==/UserScript==
var SCRIPT = {
	url : 'http://userscripts.org/scripts/source/37377.user.js',
	version : '4.3.0' //same value as @version
};
//Random Farm selection
//No more tribe selection prompt, now auto detect :)

//set global variables
var server = location.hostname;
var rootPath = "http://" + server + "/";
var suffixLocal, suffixGlobal;
var lang = new Array();
var image = new Array();
var farmList = new Array();
var dom = new DOMUtils();
var user_race = 1; //Default Romans :|
var minWait = 5000; //Don't make it smaller then 5000ms!
var maxWait = 2 * minWait;
var globalInt = -1, totalTroops = new Array(); //for temporary value passing between functions
var runningDiv;

//Message Window config
var messageWindowTop = 500; //0 means top of the browser window
var messageWindowLeft = 700; //0 means left most point of the browser window
var zIndex = 100; //make it as big as you want to put the message window over top of anything

//Map
farmMarkingFlag = true; //if false then no farm marking in Map
farmImage = "http://imgtrav.ifrance.com/img/m/d130.gif"; //d01 d02 d03 d04 is also possible. but might conflict later when you get allies and stuff like that.

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPListO = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function main() {
	var html = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
	if (html.indexOf(" <!-- ERROR ITEM CONTAINER") != -1) {
		window.location.replace(rootPath + "a2b.php"); 
	}
	GM_log("Main function called");
	suffixGlobal = server + '_' + getPlayerId();
	suffixLocal = suffixGlobal + '_' + getActiveVillageId();
	setLanguage();
	loadImage();
	loadStyle();
	var url = document.URL;
	url = url.substring(url.lastIndexOf("/") + 1);
	user_race = GM_getValue('Tribe_' + suffixGlobal, -1);
	if (user_race != -1) {
		user_race = GM_getValue('Tribe_' + suffixGlobal, 0);
		user_race = parseInt(user_race);
	} else {
		if (url.indexOf("a2b.php") != -1) {
			user_race = 1 + 10 * getPlayerTribe();
			GM_setValue('Tribe_' + suffixGlobal, user_race);
			alert(T('SCRIPT_NAME') + " Installation complete\n"
					+ T('INSTALL_M1') + "\n" + T('INSTALL_M2') + " :)\n-sowrov");
			window.location.replace(rootPath + "build.php?id=39");//ToDo: reload
		} else {
			window.location.replace(rootPath + "a2b.php");//ToDo: reload
		}

	}
	if (GM_getValue("Maximize_" + suffixGlobal, false) === false) {
		GM_setValue("Maximize_" + suffixGlobal, 1);
	}
	if (GM_getValue("StartIndex_" + suffixLocal, false) === false) {
		GM_setValue("StartIndex_" + suffixLocal, 0);
	}
	if (GM_getValue("EndIndex_" + suffixLocal, false) === false) {
		GM_setValue("EndIndex_" + suffixLocal, -1);
	}

	//insert village selector
	rp_villageSelector();
	//alert (url);
	if (url.indexOf("build.php?") > -1
			&& (url.indexOf("gid=16") > -1 || url.indexOf("id=39") > -1)) {
		if (isReallyRallyPoint()) {
			rp_mainPage();
		}
		activeMain();
	} else if (url.indexOf("a2b.php") > -1) {
		activeMain();
	} else if (url.indexOf("karte.php?") > -1 && url.indexOf("d=") > -1
			&& url.indexOf("c=") > -1) { //if user profile page
		foundNewFarm();
	}
	if (url.indexOf('karte.php')>-1 && url.indexOf('d=')==-1 && farmMarkingFlag) {
		var ex = "//area[contains(@id,'ma_n')]";
		tag = dom.xo(ex);
		for (var i = 1; i <= tag.snapshotLength; i++) {
			tag.snapshotItem(i - 1).addEventListener("click", function() {
						setTimeout(function() {
									getXYtoFarms();
								}, 3000)
					}, true); // so that it will check again when scrolling.
		}		
		getXYtoFarms();
	}
}
function getXYtoFarms() {
	var allVillageId = getAllVillageId();
	allVillageId = allVillageId.split(",");
	var allData = "", i, farmData;
	for (i = 0; i < allVillageId.length; i++) {
		farmData = GM_getValue("FarmList_" + suffixGlobal + "_"
						+ allVillageId[i], "");
		farmData = trim(farmData);
		if(allData !="") allData +=">:)";
		allData += farmData;
	}	
	allData = allData.split(">:)");
	for (var i = 0; i < allData.length; i++) {
		xyt = allData[i].split("|")[0].split(",");
		markFarm(xyt[0], xyt[1]);
	}

}

function markFarm(x, y) {
	x = parseInt(x)
	y = parseInt(y)
	//alert("Map :"+x+" "+y);
	var id = parseInt(xy2id(x,y)), thisId;
	//var ex = "//area[contains(@href,'d=')]";
	var ex = "//*[@id='karte']";
	var tag = dom.xo(ex);
	tag = tag.snapshotItem(0).childNodes;
	var str="";	
	//alert(id);
	for (var i = 0; i < tag.length; i++) {
		if(tag[i].href!=undefined){
			thisId = tag[i].href.toString();
			thisId = thisId.split("d=")[1]+"";
			thisId = parseInt(thisId.split("&")[0]);
			if (thisId == id) {
				ex = "//*[@id='map_content']";				
				var tag2 = dom.xo(ex);
				tag2 = tag2.snapshotItem(0).childNodes[0].childNodes[i];
				tag2.src = farmImage; 
				break;
			}
		}		
	}	
}

function reloadTimer(goToUrl) {
	setTimeout(function() {
				reload(goToUrl);
			}, Random());
}

function reload(goToUrl) {
	t = setTimeout(function() {
				reload(goToUrl);
			}, Random()); // the function is given a time to
										// finish, if it don't finish assume the
										// line was down and try again.
	testUrl = "http://google.com"; // Just to check that you're online, trying
									// to reload offline won't work and will
									// mess up the script.
	GM_xmlhttpRequest({
				method : "GET",
				url : testUrl,
				onload : function(responseDetails) {
					clearTimeout(t);
					window.location.replace(goToUrl)
				}
			});
}

// 0 |     1     |  2  |     3     |    4    |     5      |  6    |    7     |    8     >:)
//x,y|t,r,o,o,p,s|Tribe|FPlayerName|FPlayerId|FVillageName|C_value|activeBool|attackType>:)
function activeMain() {
	if (GM_getValue("Active_" + suffixGlobal, -1) > -1) {
		GM_addStyle("body { color:blue; }");
		drawMessageBox();
		var messageStr = "", acVillageFlag = true, titleStr = "";
		var currentVillageId = getActiveVillageId();
		if (isFarmerVillage(currentVillageId)) {
			if (farmList == null || farmList.length == 0) {
				farmList = GM_getValue("FarmList_" + suffixLocal, "")
						.split(">:)");
			}
			var sIndex = getStartIndex();
			var eIndex = getEndIndex();
			if (eIndex >= farmList.length) {
				GM_setValue("EndIndex_" + suffixLocal, -1);
			}

			var doneHere = GM_getValue("DoneHere_" + suffixLocal, 0);
			if (farmList == "" || farmList.length == 0 || doneHere == 1) {
				titleStr = T("NO_FARM");
				messageStr = T('CHANGE_VILLAGE');
				setTextMessage(titleStr, messageStr);
				acVillageFlag = false;
			} else {
				if (sIndex < farmList.length) {
					setAttackMessage(sIndex);
				} else {
					titleStr = T("Error");
					messageStr = T('CHANGE_VILLAGE');
					setTextMessage(titleStr, messageStr);
					changeVillage();
					return;
				}
			}
		} else {
			titleStr = T('NOT_FARMER');
			messageStr = T('CHANGE_VILLAGE');
			acVillageFlag = false;
			setTextMessage(titleStr, messageStr);
		}
		if (acVillageFlag) {
			var url = document.URL;
			url = url.substring(url.lastIndexOf("/") + 1);
			if (url == "a2b.php") {
				sendtroops();
			} else {
				setTimeout(
						"window.location.replace('" + rootPath + "a2b.php')",
						Random() / 2); //ToDo: reload
			}
		} else {
			changeVillage();
		}
	}
}
function drawMessageBox() {
	runningDiv = dom.cn("div"); //global
	runningDiv
			.setAttribute(
					"style",
					"text-align:center; margin:auto; position:absolute; top:"+messageWindowTop+"px; left:"+messageWindowLeft+"px; width:370px; height:200px; background-color: #c2d9ec; border: 3px solid yellow; -moz-border-radius: 10px; z-index:"+zIndex);

	var tempDiv = dom.cn("div");
	tempDiv
			.setAttribute(
					"style",
					"font-size:x-large; margin-bottom:6px; color:red; border-bottom: 2px solid white;");
	tempDiv.innerHTML = T('MACHINE_RUNNING') + "..";
	runningDiv.appendChild(tempDiv);

	var textDiv = dom.cn("div");
	textDiv
			.setAttribute(
					"style",
					"text-align:center; margin:auto; overflow: auto; height:110px; border-bottom: 2px solid white;");
	runningDiv.appendChild(textDiv);

	tempDiv = dom.cn("div");
	tempDiv.setAttribute("style",
			"border-bottom: 2px solid white; margin-bottom:4px; height: 20px;");
	tempDiv.innerHTML = "&nbsp;";
	runningDiv.appendChild(tempDiv);

	var pushButton = createInputButton("button", T("Halt_Farming"), function() {
				stopEngine();
			});
	runningDiv.appendChild(pushButton);
	document.body.appendChild(runningDiv);
}

function setAttackMessage(sIndex) {
	var arr = farmList[sIndex].split("|");
	var titleStr = T("Going_to")
			+ " "
			+ (arr[8] == 2 ? T("Reinforce") : (arr[8] == 3
					? T("Attack")
					: T("Raid")));
	var messageStr = "<b>[" + sIndex + "]</b> ";
	messageStr += E2C(arr[3]) + " - "; // FPlayerName
	messageStr += E2C(arr[5]);
	messageStr += "<b>(" + arr[0] + ")</b><br>"; // X,Y
	messageStr += T("Used_Troops") + ": ";
	arr[1] = arr[1].split(",");
	if (parseInt(arr[1][0])) {
		messageStr += "<img src='http://imgtrav.ifrance.com/img/u/"
				+ (user_race) + ".gif'> : " + arr[1][0] + " ";
	}
	for (var i = 1; i < 10; i++) {
		if (parseInt(arr[1][i]) > 0) {
			messageStr += "<img src='http://imgtrav.ifrance.com/img/u/"
					+ (user_race + i) + ".gif'> : " + arr[1][i] + " ";
		}
	}
	setTextMessage(titleStr, messageStr);
}
// private
function isFarmerVillage(currentVillageId) {
	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "").split(",");
	if (vList == "" || vList.length == 0) {
		return false;
	}
	var i;
	for (i = 0; i < vList.length; i++) {
		if (vList[i].split('~')[0] == currentVillageId) {
			return true;
		}
	}
	return false;
}
//private
function toNextIndex(sIndex, nextPage) {
	var random = GM_getValue("RandomFarming_" + suffixGlobal, 0);
	if (random == 1) {
		sIndex = Random(0, farmList.length + 1); //so the probability of selecting a new village is 2 times higher then selecting one of the farms
	} else {
		sIndex++;
		if (sIndex >= farmList.length) {
			sIndex = 0;
		}
	}
	GM_setValue("StartIndex_" + suffixLocal, sIndex);
	if (nextPage != null && nextPage != "") {
		setTimeout("window.location.replace('" + rootPath + nextPage + "')",
				Random()); //ToDo: reload
	}
	return sIndex;
}
/**
 * set text message to the runningDiv. If title is blank then it append the message with the previous message
 * @param {} titleStr
 * @param {} messageStr
 */
function setTextMessage(titleStr, messageStr) {
	if (titleStr != "") {
		runningDiv.childNodes[1].innerHTML = "<div style='font-size:large; font-weight:bold; color:black'>"
				+ titleStr + "</div>";
	}
	runningDiv.childNodes[1].innerHTML += messageStr + "<br>";
	var attackCount = GM_getValue("Active_" + suffixGlobal, 0);

	runningDiv.childNodes[2].innerHTML = T('SUCCESS_COUNT') + ": "
			+ attackCount;
}
function sendtroops() {
	var sIndex = getStartIndex();
	var eIndex = getEndIndex();
	var notFoundHtml = (dom.get("lmid2")).innerHTML;
	var formNode = dom.get("lmid2").innerHTML, titleStr = "", messageStr = "";
	var attackCount = GM_getValue("Active_" + suffixGlobal, 0);
	if (notFoundHtml.indexOf("<div class=\"f10 e b\">") > -1) { //village not found or player bannded
		farmSetInactive(sIndex); // got error on this farm so set it inactive
		if (sIndex == eIndex) {
			GM_setValue("DoneHere_" + suffixLocal, 1);
		}
		notFoundHtml = notFoundHtml.substr(notFoundHtml
				.indexOf("<div class=\"f10 e b\">"));
		titleStr = T("Error") + ":";
		messageStr = notFoundHtml.substr(notFoundHtml.indexOf(">") + 1,
				notFoundHtml.indexOf("</div>"))
				+ "<br>" + T('NEXT_FARM');
		setTextMessage(titleStr, messageStr);
		sIndex = toNextIndex(sIndex, "a2b.php");
	} else if (sIndex < farmList.length) {
		var arr = farmList[sIndex].split("|");
		if (formNode.indexOf("kid") > -1) { //confimation page
			var e = document.getElementsByTagName('form');
			e[0].submit(); //submit done
			GM_setValue("Active_" + suffixGlobal, attackCount + 1);
			titleStr = T('TROOPS_GONE') + ":";
			messageStr = "<b>[" + sIndex + "]</b> " + E2C(arr[3]) + " : "
					+ E2C(arr[5]) + "<b>(" + arr[0] + ")</b>";
			setTextMessage(titleStr, messageStr);
			if (sIndex == eIndex) {
				GM_setValue("DoneHere_" + suffixLocal, 1);
			}
			toNextIndex(sIndex);
		} else {
			setAttackMessage(sIndex);
			var i;
			if (arr[7] == "true") {
				var xy = arr[0].split(",");
				var troopsCount = arr[1].split(",");
				var random = GM_getValue("RandomFarming_" + suffixGlobal, 0);
				var availableTroops = new Array();
				//find all the available troops
				//alert(getNumber(formNode.substr(formNode.lastIndexOf("t1.value"))));
				for (i = 1; i < 11; i++) {
					var tt = "t" + i + ".value";
					availableTroops.push(getNumber(formNode.substr(formNode
							.lastIndexOf(tt))));
				}
				for (i = 0; i < troopsCount.length; i++) {
					if (parseInt(availableTroops[i]) < parseInt(troopsCount[i])) {
						titleStr = T("Error") + " -";
						messageStr = T('NOT_ENOUGH') + " -<br><b>[" + sIndex
								+ "]</b>" + E2C(arr[3]) + " : " + E2C(arr[5])
								+ "<b>(" + arr[0] + ")</b><br>"
								+ "<img src='http://imgtrav.ifrance.com/img/u/"
								+ (user_race + (i ? i : "")) + ".gif'>"
								+ T("Available") + ": <b>" + availableTroops[i]
								+ "</b> " + T("Needed") + ": <b>"
								+ troopsCount[i] + "</b>";
						setTextMessage(titleStr, messageStr);
						if (random == 1) {
							//toNextIndex(sIndex, "a2b.php"); //go to the next index							
							sIndex = toNextIndex(sIndex);
							if (sIndex < farmList.length) {
								messageStr = T('NEXT_FARM');
								setTextMessage("", messageStr);
								setTimeout(sendtroops, 2000);
								return;
							}
						}
						changeVillage();
						return;
					}
				}

				var theForm = document.forms.namedItem("snd");
				for (i = 1; i < 11; i++) {
					theForm.elements.namedItem("t" + i).value = troopsCount[i
							- 1];
				}
				dom.find("//input[@name='c' and @value='" + arr[8] + "']",
						XPFirst, theForm).checked = true;
				//theForm.elements.namedItem('c').value = 3;
				theForm.elements.namedItem('x').value = xy[0];
				theForm.elements.namedItem('y').value = xy[1];
				//all set.. submit
				setTimeout(theForm.submit(), Random());
			} else {
				titleStr = T('FARM_INACTIVE') + ":";
				messageStr = "<b>[" + sIndex + "]</b>" + E2C(arr[3]) + " : "
						+ E2C(arr[5]) + "<b>(" + arr[0] + ")</b>";
				setTextMessage(titleStr, messageStr);
				toNextIndex(sIndex); //go to the next index
				setTimeout(sendtroops, 2000);
				return;
			}
		}
	} else {
		//titleStr = "!--*^*--!";
		toNextIndex(sIndex);
		messageStr = T('CHANGE_VILLAGE');
		setTextMessage(titleStr, messageStr);
		changeVillage();
	}
}
function setRandomFarming() {
	var random = GM_getValue("RandomFarming_" + suffixGlobal, -1);
	if (random == 1) {
		GM_setValue("RandomFarming_" + suffixGlobal, 0);
	} else {
		GM_setValue("RandomFarming_" + suffixGlobal, 1);
	}
}
//
function farmSetInactive(index) {
	var fList = GM_getValue("FarmList_" + suffixLocal, "").split(">:)");
	var newfList = "";
	var i, j;
	if (index < fList.length) {
		for (i = 0; i < fList.length; i++) {
			if (i)
				newfList += ">:)";
			if (i == index) {
				var arr = fList[i].split("|");
				arr[7] = "false";
				for (j = 0; j < arr.length; j++) {
					if (j)
						newfList += "|";
					newfList += arr[j];
				}
			} else {
				newfList += fList[i];
			}
		}
		GM_setValue("FarmList_" + suffixLocal, newfList);
	}
}
function createLinkButton(text, title, jsFunction) {
	var button = dom.cn("a");
	button.href = "javascript:void(0)";
	button.innerHTML = text;
	button.title = title;
	if (jsFunction != null) {
		button.addEventListener('click', jsFunction, false);
	}
	return button;
}
function createInputButton(type, value, jsFunction) {
	var inputButton = dom.cn("input");
	inputButton.type = type; // type bepalen
	inputButton.value = value;
	if (jsFunction != null) {
		inputButton.addEventListener('click', jsFunction, false);
	}
	return inputButton;
}
// 0 |     1     |   2   |     3     |    4    |     5      |  6    |    7     |    8     >:)
//x,y|t,r,o,o,p,s|Tribe|FPlayerName|FPlayerId|FVillageName|C_value|activeBool|attackType>:)
function rp_mainPage() {
	if (GM_getValue("Active_" + suffixGlobal, -1) > -1) {
		setTimeout("window.location.replace('" + rootPath + "a2b.php')",
				Random());
	} else {
		insertEditFarmBox();
		//now Add eventlistener for the save button
		dom.get("FMsaveButton")
				.addEventListener('click', saveEditedFarm, false);//add eventlistener
		var container = dom.get("lmid2");
		var newP = dom.cn("p");
		newP.innerHTML += '<b>Farming Machine</b>';
		container.appendChild(newP);
		//insert a new table
		rp_insertTable();
	}
}
function rp_villageSelector() {
	var vTable = dom.find("//div[@id='lright1']/table[@class='f10']/tbody",
			XPFirst);
	if (vTable != null && vTable.firstChild != null) {
		for (var i = 0; i < vTable.childNodes.length; i++) {
			vTable.childNodes[i].textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			var X = RegExp.$1;
			var Y = RegExp.$2;
			var vid = xy2id(X, Y);
			var newdid = getParamFromUrl(vTable.childNodes[i]
							.getElementsByTagName("a")[0].getAttribute("href"),
					"newdid");
			var checkButton = createInputButton("checkbox", i);
			checkButton.id = "vcb_" + vid + "~" + newdid;
			if (isFarmerVillage(vid)) {
				checkButton.checked = true;
			}
			if (GM_getValue("Active_" + suffixGlobal, -1) > -1) {
				checkButton.disabled = true;
			} else {
				checkButton.addEventListener("click", function(event) {
							villageCheckBox(event)
						}, false);
			}
			var newCol = dom.cn("td");
			newCol.appendChild(checkButton);
			vTable.childNodes[i].appendChild(newCol);
		}
	}
}
function villageCheckBox(event) {
	//alert(event.currentTarget.id);
	var cb = event.currentTarget;
	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");
	var i;
	var vid = cb.id.split("_")[1];
	var newList = "";
	if (cb.checked) { //selected
		if (vList != "" && vList != null) {
			vList = vList.split(",");
			for (i = 0; i < vList.length; i++) {
				if (vList[i] == vid)
					return;
				newList += vList[i] + ",";
			}
		}
		newList += vid;
	} else {//deselect
		if (vList == "" || vList == null)
			return;
		vList = vList.split(",");
		for (i = 0; i < vList.length; i++) {
			if (vList[i] != vid) {
				if (newList != "")
					newList += ",";
				newList += vList[i];
			}
		}
	}
	GM_setValue("FarmerVillages_" + suffixGlobal, newList);
}
function rp_insertTable() {
	var farmTable = dom.cn("table");
	var ftableBody = dom.cn("tbody");
	var i;
	var maximize = GM_getValue("Maximize_" + suffixGlobal, 0);
	farmTable.className = "tbg";
	farmTable.id = "farmMachineTable";
	farmTable.setAttribute('cellpadding', 2);
	farmTable.setAttribute('cellspacing', 1);
	farmTable.style.marginBotton = "12px";
	//top row
	var tableRow = dom.cn("tr");
	tableRow.className = "cbg1";

	var tableCol = dom.cn("td");
	tableCol.setAttribute("colspan", 14);
	var Button = dom.cn("div");
	Button.id = "updater";
	Button.setAttribute("style", "margin:auto; width: 477px;");
	Button.appendChild(createLinkButton(T('SCRIPT_NAME'), T('UPDATE_M') + " "
					+ T('SCRIPT_NAME'), function() {
				updateFM(SCRIPT);
			}));
	tableCol.appendChild(Button);
	tableRow.appendChild(tableCol);
	//Add Minimize||Maximize button
	tableCol = dom.cn("td");
	var img = dom.cn("img");
	if (maximize) {
		img.src = image['MINIMIZE']; //add minimize image
		img.title = T("Minimize");
	} else {
		img.src = image['MAXIMIZE']; //add minimize image
		img.title = T("Maximize");
	}
	img.style.height = '16px';
	img.style.width = '30px';
	img.style.cursor = "pointer";
	Button = dom.cn("div");
	Button.setAttribute("style", "width:30px;float:right;");
	Button.appendChild(img);
	Button.addEventListener('click', function() {
				rp_min_max();
			}, 0);
	tableCol.appendChild(Button);

	tableRow.appendChild(tableCol);
	ftableBody.appendChild(tableRow); //adding the top row

	//second row
	tableRow = dom.cn("tr");
	tableRow.className = "cbg1";
	tableCol = dom.cn("td");
	tableCol.setAttribute("colspan", 15);

	Button = createInputButton("checkbox", 0, setRandomFarming);
	var random = GM_getValue("RandomFarming_" + suffixGlobal, 0);
	if (random == 1) {
		Button.checked = true;
	}
	random = dom.cn('div');
	random.innerHTML = "Randomize Farming";
	random.appendChild(Button);
	tableCol.appendChild(random);
	tableCol.appendChild(createInputButton("submit", T('START_FARMING'),
			startEngine));
	tableRow.appendChild(tableCol);
	ftableBody.appendChild(tableRow); //adding the second row
	//third row
	tableRow = dom.cn("tr");
	tableRow.className = "cbg1";
	//start
	tableCol = dom.cn("td");
	tableCol.innerHTML = "<div style='cursor:help;' class='b' title='"
			+ T('START_M') + "'>S</div>";
	tableRow.appendChild(tableCol);
	tableCol = dom.cn("td");
	//tableCol.innerHTML = "<div style='cursor:pointer;' class='b' title='Select End Position'>E</div>";
	//tableCol.addEventListener("click",rp_removeEndIndex,false);
	tableCol.appendChild(createLinkButton("E", T('END_M'), rp_removeEndIndex));
	tableRow.appendChild(tableCol);
	tableCol = dom.cn("td");
	tableCol.innerHTML = "<div style='cursor:help;' class='b' title='"
			+ T('EDIT_M') + "'>E</div>";
	tableRow.appendChild(tableCol);
	tableCol = dom.cn("td");
	tableCol.innerHTML = "<div style='cursor:help;' class='b' title='"
			+ T('DELETE_M') + "'>D</div>";
	tableRow.appendChild(tableCol);
	tableCol = dom.cn("td");
	tableCol.width = "25%";
	tableCol.appendChild(createLinkButton(T('FARM') + " &#8595;",
			T('SORT_FARM'), sortFarms));
	tableRow.appendChild(tableCol);

	tableCol = dom.cn("td");
	tableCol.innerHTML = '<td><img src="/img/un/u/' + user_race + '.gif"></td>';
	tableRow.appendChild(tableCol);
	for (i = 1; i < 10; i++) {
		tableCol = dom.cn("td");
		tableCol.innerHTML = '<td><img src="/img/un/u/' + (user_race + i)
				+ '.gif"></td>';
		tableRow.appendChild(tableCol);
	}
	ftableBody.appendChild(tableRow); //adding the 3rd row
	//add List

	farmList = GM_getValue("FarmList_" + suffixLocal, "");
	totalTroops = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	if (farmList != "" && farmList != null) {
		farmList = farmList.split(">:)");
		var sIndex = getStartIndex();
		var eIndex = getEndIndex();
		//alert(farmList.length);
		if (farmList.length > 0) {
			for (i = 0; i < farmList.length; i++) {
				if (maximize == 1) {
					tableRow = rp_createFarmRow(i, sIndex, eIndex);
					if (tableRow != null) {
						ftableBody.appendChild(tableRow);
					}
				} else { //the i have to count totalTroops here
					var arr = farmList[i].split("|");
					if (arr[7] == 'true') {
						arr[1] = arr[1].split(",");
						for (var j = 0; j < arr[1].length; j++) {
							totalTroops[j] += parseInt(arr[1][j]);
						}
					}
				}
			}
		}
	} else {
		tableCol = dom.cn("td");
		tableCol.setAttribute("colspan", 15);
		tableCol.innerHTML = "<div style='margin: auto;'>" + T('NO_FARM_YET')
				+ "</div>";
		ftableBody.appendChild(tableCol);
	}
	//bottom row
	tableRow = dom.cn("tr");
	tableRow.className = "cbg1";
	tableCol = dom.cn("td");
	tableCol.setAttribute("colspan", 5);
	//Optimize button
	img = dom.cn("img");
	img.src = image['OPTIMIZE'];
	img.title = T('OPTIMIZE_M');
	img.style.height = '18px';
	img.style.width = '18px';
	img.style.cursor = "pointer";
	Button = dom.cn("div");
	Button.setAttribute("style", "width:18px;float:left;");
	Button.appendChild(img);
	Button.addEventListener('click', function() {
				optimizeFarmsByDistance();
			}, 0);
	tableCol.appendChild(Button);
	//add space
	Button = dom.cn("div");
	Button.innerHTML = "&nbsp;";
	Button.setAttribute("style", "width:5px;float:left;");
	tableCol.appendChild(Button);
	//Import/Export Button
	img = dom.cn("img");
	img.src = image['IM_EXPORT'];
	img.title = T('LOCAL_IM_EX_M');
	img.style.height = '18px';
	img.style.width = '18px';
	img.style.cursor = "pointer";
	Button = dom.cn("div");
	Button.setAttribute("style", "width:18px;float:left;");
	Button.appendChild(img);
	Button.addEventListener('click', function() {
				importExport();
			}, 0);
	tableCol.appendChild(Button);
	//add space
	Button = dom.cn("div");
	Button.innerHTML = "&nbsp;";
	Button.setAttribute("style", "width:5px;float:left;");
	tableCol.appendChild(Button);
	//globalImportExport
	img = dom.cn("img");
	img.src = image['GIM_EXPORT'];
	img.title = T('GLOBAL_IM_EX_M');
	img.style.height = '18px';
	img.style.width = '18px';
	img.style.cursor = "pointer";
	Button = dom.cn("div");
	Button.setAttribute("style", "width:18px;float:left;");
	Button.appendChild(img);
	Button.addEventListener('click', function() {
				globalImportExport();
			}, 0);
	tableCol.appendChild(Button);
	//append the row in the table
	tableRow.appendChild(tableCol);

	for (i = 0; i < 10; i++) {
		tableCol = dom.cn("td");
		tableCol.innerHTML = totalTroops[i];
		tableRow.appendChild(tableCol);
	}
	ftableBody.appendChild(tableRow);
	farmTable.appendChild(ftableBody);

	//Add everything in the page
	var container = dom.get("lmid2");
	//var pNodes = container.getElementsByTagName("p");
	//container.insertBefore(farmTable, pNodes[2]);
	container.appendChild(farmTable);
}
function rp_createFarmRow(index, sIndex, eIndex) {
	var arr = farmList[index].split("|");
	var troops = arr[1], i;
	//alert(troops);
	if (!(troops == null || troops == "")) {
		var tableRow = dom.cn("tr"); //the row
		//GM_log("rp_createFarmRow: Row Create Start");
		if (index % 2 == 1) {
			tableRow.style.backgroundColor = "#F8F8F0";
		}
		if (arr[7] == "false") {

			tableRow.className = "inactive";
		}
		var tableCol = dom.cn("td"); //cell 1
		//create start radio button
		var Button = createInputButton("radio", index);
		Button.name = "StartIndex";
		Button.addEventListener("click", function() {
					rp_setStartIndex(index);
				}, false);
		if (sIndex == index)
			Button.checked = true;
		tableCol.appendChild(Button);
		tableRow.appendChild(tableCol); // add the cell

		tableCol = dom.cn("td"); //cell 2
		//create End radio button
		Button = createInputButton("radio", index);
		Button.name = "EndIndex";
		Button.addEventListener("click", function() {
					rp_setEndIndex(index);
				}, false);
		if (eIndex == index)
			Button.checked = true;
		tableCol.appendChild(Button);
		tableRow.appendChild(tableCol); // add the cell

		var img;
		//create Edit button
		img = dom.cn("img");
		img.src = image['EDIT'];
		img.title = T('EDIT_FARM');
		img.setAttribute("style",
				"height: 14px; width:14px; cursor: 'pointer';");
		Button = dom.cn("div");
		Button.appendChild(img);
		Button.addEventListener('click', createEditFarmCallback(index), 0); //adding clicking event
		tableCol = dom.cn("td");
		tableCol.appendChild(Button);
		tableRow.appendChild(tableCol);

		//create Delete button
		img = dom.cn("img");
		img.src = image['DELETE'];
		img.title = T('DELETE_FARM');
		img.setAttribute("style",
				"height: 14px; width:14px; cursor: 'pointer';");
		Button = dom.cn("div");
		Button.appendChild(img);
		//Button.addEventListener("mouseup", function(this){moveEditFarmBox(this)},0);
		Button.addEventListener('click', createRemoveFarmCallback(index), 0); //adding clicking event
		tableCol = dom.cn("td");
		tableCol.appendChild(Button);
		tableRow.appendChild(tableCol);
		//Farm
		tableCol = dom.cn("td");
		var xy = arr[0].split(",");
		var fvillageId = xy2id(parseInt(xy[0]), parseInt(xy[1]));
		tableCol.innerHTML = "<div style='text-align:left;'>[" + index
				+ "] "
				/*+"<a href='spieler.php?uid="+arr[4]+"'>"+E2C(arr[3])+"</a> "*/
				+ "<a href='/karte.php?d=" + fvillageId + "&c=" + arr[6]
				+ "' title='" + E2C(arr[3]) + " : " + E2C(arr[5]) + "'>("
				+ xy[0] + "|" + xy[1] + ")</a>" + "</div>";
		tableRow.appendChild(tableCol);

		troops += " ";
		troops = troops.split(',');
		//GM_log("rp_createFarmRow: troops Get splited by comma");
		for (i = 0; i <= 9; i++) {
			tableCol = dom.cn("td");
			tableCol.innerHTML = troops[i];
			if (arr[7] == 'true') { //only count active troops
				totalTroops[i] += parseInt(troops[i]);
			}
			tableRow.appendChild(tableCol);
		}
		//GM_log("rp_createFarmRow: Returing the row");
		return tableRow;
	} else {
		if (confirm(index + " " + T('INVALID_FARM'))) {
			farmRemove(index);
		}
		return null;
	}
}
function rp_setStartIndex(index) {
	GM_setValue("StartIndex_" + suffixLocal, index);
}
function rp_setEndIndex(index) {
	GM_setValue("EndIndex_" + suffixLocal, index);
}

function rp_removeEndIndex() {
	GM_setValue("EndIndex_" + suffixLocal, -1);
	reloadFarmTable();
}
function rp_min_max() {
	if (GM_getValue("Maximize_" + suffixGlobal, 0) == 0) {
		GM_setValue("Maximize_" + suffixGlobal, 1);
	} else {
		GM_setValue("Maximize_" + suffixGlobal, 0);
	}
	reloadFarmTable();
}
function isReallyRallyPoint() {
	var rallyPointLinks = dom.xo('//div[@id="lmid2"]/p[@class="txt_menue"]/a');
	if (rallyPointLinks.snapshotLength > 2) {
		if (rallyPointLinks.snapshotItem(0).href.indexOf("/build.php?id=39") < 0
				|| rallyPointLinks.snapshotItem(1).href.indexOf("/a2b.php") < 0
				|| rallyPointLinks.snapshotItem(2).href.indexOf("/warsim.php") < 0) {
			return false;
		}
		// all 3 links above were found
		return true;
	}
	return false;
}
function reloadFarmTable() {
	var oldTable;
	if ((oldTable = dom.get("farmMachineTable")) != null
			|| oldTable != "undefined") {
		//then remove it
		dom.get("lmid2").removeChild(dom.get("farmMachineTable"));
	}
	rp_insertTable();
	GM_log("Farm Table Reload Complete");
}
function distanceSort(a, b) {
	var d1 = a.distance;
	var d2 = b.distance;
	return (d1 < d2) ? -1 : ((d1 > d2) ? 1 : 0); // -1 a,b | 1 b,a | 0 nothing
}
function sortFarms() {
	farmList = GM_getValue("FarmList_" + suffixLocal, "");
	if (farmList == "" || farmList == null)
		return;
	farmList = farmList.split(">:)");
	if (farmList.length == 1)
		return;
	var arr = new Array(), i;
	var xy = getActiveVillageXY(), xyt;
	for (i = 0; i < farmList.length; i++) {
		xyt = farmList[i].split("|")[0].split(",");
		arr[i] = {
			FarmInfo : farmList[i],
			distance : coordDistXYtoXY(xy[0], xy[1], xyt[0], xyt[1])
		};
		//alert(xy[0]+" "+xy[1]+" "+xyt[0]+" "+xyt[1]);
	}
	arr.sort(distanceSort); //sorting
	var newList = "";
	for (i = 0; i < arr.length; i++) {
		if (i)
			newList += ">:)";
		newList += arr[i].FarmInfo;
	}
	GM_setValue("FarmList_" + suffixLocal, newList);
	reloadFarmTable();
}
function optimizeFarmsByDistance() {
	if (confirm(T('OPTIMIZE_SM') + "\n" + T('CONFIRM') + "?")) {
		var selectedvList = GM_getValue("FarmerVillages_" + suffixGlobal, "");
		var i, j, minDis, k;
		if (selectedvList != "" && selectedvList != null) {
			var vList = selectedvList.split(",");
			if (vList.length < 2)
				return;
			for (i = 0; i < vList.length; i++) {
				vList[i] = vList[i].split('~')[0];
			}
			var allFarms = "", vCoords = new Array(), newFarmList = new Array();
			for (i = 0; i < vList.length; i++) {
				var fList = GM_getValue("FarmList_" + suffixGlobal + "_"
								+ vList[i], "");
				if (fList != "" && fList != null) {
					if (allFarms != "")
						allFarms += ">:)";
					allFarms += fList;
				}
				newFarmList[i] = "";
				vCoords[i] = id2xy(vList[i]);
			}
			if (allFarms != "") {
				allFarms = allFarms.split(">:)");
				for (i = 0; i < allFarms.length; i++) {
					minDis = 5000000.0;
					k = -1;
					var xy = allFarms[i].split("|")[0].split(",");
					for (j = 0; j < vList.length; j++) {
						var dis = coordDistXYtoXY(vCoords[j].x, vCoords[j].y,
								xy[0], xy[1]);
						if (dis < minDis) {
							minDis = dis;
							k = j;
						}
					}
					if (k != -1) {
						if (newFarmList[k] != "") {
							newFarmList[k] += ">:)";
						}
						newFarmList[k] += allFarms[i];
					}
				}
				for (i = 0; i < vList.length; i++) {
					GM_setValue("FarmList_" + suffixGlobal + "_" + vList[i],
							newFarmList[i]);
				}
			}
		}
		reloadFarmTable();
		alert(T('OPTIMIZE_DONE'));
	}
}

function importExport() {
	var farmData = GM_getValue("FarmList_" + suffixLocal, ""), val;
	val = prompt(T('LOCAL_IM_EX_PROMPT'), farmData);
	if (val != null) {
		val = trim(val);
		GM_setValue("FarmList_" + suffixLocal, val);
		reloadFarmTable();
	}
}
function globalImportExport() {
	var allVillageId = getAllVillageId();
	allVillageId = allVillageId.split(",");
	var allData = "", i, j, farmData;
	for (i = 0; i < allVillageId.length; i++) {
		farmData = GM_getValue("FarmList_" + suffixGlobal + "_"
						+ allVillageId[i], "");
		farmData = trim(farmData);
		if (allData != "")
			allData += "//";
		allData += allVillageId[i] + ":>" + farmData;
	}
	var val = prompt(T('GLOBAL_IM_EX_PROMPT'), allData);
	if (val != null) {
		val = trim(val).split("//");
		for (i = 0; i < val.length; i++) {
			farmData = val[i].split(":>");
			farmData[0] = trim(farmData[0]);
			if (farmData.length == 1)
				farmData.push("");
			for (j = 0; j < allVillageId.length; j++) {
				if (farmData[0] == allVillageId[j]) {
					break;
				}
			}
			if (j < allVillageId.length) {
				//alert(allVillageId[j]+" Data:"+farmData[1]);
				GM_setValue("FarmList_" + suffixGlobal + "_" + allVillageId[j],
						farmData[1]);
			}
		}
		reloadFarmTable();
	}
}
function foundNewFarm() {
	GM_log("In a Village Profile Page");
	/*
	addButton.addEventListener('click',function(){
	    showHoverPopup()
	},true);
	 */
	insertEditFarmBox();
	var tribe = getFPlayerTribe();

	if (tribe == "gauls") {
		dom.get("radio3").checked = true; //default attack for gauls
	} else {
		dom.get("radio4").checked = true; //default raid for other
	}
	dom.get('FMsaveButton').addEventListener('click', addNewFarm, true);
	var tbody = dom.xs("//div[@class='map_details_actions']/table/tbody");
	if (tbody == null || tbody == "")
		return;
	var addOption = createLinkButton('\u00BB' + " " + T("Add_To") + " "
					+ T('SCRIPT_NAME'), T("Add_As"), showPopupFarmEditBox);
	var row = dom.cn('tr');
	var cell = dom.cn('td');
	cell.appendChild(addOption);
	row.appendChild(cell);
	tbody.appendChild(row);

}
function insertEditFarmBox() {
	var i;
	div = document.createElement('div');
	div.id = "popupFarmEditBox";
	div.style.visibility = 'hidden';
	div.style.zIndex = 100;
	div.style.position = 'absolute';
	div.style.borderWidth = '1px';
	div.style.top = '600px'
	div.style.left = '150px'
	var text = "<fieldset style='background-color: #c2d9ec; border: 1px solid #C0C0C0; -moz-border-radius: 10px;'>"
			+ "<legend style='background-color: #c2d9ec; border-top: 1px solid #C0C0C0; -moz-border-radius: 2px;'>Add/Edit Farm</legend>"
			+ "<img src='/img/un/u/"
			+ user_race
			+ ".gif'>:<input type='text' size='1' value='0' id='t1'>";
	for (i = 1; i < 10; i++) {
		text += "<img src='/img/un/u/" + (user_race + i)
				+ ".gif'>:<input type='text' size='1' value='0' id='t"
				+ (i + 1) + "'>";
	}
	text += "<br/>"
			+ "<input type='radio' id='radio2' name='AttackType' value='2' />"
			+ T("Reinforce")
			+ "<input type='radio' id='radio3' name='AttackType' value='3' />"
			+ T("Attack")
			+ "<input type='radio' id='radio4' name='AttackType' checked='true' value='4' />"
			+ T("Raid")
			+ "<br />"
			+ "<input type='checkbox' checked='true' id='activeCheck' />"
			+ T("Active_Farm")
			+ "<br />"
			+ "<input style='float: right;' id='FMcancelButton' type='submit' value="
			+ T('Cancel')
			+ " />"
			+ "<input style='float: right;' id='FMsaveButton' type='submit' value="
			+ T('Save') + " /></fieldset>";

	div.innerHTML = text;
	document.body.appendChild(div);
	dom.get('FMcancelButton').addEventListener('click', hidePopupFarmEditBox,
			true);
	GM_log("FarmEditBox Inserton done");
	//Add the event listener for Save button in appropiate place :)
}

function showPopupFarmEditBox() {
	var farmEditBox = null;
	if ((farmEditBox = document.getElementById('popupFarmEditBox')) == null
			|| farmEditBox == "undefined") {
		return;
	}
	farmEditBox.style.visibility = "visible";
}

function hidePopupFarmEditBox() {
	var farmEditBox = null;
	if ((farmEditBox = document.getElementById('popupFarmEditBox')) == null
			|| farmEditBox == "undefined") {
		return;
	}
	farmEditBox.style.visibility = "hidden";
}
// 0 |     1     |   2   |   3     |    4    |     5      |  6    |    7     |    8     >:)
//x,y|t,r,o,o,p,s|Tribe|FPlayerName|FPlayerId|FVillageName|C_value|activeBool|attackType>:)
function addNewFarm() {
	GM_log("addNewFarm: Going to add a new farm");
	var formDiv = dom.get("popupFarmEditBox");
	var inputTag = formDiv.getElementsByTagName("input");
	var troopConfig = "", attackType, activeBool, i;
	for (i = 0; i < inputTag.length; i++) {
		if (i < 10) {
			if (i)
				troopConfig += ",";
			if (inputTag[i].value == "" || inputTag[i].value == null)
				inputTag[i].value = 0;
			troopConfig += parseInt(inputTag[i].value);
		} else {
			if (inputTag[i].getAttribute("type") == "radio"
					&& inputTag[i].checked) {
				attackType = inputTag[i].value;
			} else if (inputTag[i].getAttribute("type") == "checkbox") {
				activeBool = inputTag[i].checked;
			}
		}
	}
	//alert(troopConfig+"|"+attackType+"|"+activeBool);
	var coords = getFVillageCoords();
	var tribe = getFPlayerTribe();
	var fPlayerName = getFPlayerName();
	var fPlayerId = getFPlayerId();
	var fVillageName = getFVillageName();
	var cValue = getCvalue();
	if (window.confirm(T('ADD_FARM') + ": " + fVillageName + " (" + coords
			+ ")" + "\n" + T('TROOP_CONFIG') + ": \"" + troopConfig + "\"\n"
			+ T('CONFIRM') + "?")) {
		addList(coords + "|" + troopConfig + "|" + C2E(tribe) + "|"
				+ C2E(fPlayerName) + "|" + C2E(fPlayerId) + "|"
				+ C2E(fVillageName) + "|" + cValue + "|" + activeBool + "|"
				+ attackType);
		//alert("New Farm Added: "+fVillageName+"("+coords+") :)");
		hidePopupFarmEditBox();
	}
	GM_log("New Farm Add done");
}

function addList(dataStr) {
	var oldList = GM_getValue("FarmList_" + suffixLocal, "") + " ";
	oldList = trim(oldList);
	if (oldList != "") {
		oldList += ">:)";//evil face
	}
	oldList += dataStr; //now it is actually new list ;)
	GM_setValue("FarmList_" + suffixLocal, oldList);

}

function readList() {
	var doel = GM_getValue("FarmList_" + suffixLocal, "");
	alert(doel);
	return doel;
}
function getNumber(tekst) {

	//alert(tekst.indexOf("'")+1+"      "+tekst.lastIndexOf("'"));
	if ((tekst.indexOf("=") + 1) == 0 && tekst.lastIndexOf(";") == -1) {
		return 0;
	} else {
		return tekst.substring(tekst.indexOf("=") + 1, tekst.indexOf(";"));
	}
}

/* Return value will be in between minimum and maximum
 * Warning! minimum should be less than maximum :p
 */
function Random(minimum, maximum) {
	if (minimum == null || maximum == null) {
		minimum = minWait;
		maximum = maxWait;
	}
	/*var rand=Math.round(Math.random()*maximum);
	rand = rand<minimum ? minimum : rand;
	rand = rand>maximum ? maximum : rand;
	return rand;*/
	var range = maximum - minimum + 1;
	return (Math.floor(Math.random() * Math.pow(10, ("" + range).length)) % range)
			+ parseInt(minimum);

}

function changeVillage() {
	var vList = GM_getValue("FarmerVillages_" + suffixGlobal);
	var newList = new Array();
	var i, pause, messageStr = "";
	if (vList != null && vList != "") {
		vList = vList.split(",");
		if (vList.length > 0) {
			var activeVId = getActiveVillageId();
			for (i = 0; i < vList.length; i++) {
				var ids = vList[i].split('~')[0];
				if (GM_getValue("DoneHere_" + suffixGlobal + "_" + ids, 0) == 0
						&& ids != activeVId) {
					newList.push(vList[i]); //only taking villages which is not current village and also not done
				}
			}
		}
	}

	var random = GM_getValue("RandomFarming_" + suffixGlobal, 0);
	if (newList.length == 0) { //Village Change is not possible, Engine is pause for X sec		
		pause = Random(minWait, 2 * maxWait);
		messageStr = T('NO_VILLAGE') + " " + T('WAITING') + " <b>~"
				+ Math.floor(pause / 1000) + "</b> " + T('SEC') + " "
		setTextMessage("", messageStr);
		if(random==1){
			toNextIndex(getStartIndex());
		}
		setTimeout("window.location.replace('" + rootPath + "a2b.php')", pause);
	} else {
		//In case of random iteration we come up to this point because sIndex was bigger then farmList length
		//before we leave this village we have to ensure that when we came back to this village we got the sIndex is in between farmlist length
		var sIndex = 0;
		if (random == 1 && farmList != null && farmList.length > 0) {
			sIndex = Random(0, farmList.length - 1);
			GM_setValue("StartIndex_" + suffixLocal, sIndex); //by force set it inside
		}
		//select a village randomly from the active villages
		i = Random(0, newList.length - 1);
		newList[i] = newList[i].split('~');
		var coord = id2xy(newList[i][0]);
		pause = Random(minWait, 2 * maxWait);
		messageStr = T('SWITCH_V') + ": (" + coord.x + "|" + coord.y + "), "
				+ T("after") + " " + Math.floor(pause / 1000) + " " + T("sec");
		setTextMessage("", messageStr);
		setTimeout("window.location.replace('" + rootPath + "a2b.php?newdid="
						+ newList[i][1] + "')", pause);
	}
}
function createEditFarmCallback(itemToEdit) {
	return function(event) {
		editFarm(itemToEdit, event);
	}
}

// 0 |     1     |   2   |   3     |    4    |     5      |  6    |    7     |    8     >:)
//x,y|t,r,o,o,p,s|Tribe|FPlayerName|FPlayerId|FVillageName|C_value|activeBool|attackType>:)
function editFarm(itemToEdit, event) {
	farmList = GM_getValue("FarmList_" + suffixLocal, "");
	var i;
	hidePopupFarmEditBox();
	if (farmList != "" && farmList != null) {
		farmList = farmList.split(">:)");
		if (itemToEdit < farmList.length) {
			//initialize the form with old values;
			var farmEditBox = dom.get("popupFarmEditBox");
			var arr = farmList[itemToEdit].split("|");
			var troopsConfig = arr[1].split(",");
			var inputTag = farmEditBox.getElementsByTagName("input");
			for (i = 0; i < inputTag.length; i++) {
				if (i < 10) {
					inputTag[i].value = troopsConfig[i];
				} else {
					if (inputTag[i].getAttribute("type") == "radio") {
						if (parseInt(inputTag[i].value) == parseInt(arr[8])) {
							inputTag[i].checked = true;
						} else {
							inputTag[i].checked = false;
						}
					}
					if (inputTag[i].getAttribute("type") == "checkbox") {
						if (arr[7] == "true") {
							inputTag[i].checked = true;
						} else {
							inputTag[i].checked = false;
						}
					}
				}
			}
			GM_log("editFarm: Form Initialization complete " + farmList.length);
			//get the globalInt so if the save button get clicked saveEditedFarm function will use it
			globalInt = itemToEdit;
			//changing position
			farmEditBox.style.top = event.pageY + "px";
			farmEditBox.style.left = (event.pageX + 20) + "px";
			showPopupFarmEditBox(); //Now show the box
		}
	}
}
// 0 |     1     |   2   |   3     |    4    |     5      |  6    |    7     |    8     >:)
//x,y|t,r,o,o,p,s|Tribe|FPlayerName|FPlayerId|FVillageName|C_value|activeBool|attackType>:)
function saveEditedFarm() {
	var itemToEdit = globalInt;
	var newList = "", i, j;
	hidePopupFarmEditBox();
	if (farmList.length == 0 || farmList == null || itemToEdit < 0
			|| itemToEdit >= farmList.length) {
		GM_log("saveEditedFarm: illegal call of this function");
		return;
	}
	GM_log("SaveEditedFarm: Going to save the edited farm " + farmList.length);
	for (i = 0; i < farmList.length; i++) {
		if (newList != "") {
			newList += ">:)";
		}
		if (i == itemToEdit) {
			var formDiv = dom.get("popupFarmEditBox");
			var inputTag = formDiv.getElementsByTagName("input");
			var troopConfig = "", attackType, activeBool;
			for (j = 0; j < inputTag.length; j++) {
				if (j < 10) {
					if (j)
						troopConfig += ",";
					if (inputTag[j].value == "" || inputTag[j].value == "NaN"
							|| inputTag[j].value == null)
						inputTag[j].value = 0;
					troopConfig += parseInt(inputTag[j].value);
				} else {
					if (inputTag[j].getAttribute("type") == "radio"
							&& inputTag[j].checked) {
						attackType = inputTag[j].value;
					} else if (inputTag[j].getAttribute("type") == "checkbox") {
						activeBool = inputTag[j].checked;
					}
				}
			}
			var arr = farmList[i].split("|");
			newList += arr[0] + "|" + troopConfig + "|" + C2E(arr[2]) + "|"
					+ C2E(arr[3]) + "|" + C2E(arr[4]) + "|" + C2E(arr[5]) + "|"
					+ arr[6] + "|" + activeBool + "|" + attackType;
		} else {
			newList += farmList[i];
		}
	}
	GM_setValue("FarmList_" + suffixLocal, newList);
	GM_log("SaveEditedFarm: Edit Farm Save Complete");
	reloadFarmTable();
}

function createRemoveFarmCallback(sequence) {
	return function() {
		farmRemove(sequence);
	}
}
//Remove a farm from the list
function farmRemove(itemToRemove) {
	//alert(itemToRemove);
	var sIndex = getStartIndex();
	var eIndex = getEndIndex();
	var fullList = GM_getValue("FarmList_" + suffixLocal);
	var farms = new Array;
	farms = fullList.split(">:)");

	var newFarmList = '', flag = false, i;
	if (itemToRemove < farms.length) {
		var arr = farms[itemToRemove].split("|");
		if (confirm(T('REMOVEING') + ": " + E2C(arr[5]) + "(" + arr[0] + ")")) {
			for (i = 0; i < farms.length; i++) {
				if (i != itemToRemove) {
					if (flag) {
						newFarmList += ">:)";
					}
					newFarmList += farms[i];
					flag = true;
				}
			}
			//alert(newFarmList);
			if (itemToRemove <= sIndex) {
				GM_setValue("StartIndex_" + suffixLocal, (sIndex - 1) >= 0
								? (sIndex - 1)
								: 0);
			}
			if (itemToRemove <= eIndex) {
				GM_setValue("EndIndex_" + suffixLocal, (eIndex - 1) >= 0
								? (eIndex - 1)
								: 0);
			}
			GM_setValue("FarmList_" + suffixLocal, newFarmList);

			//reload the farm table
			reloadFarmTable();
		}
	} else {
		alert('???Not a farm for remove');
	}
}

function startEngine() {
	farmList = new Array();
	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");
	if (vList == "" || vList == null) {
		//no farmer village! so set the current village a farmer, important for single village account
		GM_setValue("FarmerVillages_" + suffixGlobal, getActiveVillageId()
						+ "~-1"); //no newdid
		vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");
	}
	//reset DoneHere for all selected village
	var arr = vList.split(","), i;
	for (i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split("~");
		GM_setValue("DoneHere_" + suffixGlobal + "_" + arr[i][0], 0);
	}
	GM_setValue("Active_" + suffixGlobal, 0);
	GM_addStyle("body { color:blue; }");
	window.location.replace(rootPath + "a2b.php");
}
function stopEngine() {
	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "").split(",");
	if (vList.length == 1 && vList[0].split("~")[1] == -1) { //for single village account
		GM_setValue("FarmerVillages_" + suffixGlobal, "");
	}
	GM_setValue("Active_" + suffixGlobal, -1);
	GM_addStyle("body { color:black; }");
	window.location.replace("build.php?id=39");
}

/**update the script (by Richard Gibson)- modified version*/
function updateFM(SCRIPT) {
	var loadImg = dom.cn("img");
	loadImg.src = image['LOADING'];
	var updater = dom.get("updater");
	updater.appendChild(loadImg);
	try {
		/*if (!GM_getValue)
		    return;*/
		GM_xmlhttpRequest({
			method : 'GET',
			url : SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
			onload : function(result) {
				updater.removeChild(loadImg);
				if (result.status != 200) {
					alert(T("UPDATE_M1"));
					return;
				}
				if (!result.responseText.match(/@version\s+([\d.]+)/)) {
					alert(T('UPDATE_UNKNOWN') + " v" + RegExp.$1);
					return;
				}

				var onlineVersion = RegExp.$1;
				var currentVersion = SCRIPT.version;
				if (onlineVersion == SCRIPT.version) {
					alert(T('UPDATE_LAST') + " " + T("Script_name") + ' (v'
							+ onlineVersion + ')');
					return;
				} else {
					currentVersion = currentVersion.split(".");
					var onlineArray = onlineVersion.split(".");
					if (currentVersion[0] <= onlineArray[0]
							|| currentVersion[1] <= onlineArray[1]
							|| currentVersion[2] <= onlineArray[2]) {
						var messageStr = "";
						if (onlineArray[2] != 0) {
							messageStr = T('UPDATE_BETA');
						} else {
							messageStr = T('UPDATE_NEW') + " v" + onlineVersion;
						}
						if (confirm(messageStr + "\n\n" + T('CONFIRM') + ":"
								+ T('UPDATE_NOW') + "?")) {
							window.location.href = SCRIPT.url;
							GM_setValue("Tribe_" + suffixGlobal, -1);
						}
					}
				}
			}
		});
	} catch (ex) {
		alert("AJAX request Exception! Try later.");
	}
}
function getPlayerTribe() {
	var troopImage = dom.xs("//img[contains(@src,'1.gif')][@class='unit']");
	var tribe = 0; //roman
	if (troopImage != null) {
		troopImage = troopImage.src;
		if (troopImage.match("/1.gif")) {
			tribe = 0;
		} else if (troopImage.match("/11.gif")) {
			tribe = 1;
		} else if (troopImage.match("/21.gif")) {
			tribe = 2;
		}
	}
	return tribe;
}
//retrieve Farm player's name
function getFPlayerName() {
	var user = dom
			.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "spieler.php?uid=")]');
	var playerName = (user) ? user.innerHTML.replace(/\<\/?b>/gi, '') : '';
	playerName = trim(playerName);
	return playerName;
}

//retrieve Farm player's ID
function getFPlayerId() {
	var user = dom
			.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "spieler.php?uid=")]');
	var playerId = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return playerId;
}

//retrieve Farm player's tribe
function getFPlayerTribe() {
	var mapDetailsRight = dom
			.xs('//div[@id="lmid2"]/div[@class="map_details_right"]');
	var playerTribe = "";
	if (mapDetailsRight.id == "pr") { //abandoned area/empty oasis
		playerTribe = '';
	} else {
		playerTribe = dom
				.xs('//div[@id="lmid2"]/div[@class="map_details_right"]/table/tbody/tr/td[3]/b').textContent;
	}
	playerTribe = trim(playerTribe.toLowerCase());
	return playerTribe;
}

//retrieve village c value
function getCvalue() {
	var url = document.location.href;
	var cValue = getParamFromUrl(url, 'c');
	return cValue;
}

//retrieve coordinates
function getFVillageCoords() {
	var mapDetailsRight = dom
			.xs('//div[@id="lmid2"]/div[@class="map_details_right"]');
	var title, coordsObject;
	if (mapDetailsRight.id == "pr") {
		//abandoned area/empty oasis
		title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
	} else {
		//normal village or occupied oasis

		coordsObject = dom.xo('//div[@id="lmid2"]//div[@class="ddb"]');
		if (coordsObject.snapshotLength > 0) {
			//normal village
			title = coordsObject.snapshotItem(1).textContent;
		} else {
			//occupied oasis
			title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
		}
	}
	title = title.replace(/^[\s(&nbsp;)]+/g, '').replace(/[\s(&nbsp;)]+$/g, '');
	var coords = title.substring(title.lastIndexOf('('));
	coords = coords.replace(/[\(\)]/g, '').split('|').join(',');
	return coords; //comma sperated
}

//retrieve Farm Village name
function getFVillageName() {
	var mapDetailsRight = dom
			.xs('//div[@id="lmid2"]/div[@class="map_details_right"]');
	var title, villageName;
	if (mapDetailsRight.id == "pr") {
		//abandoned area/empty oasis
		title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
		villageName = title.substring(0, title.lastIndexOf('(')).replace(
				/^\s+|\s+$/g, '');
	} else {
		//normal village or occupied oasis
		var villageNameObject = dom.xo('//div[@id="lmid2"]//div[@class="ddb"]');
		if (villageNameObject.snapshotLength > 0) {
			//normal village
			villageName = villageNameObject.snapshotItem(0).textContent;
		} else {
			//occupied oasis
			title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
			villageName = title.substring(0, title.lastIndexOf('(')).replace(
					/^\s+|\s+$/g, '');
		}
	}
	villageName = trim(villageName);
	return villageName;
}

function getPlayerId() {
	var user = dom
			.xs('//*[@id="navi_table"]/tbody/tr/td[@class="menu"]/a[starts-with(@href, "spieler.php?uid=")]');
	var playerID = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return playerID;
}
function getActiveVillageId() {
	var xy = getActiveVillageXY();
	//alert(xy[0]+" "+xy[1]);
	return xy2id(xy[0], xy[1]);
}
function getAllVillageId() {
	var cities = dom.find("//div[@id='lright1']//table[@class='f10']/tbody",
			XPFirst);
	if (!cities) {
		return getActiveVillageId();
	} else {
		var idList = "", i;
		//alert(cities.childNodes.length);
		for (i = 0; i < cities.childNodes.length; i++) {
			var city = cities.childNodes[i];
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			var X = RegExp.$1;
			var Y = RegExp.$2;
			if (i > 0)
				idList += ",";
			idList += xy2id(X, Y);
		}
		return idList;
	}
}
function getActiveVillageXY() {
	var xy = new Array();
	var villageNode = dom.find("//a[@class='active_vl']", XPFirst);
	if (villageNode != null) {
		villageNode.parentNode.nextSibling.textContent
				.match(/\(([-\d]+)\n\|\n([-\d]+)\)/);
		xy.push(RegExp.$1);
		xy.push(RegExp.$2);
	} else {
		xy.push("");
		xy.push("");
	}
	//alert(villageNode);
	if (xy[0] == "" || xy[1] == "") {
		//single Village
		var singleVillageXY = GM_getValue('SingleVillageXY_' + suffixGlobal, '');
		if (!singleVillageXY || singleVillageXY == '') {
			//grab coordinates for the first time
			xy = getSingleVillageXY();
		} else {
			xy = singleVillageXY.split(",");
		}
	}
	//alert("2nd: "+xy[0]+" "+xy[1]);
	return xy;
}

//retrieve coordinates for single village account
function getSingleVillageXY() {
	var url = document.URL;
	url = url.substring(0, url.lastIndexOf('/') + 1);
	url = url + 'karte.php';
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		onload : function(responseDetails) {
			if (responseDetails.status != 200)
				return new Array(0, 0);
			var div = dom.cn('div', responseDetails.responseText);
			var ansDoc = document.implementation.createDocument('', '', null);
			ansDoc.appendChild(div);
			var x = ansDoc.getElementById('x').firstChild.nodeValue;
			var y = ansDoc.getElementById('y').firstChild.nodeValue;
			var singleVillageCoords = x + ',' + y;
			GM_setValue('SingleVillageXY_' + suffixGlobal, singleVillageCoords);
			return new Array(x, y);
		}
	});
}
function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}
function id2xy(id) {
	var x = (id % 801) - 401;
	var y = 400 - (id - 401 - x) / 801;
	return {
		x : x,
		y : y
	};
}
function regxRemoveAll(str, regx, newVal) {
	if (newVal == null)
		newVal = "";
	while (regx.test(str)) {
		str = str.replace(regx, newVal);
	}
	return str;
}
/*Travian Village Manager*/
//calculate globe distance
function globeDistance(a, b) {
	var dist1 = (a > b) ? Math.abs(a - b) : Math.abs(b - a);
	var dist2 = (a > b) ? (Math.abs(400 - a) + Math.abs(-400 - b)) : (Math
			.abs(400 - b) + Math.abs(-400 - a));
	var distFinal = (dist1 < dist2) ? dist1 : dist2;
	return distFinal;
}

//calculate distance between two villages
function coordDistXYtoXY(x1, y1, x2, y2) {
	var distX = globeDistance(x1, x2);
	var distY = globeDistance(y1, y2);
	var dist = Math.sqrt((distX * distX) + (distY * distY));
	return dist;
}
// from QP of http://userscripts.org/
/**
 * getParamFromUrl
 * @param {String} url The string of the URL
 * @param {String} urlParam The param being searched in the URL
 */
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#"))
				? res.indexOf("&")
				: res.indexOf("#");
		if (endPos != -1) {
			res = res.substring(0, endPos);
		}
		return res;
	} else {
		return null;
	}
}

function trim(str, chars) {
	return trimL(trimR(str, chars), chars);
}
function trimL(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
function trimR(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
//encode characters to HTML safe code (by Alberto Biamino)
function C2E(str) {
	str = str.replace(/&/g, '&#38;');
	str = str.replace(/'/g, '&#39;');
	str = str.replace(/"/g, '&#34;');
	str = str.replace(/\\/g, '&#92;');
	var acc = '';
	for (var i = 0; i < str.length; i++) {
		if ((str.charCodeAt(i) > 31 && str.charCodeAt(i) < 127)
				&& str.charAt(i) != '|')
			acc += str.charAt(i)
		else
			acc += '&#' + str.charCodeAt(i) + ';';
	}
	return acc;
}

//decode HTML safe code to characters (by Alberto Biamino)
function E2C(str) {
	/*str = str.split(";");
	for(var i=0; i<str.length; i++){
		if(str[i].charAt(0)=='&' && str[i].charAt[1]=='#'){
			str[i] = str[i].replace(/&#([0-9]+);/g, '$1');
			str[i] = String.fromCharCode(str[i]);
		}
	}
	return str.join('');*/
	str = str.replace(/(&#[0-9]+;)/g, '\n$1\n');
	str = str.replace(/\n\n/g, '\n');
	spl = str.split('\n');
	for (var i = 0; i < spl.length; i++) {
		if (spl[i].charAt(0) == '&') {
			spl[i] = spl[i].replace(/&#([0-9]+);/g, '$1');
			spl[i] = String.fromCharCode(spl[i]);
		}
	}
	str = spl.join('');
	return str;
}
function getStartIndex() {
	var sIndex = GM_getValue("StartIndex_" + suffixLocal, 0);
	return sIndex;
}
function getEndIndex() {
	var eIndex = GM_getValue("EndIndex_" + suffixLocal, 0);
	return eIndex;
}
/************************* from FranMod *****************************/
function DOMUtils(doc, ctxt, html) {
	this.cn = function(tag, html) {
		var elem = this.document.createElement(tag);
		if (html)
			elem.innerHTML = html;
		return elem;
	}

	this.ct = function(text) {
		return this.document.createTextNode(text);
	}

	this.id = function(id) {
		return this.document.getElementById(id);
	}

	this.tag = function(tag) {
		return this.document.getElementsByTagName(tag);
	}

	this.xs = function(xpath) {
		var res = this.document.evaluate(xpath, this.context, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}

	this.xa = function(xpath) {
		var arr = [];
		var xpr = this.document.evaluate(xpath, this.context, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0 ? null : arr;
	}

	this.xo = function(xpath) {
		var ret = this.document.evaluate(xpath, this.context, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return ret; //no snapshot
	}
	this.find = function(xpath, xpres, doc) {
		if (!doc)
			doc = document;
		else if (typeof doc == 'string')
			doc = cn('div', doc);
		var ret = document.evaluate(xpath, doc, null, xpres, null);

		return xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	this.get = function(id, doc) {
		if (!doc)
			doc = document;
		return doc.getElementById(id);
	}
	if (!doc)
		doc = document;
	if (!ctxt)
		ctxt = doc;
	if (html) {
		this.document = doc.implementation.createDocument('', '', null);
		this.context = doc.createElement('div');
		this.context.innerHTML = html;
		ansDoc.appendChild(this.context);
	} else {
		this.document = doc;
		this.context = ctxt;
	}
}

/************************** end FranMod *****************************/
function setLanguage() {
	var ext = server.substring(server.lastIndexOf('.') + 1);
	//default English
	lang = {
		'UPDATE_M' : "Update",
		'UPDATE_M1' : "UserScripts.org not found.",
		'UPDATE_UNKNOWN' : "Version Number does not matched :",
		'UPDATE_LAST' : "You are using latest",
		'UPDATE_BETA' : "A New but BETA version is available",
		'UPDATE_NEW' : "A NEW Version is available",
		'UPDATE_NOW' : "You want to update now",
		'CONFIRM' : "Are you sure",
		'REMOVEING' : "Removing",
		'SWITCH_V' : "Switching to village at",
		'AFTER' : "after",
		'SEC' : "second",
		'NO_VILLAGE' : "No other village to go!",
		'WAITING' : "Waiting",
		'BEFORE_RE' : "before recheck.",
		'ADD_FARM' : "You are going to add farm",
		'TROOP_CONFIG' : "Troop Configuration is",
		'ATTACK' : "Attack",
		'REINFORCE' : "Reinforce",
		'RAID' : "Raid",
		'ACTIVE_FARM' : "Active Farm",
		'CANCEL' : "Cancel",
		'SAVE' : "Save",
		'ADD_TO' : "Add to",
		'ADD_AS' : "Add as a farm",
		'GLOBAL_IM_EX_PROMPT' : "Copy All Village Data Or Paste Data from backup",
		'GLOBAL_IM_EX_M' : "Import or Export raw farm data For all village",
		'LOCAL_IM_EX_PROMPT' : "Copy the Data / Paste new Data",
		'LOCAL_IM_EX_M' : "Import or Export farm data of this village",
		'OPTIMIZE_DONE' : "Successfully done distance optimization",
		'OPTIMIZE_M' : "Optimize farms in selected villages based on distance.",
		'OPTIMIZE_SM' : "Going to Optimize All Farms In Selected Villages By their Distance",
		'INVALID_FARM' : "Farm's Troops setting is invalid! Remove it?",
		'DELETE_FARM' : "Delete this farm.",
		'EDIT_FARM' : "Edit this farm",
		'NO_FARM_YET' : "Set any village as your farm from Village Profile Page",
		'FARM' : "Farm",
		'SORT_FARM' : "Sort Farms By Distance form current village",
		'DELETE_M' : "Click the X icon to delete a farm",
		'EDIT_M' : "Click On the Edit Icon to edit a farm",
		'END_M' : "Select End Position from this column, Click here to remove EndIndex",
		'START_M' : "Select Start Position from this column",
		'START_FARMING' : "Start Farming from selected Villages",
		'MINIMIZE' : "Minimize",
		'MAXIMIZE' : "Maximize",
		'FARM_INACTIVE' : "Farm Set as Inactive",
		'ERROR' : "Error",
		'NOT_ENOUGH' : "Not Enough troops for the raid at",
		'AVAILABLE' : "Available",
		'NEEDED' : "Needed",
		'TROOPS_GONE' : "Troops On the Way to",
		'NEXT_FARM' : "Selecting Next Farm",
		'SUCCESS_COUNT' : "Total Successful sent count",
		'HALT_FARMING' : "Halt Farming",
		'MACHINE_RUNNING' : "Farming Machine Running",
		'CHANGE_VILLAGE' : "Trying to change current Village",
		'NO_FARM' : "No Farm Available",
		'NOT_FARMER' : "This is not a Farmer Village",
		'USED_TROOPS' : "Used Troops",
		'GOING_TO' : "Going to",
		'INSTALL_M1' : "Add New Farms from Village Profile Page",
		'INSTALL_M2' : "Happy Farming",
		'TRIBE_SELECT1' : "Your Tribe",
		'TRIBE_SELECT2' : "Please enter a correct Number for your Tribe type.",
		'TRIBE_SELECT3' : "You couldn't set your correct tribe, Setting Roman as default.",
		'ROMAN' : "Roman",
		'TEUTON' : "Teuton",
		'GAUL' : "Gual"
	};
	//for other language
	if (ext == "cz") { //Language:Czech, Translator : Rypi
		lang = {
			'UPDATE_M' : "Aktualizovat",
			'UPDATE_M1' : "UserScripts.org nenalezeno.",
			'UPDATE_UNKNOWN' : "Verze se neshodujÃ­ :",
			'UPDATE_LAST' : "PouÅ¾Ã­vÃ¡Å¡ poslednÃ­ verzi",
			'UPDATE_BETA' : "Je dostupnÃ¡ novÃ¡ BETA verze",
			'UPDATE_NEW' : "Je dostupnÃ¡ novÃ¡ verze",
			'UPDATE_NOW' : "ChceÅ¡ aktualizovat teÄ",
			'CONFIRM' : "Jsi si jistÃ½",
			'REMOVEING' : "OdebÃ­rÃ¡nÃ­",
			'SWITCH_V' : "PÅ™epÃ­nÃ¡m vesnici na",
			'AFTER' : "za",
			'SEC' : "sekund",
			'NO_VILLAGE' : "Å½Ã¡dnÃ¡ dalÅ¡Ã­ vesnice!",
			'WAITING' : "ÄŒekÃ¡m",
			'BEFORE_RE' : "pÅ™ed kontrolou.",
			'ADD_FARM' : "PÅ™idÃ¡vÃ¡Å¡ farmu",
			'TROOP_CONFIG' : "Konfigurace jednotek je",
			'ATTACK' : "Ãštok",
			'REINFORCE' : "Podpora",
			'RAID' : "LoupeÅ¾",
			'ACTIVE_FARM' : "AktivnÃ­ farma",
			'CANCEL' : "Storno",
			'SAVE' : "UloÅ¾it",
			'ADD_TO' : "PÅ™idat do",
			'ADD_AS' : "PÅ™idat jako farmu",
			'GLOBAL_IM_EX_PROMPT' : "KopÃ­rovat / VloÅ¾it data vÅ¡ech vesnic",
			'GLOBAL_IM_EX_M' : "Importovat, Exportovat data vÅ¡ech vesnic",
			'LOCAL_IM_EX_PROMPT' : "KopÃ­rovat / VloÅ¾it data",
			'LOCAL_IM_EX_M' : "Importovat, Exportovat data tÃ©to vesnice",
			'OPTIMIZE_DONE' : "ÃšspÄ›Å¡nÄ› provedena optimalizace vzdÃ¡lenosti",
			'OPTIMIZE_M' : "Optimalizuj farmy ve vybranÃ½ch vesnicÃ­ch podle vzdÃ¡lenosti.",
			'OPTIMIZE_SM' : "Budu optimalizovat vÅ¡echny farmy ve vybranÃ½ch vesnicÃ­ch podle vzdÃ¡lenosti",
			'INVALID_FARM' : "NastavenÃ­ farmy je neplatnÃ©! Odebrat?",
			'DELETE_FARM' : "Smazat farmu",
			'EDIT_FARM' : "Upravit farmu",
			'NO_FARM_YET' : "Nastav si nÄ›jakou farmu (pÅ™ehled cÃ­zÃ­ vesnice po kliknutÃ­ na mapu)",
			'FARM' : "Farma",
			'SORT_FARM' : "SeÅ™adit farmy podle vzdÃ¡lenosti od souÄasnÃ© vesnice",
			'DELETE_M' : "Klikni na X pro smazÃ¡nÃ­ farmy",
			'EDIT_M' : "Klikni na EDIT pro Ãºpravu farmy",
			'END_M' : "Vyber koncovou pozici, klikne zde pro odebrÃ¡nÃ­ konce",
			'START_M' : "Vyber zaÄÃ¡teÄnÃ­ pozici z tohoto sloupce",
			'START_FARMING' : "ZaÄÃ­t farmit od zvolenÃ© vesnice",
			'MINIMIZE' : "Minimalizovat",
			'MAXIMIZE' : "Maximalizovat",
			'FARM_INACTIVE' : "Farma nastavena jako neaktivnÃ­",
			'ERROR' : "Chyba",
			'NOT_ENOUGH' : "MÃ¡lo jednotek pro vyloupenÃ­",
			'AVAILABLE' : "DostupnÃ©",
			'NEEDED' : "PotÅ™eba",
			'TROOPS_GONE' : "Jednotky na cestÄ› do",
			'NEXT_FARM' : "Vyber dalÅ¡Ã­ farmu",
			'SUCCESS_COUNT' : "Celkem ÃºspÄ›Å¡nÄ› poslanÃ½ch loupenÃ­",
			'HALT_FARMING' : "Zastavit farmenÃ­",
			'MACHINE_RUNNING' : "Farming Machine je spuÅ¡tÄ›nÃ¡",
			'CHANGE_VILLAGE' : "ZkouÅ¡Ã­m zmÄ›nit vesnici",
			'NO_FARM' : "Å½Ã¡dnÃ¡ farma nenÃ­ dostupnÃ¡.",
			'NOT_FARMER' : "Tohle nenÃ­ FarmÃ¡Å™skÃ¡ vesnice",
			'USED_TROOPS' : "PouÅ¾itÃ© jednotky",
			'GOING_TO' : "JdeÅ¡ do",
			'INSTALL_M1' : "Pro pÅ™idÃ¡nÃ­ farmy ji najdi na mapÄ› a klikni na ni",
			'INSTALL_M2' : "VeselÃ© farmenÃ­",
			'TRIBE_SELECT1' : "JakÃ© jsi nÃ¡rodnosti",
			'TRIBE_SELECT2' : "ProsÃ­m zvol sprÃ¡vnÃ© ÄÃ­slo.",
			'TRIBE_SELECT3' : "Nenastavil jsi sprÃ¡vnÃ© ÄÃ­slo, Nastavuji si tÄ› jako Å˜Ã­mana.",
			'ROMAN' : "Roman",
			'TEUTON' : "Teuton",
			'GAUL' : "Gaul"
		};
	} else if (ext == "pt") { //Language:Portuguese, Translator : Fujis
		lang = {
			'UPDATE_M' : "Actualizar",
			'UPDATE_M1' : "UserScripts.org nÃ£o encontrado.",
			'UPDATE_UNKNOWN' : "A versÃ£o nÃ£o coincide :",
			'UPDATE_LAST' : "Ãºltima versÃ£o disponÃ­vel",
			'UPDATE_BETA' : "Nova versÃ£o BETA disponÃ­vel",
			'UPDATE_NEW' : "Nova versÃ£o disponÃ­vel",
			'UPDATE_NOW' : "Actualizar jÃ¡",
			'CONFIRM' : "Tem a certeza",
			'REMOVEING' : "Removendo",
			'SWITCH_V' : "Substituir para a aldeia",
			'AFTER' : "Depois de",
			'SEC' : "Segundo",
			'NO_VILLAGE' : "NÃ£o hÃ¡ aldeias disponÃ­veis!",
			'WAITING' : "Em espera",
			'BEFORE_RE' : "Antes verificar novamente.",
			'ADD_FARM' : "Adicionar Farm",
			'TROOP_CONFIG' : "ConfiguraÃ§Ã£o de tropas",
			'ATTACK' : "Ataque",
			'REINFORCE' : "ReforÃ§o",
			'RAID' : "Assalto",
			'ACTIVE_FARM' : "Farm activo",
			'CANCEL' : "Cancelar",
			'SAVE' : "Guardar",
			'ADD_TO' : "Adicionar",
			'ADD_AS' : "Adicionar como Farm",
			'GLOBAL_IM_EX_PROMPT' : "Copiar todos os dados da aldeia ou copiar de cÃ³pia de seguranÃ§a",
			'GLOBAL_IM_EX_M' : "Importar ou Exportar lista de Farms de todas as aldeias",
			'LOCAL_IM_EX_PROMPT' : "Copiar dados / Colar novos dados",
			'LOCAL_IM_EX_M' : "Importar ou Exportar lista de Farms desta aldeia",
			'OPTIMIZE_DONE' : "OptimizaÃ§Ã£o de distÃ¢ncias feito com sucesso",
			'OPTIMIZE_M' : "Optimizar Farms nas aldeias tendo em conta a distÃ¢ncia.",
			'OPTIMIZE_SM' : "Optimizar todos os Farms da aldeia seleccionada por distÃ¢ncias",
			'INVALID_FARM' : "Tropas invÃ¡lidas! Remover?",
			'DELETE_FARM' : "Apagar Farm.",
			'EDIT_FARM' : "Editar farm",
			'NO_FARM_YET' : "Activar qualquer aldeia da pÃ¡gina do perfil da aldeia",
			'FARM' : "Farm",
			'SORT_FARM' : "Dispor Farms pela distÃ¢ncia a aldeia actual",
			'DELETE_M' : "Clicar no icon X para apagar o Farm",
			'EDIT_M' : "Clicar no icon Editar para editar o Farm",
			'END_M' : "Seleccionar fim do Farming a partir desta coluna, clicar para remover fim",
			'START_M' : "Seleccionar inÃ­cio do Farming a partir desta coluna",
			'START_FARMING' : "Iniciar Farming das aldeias seleccionadas",
			'MINIMIZE' : "Minimizar",
			'MAXIMIZE' : "Maximizar",
			'FARM_INACTIVE' : "Farm Inactivo",
			'ERROR' : "Erro",
			'NOT_ENOUGH' : "Tropas insuficientes para efectuar assalto a",
			'AVAILABLE' : "Disponivel",
			'NEEDED' : "NecessÃ¡rio",
			'TROOPS_GONE' : "Tropas a caminho de",
			'NEXT_FARM' : "Seleccionar prÃ³ximo Farm",
			'SUCCESS_COUNT' : "NÃºmero total de envios com sucesso",
			'HALT_FARMING' : "Halt Farming",
			'MACHINE_RUNNING' : "Programa de Farms activo",
			'CHANGE_VILLAGE' : "Tentando substituir a aldeia",
			'NO_FARM' : "Farm nÃ£o disponivel",
			'NOT_FARMER' : "Esta nÃ£o Ã© a aldeia de um Farm",
			'USED_TROOPS' : "Tropas utilizadas",
			'GOING_TO' : "Enviadas para",
			'INSTALL_M1' : "Adicionar novo Farm da pÃ¡gina do perfil da aldeia",
			'INSTALL_M2' : "Happy Farming",
			'TRIBE_SELECT1' : "A tua tribo",
			'TRIBE_SELECT2' : "Por favor preenche o teu tipo de tribo.",
			'TRIBE_SELECT3' : "Tribo seleccionada incorrecta, activar Romanos como predefiniÃ§Ã£o.",
			'ROMAN' : "Romanos",
			'TEUTON' : "Teutoes",
			'GAUL' : "Gaulesses"
		};
	} else if (ext == "pl") { //Language:Polish, Translator : Dungaar
		lang = {
			'UPDATE_M' : "Aktualizuje",
			'UPDATE_M1' : "Nie znaleziono UserScripts.org",
			'UPDATE_UNKNOWN' : "Niewlasciwa wersja :",
			'UPDATE_LAST' : "Uzywasz najnowszej wersji",
			'UPDATE_BETA' : "Nowa wersja BETA jest dostepna",
			'UPDATE_NEW' : "Jest dostepna NOWA wersja",
			'UPDATE_NOW' : "Chcesz zaktualizowac teraz",
			'CONFIRM' : "Jestes pewien",
			'REMOVEING' : "Usuwanie",
			'SWITCH_V' : "Zmiana wioski na",
			'AFTER' : "za",
			'SEC' : "sekund",
			'NO_VILLAGE' : "Nie ma zadnej wolnej wioski!",
			'WAITING' : "Czekam",
			'BEFORE_RE' : "przed ponownym sprawdzeniem.",
			'ADD_FARM' : "Zamierzasz dodac farme",
			'TROOP_CONFIG' : "Konfiguracja jednostek to",
			'ATTACK' : "Atak",
			'REINFORCE' : "Posilki",
			'RAID' : "Grabiez",
			'ACTIVE_FARM' : "Aktywna farma",
			'CANCEL' : "Anuluj",
			'SAVE' : "Zapisz",
			'ADD_TO' : "Dodaj do",
			'ADD_AS' : "Dodaj jako farme",
			'GLOBAL_IM_EX_PROMPT' : "Skopiuj dane ze wszystkich wiosek lub wklej kopie zapasowa",
			'GLOBAL_IM_EX_M' : "Import lub Eksport danych dla wszystkich wiosek",
			'LOCAL_IM_EX_PROMPT' : "Skopiuj dane / Wklej nowe dane",
			'LOCAL_IM_EX_M' : "Import lub Eksport danych dla tej wioski",
			'OPTIMIZE_DONE' : "Zoptymalizowano wedlug odleglosci",
			'OPTIMIZE_M' : "Zoptymalizuj farmy wedlug odleglosci.",
			'OPTIMIZE_SM' : "Optymalizacja farm wedlug odleglosci",
			'INVALID_FARM' : "Nieprawidlowe jednostki w osadzie! Usunac?",
			'DELETE_FARM' : "Usun farme",
			'EDIT_FARM' : "Edytuj farme",
			'NO_FARM_YET' : "Ustaw farmy w profilach wiosek",
			'FARM' : "Farma",
			'SORT_FARM' : "Sortuj farmy wedlug odleglosci od tej wioski",
			'DELETE_M' : "Kliknij X aby usunac farme",
			'EDIT_M' : "Kliknij na ikonie edycji aby edytowac farme",
			'END_M' : "Wybierz ostatnia atakowana wioske lub kliknij tutaj aby skrypt dzialal bez przerwy",
			'START_M' : "Wybierz pierwsza atakowana wioske",
			'START_FARMING' : "Rozpocznij farmienie od zaznaczonej wioski",
			'MINIMIZE' : "Minimalizuj",
			'MAXIMIZE' : "Maksymalizuj",
			'FARM_INACTIVE' : "Farma ustawiona jako nieaktywna",
			'ERROR' : "Blad",
			'NOT_ENOUGH' : "Brakuje jednostek do grabiezy",
			'AVAILABLE' : "Dostepne",
			'NEEDED' : "Potrzebne",
			'TROOPS_GONE' : "Jednostki w drodze do",
			'NEXT_FARM' : "Wybieranie kolejnej farmy",
			'SUCCESS_COUNT' : "W sumie wyslano",
			'HALT_FARMING' : "Zatrzymaj",
			'MACHINE_RUNNING' : "Skrypt uruchomiony",
			'CHANGE_VILLAGE' : "PrÃ³buje zmienic na inna wioske",
			'NO_FARM' : "Nie ma dostepnych zadnych farm",
			'NOT_FARMER' : "To nie jest wioska do atakÃ³w",
			'USED_TROOPS' : "Uzyte jednostki",
			'GOING_TO' : "Wykonuje",
			'INSTALL_M1' : "Dodaj nowe farmy w profilach wiosek",
			'INSTALL_M2' : "Milego farmienia :)",
			'TRIBE_SELECT1' : "Wybierz nacje",
			'TRIBE_SELECT2' : "Prosze wpisac poprawny numer nacji.",
			'TRIBE_SELECT3' : "Nie bylo mozliwe wybranie poprawnej nacji, ustawiam domyslnie rzymian.",
			'ROMAN' : "Rzymianie",
			'TEUTON' : "Germanie",
			'GAUL' : "Galowie"

		};
	} else if (ext == "hr" || ext == "rs" || ext == "ba") { //Language:Hrvatski, Srpski and Bosanski, Translator : Coly
		lang = {
			'UPDATE_M' : "UkljuÄiti",
			'UPDATE_M1' : "UserScripts.org nije pronaÄ‘en.",
			'UPDATE_UNKNOWN' : "Broj verzije nije vaÅ¾eÄ‡i:",
			'UPDATE_LAST' : "Vi koristite zadnju verziju",
			'UPDATE_BETA' : "Nova beta verzija je dostupna",
			'UPDATE_NEW' : "NOVA verzija je dostupna",
			'UPDATE_NOW' : "Dali Å¾elita instalirati sad",
			'CONFIRM' : "Dali ste sigurni",
			'REMOVEING' : "Uklanjanje",
			'SWITCH_V' : "Prebacivanje na slijedeÄ‡e selo",
			'AFTER' : "Poslije",
			'SEC' : "Sekunde",
			'NO_VILLAGE' : "Slijedece selo nije pronÄ‘eno",
			'WAITING' : "ÄŒekanje",
			'BEFORE_RE' : "Ponovna provijera prije nego.",
			'ADD_FARM' : "Idite dodat farme",
			'TROOP_CONFIG' : "Vojska Konfiguracija je ",
			'ATTACK' : "Napad",
			'REINFORCE' : "PojaÄanje",
			'RAID' : "PljaÄka",
			'ACTIVE_FARM' : "Aktivna farma",
			'CANCEL' : "Odustani",
			'SAVE' : "saÄuvaj farmu ",
			'ADD_TO' : "Dodaj u ",
			'ADD_AS' : "Dodaj kao farmu",
			'GLOBAL_IM_EX_PROMPT' : "Kopiraj sve podatke sela ili Zaljepi podatke iz sigurnosne kopije",
			'GLOBAL_IM_EX_M' : "ubaci ili izbaci podatke farma za sva sela",
			'LOCAL_IM_EX_PROMPT' : "Kopiraj podatke / Zaljepi nove podatke",
			'LOCAL_IM_EX_M' : "ubaci ili izbaci podatke farma za ovo selo",
			'OPTIMIZE_DONE' : "UspjeÅ¡no obaviti udaljenost optimizacija",
			'OPTIMIZE_M' : "Poredaj farme iz izabranog sela po udaljenosti",
			'OPTIMIZE_SM' : "Odlazak na Optimiziranej Svih farmi u Odabrane Naselja, Svojim Udaljenosti",
			'INVALID_FARM' : "Postavljena vojska za farmu nije ispravna! Ukloniti je?",
			'DELETE_FARM' : "Ukloni ovu farmu.",
			'EDIT_FARM' : "Uredi ovu farmu",
			'NO_FARM_YET' : "Postavite bilo koje selo kao svoju farmu iz svog odreÄ‘enog sela",
			'FARM' : "Farma",
			'SORT_FARM' : "Sortiraj farme po daljini iz ovog sela",
			'DELETE_M' : "Kliknite na (x) da bi uklonili odreÄ‘enu farmu",
			'EDIT_M' : "Kliknite na (Edit) ikonu da bi Uredili farme",
			'END_M' : "Izaberite poziciju u ovom stubcu, kliknite ovdje da uklonite (EndIndex)",
			'START_M' : "Izaberite poÄetnu poziviju u ovom stubcu",
			'START_FARMING' : "PoÄetak farmanja iz izabranog sela",
			'MINIMIZE' : "Minimiziraj",
			'MAXIMIZE' : "Maksimiziraj",
			'FARM_INACTIVE' : "Postavi farmu kao neaktivnu",
			'ERROR' : "PogreÅ¡ka",
			'NOT_ENOUGH' : "Nemate dovoljno vojnika za napad na",
			'AVAILABLE' : "Dostupno",
			'NEEDED' : "Potrebno",
			'TROOPS_GONE' : "Vojska je na putu prema",
			'NEXT_FARM' : "Preacivanje slijedeÄ‡a farma",
			'SUCCESS_COUNT' : "Ukupno uspjeÅ¡nih poslanih napada",
			'HALT_FARMING' : "Prekini farmanje",
			'MACHINE_RUNNING' : "Farming Machine je pokrenut",
			'CHANGE_VILLAGE' : "Pokusaj preacivanja na slijedece selo",
			'NO_FARM' : "Farma nije raspoloÅ¾ljiva",
			'NOT_FARMER' : "Ovo nije famersko selo",
			'USED_TROOPS' : "KoriÅ¡tena vojska",
			'GOING_TO' : "Kretanje prema",
			'INSTALL_M1' : "Dodaj novu farmu za ovo selo",
			'INSTALL_M2' : "Happy Farming.pozdravite paula(coly) xD ",
			'TRIBE_SELECT1' : "tvoj narod?",
			'TRIBE_SELECT2' : "Molimo da unesete ispravnu Broj NAroda za svoju vrstu.",
			'TRIBE_SELECT3' : "Niste mogli postavit ispravno pleme,rimljane namjestite kao zadnje.",
			'ROMAN' : "Rimljani",
			'TEUTON' : "Teutonci",
			'GAUL' : "Gali"
		};
	} else if (ext == "it") { //Language:Italian, Translator : Snake
		lang = {
			'UPDATE_M' : "Aggiorna",
			'UPDATE_M1' : "UserScripts.org non trovato.",
			'UPDATE_UNKNOWN' : "La Versione non corrisponde :",
			'UPDATE_LAST' : "Hai giÃ  la Versione piÃ¹ Recente",
			'UPDATE_BETA' : "Nuova Versione BETA disponibile",
			'UPDATE_NEW' : "Nuova Versione disponibile",
			'UPDATE_NOW' : "Vuoi aggiornare ora",
			'CONFIRM' : "Conferma",
			'REMOVEING' : "Sto Rimuovendo",
			'SWITCH_V' : "Cambiando villaggio:",
			'AFTER' : "dopo",
			'SEC' : " secondi",
			'NO_VILLAGE' : "Nessun altro Villaggio disponibile!",
			'WAITING' : "Aspetto",
			'BEFORE_RE' : "prima di ricontrollare.",
			'ADD_FARM' : "Stai aggiungendo una Farm",
			'TROOP_CONFIG' : "La configurazione delle Truppe Ã¨",
			'ATTACK' : "Attacco",
			'REINFORCE' : "Rinforzo",
			'RAID' : "Raid",
			'ACTIVE_FARM' : "Farm Attiva",
			'CANCEL' : "Annulla",
			'SAVE' : "Salva",
			'ADD_TO' : "Aggiungi a",
			'ADD_AS' : "Aggiungi come Farm",
			'GLOBAL_IM_EX_PROMPT' : "Copia i Dati di Tutti i Villaggi o Incolla i Dati da un Backup",
			'GLOBAL_IM_EX_M' : "Importa o Esporta i Dati delle Farm per tutti i Villaggi",
			'LOCAL_IM_EX_PROMPT' : "Copy i Dati / Incolla nuovi Dati",
			'LOCAL_IM_EX_M' : "Importa o Esporta i Dati delle Farm per questo Villaggio",
			'OPTIMIZE_DONE' : "Ottimizzazione della distanza completata con Successo",
			'OPTIMIZE_M' : "Ottimizza le Farm per i Villaggi Selezioni per Distanza.",
			'OPTIMIZE_SM' : "Sto per Ottimizzare tutte le Farm nei Villaggi Selezionati per Distanza",
			'INVALID_FARM' : "Configurazione delle truppe della Farm invalide! Rimuoverla?",
			'DELETE_FARM' : "Cancella questa Farm.",
			'EDIT_FARM' : "Modifica questa Farm",
			'NO_FARM_YET' : "Imposta qualsiasi villaggio come Farm dal Profilo del Villaggio",
			'FARM' : "Farm",
			'SORT_FARM' : "Organizza Farm per Distanza dal Villaggio Attuale",
			'DELETE_M' : "Premi il Bottone X per cancellare una Farm",
			'EDIT_M' : "Premi il Bottone Modifica per modificare una Farm",
			'END_M' : "Seleziona la posizione Finale da questa colonna, Clicca QuÃ¬ per Rimuoverla",
			'START_M' : "Seleziona la posizione Iniziale da questa colonna",
			'START_FARMING' : "Inizia il Farming dai Villaggi Selezionati",
			'MINIMIZE' : "Minimizza",
			'MAXIMIZE' : "Ingrandisci",
			'FARM_INACTIVE' : "Farm Impostata come Inattiva",
			'ERROR' : "Errore",
			'NOT_ENOUGH' : "Non ci sono Abbastanza Truppe per il raid a",
			'AVAILABLE' : "Disponibili",
			'NEEDED' : "Necessarie",
			'TROOPS_GONE' : "Le truppe stanno partendo per",
			'NEXT_FARM' : "Seleziono la Prossima Farm",
			'SUCCESS_COUNT' : "Conteggio Totale degli Invii con Successo",
			'HALT_FARMING' : "Pausa Farming",
			'MACHINE_RUNNING' : "Farming Machine Running",
			'CHANGE_VILLAGE' : "Provo a Cambiare Villaggio",
			'NO_FARM' : "Nessuna Farm Disponibile",
			'NOT_FARMER' : "Questo non Ã¨ un Villaggio Farmer",
			'USED_TROOPS' : "Truppe Usate",
			'GOING_TO' : "Partendo Per",
			'INSTALL_M1' : "Aggiungi nuove Farm dal Profilo del Villaggio",
			'INSTALL_M2' : "Felice Farming",
			'TRIBE_SELECT1' : "La Tua TribÃ¹",
			'TRIBE_SELECT2' : "Perfavore, inserisci il numero corretto per la Tua TribÃ¹.",
			'TRIBE_SELECT3' : "Non hai inserito un numero Valido per la tua TribÃ¹, Selezionati i Romani per default.",
			'ROMAN' : "Romani",
			'TEUTON' : "Teutoni",
			'GAUL' : "Galli"
		};
	}
	if (ext == "ru") { //Language:Russian Translator : SvD-12rus
		lang = {
			'UPDATE_M' : "ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ",
			'UPDATE_M1' : "UserScripts.org Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½.",
			'UPDATE_UNKNOWN' : "Ð’ÐµÑ€ÑÐ¸Ñ Ð½Ðµ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð° :",
			'UPDATE_LAST' : "Ð’Ñ‹ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚Ðµ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½ÑŽÑŽ Ð²ÐµÑ€ÑÐ¸ÑŽ",
			'UPDATE_BETA' : "Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð° ÐÐžÐ’ÐÐ¯, Ð½Ð¾ Ð‘Ð•Ð¢Ð Ð²ÐµÑ€ÑÐ¸Ñ",
			'UPDATE_NEW' : "Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð° ÐÐžÐ’ÐÐ¯ Ð²ÐµÑ€ÑÐ¸Ñ",
			'UPDATE_NOW' : "Ð’Ñ‹ Ñ…Ð¾Ñ‚Ð¸Ñ‚Ðµ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ",
			'CONFIRM' : "Ð’ÑÑ‘ Ð²ÐµÑ€Ð½Ð¾?",
			'REMOVEING' : "Ð£Ð´Ð°Ð»ÐµÐ½Ð¸Ðµ",
			'SWITCH_V' : "ÐŸÐµÑ€ÐµÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð´ÐµÑ€ÐµÐ²Ð½Ð¸ Ð½Ð°",
			'AFTER' : "Ñ‡ÐµÑ€ÐµÐ·",
			'SEC' : " ÑÐµÐºÑƒÐ½Ð´",
			'NO_VILLAGE' : "ÐÐµÑ‚ Ð´ÐµÑ€ÐµÐ²ÐµÐ½ÑŒ Ð´Ð»Ñ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸!",
			'WAITING' : "ÐžÐ¶Ð¸Ð´Ð°Ð½Ð¸Ðµ",
			'BEFORE_RE' : "Ð´Ð¾ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾Ð¹ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸.",
			'ADD_FARM' : " Ð’Ñ‹ ÑÐ¾Ð±Ð¸Ñ€Ð°ÐµÑ‚ÐµÑÑŒ Ð´Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñƒ ",
			'TROOP_CONFIG' : "Ð’Ð¾Ð¹ÑÐºÐ° Ð´Ð»Ñ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸",
			'ATTACK' : "Ð°Ñ‚Ð°ÐºÐ¾Ð¹",
			'REINFORCE' : "Ð¿Ð¾Ð´ÐºÑ€ÐµÐ¿Ð»ÐµÐ½Ð¸ÐµÐ¼",
			'RAID' : "Ð½Ð°Ð±ÐµÐ³Ð¾Ð¼",
			'ACTIVE_FARM' : "ÐÐºÑ‚Ð¸Ð²Ð½Ð°Ñ Ñ„ÐµÑ€Ð¼Ð° ",
			'CANCEL' : "ÐžÑ‚Ð¼ÐµÐ½Ð°",
			'SAVE' : "Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ",
			'ADD_TO' : "Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ",
			'ADD_AS' : "Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñƒ",
			'GLOBAL_IM_EX_PROMPT' : "ÐšÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð’Ð¡Ð•Ð¥ Ð´ÐµÑ€ÐµÐ²ÐµÐ½ÑŒ Ð¸Ð»Ð¸ Ð²ÑÑ‚Ð°Ð²Ð¸Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¸Ð· Ñ€ÐµÐ·ÐµÑ€Ð²Ð½Ð¾Ð¹ ÐºÐ¾Ð¿Ð¸Ð¸",
			'GLOBAL_IM_EX_M' : "Ð˜Ð¼Ð¿Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¸Ð»Ð¸ ÑÐºÑÐ¿Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ñ„ÐµÑ€Ð¼ Ð²ÑÐµÑ… Ð´ÐµÑ€ÐµÐ²ÐµÐ½ÑŒ",
			'LOCAL_IM_EX_PROMPT' : "ÐšÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ / Ð’ÑÑ‚Ð°Ð²Ð¸Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ",
			'LOCAL_IM_EX_M' : " Ð˜Ð¼Ð¿Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¸Ð»Ð¸ ÑÐºÑÐ¿Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ñ„ÐµÑ€Ð¼ Ð´Ð»Ñ ÑÑ‚Ð¾Ð¹ Ð´ÐµÑ€ÐµÐ²Ð½Ð¸ ",
			'OPTIMIZE_DONE' : "Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ° Ð¿Ð¾ Ð´Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸ Ð¿Ñ€Ð¾ÑˆÐ»Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾",
			'OPTIMIZE_M' : " Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñ‹ Ð² Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ñ‹Ñ… Ð´ÐµÑ€ÐµÐ²Ð½ÑÑ…, Ð¿Ð¾ Ð´Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸ Ñ€Ð°ÑÐ¿Ð¾Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ.",
			'OPTIMIZE_SM' : " Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñ‹ Ð²Ð¾ Ð’Ð¡Ð•Ð¥ Ð´ÐµÑ€ÐµÐ²Ð½ÑÑ…, Ð¿Ð¾ Ð´Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸ Ñ€Ð°ÑÐ¿Ð¾Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ.",
			'INVALID_FARM' : "ÐÐµÐ²ÐµÑ€Ð½Ñ‹Ðµ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ Ñ„ÐµÑ€Ð¼Ñ‹! Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ?",
			'DELETE_FARM' : "Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñƒ.",
			'EDIT_FARM' : "Ð ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñƒ",
			'NO_FARM_YET' : " Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð»ÑŽÐ±Ð¾Ð¹ Ð³Ð¾Ñ€Ð¾Ð´ ÐºÐ°Ðº Ð²Ð°ÑˆÑƒ Ñ„ÐµÑ€Ð¼Ñƒ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñ",
			'FARM' : "Ð¤Ð°Ñ€Ð¼",
			'SORT_FARM' : "Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ñ„ÐµÑ€Ð¼Ñ‹ Ð² Ñ‚ÐµÐºÑƒÑ‰ÐµÐ¹ Ð´ÐµÑ€ÐµÐ²Ð½Ðµ, Ð¿Ð¾ Ñ€Ð°ÑÑÑ‚Ð¾ÑÐ½Ð¸ÑŽ",
			'DELETE_M' : "ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ Ð·Ð½Ð°Ñ‡Ð¾Ðº X Ð´Ð»Ñ ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ñ Ñ„ÐµÑ€Ð¼Ñ‹ ",
			'EDIT_M' : "ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ ÑÑ‚Ð¾Ñ‚ Ð·Ð½Ð°Ñ‡Ð¾Ðº, Ð´Ð»Ñ Ñ€ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ñ„ÐµÑ€Ð¼Ñ‹",
			'END_M' : " Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÐºÐ¾Ð½ÐµÑ‡Ð½ÑƒÑŽ Ð´ÐµÑ€ÐµÐ²Ð½ÑŽ Ð¸Ð· ÑÑ‚Ð¾Ð³Ð¾ ÑÑ‚Ð¾Ð»Ð±Ñ†Ð°, Ð¸Ð»Ð¸ Ð½Ð°Ð¶Ð¼Ð¸Ñ‚Ðµ Ð·Ð´ÐµÑÑŒ, Ñ‡Ñ‚Ð¾Ð±Ñ‹ ÑƒÐ´Ð°Ð»Ð¸Ñ‚ÑŒ EndIndex ",
			'START_M' : "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑÑ‚Ð°Ñ€Ñ‚Ð¾Ð²ÑƒÑŽ Ð¿Ð¾Ð·Ð¸Ñ†Ð¸ÑŽ Ð´Ð»Ñ Ñ„Ð°Ñ€Ð¼Ð° Ð² ÑÑ‚Ð¾Ð¼ ÑÑ‚Ð¾Ð»Ð±Ð¸ÐºÐµ",
			'START_FARMING' : "ÐŸÑ€Ð¸ÑÑ‚ÑƒÐ¿Ð¸Ñ‚ÑŒ Ðº Ñ„Ð°Ñ€Ð¼Ñƒ Ð² Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð¼ Ð³Ð¾Ñ€Ð¾Ð´Ðµ",
			'MINIMIZE' : "Ð¡Ð²ÐµÑ€Ð½ÑƒÑ‚ÑŒ",
			'MAXIMIZE' : "Ð Ð°Ð·Ð²ÐµÑ€Ð½ÑƒÑ‚ÑŒ",
			'FARM_INACTIVE' : "Ð¤ÐµÑ€Ð¼Ð° Ð¿Ð¾Ð¼ÐµÑ‡ÐµÐ½Ð° Ð½ÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ð¾Ð¹",
			'ERROR' : "ÐžÑˆÐ¸Ð±ÐºÐ°",
			'NOT_ENOUGH' : "ÐÐµÐ´Ð¾ÑÑ‚Ð°Ñ‚Ð¾Ñ‡Ð½Ð¾ Ð²Ð¾Ð¹ÑÐº Ð´Ð»Ñ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸",
			'AVAILABLE' : "Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾",
			'NEEDED' : "Ð¢Ñ€ÐµÐ±ÑƒÐµÑ‚ÑÑ",
			'TROOPS_GONE' : "Ð’Ð¾Ð¹ÑÐºÐ° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹ Ð²",
			'NEXT_FARM' : "Ð’Ñ‹Ð±Ð¾Ñ€ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐ¹ Ñ„ÐµÑ€Ð¼Ñ‹",
			'SUCCESS_COUNT' : "Ð£Ð´Ð°Ñ‡Ð½Ð¾ Ð¿Ð¾ÑÐ»Ð°Ð½Ð¾",
			'HALT_FARMING' : "ÐžÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ñ„Ð°Ñ€Ð¼ ",
			'MACHINE_RUNNING' : "Ð—Ð°Ð¿ÑƒÑ‰ÐµÐ½Ð° Farming Machine",
			'CHANGE_VILLAGE' : " ÐŸÐ¾Ð¿Ñ‹Ñ‚ÐºÐ° Ð¸Ð·Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ñ‚ÐµÐºÑƒÑ‰ÑƒÑŽ Ð´ÐµÑ€ÐµÐ²Ð½ÑŽ ",
			'NO_FARM' : "Ð¤Ð°Ñ€Ð¼ Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½",
			'NOT_FARMER' : "Ð’ ÑÑ‚Ð¾Ð¼ Ð³Ð¾Ñ€Ð¾Ð´Ðµ Ð½ÐµÑ‚ Ñ„ÐµÑ€Ð¼ ",
			'USED_TROOPS' : "Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ Ð²Ð¾Ð¹ÑÐºÐ° ",
			'GOING_TO' : "ÐžÑ‚Ð¿Ñ€Ð°Ð²ÐºÐ° Ð²Ð¾Ð¹ÑÐº",
			'INSTALL_M1' : "Ð”Ð¾Ð±Ð°Ð²ÑŒÑ‚Ðµ Ð½Ð¾Ð²Ñ‹Ðµ Ñ„ÐµÑ€Ð¼Ñ‹ ÑÐ¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñ Ð´ÐµÑ€ÐµÐ²Ð½Ð¸",
			'INSTALL_M2' : "Ð£Ð´Ð°Ñ‡Ð½Ð¾Ð³Ð¾ Ñ„Ð°Ñ€Ð¼Ð°",
			'TRIBE_SELECT1' : "Ð’Ð°ÑˆÐ° Ñ€Ð°ÑÐ°",
			'TRIBE_SELECT2' : " ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð° Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ð´Ð»Ñ Ð²Ð°ÑˆÐµÐ¹ Ñ€Ð°ÑÑ‹.",
			'TRIBE_SELECT3' : "Ð’Ñ‹ Ð²Ñ‹Ð±Ñ€Ð°Ð»Ð¸ Ð½ÐµÐ²ÐµÑ€Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ñ€Ð°ÑÑ‹, ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ - Ñ€Ð¸Ð¼.",
			'ROMAN' : "Ð Ð¸Ð¼",
			'TEUTON' : "Ð“ÐµÑ€Ð¼Ð°Ð½ÐµÑ†",
			'GAUL' : "Ð“Ð°Ð»"
		};
	} else if (ext == "net") { //Language:EspaÃ±ol, Translator : Royan
		lang = {
			'UPDATE_M' : "Actualizar",
			'UPDATE_M1' : "UserScripts.org no encontrado.",
			'UPDATE_UNKNOWN' : "La version no coincide :",
			'UPDATE_LAST' : "Ya tienes la ultima versiÃ³n",
			'UPDATE_BETA' : "Nueva versiÃ³n BETA disponible",
			'UPDATE_NEW' : "Nueva versiÃ³n disponible",
			'UPDATE_NOW' : "Quieres actualizar ahora",
			'CONFIRM' : "Confirmar",
			'REMOVEING' : "Borrando",
			'SWITCH_V' : "Cambiando ciudad en",
			'AFTER' : "despues",
			'SEC' : "segundo",
			'NO_VILLAGE' : "No hay mÃ¡s ciudades disponibles !",
			'WAITING' : "Esperando",
			'BEFORE_RE' : "Antes revisa.",
			'ADD_FARM' : "Vas a aÃ±adir una granja",
			'TROOP_CONFIG' : "La configuraciÃ³n de tropas es",
			'ATTACK' : "Ataque normal",
			'REINFORCE' : "Refuerzo",
			'RAID' : "Atraco",
			'ACTIVE_FARM' : "Activar granjeo",
			'CANCEL' : "Cancelar",
			'SAVE' : "Salvar",
			'ADD_TO' : "Anadir a",
			'ADD_AS' : "AÃ±adir como granja",
			'GLOBAL_IM_EX_PROMPT' : "Copia o pega los datos de granjeo de todas las ciudades",
			'GLOBAL_IM_EX_M' : "Importar o Exportar raw datos de granjeo de todas las ciudades",
			'LOCAL_IM_EX_PROMPT' : "Copia los datos / pega los datos",
			'LOCAL_IM_EX_M' : "Importar o Exportar raw datos de granjeo de esta ciudad",
			'OPTIMIZE_DONE' : "Realizada optimizaciÃ³n por distancia",
			'OPTIMIZE_M' : "Optimizar el granjeo en funciÃ³n de la distancia.",
			'OPTIMIZE_SM' : "Optimizando el granjeo de las granjas seleccionadas en funciÃ³n de su distancia",
			'INVALID_FARM' : "ConfiguraciÃ³n de tropas de granjeo erronea! Â¿eliminar?",
			'DELETE_FARM' : "Borrar esta granja.",
			'EDIT_FARM' : "Editar esta granja",
			'NO_FARM_YET' : "Selecciona alguna ciudad como granja desde el perfil de las ciudades",
			'FARM' : "Granja",
			'SORT_FARM' : "Ordenar granjas por la distancia a la ciudad actual",
			'DELETE_M' : "Dar a la X para borrar la granja",
			'EDIT_M' : "Dar al boton de editar para editar la granja",
			'END_M' : "Selecciona posiciÃ³n final en esta columna, Dar aqui para borrar el marcador de posiciÃ³n final",
			'START_M' : "Selecciona posiciÃ³n inicial en esta columna",
			'START_FARMING' : "Empezar granjeo en las ciudades selecionadas",
			'MINIMIZE' : "Minimizar",
			'MAXIMIZE' : "Maximizar",
			'FARM_INACTIVE' : "Granja marcada inactiva",
			'ERROR' : "Error",
			'NOT_ENOUGH' : "Insuficientes tropas para mandar a",
			'AVAILABLE' : "Disponible",
			'NEEDED' : "Necesario",
			'TROOPS_GONE' : "Tropas en camino a",
			'NEXT_FARM' : "Seleccionando siguiente granja",
			'SUCCESS_COUNT' : "Contador total de granjeos",
			'HALT_FARMING' : "Pausar granjeo",
			'MACHINE_RUNNING' : "Farming Machine funcionando",
			'CHANGE_VILLAGE' : "Intentando cambiar de ciudad",
			'NO_FARM' : "Granjeo no disponible",
			'NOT_FARMER' : "Ciudad no granjera",
			'USED_TROOPS' : "Tropas usadas",
			'GOING_TO' : "Ir a",
			'INSTALL_M1' : "AÃ±adir nuevas granjas desde el perfil de las ciudades",
			'INSTALL_M2' : "Feliz granjeo",
			'TRIBE_SELECT1' : "Tu tribu",
			'TRIBE_SELECT2' : "Por favor introduce el nÃºmero correspondiente a tu tribu.",
			'TRIBE_SELECT3' : "Imposible seleccionar tribu, selcionando Romanos por defecto.",
			'ROMAN' : "Romanos",
			'TEUTON' : "Germanos",
			'GAUL' : "Galos"
		};
	}else if (ext == "ae") { //Language:arabic, Translator : Ø§Ù„ÙƒÙ€Ø³ÙˆÙ„
		lang = {
			'UPDATE_M' : "ØªØ­Ø¯ÙŠØ«",
			'UPDATE_M1' : "UserScripts.org Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø§Ù„Ù…ÙˆÙ‚Ø¹.",
			'UPDATE_UNKNOWN' : "Ø±Ù‚Ù… Ø§Ù„Ù†Ø³Ø®Ù‡ Ù„Ù… ÙŠØªØ·Ø§Ø¨Ù‚ :",
			'UPDATE_LAST' : "Ø§Ù†Øª ØªØ³ØªØ®Ø¯Ù… Ø§Ø­Ø¯Ø« Ù†Ø³Ø®Ù‡",
			'UPDATE_BETA' : "Ù„Ø¯ÙŠÙƒ Ù†Ø³Ø®Ù‡ Ø­Ø¯ÙŠØ«Ù‡ ÙˆÙ„ÙƒÙ† Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù…ØªØ§Ø­Ø©",
			'UPDATE_NEW' : "Ø§Ù„Ù†Ø³Ø®Ù‡ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© Ù…ØªØ§Ø­Ø©",
			'UPDATE_NOW' : "Ù‡Ù„ ØªØ±ÙŠØ¯ Ø§Ù„ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¢Ù†",
			'CONFIRM' : "Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯",
			'REMOVEING' : "Ø­Ø°Ù",
			'SWITCH_V' : "Ø§Ù„ØªØ­ÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ù‚Ø±ÙŠØ© ÙÙŠ",
			'AFTER' : "Ø¨Ø¹Ø¯",
			'SEC' : "Ø§Ù„Ø«Ø§Ù†ÙŠØ©",
			'NO_VILLAGE' : "Ù„Ø§ ØªØ°Ù‡Ø¨ Ø¥Ù„Ù‰ Ù‚Ø±ÙŠØ© Ø£Ø®Ø±Ù‰!",
			'WAITING' : "Ø§Ù†ØªØ¸Ø§Ø±",
			'BEFORE_RE' : "Ù‚Ø¨Ù„ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ÙØ­Øµ.",
			'ADD_FARM' : "Ø§Ù†Øª Ø³ØªØ¶ÙŠÙ Ù…Ø²Ø±Ø¹Ø©",
			'TROOP_CONFIG' : "Ø§Ù„Ù‚ÙˆØ§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø©",
			'ATTACK' : "Ù‡Ø¬ÙˆÙ…",
			'REINFORCE' : "ØªØ¹Ø²ÙŠØ²",
			'RAID' : "Ù†Ù‡Ø¨",
			'ACTIVE_FARM' : "ØªÙ†Ø´ÙŠØ· Ø§Ù„Ù…Ø²Ø±Ø¹Ø©",
			'CANCEL' : "Ø§Ù„ØºØ§Ø¡",
			'SAVE' : "Ø­ÙØ¸",
			'ADD_TO' : "Ø£Ø¶Ù Ø¥Ù„Ù‰",
			'ADD_AS' : "Ø§Ø¶Ø§ÙØ© Ø§Ù„Ù‰ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù…Ø²Ø§Ø±Ø¹",
			'GLOBAL_IM_EX_PROMPT' : "Ø§Ù†Ø³Ø® Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù‚Ø±ÙŠØ© Ø§Ùˆ Ø§Ù„ØµÙ‚ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù† Ø§Ù„Ø­Ø§ÙØ¸Ù‡",
			'GLOBAL_IM_EX_M' : "Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø£Ùˆ ØªØµØ¯ÙŠØ± Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ Ø¨Ø§Ù„Ù†Ø³Ø¨Ø© Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù‚Ø±Ù‰",
			'LOCAL_IM_EX_PROMPT' : "Ù†Ø³Ø® Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª / Ù„ØµÙ‚ Ø¨ÙŠØ§Ù†Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©",
			'LOCAL_IM_EX_M' : "Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø£Ùˆ ØªØµØ¯ÙŠØ± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø²Ø±Ø§Ø¹ÙŠØ© Ù„Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ø±ÙŠØ©",
			'OPTIMIZE_DONE' : "ØªÙ… Ø§Ù„ØªØ±ØªÙŠØ¨ Ø¨Ù†Ø¬Ø§Ø­ ",
			'OPTIMIZE_M' : "ØªØ±ØªÙŠØ¨ Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ Ø­Ø³Ø¨ Ø§Ù„Ù…Ø³Ø§ÙÙ‡ ÙÙŠ Ø§Ù„Ù‚Ø±Ù‰ Ø§Ù„Ù…Ø®ØªØ§Ø±Ù‡.",
			'OPTIMIZE_SM' : "Ø³ÙˆÙ ÙŠØªÙ… ØªØ±ØªÙŠØ¨ Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ ÙÙŠ Ø§Ù„Ù‚Ø±Ù‰ Ø§Ù„Ù…Ø®ØªØ§Ø±Ù‡ Ø­Ø³Ø¨ Ø§Ù„Ù…Ø³Ø§ÙØ©",
			'INVALID_FARM' : "Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù‚ÙˆØ§Øª ØºÙŠØ± ØµØ­ÙŠØ­! Ø¥Ø²Ø§Ù„ØªÙ‡?",
			'DELETE_FARM' : "Ø­Ø°Ù Ù‡Ø°Ù‡ Ø§Ù„Ù…Ø²Ø±Ø¹Ø©.",
			'EDIT_FARM' : "ØªØ­Ø±ÙŠØ± Ù‡Ø°Ù‡ Ø§Ù„Ù…Ø²Ø±Ø¹Ø©",
			'NO_FARM_YET' : "Ø§Ø¶Ù Ø§ÙŠ Ù‚Ø±ÙŠØ© ÙƒÙ€ Ù…Ø²Ø±Ø¹Ø© Ù„Ùƒ Ù…Ù† ØµÙØ­Ø© Ø§Ù„Ù‚Ø±ÙŠØ©(Ù…Ø±ÙƒØ² Ø§Ù„Ù‚Ø±ÙŠÙ‡>Ø§Ø±Ø³Ø§Ù„ Ù‚ÙˆØ§Øª>Ø§Ø±Ø³Ø§Ù„ ØªØ¬Ø§Ø±>Ø§Ø¶Ø§ÙØ© Ù…Ø²Ø±Ø¹Ù‡",
			'FARM' : "Ù…Ø²Ø±Ø¹Ø©",
			'SORT_FARM' : "Ø±ØªØ¨ Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ Ø­Ø³Ø¨ Ø§Ù„Ù…Ø³Ø§ÙØ© Ù„Ù„Ù‚Ø±ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ©",
			'DELETE_M' : "Ø§Ù†Ù‚Ø± Ø¹Ù„Ù‰ Ø§Ù„Ø§ÙŠÙ‚ÙˆÙ†Ù‡ Ù„Ø­Ø°Ù Ø§Ù„Ù…Ø²Ø±Ø¹Ø©",
			'EDIT_M' : "Ø§Ù†Ù‚Ø± Ø¹Ù„Ù‰ Ø§Ù„Ø§ÙŠÙ‚ÙˆÙ†Ø© Ù„ØªØ­Ø±ÙŠØ± Ø§Ù„Ù…Ø²Ø±Ø¹Ø©",
			'END_M' : "Ø§Ø®ØªØ± Ù…Ù† Ù‡Ø°Ø§ Ø§Ù„Ø¹Ù…ÙˆØ¯ Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø­ØµØ§Ø¯ Ù„Ù„Ù…Ø²Ø§Ø±Ø¹ØŒ Ø§Ù†Ù‚Ø± Ù‡Ù†Ø§ Ù„Ø¥Ø²Ø§Ù„Ø© Ù…Ø¤Ø´Ø± Ø§Ù„Ù†Ù‡Ø§ÙŠØ©",
			'START_M' : "Ø§Ø®ØªØ± Ù…Ù† Ù‡Ø°Ø§ Ø§Ù„Ø¹Ù…ÙˆØ¯ Ø¨Ø¯Ø§ÙŠØ© Ø§Ù„Ø­ØµØ§Ø¯ Ù„Ù„Ù…Ø²Ø§Ø±Ø¹",
			'START_FARMING' : "Ø§Ø®ØªØ§Ø± Ù‚Ø±ÙŠØ© Ù…Ù† Ù‚Ø±Ø§Ùƒ Ù„ÙŠØªÙ… Ù…Ù†Ù‡Ø§ Ø¨Ø¯Ø§ÙŠØ© Ø­ØµØ§Ø¯ Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ ",
			'MINIMIZE' : "ØªØµØºÙŠØ±",
			'MAXIMIZE' : "ØªÙƒØ¨ÙŠØ±",
			'FARM_INACTIVE' : "ØªÙ… ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø²Ø±Ø¹Ø© ÙƒÙ€ Ø®Ø§Ù…Ù„Ø©",
			'ERROR' : "Ø®Ø·Ø£",
			'NOT_ENOUGH' : "Ù„Ø§ÙŠÙˆØ¬Ø¯ Ø¹Ø¯Ø¯ ÙƒØ§ÙÙŠ Ù…Ù† Ø§Ù„Ù‚ÙˆØ§Øª ÙÙŠ Ø§Ù„Ù‚Ø±ÙŠÙ‡",
			'AVAILABLE' : "Ù…ØªÙˆÙØ±",
			'NEEDED' : "ÙŠØ­ØªØ§Ø¬",
			'TROOPS_GONE' : "ØªÙ… Ø§Ø±Ø³Ø§Ù„ Ø§Ù„Ù‚ÙˆØ§Øª Ø§Ù„Ù‰",
			'NEXT_FARM' : "Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø²Ø±Ø¹Ø© Ø§Ù„ØªØ§Ù„ÙŠØ©",
			'SUCCESS_COUNT' : "Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„Ø§Ø±Ø³Ø§Ù„ÙŠØ§Øª Ø§Ù„Ù†Ø§Ø¬Ø­Ø©",
			'HALT_FARMING' : "Ø§ÙˆÙ‚Ù Ø§Ù„Ø­ØµØ§Ø¯",
			'MACHINE_RUNNING' : "ØªØ´ØºÙŠÙ„ Ø­ØµØ§Ø¯ Ø§Ù„Ù…Ø²Ø§Ø±Ø¹",
			'CHANGE_VILLAGE' : "Ù…Ø­Ø§ÙˆÙ„Ø© ØªØºÙŠÙŠØ± Ø§Ù„Ù‚Ø±ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ©",
			'NO_FARM' : "Ø­Ø§Ù„ÙŠØ§ Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø²Ø±Ø¹Ø©",
			'NOT_FARMER' : "Ù‡Ø°Ù‡ Ù„ÙŠØ³Øª Ù…Ø²Ø±Ø¹Ø©",
			'USED_TROOPS' : "Ø§Ù„Ù‚ÙˆØ§Øª Ø§Ù„Ù…Ø³ØªØ¹Ù…Ù„Ù‡",
			'GOING_TO' : "Ø§Ù„Ø°Ù‡Ø§Ø¨ Ø¥Ù„Ù‰",
			'INSTALL_M1' : "ØªÙ… Ø§Ù„ØªÙ†ØµÙŠØ¨ Ø¨Ù†Ø¬Ø§Ø­.Ù„Ø§Ø¶Ø§ÙØ© Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ Ø§Ø°Ù‡Ø¨ Ø§Ù„Ù‰ ØµÙØ­Ø© Ø§Ù„Ù‚Ø±ÙŠØ©",
			'INSTALL_M2' : "Ø­ØµØ§Ø¯ Ù…ÙˆÙÙ‚",
			'TRIBE_SELECT1' : "Ù‚Ø¨ÙŠÙ„ØªÙƒ",
			'TRIBE_SELECT2' : "Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„ØµØ­ÙŠØ­ Ù„Ù‚Ø¨ÙŠÙ„ØªÙƒ.",
			'TRIBE_SELECT3' : "Ø£Ù†Øª Ù„Ø§ ØªØ³ØªØ·ÙŠØ¹ ØªØ­Ø¯ÙŠØ¯ Ø§Ø³Ù… Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„ØµØ­ÙŠØ­ ØŒ ØªÙ… ÙˆØ¶Ø¹ Ø§Ù„Ø±ÙˆÙ…Ø§Ù†ÙŠØ© Ø§ÙØªØ±Ø§Ø¶ÙŠ.",
			'ROMAN' : "Ø§Ù„Ø±ÙˆÙ…Ø§Ù†",
			'TEUTON' : "Ø§Ù„Ø¬Ø±Ù…Ø§Ù†",
			'GAUL' : "Ø§Ù„Ø§ØºØ±ÙŠÙ‚"
		};
	}else if (ext == "de") { //Language:German, Translator : Tequila
		lang = {
			'UPDATE_M' : "Update",
			'UPDATE_M1' : "UserScripts.org nicht gefunden.",
			'UPDATE_UNKNOWN' : "Versions Nummer stimmt nicht Ã¼berein :",
			'UPDATE_LAST' : "Du hast das Neuste",
			'UPDATE_BETA' : "Eine Neue Beta-Version ist verfÃ¼gbar",
			'UPDATE_NEW' : "Eine Neue Version ist verfÃ¼gbar",
			'UPDATE_NOW' : "Wollen Sie updaten?",
			'CONFIRM' : "Sind Sie sicher?",
			'REMOVEING' : "Entfernen",
			'SWITCH_V' : "wechsel zu Dorf",
			'AFTER' : "spÃ¤ter",
			'SEC' : "sekunden",
			'NO_VILLAGE' : "kein anderes Dorf verfÃ¼gbar!",
			'WAITING' : "warte",
			'BEFORE_RE' : "before recheck.",
			'ADD_FARM' : "Farm hinzufÃ¼gen",
			'TROOP_CONFIG' : "Truppen Einstellung",
			'ATTACK' : "Angriff",
			'REINFORCE' : "UnterstÃ¼tzung",
			'RAID' : "Raubzug",
			'ACTIVE_FARM' : "Aktive Farm",
			'CANCEL' : "Abbrechen",
			'SAVE' : "Speichern",
			'ADD_TO' : "HinzufÃ¼gen",
			'ADD_AS' : "Als Farm hinzufÃ¼gen",
			'GLOBAL_IM_EX_PROMPT' : "Farmdaten kopieren oder einfÃ¼gen",
			'GLOBAL_IM_EX_M' : "Importieren oder exportieren der roh Farmdaten aus allen DÃ¶rfern",
			'LOCAL_IM_EX_PROMPT' : "Daten kopieren / Neue Daten einfÃ¼gen",
			'LOCAL_IM_EX_M' : "Importieren oder exportieren der Farmdaten aus diesem Dorf",
			'OPTIMIZE_DONE' : "Entfernungsoptimirung erfolgt",
			'OPTIMIZE_M' : "Optimiere alle Farmen im ausgewÃ¤hlten Dorf nach Entfernungen.",
			'OPTIMIZE_SM' : "Optimiere alle Farmen in den ausgewÃ¤hlten DÃ¶rfern nach Entfernungen",
			'INVALID_FARM' : "Die Truppeneinstellung ist ungÃ¼ltig! Entfernen?",
			'DELETE_FARM' : "Farm entfernen.",
			'EDIT_FARM' : "Farm bearbeiten",
			'NO_FARM_YET' : "WÃ¤hle ein beliebiges Dorf als Farm, in der Dorfansicht",
			'FARM' : "Farmen",
			'SORT_FARM' : "Sortiert die Farmen nach Enfernung im momentanen Dorf",
			'DELETE_M' : "x klicken um Farm zu lÃ¶schen",
			'EDIT_M' : "Auf das Edit Icon klicken um eine Farm zu editieren",
			'END_M' : "Ende der Liste festlegen, Hier klicken um den EndIndex zu entfernen",
			'START_M' : "Anfang der Liste festlegen",
			'START_FARMING' : "Bei ausgewÃ¤hltem Dorf mit farmen beginnen",
			'MINIMIZE' : "Minimieren",
			'MAXIMIZE' : "Maximieren",
			'FARM_INACTIVE' : "Farm als inaktiv ausgewÃ¤hlt",
			'ERROR' : "Fehler",
			'NOT_ENOUGH' : "Nicht genÃ¼gend Truppen vorhanden",
			'AVAILABLE' : "VerfÃ¼gbar",
			'NEEDED' : "werden gebraucht",
			'TROOPS_GONE' : "Truppen unterwegs",
			'NEXT_FARM' : "wÃ¤hle nÃ¤chste Farm aus",
			'SUCCESS_COUNT' : "Erfolgreich versendete Truppen",
			'HALT_FARMING' : "STOP",
			'MACHINE_RUNNING' : "Farm Maschine aktiviert",
			'CHANGE_VILLAGE' : "Versuche aktuelles Dorf zu wechseln",
			'NO_FARM' : "Keine Farm verfÃ¼gbar",
			'NOT_FARMER' : "Dies ist kein Farmdorf",
			'USED_TROOPS' : "Benutzte Truppen",
			'GOING_TO' : "Wechsel zu",
			'INSTALL_M1' : "Neue Farmen vom Dorfprofil hinzufÃ¼gen",
			'INSTALL_M2' : "Happy Farming",
			'TRIBE_SELECT1' : "Dein Volk",
			'TRIBE_SELECT2' : "Bitte die richtige Zahl fÃ¼r dein Volk eingeben.",
			'TRIBE_SELECT3' : "Du konntest nicht das richtige Volk einstellen, RÃ¶mer wurden als Standart gewÃ¤hlt.",
			'ROMAN' : "RÃ¶mer",
			'TEUTON' : "Germane",
			'GAUL' : "Gallier"
		};
	}if (ext == "id") { //Language:Indonesia, Translator : Abhy Boy
		lang = {
			'UPDATE_M' : "Update Script",
			'UPDATE_M1' : "UserScripts.org tidak ditemukan.",
			'UPDATE_UNKNOWN' : "Versi Update tidak sesuai :",
			'UPDATE_LAST' : "Script saat ini adalah yang terbaru",
			'UPDATE_BETA' : "Versi BETA yang baru sudah tersedia",
			'UPDATE_NEW' : "Versi yang baru sudah tersedia",
			'UPDATE_NOW' : "Anda ingin Update sekarang",
			'CONFIRM' : "Anda Yajin",
			'REMOVEING' : "Menghapus",
			'SWITCH_V' : "Berpindah ke Desa yang lain pada ",
			'AFTER' : "setelah",
			'SEC' : "detik",
			'NO_VILLAGE' : "Tidak ada Desa lain lagi yang akan di serang!",
			'WAITING' : "Menunggu",
			'BEFORE_RE' : "sebelum cek ulang.",
			'ADD_FARM' : "Anda akan menambahkan daftar Serang",
			'TROOP_CONFIG' : "Konfigurasi serangan adalah ",
			'ATTACK' : "Menyerang Penuh",
			'REINFORCE' : "Bantuan",
			'RAID' : "Merampas",
			'ACTIVE_FARM' : "Aktif Diserang",
			'CANCEL' : "batal",
			'SAVE' : "Simpan",
			'ADD_TO' : "Tambahkan Ke",
			'ADD_AS' : "Ditambahkan Serangan",
			'GLOBAL_IM_EX_PROMPT' : "Gandakan data atau ganti dengan data yang baru",
			'GLOBAL_IM_EX_M' : "Import atau Export data raw untuk semua Desa",
			'LOCAL_IM_EX_PROMPT' : "Gandakan Data / Timpakan Data Baru",
			'LOCAL_IM_EX_M' : "Import atau Export data raw untuk Desa ini",
			'OPTIMIZE_DONE' : "Berhasil melakukan optimalisasi berdasar jarak",
			'OPTIMIZE_M' : "Optimalkan Serangan berdasar jarak.",
			'OPTIMIZE_SM' : "Mulai melakukan optimalisasi Serangan berdasar jarak",
			'INVALID_FARM' : "Seting Tentara tidak benar! hapus ini ?",
			'DELETE_FARM' : "Hapus data ini.",
			'EDIT_FARM' : "Ubah data ini",
			'NO_FARM_YET' : "Ubah sebuah desa menjadi jajahan Anda dari Halaman Profile Desa",
			'FARM' : "Jajah",
			'SORT_FARM' : "urutkan berdasarkan jarak mulai dari data ini",
			'DELETE_M' : "Tekan tanda X untuk menghapus Data Jajahan",
			'EDIT_M' : "Tekan tanda X untuk merubah Data Jajahan",
			'END_M' : "Pilih Posisi terakhir pada data, Tekan disini untuk membuang tanda",
			'START_M' : "Pilih posisi mulai di sini",
			'START_FARMING' : "Mulai menjajah dari Desa terpilih",
			'MINIMIZE' : "Kecilkan",
			'MAXIMIZE' : "Besarkan",
			'FARM_INACTIVE' : "jajahan diset tidak aktif",
			'ERROR' : "Kesalahan",
			'NOT_ENOUGH' : "Tidak cukup tentara untuk menjajah pada",
			'AVAILABLE' : "Tersedia",
			'NEEDED' : "Diperlukan",
			'TROOPS_GONE' : "Tentara sedang menuju ",
			'NEXT_FARM' : "Pilih Jajahan Berikutnya",
			'SUCCESS_COUNT' : "Jumlah kiriman Pasukan yang berhasil ",
			'HALT_FARMING' : "Hentikan Jajahan",
			'MACHINE_RUNNING' : "Mesin Jajahan Berjalana",
			'CHANGE_VILLAGE' : "Berusaha mengganti Desa yang dijajah",
			'NO_FARM' : "Tidak ada Jajahan tersedia",
			'NOT_FARMER' : "bukan desa yang bisa Dijajah",
			'USED_TROOPS' : "Pasukan digunakan",
			'GOING_TO' : "Menuju ke",
			'INSTALL_M1' : "Tambah sebuah desa menjadi jajahan Anda dari Halaman Profile Desa",
			'INSTALL_M2' : "Selamat bersenang - senang",
			'TRIBE_SELECT1' : "Kebangsaan Anda",
			'TRIBE_SELECT2' : "Silakan pilih angka yang sesuai dengan kebangsaaan pasukan.",
			'TRIBE_SELECT3' : "Anda salah memilih Kebangsaan, Gunakan Romawi sebagai defaultnya.",
			'ROMAN' : "Romawi",
			'TEUTON' : "Teuton",
			'GAUL' : "Gaul"
		};
	}
	//---------------***------------------//
	lang['SCRIPT_NAME'] = "Farming Machine";
}
function T(str) {
	var name = str.toUpperCase();
	if (lang[name] != undefined) {
		return lang[name];
	} else {
		str = str.toLowerCase();
		return "^" + str.substr(0, 1).toUpperCase() + str.substr(1);
	}
}
function loadImage() {
	image['DELETE'] = "data:image/gif;base64,"
			+ "R0lGODlhDAAMAMQQAMwzM88/P/zy8tllZfXZ2fnl5fLMzOyystJMTO+/v+mlpdVZWdxycuWZ"
			+ "meKMjN9/f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
			+ "ACH5BAEAABAALAAAAAAMAAwAQAVJIAQViiCKx0CICQAciLuYJ+MCwSoWw60UMtqp5zKcBAHA"
			+ "ICFyABC6Q3KAilFFDVegFxCKkC7GaZxN4oSEJAJiuAEKiYdxbKCFAAA7";
	image['EDIT'] = "data:image/png;base64,"
			+ "iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABGdBTUEAAK/INwWK6QAAABl0"
			+ "RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASsSURBVHjaYmzvn8bw798fBmYW"
			+ "dgZmBiaGX39+M7AxszD8/fePgYmVmYGd4RNDjFQXgxDHSwaGPwwM/ySsck591i4T/bhrljLn"
			+ "4y6gwl8MUAAQQEwMeAATwz+Gj79FGM68d2T49xdo1l8GRgap1BiRB79kn92Raf7LyK6LrB4g"
			+ "gFgYCABWpt8MVz+bMIj/2MQgJKXgIv3pj4nczWUMAoycl5j/fr8ONJ4B6CUGBg4GBoAAYiJk"
			+ "2N+/Pxk+/uRjOPdcmeGveFg+0/O9zN9YfjMwyP9c/e03w7f//xgY7j1hYGiaw8AAEEAsuA35"
			+ "y/D3/z9BJXm5fF5+MavnN4KOi0qqOzGcmsjwU4jl7bPfPxdwA4Px8gMGhoqFDAx3njMwAAQQ"
			+ "hmH/gAH/8+8vBn5+3ggTY706fW1Nzd9//zPcF2d15fw2A+il9wxP/zDsvPeG4cnTdwwMbasY"
			+ "GF59hOgFCCC4Yf///2f49fsXAycHp4Outmqpga62Fz8fH8OPn78ZXr16ySDO84KB6cMWhq9A"
			+ "+06/U1n24OV/hulr7zF8/Pof7hCAAGKCGPIbZJi2rrb6yogQ3z02luZeLCxsDG/ff2R4/+kL"
			+ "w5cv7xkEuY4xMPx8wfDsnwUjj+XMpKesXnxQg4SAWB2I+QACiIWFhVlOTkYxw0BfL0NOWkrw"
			+ "1+8/DO8+fGL4DaT//vvP8P37TwYent8M7Nx3GX6/ZWB4wuTBKCkuGiQjLSrCxy/Q9+njhw9A"
			+ "gwSBmB8ggBgPHz991FBP1+rbjx8M33/8Yvj95w8DyMC/f/8xsLIAI/s/I8OVi7sZxFk2MDy/"
			+ "9YHhDW8cAycXJzA42Bnu3Ln7furUyW3Pnz45CTTsJ0AAMb3/8PE3KK18Bbrg89dvDF+/gQz9"
			+ "CY4IJiZGBh5uDoY9e88xtM34xfCSL5mBg5ODgRkozs7GxuDr7SW4YsWqhtDIOG0VFf0zAAHE"
			+ "rKVnsP/bj5+6UpLiSr9+/QUa+J2BBegiNlZQSvzP8Afo0ju37zCYmtsx6GirM/Dz8TCoqaoy"
			+ "aGtrMcjJyzIoyMuyWVjaODGxC6wACCAWoKMeXr58Pfj9+49zzU2Ng/n5uBl+fP8BjMWfDMyM"
			+ "QBcAvSMlJc/w+9M9BilRAwZRKV0GDjYWoMtYwTF4+8FzhhNnLzIwsvxmAggATQCy/wQBAQEA"
			+ "BQUE8ePj5Fv09/ffJCQmdB4aFgD6+voABgUEAAQDAwBDQkAAAvndAPfo1AD+ExoABwwSAOHm"
			+ "6wDL0dcA3dzdqgkFAZEDAQPbAgiezoDR+vPL18+lJ8+c+fRTT7/JQEsFGAl/wIaxcrAxMHAr"
			+ "MfDxijB8//aF4fztpwwXLl6+9vXz+zomhr9r2biEGH7++sMAEEAoOYCJiZmBhfFX883rN77/"
			+ "+vmzydJYl5MTaBAHMLB//WFhuHP/I8Ola+eev/vwceGPb597WJiZ3v7/h8jeAAGElp3+MzAD"
			+ "yzIudraea1du3Pz87fsyV1tznhdvPjKcuXTt7+NHD+eyMTG2C/BzP/jxHVRcMKLoBgggHBmd"
			+ "Eeg9ps1PH93zX7ftSy8wm736/uVjH9BLO1lYuDAMgQGAAGIEZSdqAYAAAwBv6sTarY5ZRgAA"
			+ "AABJRU5ErkJggg==";
	image['OPTIMIZE'] = "data:image/png;base64,"
			+ "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAAK/INwWK6QAAA"
			+ "Bl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAQRSURBVHjaYgwMDGT4/v"
			+ "07g4Ojq7iRkbHwgwf3OO7evS3Axc3DyAAEjIxgCgz+/fvH8PXrl/8K8gpvubm53x84cOD"
			+ "d1atXv/z984sBIIBYgIDR09OzgF9AsO/d+1cMsnIyDJpaGgxMzCxQQ4D4/3+G/1DD/v75"
			+ "w/D500eGN2/eMGhra39jZmb2P3vm9B6AAGLR09MzlpGR6ZOQEGcA2gK2FWTAfyANA4yMT"
			+ "ECz/oMYDIxsbAx8PBIMsjJSDH///uUSFxPZ/eH9W3WAAGIBGpLAycnJwAx0wefPX+Ca//"
			+ "/7C/cWyBAQG84HuRJIgvRISUkxAB1jAxBALLy8fDzfvn1j+PPnL1DDP6AtIE3/GdjZ2cF"
			+ "hJyoqyvD9xw8GYBAwvH37FkyDXM3Kygo2+OfPn0DDpNkAAogFGKjcjx7ehwvy8vIyiIuL"
			+ "M6ipqTG8f/+eQUxMjOHXr19gORB4+fIlA8gHDx48YGADepOJiYnh/YdP/AABKCBjG4BhE"
			+ "Ah+kcLJJkiMQMHQbMIKLiw6bNpICfXpdNJdf/lp2JWW55wQEay14O6ICGQmVBXMDCKCmf"
			+ "UfVBX2Phjjfj8BxALyNkjg3bt3DMLCwgxBQUEMBw8eBGOQN0A2grwIAlOnTgUbZmRkBI6"
			+ "1devWgeWNjE1/AgQQy79/TEyPHj1isLW1YRASEgYrOHr0KAMo3EDhBFIIjBCwYffu3WO4"
			+ "ffs2OBhA4iAfXL16DeTi3wABxAQSBLnm8OEjYOcuXLgQbCsoMEG0h4cHg7m5Odh7IO+Dw"
			+ "m3OnDngmPzw4QPDhYsXGH78+PEHIICYY2MSYt6+faUC8jswlTLs2rULmHq/gsOEi4sL7B"
			+ "KQISAXABMfw507d8BiIAyKej4+PlAYbQAIIGDy/c/w8OFDYPT/AccIKJxA3nr+/DncVpA"
			+ "BgoKCYD4oRn///g22DOS6p0+fMnBycf8GCCCWnz++fgY5GRQ7IANAikH8Z8+egWlQFHNw"
			+ "cIDD7vPnz2CXgAwCyYFiGMT+/evnX4AAYnn//sNnUDiAAhaUNkDeA7kCFG6g8AMZBLIdZ"
			+ "ADIIhAtICDAoKGhwaCqqgo26MGDh/8BAogFaMsbf39/Bn5+frCiS5cuMWzfvp1hz5494M"
			+ "QJChtYzge5Vl9fn8Hb2xtMg8IHGNAMixYtZgYIIJbHjx89WrRoEdj5oGi2sLAAawS5DhS"
			+ "wsLwGilEVFRWGuLg4BmlpaYazZ8+CkwPItQICgtwAAcQsLCx0B+jUcpDJd+/eBStQVlYG"
			+ "awYZBEqsIMUgAHKJvLw8w8qVK8GpHqQHpPbnzx+zAAKIBRgm74HhoAy0JRIYM7pArwg+f"
			+ "vyYD5jYWEFJABhj/4CGMgEN+wdyMTCG/4KCAWQgMAxfA723c+/evTsAAgwActQIlGDP1s"
			+ "sAAAAASUVORK5CYII=";
	image['IM_EXPORT'] = "data:image/png;base64,"
			+ "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAAK/INwWK6QAA"
			+ "ABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAS4SURBVHjaYtx9bhmD"
			+ "IIcYw9fvnxiYmJgZnn16wHDj4SmF/39/rfG2TT8qLaJSzMbC/vffv3//GRj+M/z49ZOB"
			+ "kYGZAR0ABBALMocRiIHqHb/+/Trl08+nWmfubDeWE8t9w/iXofnfn58M/4Dw1asXQGM4"
			+ "GUCGIgOAAGICE0xMDH///WH48/eP2rO3t1d9Y3ipxcLGzXDm9m6Goxe3NrGysKX/B9rC"
			+ "ysLOwAx0NUg9OgYIIKb///8xcLJzMfDxijDwcgvetdH33iHOo8Dw59d3BjUFA4Zfv78y"
			+ "vHh7p5GTnYf/9pMLDL///gK7HB0ABBALMxMLCzsrlzA3pxAzMyOLLQsHu+OfX7MZfvz8"
			+ "wiAvaMngZRTL8OPH+zMv3tznuvLg2Ec9eTcGbAAggFhef3zm++HTk0nSouosYoIaEn9+"
			+ "/meQF9Fl+PrzMwMnMzPD7++/gMHBYs3A9GPfl++vzjAyMC7/9//ftv//UcMIIIBYrj84"
			+ "LfL8+10ZLjag99hFGER4FRkkRGUZLHXDGT58fMTw6u1zhi8f2QXuv/ojwPzbROP3Dy4r"
			+ "OVmpS2ysbE/ghgH9ChBALPzswv8//H7D8P7PB4Yv/78zvPzxiOHWSyagHBcwjj4xiAgp"
			+ "Mpzcw8cwe8kxBlcHPQYdaSYlNhbOQh4uzmKQQSysLECv/2QACCAmYX6Jjc56UXONZewY"
			+ "BBh5GZh/MwEjlpXhD8NvBjYWcYa3Hx8wMHD+ZWDlY2Xg4PrBIMDPwMDGysgMjGGGr9++"
			+ "M+w+eI6BmZWJASCAWBgYGV+L8kqlaIiYPfmo8Dr51qujktefnmN+BTRAU8GN4cE5XYbT"
			+ "524xcAIVv3nzm+H2vZ/AxPZU4+Xzp1zP3v/+9vPXHwYXFn0GgABiDoxxYhDgFWdgZeI6"
			+ "wMbEv12MT/m0sayDpYKYBo8krzrDl88cDPsP3gS6jpnh0ev3DM9efGQw0FVWUZQTefLw"
			+ "6bszTEyMDIY6SgwAAcT089c3YEL8DU5LcjLSNxRl1Lfduf/39dunygxc/1UZ3KwUGQoy"
			+ "HRj+/v/LYGUmx5CTYssgLswGDGHW9s9ff6/7++dvACMjoyhAALHYGviDXSQhKA+OgL9/"
			+ "GQJmLj+g++D5Z6DXRBk0lUUZFBSEGHw89Bh0dVQYeFl+M3CzfGVg5xES2Lz7WqC9uWLg"
			+ "r9+/+wACiEVa0JDhH1D3m7efwAZ9+vx938+vXx+/ffNB9uzHXwwXrj5kYGNmYRAS4mPY"
			+ "ufc6Q7CLIUNkoB7Dss2nGK49fMtgZqDA8PP7DxGAAGI8duI6SsJiZmFifvniy/4NOy/Y"
			+ "nr/xiOHzzx8MnGxsDMCgAGVoYMxxAsOTERxjxvoyDMHO+gwmRnJlAAHE+OfPPxSDGIEa"
			+ "fv76qfvg6fP823df+R06dkX09IUXDK/e/GT4z/SXQViAk8FQX47B3UqOQUVe/K+EuPjs"
			+ "z9+/FgMEEOO3bz/RDGJk+PLtK8Ozly8Y/vz4I87OzhTy9sO/3HMX76t/+f2ZwURHnkFG"
			+ "mvuFjLj0SQ523nk/f37f9OnrNwaAAMJp0JPnzxl+fvsFCn4GTk5OWXY2Dk1gCtAWFuCR"
			+ "/cvAsJqHl+/4PyDjx4+vQPXfGQACDAB0cslYRwp15wAAAABJRU5ErkJggg==";
	image['GIM_EXPORT'] = "data:image/png;base64,"
			+ "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQB"
			+ "BZG9iZSBJbWFnZVJlYWR5ccllPAAABCpJREFUeNpslHtMW1Ucx3/33j7ou5RnYVAeQx"
			+ "6z24QuLuJmsojKzEzchjPO1z8m24z+YTYjREnEoMnE/bH4D3HBuJnRTRNMpsEskcqEg"
			+ "Yo47IpTtsJ4pLSlpb29t7S33Hv8na7OfzzJJ/ecc3/ne36ve5mnT/aS/HIHWIrtoDWa"
			+ "gY60wMONP34ZLzLq/D0P1vqcxrxN3Gbhv8Eg8mRc1Pb45rcvh0OcKpXgR5Ox6GMqjRb"
			+ "kzUzWik0K0602w7XTQaHzm5ur4Cq2BY7YDIFXzFyYvh/g5eLBiFg2E4qUQCwJvTUV3a"
			+ "qUwPeo47ofOJUKNtMpvIuBVj18fqylMXHZ4w0sqDX2KVZvn1Is9neTWiXrsZxigcWpR"
			+ "gNNJv1Cl7NugR179eBIMr4+koiEILEWhHQ09OuxJvs0qBimq7ZkEgge4Dg8lAdpvZGl"
			+ "0Hl2T1GgsxptcJaNW0kJ74vRNaBiW7TSWTCzDOg48tpWu9/JKTxIEmQF7w8CkMmAS0X"
			+ "WX9xSdBs3RBYe55ifLh6dkMS4R+IjU2dOPPwbFDBasLAExZLvVVpnQUygqQCQFO9B57"
			+ "h3stTkRZEIElPlKqBuqjKdMRt1pWCCotFPBx81mQstzfvb4x11xX+7lueapmIRM+SKA"
			+ "VjVZlmMHbE7pnG1ikSpEAYLuoG+w3fwuQGEVC0OXn1Jb7VyzS/sdwNhxXeqrH8dng3v"
			+ "Ail1716Rh1MOyw1cLCJBJE5zpEaMSCFS9edn3z6pmVvayvjuVN/1jO8AC8Mcaiy95SI"
			+ "bUcBiwNoqOCUh+nxZwQTar+RCE6iQDrEgdqRmtf/KE0WyDLZ0GlbODe0GAzGAkRHfbi"
			+ "i5DhEUQo7bLVfR1p8LK04jYXPeFCDli+6RR7jpuUIbLvJRDH722VY9E/WYN9LRUultY"
			+ "CR/5Wby7vF6x/dosoCsUW+QDJvzpgSpXPz40k6qaiAE9CikR68Wz16uB51iADOk3thV"
			+ "8/XRWvsFUDPz3/X3l3/R3d2A5jRxMk02daB0/pKneWN6zmq43yrYKygmXvdaloZH6yq"
			+ "e2rNw4sAOH8TlJeDlcHB87ENJENFtuEKtqUf5NNG+0+7t9MtM0+7KkUIhCZvR94m7ET"
			+ "SKHkwKvTY98kHvThPPt+anUnvPtbfv/VdIPzMwXB9Ab4RcCUI5IuhVAsVWJn1W7/nhG"
			+ "hRjwUhIxnvr9SLs9GxRZLkLcr8GzvPRxd3x3OFlWlOtWqHQeRDF1vHAj31uF7CEzPZ9"
			+ "2WKVMq02bCcbvisgZJ+7rW0f9xAhh34fGjtAQ8p31Qe2vXnwdtuFTu+2tzrmMwVmPhi"
			+ "Os4HgujEUjlkkQryaazPP6SO8Xb+RBjWtLKYSv8QK5pSz5quy6tL0s90v33S0PJD5vx"
			+ "+Yf3I2b6jnvHPNHyh7Rq3aY4rwkBcXgKQkEBSS7YF/BBgA7WznZ6gj090AAAAASUVOR"
			+ "K5CYII=";
	image['MINIMIZE'] = "data:image/png;base64,"
			+ "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAQCAYAAAABOs/SAAAABGdBTUEAAK/INwWK6QAAAB"
			+ "l0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGASURBVHjaYlyyYMVMdnb2"
			+ "NFYWFgYWIGZkYmKgBfj/7x/Dnz9/GH4D8c+fP2cBBBALDzd3Mhc3NwMHOwcDCysrAzONLP"
			+ "4Lsvj3b4YfP38wfPv6NRkggFiAljLz8PAycHFyMrCxsjEwA31NE4uBPv31+xcDy3dWEJcZ"
			+ "IIBYQD4FWcrFBfE1MzMTAyMjI3WD+f9/hr9//4F9CwIgnwMEEAsoeEE+BVnKzsHOwMJMGx"
			+ "//+fsHYSnQToAAYgHFKSh4QT4FWcpCo6AGW8r8G2IX0E6AAIKnJGoHLzaAbAdAADExDBAA"
			+ "CKABsxgggPBG6OUrlxjOnjtDsqG6OnoMxkYmeNUABBBei/fs3cXQ0FJHssWF+SUELQYIIL"
			+ "wW6+rqMyTEJZFssbGhCUE1AAHEgpzJ0YGLkysYU7MggQGAAGIBlaGg4gxUssAyOa0KEJAd"
			+ "YLuAdgIEEAuwJPkLLEOZ4cUZMJPTssgEldcgOwECiAXIWQYsuGNhxRmtK4lv37+DHLAMIM"
			+ "AAhwiVy91Y0KAAAAAASUVORK5CYII=";
	image['MAXIMIZE'] = "data:image/png;base64,"
			+ "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAQCAYAAAABOs/SAAAABGdBTUEAAK/INwWK6QAAABl"
			+ "0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF1SURBVHjaYlyyYMVMdnb2NF"
			+ "YWFgYWIGZkYmKgBfj/7x/Dnz9/GH4D8c+fP2cBBBALDzd3Mhc3NwMHOwcDCysrAzONLP4Ls"
			+ "vj3b4YfP38wfPv6NRkggFiAljLz8PAycHFyMrCxsjEwA31NE4uBPv31+xcDy3dWEJcZIIBY"
			+ "QD4FWcrFBfE1MzMTAyMjI3WD+f9/hr9//4F9CwIgnwMEEAsoeEE+BVnKzsHOwMKM8LGwJB9"
			+ "FFr59/gnO/vP3D8JSoJ0AAcQCilNQ8IJ8CrKUBUtQz5kxnyQLUzISwTS6WX+Yf0PsAtoJEE"
			+ "BwGXzBGxocTpbF6ADZDoAAok0SJgIABNCAWQwQQANmMUAADZjFAAFEVGmxeu1KqlsMEEAsy"
			+ "Jmc1FRKTkECAwABxAIqQ0HFGahkgWVybAUAOQBUKSAXICA7wHYB7QQIIBZgSfIXWIYyw4sz"
			+ "YCanZZEJKq9BdgIEEAuQswxYcMfCijNaVxLfvn8HOWAZQIABACNVl3Dbv9rRAAAAAElFTkS"
			+ "uQmCC";
	image['LOADING'] = "data:image/gif;base64,"
			+ "R0lGODlhEAAQAPfgAP////39/erq6uvr6+jo6Pn5+dPT0/v7+/X19efn5/Pz8/j4+Pf39/r6+vz8"
			+ "/MzMzO/v7/b29svLy/7+/unp6e7u7kJCQtnZ2fHx8a+vr4mJid7e3s/PzyYmJrOzs/Dw8NLS0vT0"
			+ "9Le3t9ra2tvb25CQkKOjo2tra9DQ0KysrM3Nza2traurq729vezs7M7OzuHh4fLy8rq6und3d6Cg"
			+ "oIGBgYCAgGRkZGJiYsPDw8fHx4eHh+Dg4J+fn6KiooiIiG9vb6enp9fX18DAwOXl5d3d3e3t7WBg"
			+ "YJmZmZOTk9/f30VFRebm5jQ0NBUVFQQEBNjY2ISEhOTk5K6urtzc3D8/P2dnZ8LCwpubm8jIyLm5"
			+ "uZqamiEhIcTExC0tLbCwsIyMjNXV1dHR0VxcXOPj40lJSTw8PGxsbExMTCwsLF9fXxAQEMnJyRYW"
			+ "FpSUlCIiIhsbGwgICAsLC11dXVhYWJGRkba2try8vMbGxr+/v7i4uDs7O76+vmFhYYaGho2NjbW1"
			+ "tZeXl4qKiiQkJKmpqYODg0ZGRk9PT3Z2dgkJCTo6OkFBQY+Pjx8fH3l5eRMTEw8PDyoqKrGxsWho"
			+ "aHNzcwcHB7KysqGhoYKCgkpKSmVlZXFxcaioqE1NTeLi4p2dnaampqSkpJ6ensXFxVNTU7S0tFZW"
			+ "VjExMVlZWaWlpVRUVDAwMCgoKFBQUKqqqg0NDUNDQxkZGT09PUdHR3p6ehISEgICAsHBwURERDU1"
			+ "NZKSkm1tbTk5OWlpaRwcHFJSUtTU1DMzMyAgIH5+fiMjI3JycnR0dA4ODkhISMrKynx8fJiYmAYG"
			+ "BnV1dU5OTgMDA4WFhR4eHgoKCpycnC8vL1paWmNjYzc3N7u7u4uLiycnJ3t7e15eXhoaGjY2NkBA"
			+ "QP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
			+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA"
			+ "AAAh+QQFAADgACwAAAAAEAAQAAAIpQDBCRxIsGDBF1FwOQEQwEEAg+B6XJMT5wmAAwwiFCjo480j"
			+ "TVOYAJhQAEMFBgPFLOomyCADAQI2gqvDBQhEcBVgVBA4p4OImyFIeBIoy4uAmwcMhBFoocmAmw0k"
			+ "cBB4Yk+emwJyGBDYw8KPmyhkbBB4wUonTgYNTBnyYaCeMaiQqMCg4EILGimKFLzj6MYZRDY0JGFx"
			+ "AaISD0lqaEil4+jNxwIDAgAh+QQFAADgACwBAAEADgAOAAAImwDBCTRQx1SkDmj8qBDIkIUzbVzg"
			+ "OFkj59QWhhmqrJohggKBLzgqrQEADsocRRcZCqwBIMAEHxaiqFQZoMCBGWWuzGQYAAGDOa0q7BQ4"
			+ "4cOHG3QgDAUXQMCAHUckLEVAZoClSTSWJqBSAcYOY3d2EhFThAE4HTVsWBqBIAKTMKNeuGD4AAkY"
			+ "N5+CfNGSjMDMBDokgVqRY0QMhgEBACH5BAUAAOAALAEAAQAOAA4AAAiZAMEJHOEDCDILOJKAEMhQ"
			+ "xpkyFvY08dLBkAmGfPqo+nPFxQAtlBp1oAGOhzI1KRgy/NOG1wtAk6apVGnlGDQ3QDjMZJgh0RJM"
			+ "M2LsFJjgSRsNNhQMBQegaaofUJYGOOAATwkZSxdEOECBExYUOxFUUBAAnBBQQSQkKNAAgwAiAxYw"
			+ "JCHDg4wcEgyQYIJgJoQRKrJwKOJCrsCAACH5BAUAAOAALAEAAQAOAA4AAAiZAMEJhOFBg5UjtExA"
			+ "Ecgwy48TN8aoQrNETQaGDwrNMKECQoUufsx8YwEuwZYafBgyxHLqkAEdYDyoVDmjQ50MSUbMZChC"
			+ "mCkTWBDsFEghFitCJiIMBUfg0aA8LKQszfAqkxAPKJYeiRPlw6gWPHZOsOXlATgieLLwwOAgQIMC"
			+ "DQIsY0ghDIgLPBIYUbAgwEwEAqSQoYChL8OAACH5BAUAAOAALAEAAQAOAA4AAAiZAMEJFMDGFSMN"
			+ "SPTAEMjwwopAJX7YmAGkxhCGRVJcykNCgQIQlzRZuQPuQ4sUBhgyzIAKCAkqdl6oVFkCTSgOLQjM"
			+ "ZJhjySY2XQrsFOjCTBkOEhoMBTegiQUqIDAs1ZKmz4ALOoduGqRrARkYMXYKggMLBLgQCQSEODAB"
			+ "wAprtd74YMjgA4YIBwA8SeStx0wHBQrktVBIBcOAACH5BAUAAOAALAEAAQAOAA4AAAibAMEJjEFF"
			+ "R6kVIh5QEMiQwIMWdjIE6RHIBwqGLl7gEUKAQQQl2MCAeQCOAQkURBgyzGGjBBkjF1KqZEiIkggC"
			+ "GxTMZIjixJ8EUhzsFPgBx4kBAgIMBQeBzo0YEBos7XJo24IQBZb6MRQqQIECE3Zu2aMGCrgAAQBw"
			+ "m5KAAKBm1KpkYAggDTNpkJz4ItaJxcwHhWZx6UCqhAGGAQEAIfkEBQAA4AAsAQABAA4ADgAACJkA"
			+ "wQksYAQGMA4GlGAQyBABgQ0XQEjo0uKKEoYLBjBxoeBAgwEGPEgiAc5BDCMIGDIUEuTLgAYhIqhU"
			+ "eQWLhAYMHMxkWCQJCwcHAOwUGEJDCQBIh4JTYEPDoicplIpBhARTHBxKRZ0RoSIYpB87UxwZxgOc"
			+ "qEZtdtkRMGBItl99+DCkUSXaoDRNzCzpJWOmmBJjzFg4QWMEw4AAIfkEBQAA4AAsAQABAA4ADgAA"
			+ "CJkAwQmc0AABhAEDICwQyHCCAwYhIAiQsmFDBYZIAAQ44GBCgAgUwhgQAO6Bl2cAGDIkIIGDgiiV"
			+ "jqhUOWLIhjJypsxkSEFLljdrEuwUuOALoA5OCAwFFyHIClJwSi3d8EkEIy7FlupxIwFEpkiBdg7Z"
			+ "0UMpIUW5atwyAuGBCUc7XjBcUa2KoUN0cJwQxGamEBqIxtzY4cETw4AAOw==";
}
function loadStyle() {
	var styleText = "tr.inactive{font-style:italic; color:gray;}";
	GM_addStyle(styleText);
}
//window.addEventListener('DOMContentLoaded', main, false);
if (document.body) {
	main();
}
//window.onload=function(){main();};
