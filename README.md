# scrollJackingExperiment

File Structure of Project:
  (filename: description)
  ( explanation...      )

  script: a bash script to run messages.js and log its output to experiment.txt
      runs messages.js through phantomJs binary (with --web-security=no) and appends output to experiment.txt

  messages.js: Javascript to capture message events using PhantomJs
      adds event listeners to the page and logs messages to the console

  experiment.txt: output file for experiment
      tsv format
      first line MUST be "data	origin	source	ports" (those are tabs)
      first line derived from messages.js:45


Depricated Files:
  (filename: description)
  ( explanation...      )

  index.html: a very simple test page with multiplt divs

  script.js: an old test script for the test page

  test_injection.js: v1.0 of scrolljacking experiment
      meant to be injected via page.injectJs (a phantomJs function)