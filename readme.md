# <img src="source/icon2.png" width="45" align="left">Revolt Twitter - Refined Twitter Fork

> Browser extension that simplifies the Twitter interface and adds useful features

## Install

Please follow the below steps:

```sh
git clone https://github.com/ItsRevolt/refined-twitter/
cd refined-twitter
npm i    # Install dev dependencies
npm run build  # Build the extension code so it's ready for the browser
```

Once built, load it in the browser of your choice:

<table>
	<tr>
		<th>Chrome</th>
		<th>Firefox</th>
	</tr>
	<tr>
		<td width="50%">
			<ol>
				<li>Open <code>chrome://extensions</code>
				<li>Check the <strong>Developer mode</strong> checkbox
				<li>Click on the <strong>Load unpacked extension</strong> button
				<li>Select the folder <code>refined-twitter/distribution</code>
			</ol>
		</td>
		<td width="50%">
			<ol>
				<li>Open <code>about:debugging#addons</code>
				<li>Click on the <strong>Load Temporary Add-on</strong> button
				<li>Select the file <code>refined-twitter/extension/manifest.json</code>
			</ol>
		</td>
	</tr>
</table>

## Highlights

- Simplified and improved UI.
- Improved performance. [1](https://github.com/sindresorhus/refined-twitter/pull/14) [2](https://github.com/sindresorhus/refined-twitter/commit/23897e251d2bc8d59526129ce54c7a5bf1ef884c)
- Configurable shortcut keys. <kbd>Shift</kbd> <kbd>?</kbd> to view.
- Dark Mode Toggle.
- Hides "Promoted" tweets in the stream. `Configurable`
- Hides "Liked" tweets in the stream. `Configurable`
- Hides "Retweeted" tweets in the stream. `Configurable`
- Auto-loads new tweets in the stream if you're scrolled to the top. No more clicking `See 3 new Tweets`!
- [Embeds the photo from Instagram links directly in the tweet.](https://user-images.githubusercontent.com/170270/34315380-12d52994-e77f-11e7-8e23-27b76aee4df2.png)
- [Syntax highlighting in code blocks.](https://github.com/sindresorhus/refined-twitter/issues/37)
- Uses the original image in tweet image galleries instead of a downsized version.
- [Removes the annoying suggestions in the search popover.](https://user-images.githubusercontent.com/170270/33800304-70198358-dd3d-11e7-9870-477a44f74f4d.png)
- [Adds a `Likes` button to the main navbar](https://user-images.githubusercontent.com/14620121/35988497-ace9f93e-0ce5-11e8-8675-17e6ee38cd99.png)
- Hides "Notifications" activity for new followers and being added to a list.
- Prevents DM modal from closing when (accidentally) clicking outside the modal.
- Highlight your mentions in the stream

<img src="media/screenshot.gif" width="1272">

## Contribute

Follow same instructions as "install". Replace `npm run build` with `npm run watch` to automatically build when files change.


## Forked From

- [Refined Twitter](https://github.com/sindresorhus/refined-twitter)


## License

MIT
