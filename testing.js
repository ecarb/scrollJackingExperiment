
//// PhantomJS setup ////
var system = require('system');
var page = require('webpage').create();

//// Commonly Used Variables ////
var args = system.args.slice(1, system.args.length); // don't need 0th arg
var news = 'http://www.newsmax.com/US/couple-buys-street-nancy-pelosi/2017/08/07/id/806317/';
var injection_file = 'test_injection.js';

//// Listeners ////
// necessary to actually see console messages
page.onConsoleMessage = function(msg, lineNum, sourceId) {
	console.log(msg);
};
// too loud, muted
// network traffic
/*page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
};*/

//// Page Interactions ////
// simulate clicking in html, head and body elements
function simulateMouseClick(selector) {
    var targets = document.querySelectorAll(selector);
    var evt = document.createEvent('MouseEvents');
    var i, len;
 
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    for ( i = 0, len = targets.length; i < len; ++i ) {
        targets[i].dispatchEvent(evt);
    }
}

//// Queries ////
// get all iframes in the page
var iFrames = [];



//// Main Logic ////
// only allow this PhantomJS session to last 30 seconds
setTimeout(function() {
	console.log("waited 30 sec. Exiting...");
	phantom.exit();
}, 30000);

var getFrames = function () {
	var frameCount = page.framesCount + 1
	var html = page.frameContent + '\n--- End of Frame ---\n'
	for (var i = 1; i < frameCount; ++i) {
  		page.switchToFrame(i)
  		html += page.frameContent + '\n\n'
	}
	page.switchToFrame(1000);
	console.log(html.match(/(<iframe.*iframe>)/));
	return html;
};

// load the page and inject the js
page.open(news, function(status) {
	if (status !== 'success') {
		console.log("loading failed.")
	} else {
		console.log(page);
		getFrames();
		console.log(page.content.slice(0,50));
		//console.log(getFrames());
		/*if (page.injectJs(injection_file)) {
			console.log("injection successful")
			simulateMouseClick("*");
			// this isn't working ---------------------------------------------------------------<!>
			console.log("after click");
			iFrames = getFrames();
			console.log("iFrames: "+iFrames);
		}*/

		console.log("Webpage successfully loaded.");
	}
});

// may be obsolete
var firstFinish = true;
// webpage reports that it is finished loading more than once
// solution: only let this function run on the first reported finish
//           and also set a timeout to stall its execution 
//           (hoping other finishes will be reported during this
//           period so that it runs after all reported finishes)
page.onLoadFinished = function() {
	if (firstFinish) {
		firstFinish = false;
		setTimeout(function() {
			if (page.injectJs(injection_file)) {
				console.log('injection successful.');
			} else {
				console.log('injection failed.');
			}

			var match;
			var i = 0;
			while (match = /<iframe>/g.exec(page.content)) {
				++i;
				console.log(i+": "+match);
			}

		}, 7000);
	} else {
		// TODO: check if any elements have been added

		// TODO: check for content jumping
		// this is where the function will run after the first time
	}
};

// post message events?
// iframes are probably culprits
// form fields
// window.DISQUS
// identify listeners that are broadcasting to all frames

// what is this:
/*
TypeError: undefined is not a constructor (evaluating '_0x25E7B[_0x2500B[635]][_0x2500B[422]]()')

  https://player.aniview.com/script/6.1/AVmanager.js:56 in _0x2554B
  https://player.aniview.com/script/6.1/AVmanager.js:56 in _0x257EB
  https://player.aniview.com/script/6.1/AVmanager.js:56 in _0x256EF
  https://player.aniview.com/script/6.1/AVmanager.js:56
*/


