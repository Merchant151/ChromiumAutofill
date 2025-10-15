//service worker (for debug actions)

chrome.runtime.onMessage.addListener((message,sender,sendResponse)
	if (message.type === 'test'){
		console.log("service worker test successful",message.data);
		sendResponse({status: "complete"});
	}

)
