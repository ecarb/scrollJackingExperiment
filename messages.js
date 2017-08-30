
//// PhantomJS setup ////
var system = require('system');
var page = require('webpage').create();
var fs = require('fs');

// necessary to actually see console messages
page.onConsoleMessage = function(msg, lineNum, sourceId) {
	console.log(msg);
};


//// Commonly Used Variables ////
var news = 'http://www.newsmax.com/US/couple-buys-street-nancy-pelosi/2017/08/07/id/806317/';
var ouputFile = "listen2.txt";
/*dep
var finished = false; // whether loading has finished
var _messages = [];
var _frameNames = []; // names of frames that have had eventListeners attached to them
var _frames; // will be the list of iframe elements on page
*/

//// Main Logic ////
// allow this PhantomJS session to last only 60 seconds
setTimeout(function() {
	phantom.exit();
}, 60000);


// load the page
page.open(news, function(status) {
	if (status !== 'success') {
		console.log("loading failed.")
	} else {
		console.log("evaluate");
		// include jQuery
		page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
		//console.log(page);

		// this will capture messages (to/from the window only? or even to/from iframes?),
		// but the messages can be stored by console.log and redirected output
		//   e.lastEventId tends to be null
		page.evaluate(function(){
			window.addEventListener('message', function(e) {
				console.log(e.data+"\t"+e.origin+"\t"+e.source+"\t"+e.ports);
			});});

		// doesn't seem to be working properly
		page.evaluate(function(){
			var frames = document.getElementsByTagName('iframe');
			for (var i = 0; i < frames.length; i++) {
				frames[i].addEventListener('message', function(e) {
					parent.postMessage("iframe: "+e.data+"\t"+e.origin+"\t"+e.source+"\t"+e.ports, frames[i]);
				});
			}
		});

		// 500 times (*10msec = 5sec), set a short timeout to emulate an async while loop
/*dep	page.evaluate(function() {
			var frames;
			var frameNames = [];
			var messages = [];
			for (var j = 0; j < 500; j++) {
				setTimeout(function() {
					// populate frames
					frames = document.getElementsByTagName('iframe');
					console.log(frames.length);
					// for each frame, attach eventListener
					for (var i = 0; i < frames.length; i++) {
						console.log("this needs to run");
						// don't attach multiple eventListeners
						if (!(frames[i].name in frameNames)) {
							console.log("name: "+frames[i].name);
							frameNames.push(frames[i].name);
							frames[i].addEventListener('message', function(e) {
								//content = document.createTextNode(e);
								//span.appendChild(content);
								console.log("<<<<<<<<<listened");
								messages.push(e);
							});
						}
					}
				}, 10*j);
			}
		});*/

/*dep
		//var content; // dep populated by document method below

		// as early as possible, add event listeners to every iframe
		//dep setTimeout(function() {finished = true;}, 5000);
		
		while (!finished) {
			console.log('wtf2');
			// populate frames
			frames = document.getElementsByTagName('iframe');
			console.log(frames.length);
			for (i = 0; i < frames.length; i++) {
				console.log("this needs to run");
				// for each frame, attach eventListener
				if (!(frames[i].name in frameNames)) {
					console.log("name: "+frames[i].name);
					frameNames.push(frames[i].name);
					frames[i].addEventListener('message', function(e) {
						//content = document.createTextNode(e);
						//span.appendChild(content);
						messages.push(e);
					});
				}
			}
		}
		// do this once after finished===true  (with 1.5 sec delay)
		/*setTimeout(function() {
			console.log('frames timeout');
			frames = document.getElementsByTagName('iframe');
			for (i = 0; i < frames.length; i++) {
				// for each frame, attach eventListener
				if (!(frames[i].name in frameNames)) {
					frameNames.push(frames[i].name);
					frames[i].addEventListener('message', function(e) {
						//content = document.createTextNode(e);
						//span.appendChild(content);
						//span.innerHTML += "new entry\n\n" + e;
					});
				}
			}
		}, 1500);*/

		// dep
		// give jQuery a few seconds to load, then do stuff
		/*setTimeout(function() {
			// evaluate in context of page
			page.evaluate(function() {
				// get iframe names for frame switching
				var frameNames = [];
				var ff = document.getElementsByTagName('iframe');
				for (var m = 0; m < ff.length; m++) {
					frameNames.push(ff[m].name);
					console.log(ff[m].name);
				}
				// create span
				var span = document.createElement('span');
				span.id = "scrolljacking-experiment";
				// add all elements to span
				for (var i = 0; i < frames.length; i++) {
					frames[i].addEventListener("message", function(e) {
						span.innerHTML += e;
					});
				}
				// upon page finished loading
				$( document ).ready(function() {
					// add the span to the body
					console.log('add span');
					$( document.body ).append(span);
					// get all iframes, then attach eventListeners
					console.log('get frames');
					var frames = $('iframe');
					for (var i = 0; i < frames.length; i++) {
						frames[i].addEventListener("message", function(e) {
							console.log($(this));
						});
						$("#sjev1").append(frames[i].contentDocument.body.innerHTML+"   ");
					}
					for (var i = 0; i < frames.length; i++) {
						frames[i].contentWindow.postMessage("getIt", '*');
					}
						
				});
			});
		}, 7000);*/

/*dep	setTimeout(function() {
			fs.write(ouputFile, page.content, 'w');
			console.log('written.');
		}, 17000);*/
	}
});

// dep logic
function simulateMouseClick(selector) {
    var targets = document.querySelectorAll(selector);
    var evt = document.createEvent('MouseEvents');
    var i, len;
 
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    for ( i = 0, len = targets.length; i < len; ++i ) {
        targets[i].dispatchEvent(evt);
    }
}

