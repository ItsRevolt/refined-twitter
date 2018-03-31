// Saves options to chrome.storage
function save_options() {
    var nightModeToggleKeybind = document.getElementById('nightModeToggleKeybind').value;
    var momentToggleDisplayKeybind = document.getElementById('momentToggleDisplayKeybind').value;
    var retweetToggleDisplay = document.getElementById('retweetToggleDisplay').checked;
    chrome.storage.sync.set({
        'nightModeToggleKeybind': nightModeToggleKeybind,
        'momentToggleDisplayKeybind': momentToggleDisplayKeybind,
        'retweetToggleDisplay': retweetToggleDisplay
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get([
        'nightModeToggleKeybind',
        'momentToggleDisplayKeybind',
        'retweetToggleDisplay'
    ], function(items) {
      document.getElementById('nightModeToggleKeybind').value = items.nightModeToggleKeybind
      document.getElementById('momentToggleDisplayKeybind').value = items.momentToggleDisplayKeybind
      document.getElementById('retweetToggleDisplay').checked = items.retweetToggleDisplay
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
  