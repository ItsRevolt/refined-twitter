import { h } from 'dom-chef';
import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});

export const showMentionsTip = async () => {
    if (values.uselessNotifsToggleDisplay !== true) return
    if (document.querySelector('.ProfileHeading-toggle .NotificationsSettingsButton')) return
    const header = $('.ProfileHeading-toggle')

    header.append(
        <li class="NotificationsSettingsButton" data-element-term="all_notifications_toggle">
            <p class="ProfileHeading-toggleLink js-nav" data-nav="all_notifications_toggle" data-next-active-element=".js-nav[data-nav=all_notifications_toggle]">
                Only Mentions Are Shown By default <a href="">(?)</a>
            </p>
        </li>
    )
    if (document.body.classList.contains('NotificationsPage')) {
        const header = $('.ProfileHeading-toggle')

        header.append(
            <li class="NotificationsSettingsButton" data-element-term="all_notifications_toggle">
                <p class="ProfileHeading-toggleLink js-nav" data-nav="all_notifications_toggle" data-next-active-element=".js-nav[data-nav=all_notifications_toggle]">
                    Only Mentions Are Shown By default <a href="">(?)</a>
                </p>
            </li>
        )
    }
}