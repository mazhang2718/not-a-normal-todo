
chrome.alarms.onAlarm.addListener(function(alarm){
  chrome.storage.sync.set({'block': true});
  //console.log("hey");
})

chrome.storage.sync.set({'block': true});


function deny(){
	return {cancel: true};
}

function pass(){
	return {cancel: false};
}

chrome.storage.sync.get('block', 
	function(object) {
	  //console.log(object);
            // Notify that we saved.

        if (object.block){
			chrome.webRequest.onBeforeRequest.addListener(
				deny, 
				{ urls: ["*://*.facebook.com/*", "*://*.twitter.com/*"] }, 
				["blocking"]
			);
		}
		else{
			chrome.webRequest.onBeforeRequest.addListener(
				pass, 
				{ urls: ["*://*.facebook.com/*", "*://*.twitter.com/*"] }, 
				["blocking"]
			);	
		}
    }
);


chrome.storage.onChanged.addListener(function(changes, namespace) {

	let oldValue = changes["block"].oldValue;
	let newValue = changes["block"].newValue;

	if (oldValue != newValue){


        if (oldValue){
			chrome.webRequest.onBeforeRequest.removeListener(
				deny
			);

			chrome.webRequest.onBeforeRequest.addListener(
				pass, 
				{ urls: ["*://*.facebook.com/*", "*://*.twitter.com/*"] }, 
				["blocking"]
			);

		}
		else{
			chrome.webRequest.onBeforeRequest.removeListener(
				pass
			);

			chrome.webRequest.onBeforeRequest.addListener(
				deny, 
				{ urls: ["*://*.facebook.com/*", "*://*.twitter.com/*"] }, 
				["blocking"]
			);
		}
	}
});


setInterval(function(){
  chrome.storage.sync.get('futureTime',
    function(object){

      let differenceInSeconds = parseInt( (object.futureTime - Date.now())/(1000) );
      let differenceInMinutes = parseInt(differenceInSeconds / 60);


      if (differenceInSeconds < 0){
        chrome.browserAction.setBadgeText({'text':'0'});
        chrome.browserAction.setBadgeBackgroundColor({'color':[163, 70, 70,255]});
        chrome.storage.sync.set({'block': true});
      }
      else{
        if (differenceInMinutes < 60){
          chrome.browserAction.setBadgeBackgroundColor({'color':[69, 90, 165,255]});
          chrome.browserAction.setBadgeText({'text':differenceInMinutes.toString()});
        }
        else{
          chrome.browserAction.setBadgeBackgroundColor({'color':[69, 90, 165,255]});
          chrome.browserAction.setBadgeText({'text':''});
        }
      }
    })
}, 1000)
