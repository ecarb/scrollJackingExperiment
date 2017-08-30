// dep


// IMPORTANT TODO:
// add event param to all functions below

// add some event listeners to the whole window
window.addEventListener('scroll', function(event) {
	console.log("scroll captured.");
});

// too loud shhhhh
/*window.addEventListener('message', function(event) {
	console.log("\nmessage: "+event.data+"\nfrom: "+event.origin+"/"+event.ports);
});*/

window.addEventListener('click', function(event) {
	console.log("\n\nTHERE WAS A CLICK\n\n");
});

window.addEventListener('onresize', function() {
	console.log("page size changed.");
});

window.addEventListener('onchange', function() {
	console.log("generic page changed.");
});

window.addEventListener('onemptied', function() {
	console.log("something happened with media.");
});

window.addEventListener('animationstart', function() {
	console.log("animation began.");
});

window.addEventListener('animationend', function() {
	console.log("animation ended.");
});

window.addEventListener('resize', function() {
	console.log('resize occured.')
});
/*
var getFrames = function () {
	// this should be working
	// can include a re to filter for disqus iframes
	var iframes = [];
	var temp = document.getElementsByTagName('iframe');
	for (var i=0; i < temp.length; ++i) {
		// if scrolling variable is unset or allowed
		if (!temp[i].scrolling || temp[i].scrolling !== 'no') {
			iframes.push(temp[i]);
		}
	}
	return iframes;
};
*/
// end of script
console.log('\n--------\ntest_injection.js has terminated.');
