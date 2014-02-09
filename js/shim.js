(function() {
	// audio context frame shim
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	// request animation frame shim
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();