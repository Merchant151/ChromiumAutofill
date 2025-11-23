console.log('Hello, script is active on fourm pages.');

//TODO: 
//Identify what type of page I am on. Serch or application
//	-- later can determine multiple types of application pages like resume or EEO

//Psudo stuff
//fill dictionary
	//login stuff needs to exist separately or not at all
//for fourm item on page
/*
const elements = document.querySelectorAll("input");
elements.forEach(function(){
	console.log('found element')

});*/
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
	await simulateInput(emailEl,'fakeEmail458@gmail.com');
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
	//attempt click.
	//TODO: get message submitted through event to service worker
	//
	//I believe service worker needs to be 
	///registered and then triggered so I will register here for now
	//	if(navigator.serviceWorker){//check if service workers are accessable
	//navigator.serviceWorker.register("worker.js");
	//navigator.serviceWorker.ready.then((eventmsg) => {registration.active.postMessage("message")});
	console.log("basic.js 51: register post event to service worker listner");
	const submit = document.getElementsByClassName('css-6hfcb0');
	console.log(submit);
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
//window.document.body.onload = function(){
	//console.log('page run fill after load');
	//testfill()
//}
// wait >> CHECK for elems >> loop or run 
// function check
function promiseToWait() {
	console.log('timeout set to return in 1500');
	return new Promise(due => setTimeout(due,1500));
}
async function delaystart(){
	var nameList = document.getElementsByTagName('*');
	console.log('list len is '+ nameList.length)
	await promiseToWait();
	console.log(nameList);
	if (nameList.length > 190 ){//likely needs to be changed to a contains check than a count!
		console.log('wait passed');
		testfill();
	}else{
		console.log('wait failed');
		delaystart();//this is a recursive function. 

	}
}
//TODO: replace delay start with delay
async function delay(){
	var nameList = document.getElementsByTagName('*');
	console.log('num elms on page: '+ nameList.length);
	await promiseToWait();
	if(nameList.length > 190){
		console.log('page load wait pass');
	}else{
		console.log('wait failed');
		delay();
	}
}

//TODO: build feild identification to grab all input feilds
//initally use after login but should also be applied on login screen
function feildIdentification(){
	//I want to grab all elems on page 
	//grab all elms that are input feilds. 
	//Filter by feild type and sort into different arrays. 
	//get question for each feild and assocate with data
	//
	//Psudo code for what that may look like. 
	/*
	 * inputObj = {}
	 * allElms = document.body.getElementByTagName('*');
	 * for each e in allElmns
	 *	if e is input 
	 *		//maybe need case for type to append data
	 *		type = e.getTypeOfInput()
	 *		inputObj.append(e,type)
	 *		question = getTextAbove(e)
	 *		elmnarray.e.question = qeustion //associate data need to read up on how array data managed again
	 *	
	 *
	 * */


}


async function pickBehavior(){
	answerData = {name: "Donald J Trump", phone: "202-456-1111",address: "1600 Pennsylvania Avenue NW; Washington, DC;District of Columbia; 20500"};
	//TODO: build out behavior
	//Identify page 
	switch(ident){
	case ("login signup"):
		//TODO: Login will be different if I have an account on the site. 
			// once I start using storage Login should be the first feature to tackle 
		testfill();
	case("information"):
		//TODO: implement
		infoFill();
	case("application"):
		//TODO: implement
		application():
	case("disclosure");
		//TODO: implement
		disclose();
	case("review"):
		//TODO: implement
		application();
	default:
		//TODO: implement
		unknown();
}
}

async function entryPoint(){
	//TODO: build this as start of script
	//while loop
	//delay start on elm count 
	//pick behavior 
	//Save results? 

}
delaystart();
//testfill()
