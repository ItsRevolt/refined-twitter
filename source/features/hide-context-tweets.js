import OptionsSync from 'webext-options-sync';
import { getParents } from '../libs/utils'
var values
new OptionsSync().getAll().then(options => {
    values = options
});
export const hideLikeTweets = () => {
	if (values.likeToggleDisplay == true) {
	var el = document.querySelector('.tweet-context .Icon--heartBadge')
	if (el) {
		var parents = getParents(el, '.js-stream-item')[0]
		parents.parentNode.removeChild(parents)
		}
	}
}

export const hidePromotedTweets = () => {
	if (values.promotedToggleDisplay == true) {
		var el = document.querySelector('.promoted-tweet')
		if (el) {
		el.parentNode.removeChild(el)
		}
	}
}

export const hideRetweets = () => {
	if (values.retweetToggleDisplay == true) {
		var el = document.querySelector('.tweet-context .Icon--retweeted')
		if (el) {
		var parents = getParents(el, '.js-stream-item')[0]
		parents.parentNode.removeChild(parents)
		}
	}
}

export const hideFollows = () => {
	if (values.followToggleDisplay == true) {
		var el = document.querySelector('.js-activity-follow')
		if (el) {
		el.parentNode.removeChild(el)
		}
	}
}