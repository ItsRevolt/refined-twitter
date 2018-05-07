var originalImageToggleDisplay
import OptionsSync from 'webext-options-sync';
new OptionsSync().getAll().then(options => {
    originalImageToggleDisplay = options.originalImageToggleDisplay
});

browser.downloads.onDeterminingFilename.addListener((item, suggest) => {
	suggest({
		filename: item.filename.replace(/\.(jpg|png)_(large|orig)$/, '.$1')
	});
});

if (originalImageToggleDisplay == true) {
	browser.webRequest.onBeforeRequest.addListener(({ url }) => {
		if (url.endsWith(':large')) {
			return {
				redirectUrl: url.replace(/:large$/, ':orig')
			};
		}
	}, {
			urls: ['https://pbs.twimg.com/media/*']
		}, ['blocking'])
}