import OptionsSync from 'webext-options-sync';

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
	chrome.storage.sync.set({
	'nightModeToggleKeybind': 'b',
	'momentToggleDisplayKeybind': 'm',
	'retweetToggleDisplay': 'false',
	'promotedToggleDisplay': 'true',
	'originalImageToggleDisplay': 'true'
})
	}
})
var originalImageToggleDisplay
chrome.storage.sync.get([
	'originalImageToggleDisplay'
], function(items) {
	originalImageToggleDisplay = items.originalImageToggleDisplay
})

browser.downloads.onDeterminingFilename.addListener((item, suggest) => {
	suggest({
		filename: item.filename.replace(/\.(jpg|png)_(large|orig)$/, '.$1')
	});
});

chrome.cookies.get({"url": "https://twitter.com", "name": "auth_token"}, function(cookie) {
	
});

if (originalImageToggleDisplay == true) {
browser.webRequest.onBeforeRequest.addListener(({url}) => {
	if (url.endsWith(':large')) {
		return {
			redirectUrl: url.replace(/:large$/, ':orig')
		};
	}
}, {
	urls: ['https://pbs.twimg.com/media/*']
}, ['blocking'])
}
