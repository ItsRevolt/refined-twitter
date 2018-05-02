// Saves options to chrome.storage
function save_options() {
  var retweetToggleDisplay = document.getElementById('retweetToggleDisplay').checked;
  var promotedToggleDisplay = document.getElementById('promotedToggleDisplay').checked
  var followToggleDisplay = document.getElementById('followToggleDisplay').checked
  var trendsBoxToggleDisplay = document.getElementById('trendsBoxToggleDisplay').checked
  chrome.storage.sync.set({
    'retweetToggleDisplay': retweetToggleDisplay,
    'promotedToggleDisplay': promotedToggleDisplay,
    'followToggleDisplay': followToggleDisplay,
    'trendsBoxToggleDisplay': trendsBoxToggleDisplay,
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function () {
      status.textContent = '';
    }, 2000);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get([
    'retweetToggleDisplay',
    'promotedToggleDisplay',
    'followToggleDisplay',
    'trendsBoxToggleDisplay',
  ], function (items) {
    document.getElementById('retweetToggleDisplay').checked = items.retweetToggleDisplay
    document.getElementById('promotedToggleDisplay').checked = items.promotedToggleDisplay
    document.getElementById('followToggleDisplay').checked = items.followToggleDisplay
    document.getElementById('trendsBoxToggleDisplay').checked = items.trendsBoxToggleDisplay
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

