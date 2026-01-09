console.log('Hello, script is active on fourm pages.');

//TODO: 
//Identify what type of page I am on. Serch or application
//	-- later can determine multiple types of application pages like resume or EEO

//Psudo stuff
//fill dictionary
	//login stuff needs to exist separately or not at all
//for fourm item on page
//identify form
//if fourm identity in dictionary fill fourm with result.
//Made edits to include human like interactions. 
//
async function testfill(answerGroups,answerKey){
	console.log('attempt fill');
	const emailEl = document.getElementById("input-4");
	const pass1 = document.getElementById("input-5");
	const pass2 = document.getElementById("input-6");
	var pass = 'fakEpass2!@';
	emailEl.focus();
	emailEl.click();
	await clickAndClear(emailEl);
	let fourDigits = Math.floor(Math.random() * (9000))+1000;
	await simulateInput(emailEl,'fakeEmail'+fourDigits+'@gmail.com');
	pass1.focus();
	pass1.click();
	await clickAndClear(pass1);
	await simulateInput(pass1,pass);
	//pass1.value = pass;
	pass2.focus();
	pass2.click();
	await clickAndClear(pass2);
	await simulateInput(pass2,pass);
	//pass2.value = pass;

	await promiseToWait();
	const submit = document.getElementsByClassName('css-6hfcb0');
	submit[0].focus();
	await promiseToWait();
	//GETTING location as data to send to maual mouse click
	let rect = submit[0].getBoundingClientRect();
	let cords = {x:rect.left+rect.width/2,y:rect.top+rect.height /2};
	console.log("testing cords grabbing");
	console.log(cords);
	let buildMsg = {type:'test',data:'click action',x:cords.x,y:cords.y};
	
	console.log(buildMsg);
	chrome.runtime.sendMessage(buildMsg);
	//PAGE 2 TESTING 
	//TODO: Remove page two testing when I am ready to build a basic main page functionality. 
	await delay(8999);
	//TODO: Need a new way to check for added objects before submit
	await promiseToWait(1500); //adding an extra wait after load since all objects don't always load on pageload
	let getElms = fieldIdentification();
	//console.log('printing getelms');
	console.log(getElms);
	
	//this will need to be pulled from local storage and eventually file storage. 
	//TODO: create user data storage soluiton
	//
	//PLEASE COMMENT THIS OUT SO I DON"T HAVE TWO COPPIES 
	//const answerKey = {
	//	name: {0 : ["first", "first name","first"],1 : ["middle name"], 2 : ["last name"]},
	//	address:{0: ["address line 1","address line"],1:["city"],2:["state"],3:["zip","zip code","postal code"],4:["country"]},
	//	phone:{0:["phone number"],1:["phone extension"],2:["phone device type"],3:["country phone code"]},
	//	prefered:{0:["i have a preferred name"]},
	//	hearabout:{0:["how did you hear about us"]},
	//	previous:{0:["if you have previously worked at...","fakeMatch for testing"]}
	//}
	//const answerData = {
	//	name: ["Donald","John","Trump"], 
	//	phone: ["202-456-1111","","Mobile","United States of America(+1)"],
	//	address: ["1600 Pennsylvania Avenue NW","Washington, DC","District of Columbia","20500","United States of America"],
	//	prefered:[true],
	//	hearabout:["LinkedIn"],
	//	previous:["No"]
	//};
	//const answerGroups= {main: answerData, peferred: {name: ["John","","Trump"]}}
	//I guess I should attempt a process elms method
	await processElms(getElms, answerGroups,answerKey);
	await delay(4999);
	await promiseToWait(1000);
	getElms = fieldIdentification();
	console.log(getElms);//Re-id page three
}

async function simulateInput(elmn,output){
	for (let i = 0; i < output.length;i++){
		await new Promise(resolve => setTimeout(resolve,50+Math.random()*100));
			elmn.value += output[i];
			elmn.dispatchEvent(new Event('input',{bubbles: true}));
			elmn.dispatchEvent(new Event('keyup',{bubbles:true}));
	}
	return new Promise(resolve => {resolve('promised');});	
	
}

