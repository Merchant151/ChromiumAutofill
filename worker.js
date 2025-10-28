//service worker (for debug actions)

console.log('service worker is registered and active!');
chrome.runtime.onMessage.addListener((message,sender) =>{
	if (message.type === 'test'){
		console.log("service worker test successful",message.data);
		sendResponse({status: "complete"});
	}
	return false;

});

addEventListener("message",() => {
	console.log('recieved message from extension\'s JS: ${evemt.data}');

	event.source.postMessage("placeholder for debug button test!");
})
