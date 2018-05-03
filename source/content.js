import domLoaded from 'dom-loaded';
import { observeEl, safeElementReady, safely } from './libs/utils';
import autoLoadNewTweets from './features/auto-load-new-tweets';
import inlineInstagramPhotos from './features/inline-instagram-photos';
import userChoiceColor from './features/user-choice-color';
import codeHighlight from './features/code-highlight';
import mentionHighlight from './features/mentions-highlight';
import addLikesButtonNavBar from './features/likes-button-navbar';
import keyboardShortcuts from './features/keyboard-shortcuts';
import renderInlineCode from './features/inline-code';
import onDMDialogOpen, { getConversationId } from './features/preserve-text-messages';
var momentToggleDisplay
var retweetToggleDisplay
var promotedToggleDisplay
var trendsBoxToggleDisplay
var followToggleDisplay
var uselessNotifsToggleDisplay
chrome.storage.sync.get([
	'momentToggleDisplay',
	'retweetToggleDisplay',
	'promotedToggleDisplay',
	'followToggleDisplay',
	'trendsBoxToggleDisplay',
	'uselessNotifsToggleDisplay'
], function (items) {
	momentToggleDisplay = items.momentToggleDisplay
	retweetToggleDisplay = items.retweetToggleDisplay
	promotedToggleDisplay = items.promotedToggleDisplay
	followToggleDisplay = items.followToggleDisplay
	trendsBoxToggleDisplay = items.trendsBoxToggleDisplay
	uselessNotifsToggleDisplay = items.uselessNotifsToggleDisplay
})

function cleanNavbarDropdown() {
	$('#user-dropdown').find('[data-nav="ads"], [data-nav="promote-mode"], [data-nav="help_center"]').parent().hide();
}

function getMomentDisplay() {
	const momentToggle = document.querySelector('.moments');
	momentToggle.style.display = momentToggleDisplay
}

function hideLikeTweets() {
	$('.tweet-context .Icon--heartBadge').parents('.js-stream-item').remove();
}

function hidePromotedTweets() {
	if (promotedToggleDisplay == true) {
		$('.promoted-tweet').parent().remove();
	}
}

function hideTrendsBox() {
	if (trendsBoxToggleDisplay == true) {
		$('.module.trends').remove()
	}
}

function hideRetweets() {
	if (retweetToggleDisplay == true) {
		$('.tweet-context .Icon--retweeted').parents('.js-stream-item').remove();
	}
}

function hideFollows() {
	if (followToggleDisplay == true) {
		$('.js-activity-follow').remove()
	}
}

function hideUselessNotifs() {
	if (uselessNotifsToggleDisplay == true) {
		$('li.people.notifications').children('a').attr('href', 'https://twitter.com/mentions')
		console.log($('li.people.notifications').children('a'))
	}
}

function onDMDelete() {
	observeEl('#dm_dialog', async mutations => {
		const savedMessages = await browser.storage.local.get();
		const pendingRemoval = [];

		for (const mutation of mutations) {
			if (mutation.target.id === 'confirm_dialog') {
				const conversationId = getConversationId();
				$('#confirm_dialog_submit_button').on('click', () => {
					for (const id in savedMessages) {
						if (conversationId === id) {
							pendingRemoval.push(browser.storage.local.remove(conversationId));
						}
					}
				});

				break;
			}
		}

		await Promise.all(pendingRemoval);
	}, { childList: true, subtree: true, attributes: true });
}

async function init() {
	await safeElementReady('body');

	if (document.body.classList.contains('logged-out')) {
		return;
	}

	document.documentElement.classList.add('refined-twitter');

	safely(addLikesButtonNavBar);
	safely(getMomentDisplay);

	await domLoaded;
	onDomReady();
}

function onRouteChange(cb) {
	observeEl('#doc', cb, { attributes: true });
}

function onNewTweets(cb) {
	observeEl('#stream-items-id', cb);
}

function onSingleTweetOpen(cb) {
	observeEl('body', mutations => {
		for (const mutation of mutations) {
			const { classList } = mutation.target;
			if (classList.contains('overlay-enabled')) {
				observeEl('#permalink-overlay', cb, { attributes: true, subtree: true });
				break;
			} else if (classList.contains('modal-enabled')) {
				observeEl('#global-tweet-dialog', cb, { attributes: true, subtree: true });
				break;
			}
		}
	}, { attributes: true });
}

function onDomReady() {
	safely(cleanNavbarDropdown);
	safely(keyboardShortcuts);
	safely(hideTrendsBox);
	safely(hideUselessNotifs);
	safely(renderInlineCode);

	onRouteChange(() => {
		safely(autoLoadNewTweets);
		safely(userChoiceColor);

		onNewTweets(() => {
			safely(codeHighlight);
			safely(mentionHighlight);
			safely(hideLikeTweets);
			safely(inlineInstagramPhotos);
			safely(hidePromotedTweets);
			safely(hideRetweets);
			safely(hideFollows);
		});
	});

	onSingleTweetOpen(() => {
		safely(codeHighlight);
		safely(mentionHighlight);
		safely(inlineInstagramPhotos);
		safely(renderInlineCode);
	});
	safely(onDMDialogOpen);
	safely(onDMDelete);
}

init();
