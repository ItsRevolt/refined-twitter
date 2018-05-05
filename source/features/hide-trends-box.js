import OptionsSync from 'webext-options-sync';
var values
new OptionsSync().getAll().then(options => {
    values = options
});
export const hideTrendsBox = () => {
	if (values.trendsBoxToggleDisplay == true) {
		var el = document.querySelector('.module.trends')
		el.parentNode.removeChild(el)
	}
}