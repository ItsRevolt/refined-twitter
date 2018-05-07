import OptionsSync from 'webext-options-sync';
    new OptionsSync().define({
        defaults: {
            modifierKeybind: 'ctrlKey',
            nightModeToggleKeybind: 'b',
            momentToggleDisplayKeybind: 'm',
            momentToggleDisplay: 'block',
            retweetToggleDisplay: false,
            promotedToggleDisplay: true,
            followToggleDisplay: true,
            likeToggleDisplay: false,
            autoLoadTweetTime: 5,
            originalImageToggleDisplay: true,
            trendsBoxToggleDisplay: false,
            uselessNotifsToggleDisplay: true,
        }
    });