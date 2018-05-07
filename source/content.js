import 'babel-polyfill';
import domLoaded from 'dom-loaded';
import { observeEl, safeElementReady, safely } from './libs/utils';
import autoLoadNewTweets from './features/auto-load-new-tweets';
import inlineInstagramPhotos from './features/inline-instagram-photos';
import userChoiceColor from './features/user-choice-color';
import codeHighlight from './features/code-highlight';
import mentionHighlight from './features/mentions-highlight';
import { likeButton, redirectNotifications } from './features/navbar-mods';
import { getMomentDisplay } from './features/toggle-moment'
import { hideLikeTweets, hidePromotedTweets, hideRetweets, hideFollows } from './features/hide-context-tweets'
import { hideTrendsBox } from './features/hide-trends-box'
import keyboardShortcuts from './features/keyboard-shortcuts';
import renderInlineCode from './features/inline-code';
import onDMDialogOpen, { getConversationId } from './features/preserve-text-messages';
import { values } from './libs/utils'

function onDMDelete() {
	observeEl('#dm_dialog', async mutations => {
		const savedMessages = await browser.storage.local.get();
		const pendingRemoval = [];

		for (const mutation of mutations) {
			if (mutation.target.id === 'confirm_dialog') {
				const conversationId = getConversationId();
				document.getElementById('confirm_dialog_submit_button').addEventListener('click', function () {
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

	safely(likeButton);
	safely(getMomentDisplay);
	safely(hideTrendsBox);

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
	safely(keyboardShortcuts);
	safely(redirectNotifications);
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
	});
	safely(onDMDialogOpen);
	safely(onDMDelete);
}

init();
