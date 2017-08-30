// johnny dep (really depricated)

console.log("script.js running.");

// trash variables for printing
var page_i = 0;
var div_i = 0;
var listener_i = 0;

// tracks test0 div scrolling
document.getElementById("test0").onscroll = function() {
  ++div_i;
  document.getElementById("html_log").innerHTML = 
    "Log:\nThis container has been scrolled "+div_i+" times.";
};

// tracks page scrolling
document.onscroll = function() {
  ++page_i;
  console.log("page scrolled "+page_i+" times")
};

// should track any scrolling
window.addEventListener('scroll', function(e) {
	console.log("listening "+listener_i+" times");
	++listener_i;
	document.getElementById('listener').innerHTML = "listened "+listener_i+" times.";
}, true);