function clickAndClear(elmn){
	//these dispatch events did not help on thier own. 
	elmn.focus();//added here since this step is required for click to work. 
	elmn.dispatchEvent(new PointerEvent('pointerdown',{bubbles: true}));
	elmn.dispatchEvent(new MouseEvent('click',{bubbles: true}));
	elmn.dispatchEvent(new KeyboardEvent('keydown',{key: 'a',code:'KeyA',ctrlKey:true}));
	elmn.dispatchEvent(new KeyboardEvent('keydown',{key: 'backspace',code:'KeyA',ctrlKey:true}));
	return new Promise(resolve => {resolve('promised');})

}

///need away to wait for page to load before attempting fill
//not sure this solution works... want to do a wait loop
// wait >> CHECK for elems >> loop or run 
// function check
function promiseToWait(timeToWait = 1500) {
	//console.log('timeout set to return in '+timeToWait);
	return new Promise(due => setTimeout(due,timeToWait));
}

//TODO: replace delay start with delay
async function delay(waitTime = 1500,threashold = 190){
	var nameList = document.getElementsByTagName('*');
	//console.log('num elms on page: '+ nameList.length);
	await promiseToWait(waitTime);
	if(nameList.length > threashold){
		//console.log('page load wait pass at len: ' + threashold);
		return
	}else{
		//console.log('wait failed');
		return await delay(waitTime,threashold);
	}
}

//TODO: implement delayUntilNew as a method to load new page 
//THROW ERROR if all required inputs are not reached 
async function delayUntilNew(waitTIme = 1500,pageElms = document.getElementsByTagName('*')){
	//same recursive delay function but with previous page context loaded
}

