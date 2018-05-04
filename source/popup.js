// Saves options to chrome.storage
import OptionsSync from 'webext-options-sync';
new OptionsSync().syncForm(document.querySelector('form#options-form'));
function save_options() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function () {
      status.textContent = '';
    }, 2000);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
}
document.getElementById('save').addEventListener('click', save_options);

