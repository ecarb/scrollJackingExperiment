


var webpage = require('webpage').create();

webpage.open('https://www.reddit.com', function(status) {
	if (status !== 'success') {
		console.log('Unable to access network');
	} else { 
		var title = webpage.evaluate(function() {
			return document.title;
		});
		console.log(title === 'reddit: the front page of the internet');
	}

	phantom.exit();
});




