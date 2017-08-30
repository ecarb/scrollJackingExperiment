# scrollJackingExperiment

1. File Structure of Project:

    1. script: a bash script to run messages.js and log its output to experiment.txt
        1. runs messages.js through phantomJs binary (with --web-security=no) and appends output to experiment.txt

    2. messages.js: Javascript to capture message events using PhantomJs
        1. adds event listeners to the page and logs messages to the console

    3. experiment.txt: output file for experiment
        1. tsv format
        1. first line *must* be "data	origin	source	ports" (those are tabs)
        1. first line derived from messages.js:45

2. Depricated Files:

    1. ~~index.html~~: a very simple test page with multiplt divs

    2. ~~script.js~~: an old test script for the test page

    3. ~~test_injection.js~~: v1.0 of scrolljacking experiment
        1. meant to be injected via page.injectJs (a phantomJs function)