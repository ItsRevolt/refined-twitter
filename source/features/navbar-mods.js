import {h} from 'dom-chef';
import {safeElementReady} from '../libs/utils';
import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});

export const likeButton = async () => {
	const navBar = await safeElementReady('#global-actions');

	// Exit if it already exists
	if (document.querySelector('.refined-twitter_like-button')) {
		return;
	}

	navBar.append(
		<li>
			<a role="button" data-nav="favorites" href="/i/likes" class="js-nav js-tooltip js-dynamic-tooltip refined-twitter_like-button" data-placement="bottom">
				<span class="Icon Icon--heart Icon--large"></span>
				<span class="text">Likes</span>
			</a>
		</li>
	);
};

export const redirectNotifications = () => {
	if (values.uselessNotifsToggleDisplay == true) {
		const notifications = document.querySelector('li.people.notifications a')
		notifications.setAttribute('href', 'https://twitter.com/mentions')
	}
}

export const cleanNav = async () => {
    const userDropdown = await safeElementReady('#user-dropdown');
	$(userDropdown).find('[data-nav="ads"], [data-nav="promote-mode"], [data-nav="help_center"]').parent().hide();
}