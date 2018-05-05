import { h } from 'dom-chef';
import select from 'select-dom';
import elementReady from 'element-ready';
import domLoaded from 'dom-loaded';
import OptionsSync from 'webext-options-sync';

/**
 * Prevent fn's errors from blocking the remaining tasks.
 * https://github.com/sindresorhus/refined-github/issues/678
 * The code looks weird but it's synchronous and fn is called without args.
 */
export const safely = async fn => fn();

/**
 * Automatically stops checking for an element to appear once the DOM is ready.
 */
export const safeElementReady = selector => {
	const waiting = elementReady(selector);

	// Don't check ad-infinitum
	domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()));

	// If cancelled, return null like a regular select() would
	return waiting.catch(() => null);
};

export const observeEl = (el, listener, options = { childList: true }) => {
	if (typeof el === 'string') {
		el = select(el);
	}

	if (!el) {
		return;
	}

	// Run first
	listener([]);

	// Run on updates
	const observer = new MutationObserver(listener);
	observer.observe(el, options);
	return observer;
};

export const domify = html => {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div;
};

export const getUsername = () => document.querySelector('.DashUserDropdown-userInfo .username > b').textContent;

export const isModalOpen = () => {
	function isVis(ele) {
		if (ele.style.display != 'none' && ele.style.visibility != 'hidden' && ele.offsetHeight > 0) {
			return (true);
		} else {
			return (false);
		}
	}

	const hasPermalinkOverlay = isVis(document.querySelector('#permalink-overlay'))
	const isDMModalOpen = isVis(document.querySelector('#dm_dialog'))

	return hasPermalinkOverlay || isDMModalOpen;
};

/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
export const getParents = (elem, selector) => {
	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Setup parents array
	var parents = [];

	// Get matching parent elements
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		// Add matching parents to array
		if ( selector ) {
			if ( elem.matches( selector ) ) {
				parents.push( elem );
			}
		} else {
			parents.push( elem );
		}

	}

	return parents;
}