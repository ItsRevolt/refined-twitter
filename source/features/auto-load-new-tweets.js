import {
	observeEl,
	isModalOpen
} from '../libs/utils';
import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});

export default function () {
	setInterval(function() {
		if (document.body.getBoundingClientRect().top < 20) {
			load()
		}
	}, values.autoLoadTweetTime * 1000)
}

function load () {
	const el = document.querySelector('.stream-container .stream-item')
		if (isModalOpen()) {
			return;
		} else {
			const threshold = 20;
			const offsetY = document.body.getBoundingClientRect().top;

			if (offsetY <= -threshold) {
				return;
			}

			const res = document.querySelector('.new-tweets-bar', el)
			if (res) {
				res.click()
			}
		}
	}