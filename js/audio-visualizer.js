'use strict';

/**
 * Audio Visualizer
 */
function AudioVisualizer() {
	this.audioElement = document.getElementById('audio');
	this.context = new AudioContext();
	this.initialized = false;
	this.fttArray = null;
	this.audioBuffer = null;
	this.sourceNode = null;
	this.analyser = null;
	this.scriptNode = null;
	this.byteFrequencyData = null;

	this.initAudioNodes();
};

/**
 * Audio Visualizer Init Audio Nodes
 */
AudioVisualizer.prototype.initAudioNodes = function() {
	var _this = this;

	this.audioElement.addEventListener('play', function() {
		if (!_this.initialized) {
			// Setup a javascript node
			_this.scriptNode = _this.context.createScriptProcessor(2048, 1, 1);

			// Connect to destination, else it isn't called
			_this.scriptNode.connect(_this.context.destination);

			// Setup a analyzer
			_this.analyser = _this.context.createAnalyser();
			_this.analyser.smoothingTimeConstant = 0.6;
			_this.analyser.fftSize = 2048;

			// Create a buffer source node
			_this.sourceNode = _this.context.createMediaElementSource(_this.audioElement); //context.createBufferSource();
			_this.sourceNode.connect(_this.analyser);
			_this.analyser.connect(_this.scriptNode);
			_this.sourceNode.connect(_this.context.destination);


			// When script node is processing audio
			_this.scriptNode.onaudioprocess = function() {
				// get the average for the first channel
				var byteFrequencyData = new Uint8Array(_this.analyser.frequencyBinCount);
				_this.analyser.getByteFrequencyData(byteFrequencyData);


				var tempByteFrequencyData = []; 
				for (var i = 156; i < 256; i++) {
					tempByteFrequencyData.push(byteFrequencyData[i] / 256);
				}

				_this.byteFrequencyData = tempByteFrequencyData;
			}

			_this.initialized = true;
		}
	});
};