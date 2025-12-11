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
async function testfill(){
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
	pass1.click();
	await clickAndClear(pass2);
	await simulateInput(pass2,pass);
	//pass2.value = pass;

	await promiseToWait();
	//TODO: get message submitted through event to service worker
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
	await delay(5999);
	let getElms = fieldIdentification();
	//console.log('printing getelms');
	console.log(getElms);
	
	//this will need to be pulled from local storage and eventually file storage. 
	//TODO: create user data storage soluiton
	const answerKey = {name: {0 : ["first", "first name","first"],1 : ["middle name"], 2 : ["last name"]}}
	const answerData = {name: ["Donald","John","Trump"], phone: ["202-456-1111"],address: ["1600 Pennsylvania Avenue NW"],["Washington, DC"],["District of Columbia"],["20500"]};
	const AnswerGroups= {main: answerData, peferred: {name: ["John","","Trump"]}}

	//I guess I should attempt a process elms method
	await processElms(getElms, answerData);

}

async function simulateInput(elmn,output){
	for (let i = 0; i < output.length;i++){
		await new Promise(resolve => setTimeout(resolve,50+Math.random()*100));
			elmn.value += output[i];
			elmn.dispatchEvent(new Event('input',{bubbles: true}));
			elmn.dispatchEvent(new Event('keyup',{bubbles:true}));
	}
	return new Promise(resolve => {console.log('simulate typekey');resolve('promised');});	
	
}

function clickAndClear(elmn){
	//these dispatch events did not help on thier own. 
	elmn.dispatchEvent(new PointerEvent('pointerdown',{bubbles: true}));
	elmn.dispatchEvent(new MouseEvent('click',{bubbles: true}));
	elmn.dispatchEvent(new KeyboardEvent('keydown',{key: 'a',code:'KeyA',ctrlKey:true}));
	elmn.dispatchEvent(new KeyboardEvent('keydown',{key: 'backspace',code:'KeyA',ctrlKey:true}));
	return new Promise(resolve => {console.log('resolving click+clear'); resolve('promised');})

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
function fieldIdentification(){
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
	 *	
	 *
	 * */
	var qArr = []
	var allElms = document.getElementsByTagName('*');
	for (let elm of allElms){ 
		var qElm = {html: undefined,parentGroup: undefined,isQ: false,qText: undefined,qTag: undefined,qType: undefined};
		qElm['html'] = elm
		if (elm.localName === "input"){
			//radial menu singles, dropdown selection, checkbox, text input, year/month picker
			//console.log(elm);
			if(elm.hasAttribute('type')&&elm.getAttribute('type') === 'text'){
				qElm['parentGroup'] = elm.closest('[role="group"]');
				qElm['isQ'] = true;
				qElm['qText'] = getInputLabel(elm);
				qElm['qTag'] = 'unused-fornow';
				qElm['qType'] = determineQType(qElm);
			}else if(elm.hasAttribute('type')&&elm.getAttribute('type')==='radio'){
				qElm['parentGroup'] = elm.closest('[role="group"]');
				qElm['isQ'] = true;
				qElm['qText'] = getInputLabel(elm);//TODO: MODIFY INCLUDE
				qElm['qTag'] = 'unused-fornow';
				qElm['qType'] = determineQType(qElm);
				qElm['option'] = getRadioOption(qElm);
	

			}
			qArr.push(qElm);

		}
		else if(elm.localName === "textarea"){
			//text area
			console.log('textarea found input processing not implemented!');
			console.log(elm);
		}else if (elm.localName === "button"){
			//
			console.log('button found input processing not implemented!');
		}
	}
	return qArr;

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
	
	}

	return 'unknown!';


}

function getInputLabel(elm){
	//TODO: maybe need to add other searches if they are found or I want this code to be reuseable
	let foundLabel = false;
	let closestDiv;
	//HARD STOP 
	//let cnt = 0 ;
	if (elm.hasAttribute('type')&&elm.getAttribute('type') === 'text'){
	do {
		closestDiv = elm.parentElement.closest('div');
		//let closestDiv = closestDiv.closest('div'); //two ansestors
		let lspan = closestDiv.querySelector('label span');
		let lsolo = closestDiv.querySelector('label'); //have to add solo label selector for some text.
		if (lspan){
			console.log('got an lspan');
			return lspan.textContent;
		}else if(lsolo&&lsolo.textContent){
			console.log('got a plain lable');
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

async function processElms(eArray,answerData){
	/// So we take a question and associate it to an answer key answers will be associated with multiple questions 
	for (eData of eArray){
		let type = eData['qType'];
		let question = eData['qText'];
		if (type == 'basicText'){
			console.log('question to answser = '+ question);
			//console.log('basic text is not implemented');
		}else{
			console.log(''+ type+' is not implemented');
		}

	}



}


async function pickBehavior(){
	//currently unused
	var answerData = {name: "Donald J Trump", phone: "202-456-1111",address: "1600 Pennsylvania Avenue NW; Washington, DC;District of Columbia; 20500"};
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
				}
			}

		}
	
	}
	switch(ident){
	case ("start"):
		//TODO: Login will be different if I have an account on the site. 
			// once I start using storage Login should be the first feature to tackle 
		console.log('got a match!!!');
		testfill();
		break;
	case("information"):
		//TODO: implement
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
