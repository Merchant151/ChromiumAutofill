//service worker (for debug actions)

console.log('service worker is registered and active!');
chrome.runtime.onMessage.addListener((message,sender) =>{
	if (message.type === 'test'){
		console.log("service worker test successful",message.data);
		//sendResponse({status: "complete"}); //LOL OK
		//find button here and then click
		//get tab and do action with active tab id 
		let xcord = 0;
		let ycord = 0;
		let tabID = getTab();
		const question = chrome.commands.getAll();//get all commands 
		console.log(question);
		//not actual command to send but testing debugger command to send
		await chrome.debugger.sendCommand({tabID},"Input.dispatchMouseEvent",{
			type: 'mousePressed' ,
			button: 'left',
			x : xcord,
			y : ycord,
			clickCount: 1,
			isTrusted : true
		});
		await chrome.debugger.sendCommand({tabID},"Input.dispatchMouseEvent",{
			type: 'mouseReleased' ,
			button: 'left',
			x : xcord,
			y : ycord,
			clickCount: 1,
			isTrusted : true
		});

	}
	return false;

});

async function getTab() {
	let tabs = await chrome.tabs.query({active: true,currentWindow: true});
	return tabs[0].id;//trying to return tabID
}
//This listenter is not in use.
/* 
addEventListener("message",() => {
	console.log('recieved message from extension\'s JS: ${evemt.data}');

	event.source.postMessage("placeholder for debug button test!");
})*/
