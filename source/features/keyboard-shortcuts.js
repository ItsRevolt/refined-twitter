import { toggleMoment } from './toggle-moment'
import { toggleNightMode } from './toggle-nightmode'
import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});

export default () => {
	const customShortcuts = [
		{
			name: 'Actions',
			description: 'Shortcuts for common actions.',
			shortcuts: [
				{
					keys: [
						values.modifierKeybind,
						values.nightModeToggleKeybind
					],
					description: 'Toggle Night Mode'
				},
				{
					keys: [
						values.modifierKeybind,
						values.momentToggleDisplayKeybind
					],
					description: 'Toggle Moment Tab'
				}
			]
		},
		{
			name: 'Navigation',
			description: 'Shortcuts for navigating between items in timelines.',
			shortcuts: []
		},
		{
			name: 'Timelines',
			description: 'Shortcuts for navigating to different timelines or pages.',
			shortcuts: []
		}
	];

	document.addEventListener('keydown', event => {
		const keyName = event.key;
		switch (keyName) {
			case event[values.modifierKeybind] && values.nightModeToggleKeybind:
				toggleNightMode();
				break;
			case event[values.modifierKeybind] && values.momentToggleDisplayKeybind:
				toggleMoment();
				break;
			default:
				break;
		}
	});

	const initDataElement = document.querySelector('#init-data');
	if (initDataElement) {
		const initData = JSON.parse(initDataElement.value);
		const updatedShortcuts = [...initData.keyboardShortcuts];
		for (const [i, item] of updatedShortcuts.entries()) {
			item.shortcuts = item.shortcuts.concat(customShortcuts[i].shortcuts);
		}
		initData.keyboardShortcuts = updatedShortcuts;
		initDataElement.value = JSON.stringify(initData);
	}
};
