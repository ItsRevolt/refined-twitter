var momentToggleDisplayKeybind
var nightModeToggleKeybind
chrome.storage.sync.get([
	'nightModeToggleKeybind',
	'momentToggleDisplayKeybind'
], function(items) {
		momentToggleDisplayKeybind = items.momentToggleDisplayKeybind
		nightModeToggleKeybind = items.nightModeToggleKeybind
})
const toggleNightMode = () => {
	const nightmodeToggle = document.querySelector('.nightmode-toggle');
	if (nightmodeToggle) {
		nightmodeToggle.click();
	}
};
const toggleMoment = () => {
	const momentToggle = document.querySelector('.moments');
	if (momentToggle) {
		if (momentToggle.style.display !== "none") {
			momentToggle.style.display = "none"
			chrome.storage.sync.set({
				'momentToggleDisplay': 'none',
			})
		} else {
			momentToggle.style.display = "block"
			chrome.storage.sync.set({
				'momentToggleDisplay': 'block',
			})
		}
	}
};

export default () => {
	const customShortcuts = [
		{
			name: 'Actions',
			description: 'Shortcuts for common actions.',
			shortcuts: [
				{
					keys: [
						'Ctrl',
						nightModeToggleKeybind
					],
					description: 'Toggle Night Mode'
				},
				{
					keys: [
						'Ctrl',
						momentToggleDisplayKeybind
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
			case event.ctrlKey && nightModeToggleKeybind:
				toggleNightMode();
				break;
			case event.ctrlKey && momentToggleDisplayKeybind:
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
