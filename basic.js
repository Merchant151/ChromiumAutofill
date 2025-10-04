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
	emailEl.value = 'fakeEmail@email.lol';
}

///need away to wait for page to load before attempting fill
//not sure this solution works... want to do a wait loop
window.document.body.onload = function(){
	console.log('page run fill after load');
	testfill()
}
// wait >> CHECK for elems >> loop or run 
// function check
// 	{sleep
// 	if elm list populated 
// 		run project
// 	else check}
//testfill()
