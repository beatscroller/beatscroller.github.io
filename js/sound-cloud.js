'use strict'

/**
 * Sound Cloud
 */

function SoundCloud() {
	this.menuWrapper = document.getElementById('menuWrapper');
	this.searchQueryElement = document.getElementById('searchQuery');
	this.resultsLoaderContainer = document.getElementById('searchResultsLoaderContainer');
	this.resultsPaneContainer = document.getElementById('searchResultsContainer');
	this.resultsPane = document.getElementById('searchResults');
	this.audioElement = document.getElementById('audio');
	this.nowPlayingContainer = document.getElementById('nowPlayingContainer');
	this.nowPlayingImage = document.getElementById('nowPlayingImage');
	this.nowPlayingTitle = document.getElementById('nowPlayingTitle');

	this.nowPlayingTitleText = '';
};

/**
 * Show menu
 */
SoundCloud.prototype.showMenu = function() {
	this.menuWrapper.style.display = 'block';
	this.searchQueryElement.focus();
};

/**
 * Hide menu
 */
SoundCloud.prototype.hideMenu = function() {
	this.menuWrapper.style.display = 'none';
};

/**
 * Show loaders
 */
SoundCloud.prototype.showLoader = function() {
	this.resultsLoaderContainer.style.display = 'block';
	this.resultsPaneContainer.style.display = 'none';
};

/**
 * Show results
 */
SoundCloud.prototype.showResults = function() {
	this.resultsLoaderContainer.style.display = 'none';
	this.resultsPaneContainer.style.display = 'block';
};

/**
 * Clear results
 */
SoundCloud.prototype.clearResults = function() {
	this.resultsPaneContainer.style.display = 'none';
	this.resultsPane.innerHTML = '';
};

/**
 * Clear text box
 */
SoundCloud.prototype.clearTextBox = function() {
	this.searchQueryElement.value = '';
};

/**
 * Set the now playing title
 */
SoundCloud.prototype.loadNowPlaying = function(trackId) {
	this.nowPlayingImage.src = '';
	this.nowPlayingTitle.innerText = '';

	var _this = this;
	var url = 'http://api.soundcloud.com/tracks/' + trackId + '.json?client_id=bbbb71ccc1f61f5eb6d933c3b4771396';

	$.getJSON(url, function(track) {
		_this.setNowPlaying(track.title, track.artwork_url);
	});
};

/**
 * Set the now playing title
 */
SoundCloud.prototype.setNowPlaying = function(title, image) {
	if (image) {
		this.nowPlayingImage.style.display = '';
		this.nowPlayingImage.src = image;
	} else {
		this.nowPlayingImage.style.display = 'none';
	}

	this.nowPlayingTitleText = title;
	this.nowPlayingTitle.innerText = title;
	this.nowPlayingContainer.style.display = 'block';
};

/**
 * Show now playing
 */
SoundCloud.prototype.showNowPlaying = function() {
	this.nowPlayingContainer.style.display = 'block';
};

/**
 * Hide now playing
 */
SoundCloud.prototype.hideNowPlaying = function() {
	this.nowPlayingContainer.style.display = 'none';
};

/**
 * Sound Cloud Search
 */
SoundCloud.prototype.search = function() {
	var _this = this;

	this.showLoader();
	this.url = 'https://api.soundcloud.com/tracks.json?client_id=bbbb71ccc1f61f5eb6d933c3b4771396&q=' + this.searchQueryElement.value;
	$.getJSON(this.url, function(tracks) {
		// Show Result pane and clear last results
		_this.clearResults();

		$(tracks).each(function(index, track) {
			if (track.kind == 'track') {
				var trackWrapper = document.createElement('li');
				var trackLink = document.createElement('a');

				if (track.artwork_url) {
					var trackImage = document.createElement('img');
					trackImage.src = track.artwork_url;
					trackLink.appendChild(trackImage);
				}

				var trackTitle = document.createElement('span');
				trackTitle.innerText = track.title;
				trackLink.appendChild(trackTitle);

				trackLink.addEventListener('click', function() {
					//Set the hash part
					window.location.hash = track.id;

					_this.audioElement.src = 'http://api.soundcloud.com/tracks/' + track.id + '/stream?client_id=bbbb71ccc1f61f5eb6d933c3b4771396';
					_this.audioElement.play();

					_this.clearResults();
					_this.hideMenu();
					_this.setNowPlaying(track.title, track.artwork_url);
				});


				trackWrapper.appendChild(trackLink);
				_this.resultsPane.appendChild(trackWrapper);
			}
		});

		_this.showResults();
	});

	event.preventDefault();
};