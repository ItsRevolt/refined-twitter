// Saves options to chrome.storage
function save_options() {
  var nightModeToggleKeybind = document.getElementById('nightModeToggleKeybind').value;
  var momentToggleDisplayKeybind = document.getElementById('momentToggleDisplayKeybind').value;
  var retweetToggleDisplay = document.getElementById('retweetToggleDisplay').checked;
  var promotedToggleDisplay = document.getElementById('promotedToggleDisplay').checked
  var followToggleDisplay = document.getElementById('followToggleDisplay').checked
  var originalImageToggleDisplay = document.getElementById('originalImageToggleDisplay').checked
  var trendsBoxToggleDisplay = document.getElementById('trendsBoxToggleDisplay').checked
  var uselessNotifsToggleDisplay = document.getElementById('uselessNotifsToggleDisplay').checked
  chrome.storage.sync.set({
    'nightModeToggleKeybind': nightModeToggleKeybind,
    'momentToggleDisplayKeybind': momentToggleDisplayKeybind,
    'retweetToggleDisplay': retweetToggleDisplay,
    'promotedToggleDisplay': promotedToggleDisplay,
    'followToggleDisplay': followToggleDisplay,
    'originalImageToggleDisplay': originalImageToggleDisplay,
    'trendsBoxToggleDisplay': trendsBoxToggleDisplay,
    'uselessNotifsToggleDisplay': uselessNotifsToggleDisplay
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function () {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get([
    'nightModeToggleKeybind',
    'momentToggleDisplayKeybind',
    'retweetToggleDisplay',
    'promotedToggleDisplay',
    'followToggleDisplay',
    'originalImageToggleDisplay',
    'trendsBoxToggleDisplay',
    'uselessNotifsToggleDisplay'
  ], function (items) {
    document.getElementById('nightModeToggleKeybind').value = items.nightModeToggleKeybind
    document.getElementById('momentToggleDisplayKeybind').value = items.momentToggleDisplayKeybind
    document.getElementById('retweetToggleDisplay').checked = items.retweetToggleDisplay
    document.getElementById('promotedToggleDisplay').checked = items.promotedToggleDisplay
    document.getElementById('followToggleDisplay').checked = items.followToggleDisplay
    document.getElementById('originalImageToggleDisplay').checked = items.originalImageToggleDisplay
    document.getElementById('trendsBoxToggleDisplay').checked = items.trendsBoxToggleDisplay
    document.getElementById('uselessNotifsToggleDisplay').checked = items.uselessNotifsToggleDisplay
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