//TODO: build field identification to grab all input feilds
//initally use after login but should also be applied on login screen
function fieldIdentification(prevArr = undefined){
	//I want to grab all elems on page 
	//grab all elms that are input feilds. 
	//Filter by feild type and sort into different arrays. 
	//get question for each feild and assocate with data
	//
	//Psudo code for what that may look like. 
	/*
	 * //data definition  ELMOBJ feilds? 
	 * 	html Elm //elm of input 
	 * 	parentGroup // grab parent group if exists 
	 * 	questionInput // bool for if this is for question or other input
	 * 	QuestionText // extract related input question
	 * 	QuestionTag // related question tag 
	 * 	ElemType // what type of input
	 *
	 * inputObj = {}
	 * allElms = document.body.getElementByTagName('*')
	 * for each e in allElmns
	 * for (let elm of allElms){ if (elm.localName === "input"){console.log(elm)}else if(elm.localName === "textarea")(console.log(elm))}
	 *	if e is input 
	 *		//maybe need case for type to append data
	 *		type = e.getTypeOfInput()
	 *		inputObj.append(e,type)
	 *		question = getTextAbove(e)
	 *		elmnarray.e.question = qeustion //associate data need to read up on how array data managed again
	 * */
	var qArr;
	if (!prevArr){
		qArr = [];
	}else{
		qArr = prevArr;
	}
	var allElms = document.getElementsByTagName('*');
	for (let elm of allElms){ 
		var qElm = {html: undefined,parentGroup: undefined,isQ: false,qText: undefined,qTag: undefined,qType: undefined,answered: false};
		qElm['html'] = elm
		// Check for elm in qArr
		if(qArr.some(qArr => qArr.html === elm)){
			console.log('element match prev elm in list breaking id process');
			break;
		}
		if (elm.localName === "input"){
			//radial menu singles, dropdown selection, checkbox, text input, year/month picker
			//console.log(elm);
			if (elm.hasAttribute('type')&&elm.getAttribute('type') === 'checkbox'){
				qElm['qType'] = determineQType(qElm);
				qElm['parentGroup'] = elm.closest('[role="group"]');
				qElm['isQ'] = true;
				qElm['qText'] = getInputLabel(qElm);
				//qElm['qTag'] = getAnswerGroup(qElm);

			}else if(elm.hasAttribute('type')&&elm.getAttribute('type') === 'text'){
				qElm['qType'] = determineQType(qElm);
				qElm['parentGroup'] = elm.closest('[role="group"]');
				qElm['isQ'] = true;
				qElm['qText'] = getInputLabel(qElm);
				//qElm['qTag'] = getAnswerGroup(qElm); 
				if (qElm['qType'] === 'dropdown'){
					let myParent = elm.parentElement;
					let childDropdown = myParent.querySelector('button');
					if (childDropdown.hasAttribute('aria-haspopup')&&childDropdown.getAttribute('aria-haspopup')==="listbox"){
						console.log('Dropdown found and IDed');
						qElm['html'] = childDropdown;
					}else{ console.log("Dropdown found but no dropdown elm IDed!");}
				}
			}else if(elm.hasAttribute('type')&&elm.getAttribute('type')==='radio'){
				qElm['parentGroup'] = elm.closest('[role="group"]');
				qElm['isQ'] = true;
				qElm['qText'] = getInputLabel(qElm);
				//qElm['qTag'] = getAnswerGroup(qElm);
				qElm['qType'] = determineQType(qElm);
				qElm['option'] = getRadioOption(qElm);
				//console.log("elm option is = "+ qElm['option']);
			}
			if (qElm['qText'] === 'unknown!'){ qElm['isQ'] = false;}
			qArr.push(qElm);

		}
		else if(elm.localName === "textarea"){
			//text area
			console.log('textarea found input processing not implemented!');
			console.log(elm);
		}else if (elm.localName === "button"){
			//createing save and continue for button. 
			if(elm.textContent){
				qElm['qText'] = elm.textContent;
				qElm['qType'] = determineQType(qElm);//REDUNDANT CODE 
				//OK gotten button
				if(qElm['qType'] === 'add'){
					qElm['parentGroup'] = elm.closest('[role="group"]'); 
					qElm['isQ'] = true;
				}else if (qElm['qType'] === 'back' || qElm['qType'] === 'next'){
					qElm['isQ'] = false;//redundant set by default
					qElm['parentGroup'] = 'page'
				}
				//qElm['qTag'] = getAnswerGroup(qElm); //TODO: FOR BUTTON LIKELY DOESN"T NEED TO BE DONE HERE 
				qArr.push(qElm);
			}else{
				console.log('text free button found and ignored!');
			}
		}
	}
	return qArr;
}
let globalGroupArray = []//GLOBAL GROUP ARRAY TODO: MOVE TO TOP OF FILE AFTER TESTING
function getAnswerGroup(qElm,ans, groupElm , allGroups,lookupType = 'add'){
	//get the answer key group for now we just use One
	//TODO: implement multiple groups 
	//TODO: create Global group state object so when retriggered I can set group +1 for a total
	//
	let selectedGroup = 'main';
	let match = 0; 
	let groupArray = globalGroupArray;
	let validGroups = []
	if (lookupType === 'question'){ // likely add a question type filter here
		//GET QUESTION MATCHES
		for (group in allGroups){ 
			//console.log('printing Group! for matching');
			//console.log(group);
			if(ans in allGroups[''+group]){
				console.log('found match g: '+group+' q: '+ans);
				match = match + 1; 
				validGroups.push(group);
			}
		}
	}else if (lookupType === 'add'){
		console.log('add button grouping not implemented!!!');
		
	}
	//GLOBALGROUP_OBJ { GROUP_ELM_TXT , ANSKEYGROUP , NUMBER }
	//
	//input question (from lookup answer will be passed in) 
	//IF question has multiple answers 
	// Associate parent or group by parent or group ELM  TODO: get from field ID process may need modification.
	// 	Associate Group Process - Assoicate with num
	groupObject = {}
	if (match > 1){
		//CHECK IF GROUP KEY is in OJBECT // THis check is for specific group in the global list 
		if (!groupArray[groupElm]){
			//CEHCK all other groups for matching group time
			//If group is matching create group with next iteration
			//if group is not matching create nerw group object with 0th iteratrion 
			let gMatch = 0
			for (each in groupArray){
				if(each['firstMatch'] == ans){
					gMatch = gMatch + 1
				}
			}

			//Attributes
			
			//iteration / gmatch + 1
			//firstMatch = matching question...
			//lookup type
			//rollover set
			groupObject['iteration'] = gMatch
			groupObject['lookup'] = lookupType 
			groupObject['firstMatch'] = ans
			//maybe add last match
			groupObject['rollover'] = false // this needs to become a ternary
			//groupElm = elm key
			
			//console.log(groupElm);
			//console.log(groupArray);
			//throw new Error('Throwing Error after adding: ' + groupObject)
			//take the number of matches
			//MATCHES is gMatches + 1
			let num_of_matched_groups = gMatch + 1;
			//take the itteration Iteration is gMatches + 1
			//if itteration is less than number of items or equal 
			let num_of_valid_groups = validGroups.length;
			//return itteration as index starting at zero 
			//if itteration is greater than number of items
			//return numbers index
			if (num_of_matched_groups >= num_of_valid_groups){
				groupObject['rollover'] = true;
				groupArray[groupElm] = groupObject
				throw new Error('ROLLOVER Scenario NOT implemented!');
			}else{
				groupArray[groupElm] = groupObject;
				return validGroups[gMatch]
				
			}
			
		}else {
			//return current validGroup[groupObject['number']]
			if(!groupArray[groupElm]['rollover']){
				return validGroups[groupArray[groupElm]['iteration']]
			}else{
				throw new Error('ROLLOVER GROUP NOT Implemented')
			}
		}
	}else {
		return validGroups[0]
	}
	
	// Set bool Rolover if number of groups exceedes number of answer groups
	let rollover = false;
	// return valid group of index and rollover bool 
	globalGroupArray = groupArray; //potentially redundent but import for my logic
	return "main";
}

