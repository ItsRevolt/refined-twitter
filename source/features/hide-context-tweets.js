import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});
export const hideLikeTweets = () => {
	$('.tweet-context .Icon--heartBadge').parents('.js-stream-item').remove();
}

export const hidePromotedTweets = () => {
	if (values.promotedToggleDisplay == true) {
		$('.promoted-tweet').parent().remove();
	}
}

export const hideRetweets = () => {
	if (values.retweetToggleDisplay == true) {
		$('.tweet-context .Icon--retweeted').parents('.js-stream-item').remove();
	}
}

export const hideFollows = () => {
	if (values.followToggleDisplay == true) {
		$('.js-activity-follow').remove()
	}
}