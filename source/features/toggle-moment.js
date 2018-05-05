import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});
export const getMomentDisplay = () => {
	const momentToggle = document.querySelector('.moments');
	if (momentToggle) {
	momentToggle.style.display = values.momentToggleDisplay
	}
}

export const toggleMoment = () => {
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