function getRadioOption(qelm){
	//I noticed a design where radio type objects had matching ids with a text label.
	//instead of looping I am just going to go to where I think the parrent is and hope it doesn't break. 
	let e = qelm['html'];
	if (e.hasAttribute('id')){
		let id = e.getAttribute('id');
		let grandpa = e.parentElement.closest('div').parentElement.closest('div');
		let lsolo = grandpa.querySelector('label');
		if(lsolo&&lsolo.textContent && id === lsolo.getAttribute('for')){
			return lsolo.textContent;
		}else{
			console.log('radio found not identified requires refactor!');
			console.log('t: '+lsolo+' id: '+id+' grandpa'+ grandpa);
			console.log(grandpa);
		}
	}else{
		console.log('radio id failed no ID!'); return 'unknown';
	}
}


function determineQType(qelm){
	//TODO: current inprogress get types of input off of some distinqusing factor I guess.
	//TODO: may need to add processing for unknown once I have a user alert or user intervention system
	let e = qelm['html'];
	if (e.hasAttribute('type')&&e.getAttribute('type') == "text"){
		//basic text input elms have usually include an id while others may not vs dropdown boxes
		if(e.hasAttribute('id')){
			return 'basicText';
		}else{
			return 'dropdown';
		}
	}else if (e.hasAttribute('type')&&e.getAttribute('type') === 'radio'){
		return 'radio';
	}else if (e.hasAttribute('type')&&e.getAttribute('type') === 'checkbox'){
		return 'checkbox';
	}else if (e.tagName === "BUTTON"){
		if (e.textContent.toLowerCase() === "add"){
			return "add";
		}else if (e.textContent.toLowerCase() === 'back'){
			return "back";
		} else if (e.textContent.toLowerCase() === "save and continue"){
			return "next";
		}
	}
	return 'unknown!';
}

