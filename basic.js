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
//
//
async function testfill(){
	console.log('attempt fill')
	const emailEl = document.getElementById("input-4");
	const pass1 = document.getElementById("input-5");
	const pass2 = document.getElementById("input-6");
	var pass = 'fakEpass1!@';
	emailEl.value = 'fakeEmail123@gmail.com';
	pass1.value = pass;
	pass2.value = pass;

	await promiseToWait();
	//attempt click. 
	const submit = document.getElementsByClassName('css-6hfcb0');
	console.log(submit);
	await submit[0].click();
	emailEl.value = 'fakeEmail123@gmail.com';
	pass1.value = pass;
	pass2.value = pass;
	
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
delaystart();
//testfill()
