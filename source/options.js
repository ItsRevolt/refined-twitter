// Saves options to chrome.storage
import OptionsSync from 'webext-options-sync';
new OptionsSync().syncForm(document.querySelector('form#options-form'));
function save_options() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function () {
      status.textContent = '';
    }, 2000);
}
document.getElementById('save').addEventListener('click',
  save_options);