function getInputLabel(qElm){
	let elm = qElm['html'];
	let foundLabel = false;
	let closestDiv;
	let maxHops = 7;
	let home = elm;
	if (elm.hasAttribute('type')&&(elm.getAttribute('type') === 'text' || elm.getAttribute('type') === 'checkbox')){
	do {
		
		closestDiv = elm.parentElement.closest('div');
		//let closestDiv = closestDiv.closest('div'); //two ansestors
		let lspan = closestDiv.querySelector('label span');
		let lsolo = closestDiv.querySelector('label'); //have to add solo label selector for some text.
		//calculate closest common ansestor. 
		let distance = 0; 
		let hop = 0;
		//hops to closest
		let par = home;
		do {
			par = par.parentElement;
			hop = hop + 1;
			if(!par){
				console.error('ERROR found no ansestor');
				break;
				}
		} while (closestDiv !== par);
		distance  = hop;
		hop = 0;
		par = lspan;
		do {
			if(!par){
				hop = 1000;
				break;
				}
			par = par.parentElement;
			hop = hop + 1;
		} while (closestDiv !== par);
			
		let spanDistance = distance + hop;	
		hop = 0;
		par = lsolo;
		do {
			if(!par){
				hop = 1000;//force any unfound ansestors to be outofRange
				break;
				}
			par = par.parentElement;
			hop = hop + 1;
		} while (closestDiv !== par);
		let soloDistance = distance + hop;

		if (lspan){
			//console.log('span distance = ' + spanDistance);
			if(spanDistance >=maxHops){ break;}
			//console.log('got an lspan');
			return lspan.textContent;
		}else if(lsolo&&lsolo.textContent){
			//console.log('solo distance = ' + soloDistance);
			if(soloDistance >=maxHops){ break;}
			//console.log('got a plain lable');
			return lsolo.textContent;
		}
		elm = closestDiv;
		
	} while (closestDiv.closest('div'));
	}else if (elm.hasAttribute('type')&&elm.getAttribute('type') === 'radio'){
		//closest fieldset 
		//child is legend l span
		let llspan = elm.closest('fieldset').querySelector('legend label span');
		return llspan.textContent;
	} 
	return 'unknown!';

}

