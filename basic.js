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
	const emailEl = document.body.getElementById("input-4");
	emailEl.value = 'fakeEmail@email.lol';
}

testfill()
