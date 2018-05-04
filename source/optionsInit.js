import OptionsSync from 'webext-options-sync';
new OptionsSync().define({
    defaults: {
        modifierKeybind: 'ctrlKey',
        nightModeToggleKeybind: 'b',
        momentToggleDisplayKeybind: 'm',
        retweetToggleDisplay: false,
        promotedToggleDisplay: true,
        followToggleDisplay: true,
        originalImageToggleDisplay: true,
        trendsBoxToggleDisplay: false,
        uselessNotifsToggleDisplay: true
    }
});