async function processElms(eArray,answerData,answerKey){
	/// So we take a question and associate it to an answer key answers will be associated with multiple questions 
	for (eData of eArray){
		//TODO: SET answer group programattically!
		let aGroup = "main";
		let type = eData['qType'];
		let question = eData['qText'];
		let elm = eData['html'];
		let response = undefined;
		let answer = undefined;
		if (question){
			answer = await lookupAnswer(question,answerKey);
			//console.log('bux ANSWER IS: ' + answer[1]);
			//answer is pos, questionName
			//Stored Response
			aGroup = getAnswerGroup(eData,answer[1],eData['parentGroup'],answerData,'question');
			if(answerData[aGroup] && answerData[aGroup][answer[1]] ){
				response = answerData[aGroup][answer[1]][answer[0]];
			}
			//console.log(response);
		}else if (type == 'add'){
			//adding an option for nonquestion add buttons
			aGroup = getAnswerGroup(eData,false,eData['parentGroup'],answerData,type);

		}
		if (type == 'basicText'){
			console.log('question to answser = '+ question);
			//console.log('basic text is not implemented');
			if (response){
				await promiseToWait(500); //Adding a delay to avoid misclicks after processing dropdowns
				await clickAndClear(elm);
				await simulateInput(elm,response);
				eData['answered'] = true;
			}

		}else if (type == 'radio'){
			let option = eData['option'].toLowerCase(); //to lower is inconsistent but for selection not typed answer
			console.log('question to answer = '+ question+ ' option: ' + option);
			if(response.toLowerCase() == option){
				//maybe this will work as radio selection??? 
				console.log("response is opt: " + response.toLowerCase()+" = " + option);
				await clickAndClear(elm);
				eData['answered'] = true;
			}
		}else if (type == 'dropdown'){
			console.log('question to answer = '+question);
			//drop down there is a button to click. not the input element. 
			//listbox opens with all options available for single drop down
			await clickAndClear(elm); // init drop down... 
			eData['answered'] = true;
			//find aria-activedescendant = elm.button.value
			//let descendant = '"'+elm.getAttribute("value")+'"';
			//console.log('elm:'+ elm);
			//console.log(elm);
			//console.log('descendant: '+descendant);
			let dropdownList = document.querySelector("[aria-activedescendant]");
			//get children 
			let listItems = dropdownList.children;
			//get child with response match. 
			let listSelection = undefined;
			for (item of listItems){
				if (item.textContent && item.textContent === response){
					listSelection = item;
					console.log('found dropdown answer in menu!');
					break;
				}

			}
			//if response click and clear.
			if (listSelection){
				//console.log(listSelection);
				await clickAndClear(listSelection);
				await promiseToWait(500);// DELAY FOR BASIC TEXT missclick issue
				eData['answered'] = true;
			}else{
				console.log('dropdown found but no known response found!');
				//await clickAndClear(elm);// Deseelct attempt 
				let randomcords = {x:30,y:150};
				let deselect = {type:'test',data:'click action',x:randomcords.x,y:randomcords.y};
				chrome.runtime.sendMessage(deselect);
				eData['answered'] = true;
				await promiseToWait(1500); //let debugger delselect box value shuold be reduced after testing

			}
		}else if (type == 'checkbox'){
			//if checkbox question anser is bool clickAndClear
			console.log('checkbox response is + ' + response);
			if (response === true){
				promiseToWait(500);
				clickAndClear(elm);
				eData['answered'] = true;
			}
		}else if (type == 'next'){
			console.log('goto next');
			promiseToWait(500);
			let cords = elmCords(elm);
			let buildMsg = {type:'test',data:'click action',x:cords.x,y:cords.y};
			chrome.runtime.sendMessage(buildMsg);
			promiseToWait(500);
		}
		else{
			eData['answered'] = true;
			console.log(''+ type+' is not implemented');
		}
	}



}

function remainderCheck(curlist){
	let newList = fieldIdentification(curlist);
	for ( data of newList){
		if(data['answer'] === false){
			return true;
		}
	}
	return false;

}

function elmCords(elm){
	let rect = elm.getBoundingClientRect();
	let cords = {x:rect.left+rect.width/2,y:rect.top+rect.height /2};
	return cords;
	
}

function lookupAnswer(question, answerKey){
	//question is str should match one of key arry objects
	//answer key is dict array like object name : ['1','last']
	let pos = 0;
	let que = undefined;
	//scrub question 
	question = question.replace(/[?!*]/g,"").toLowerCase();
	//console.log('bux lookup: '+ question);
	for (quetype in answerKey){
		//console.log('question is : '+quetype);
		for (index in quetype){
			//DEBUG IF
			//if(answerKey[quetype][index]){
				//debug specific question type;
			//	if(quetype == "checkbox"){
			//		console.log("bux "+answerKey[quetype][index].toString());
			//	}
				//console.log(answerKey[quetype][index]);
			//}
			if (answerKey[quetype][index]&&answerKey[quetype][index].includes(question)){
				//console.log('bux matched! for que + ' + question);
				//console.log(answerKey[quetype][index]);
				//console.log(answerKey[quetype][index].includes(question));
				pos = index;
				que = quetype;
				return [pos,quetype];
			}else if(answerKey[quetype][index]&&answerKey[quetype][index].toString().includes("...")){
				//implement an approximation search.... 
				let aproxSearchList = answerKey[quetype][index].filter(i => i.toString().includes("..."));//Nested arrays here would be bad!

				for (myStr of aproxSearchList){ 
					let strToSearch = myStr.substring(0,myStr.length - 3);
				
				//let matchLen = strToSearch.length;
				//DEBUG
					//console.log('SEARCHING: ' + question + "FOR: " + strToSearch);
				//This search matches substring of search string. 
					if(question.includes(strToSearch)){
						console.log("lookup matched a partial answer");
						pos = index;
						que = quetype;
						return [pos,quetype];

					}
				}
			}
		}
	}
	return [pos, que];
}


