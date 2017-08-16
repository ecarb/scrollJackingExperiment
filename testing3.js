
//// PhantomJS setup ////
var system = require('system');
var page = require('webpage').create();

//// Commonly Used Variables ////
var args = system.args.slice(1, system.args.length); // don't need 0th arg
var news = 'http://www.newsmax.com/US/couple-buys-street-nancy-pelosi/2017/08/07/id/806317/';
var injection_file = 'test_injection.js';

var first_content;
var finished_content;

/*var testing = funciton() {
	// should be called well after last onLoadFinished
	var match;
	var re = /<(.*)>/;
	while (match = re.exec(finished_content.slice(0,500))) {
		console.log(match);
	}

	phantom.exit();
};*/

page.open(news, function(status) {
	if (status !== 'success') {
		console.log("loading failed.")
	} else {
		first_content = page.content;
		console.log("Webpage successfully loaded.");

		//testing();

		setTimeout(phantom.exit, 10000);
	}
});

page.onLoadFinished = function() {
	finished_content = page.content;

	//console.log(first_content === finished_content);
};

/*
onLoadFinished produced:
true
false
false
false
false
false
false
false
false
false
false
false
false
*/