export default () => {
	var first_run = false;
if (!localStorage['ran_before']) {
  first_run = true;
  localStorage['ran_before'] = '1';
  chrome.storage.sync.set({
	'nightModeToggleKeybind': 'b',
	'momentToggleDisplayKeybind': 'm'
})
}
};