async function pickBehavior(){
	//currently unused
	//var answerData = {name: "Donald J Trump", phone: "202-456-1111",address: "1600 Pennsylvania Avenue NW; Washington, DC;District of Columbia; 20500"};
	const answerKey = {
		name: {0 : ["first", "first name","first"],1 : ["middle name"], 2 : ["last name"]},
		address:{0: ["address line 1","address line"],1:["city"],2:["state"],3:["zip","zip code","postal code"],4:["country"]},
		phone:{0:["phone number"],1:["phone extension"],2:["phone device type"],3:["country phone code"]},
		prefered:{0:["i have a preferred name"]},
		hearabout:{0:["how did you hear about us"]},
		previous:{0:["if you have previously worked at...","fakeMatch for testing"]}
	}
	const answerData = {
		name: ["Donald","John","Trump"], 
		phone: ["202-456-1111","","Mobile","United States of America(+1)"],
		address: ["1600 Pennsylvania Avenue NW","Washington, DC","District of Columbia","20500","United States of America"],
		prefered:[true],
		hearabout:["LinkedIn"],
		previous:["No"]
	};
	const answerGroups= {main: answerData, peferred: {name: ["John","","Trump"]}}
	//I guess I should attempt a process elms method
	//TODO: build out behavior
	//Identify page
	
	//var nameList = document.getElementsByTagName('*');
	//workday stores a step label in text.
	let stepHtml = document.getElementsByTagName('label');
	let ident = '';
	for (step of stepHtml){
		let text = step.textContent;
		//console.log('text found and testing:'+ text);
		if(text.toLowerCase().includes('current')){
			let sibCol = step.parentElement.children;
			//console.log(sibCol);
			//PLEASE FORGIVE THE SPEGHETTI 
			//TODO REFACTOR! 
			for (sibs of sibCol){
				if (sibs.matches('label')&&sibs.textContent.toLowerCase().includes('create account')){
					ident = 'start';
				}else if (sibs.matches('label')&&sibs.textContent.toLowerCase().includes('my information')){
					if (sibs.parentElement.getAttribute("data-automation-id").toLowerCase() === 'progressbaractivestep'){
						ident = 'information';
					}
				}
			}

		}
	
	}
	switch(ident){
	case ("start"):
		//TODO: Login will be different if I have an account on the site. 
			// once I start using storage Login should be the first feature to tackle 
		console.log('got a match!!!');
		testfill(answerGroups, answerKey);
		break;
	case("information"):
		await promiseToWait(1500); //adding an extra wait after load since all objects don't always load on pageload
		let getElms = fieldIdentification();

		console.log('loading information page when already signed in');
		await processElms(getElms, answerGroups,answerKey);//avoid reloading to login on refresh.
		//infoFill();
	case("application"):
		//TODO: implement
		//application():
	case("disclosure"):
		//TODO: implement
		//disclose();
	case("review"):
		//TODO: implement
		//application();
	default:
		//TODO: implement
		//unknown();
		console.log('not on sign up page. Script does nothing.')
}
}

async function entryPoint(){
	//TODO: 
	//while loop
	//delay start on elm count 
	//pick behavior 
	//Save results? 

	await delay();//delay script will work as delay start does except enter testfill
	console.log('got here');
	await pickBehavior();
}
entryPoint();
//testfill()
