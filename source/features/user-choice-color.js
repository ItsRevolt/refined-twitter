export default () => {
	const html = document.querySelector('html');
	const newTweetButton = document.getElementById('global-new-tweet-button');

	if (html && newTweetButton) {
		const bgColor = window.getComputedStyle(newTweetButton).backgroundColor;
		const userChoiceColorValues = /\((.*)\)/i.exec(bgColor)[1];

		html.style.setProperty('--refined-twitter_bgcolor-values', userChoiceColorValues);
	}
};
