/*! 8ball v1.0 | Chad Leigh Kluck | github.com/chadkluck/8ball */
/* ****************************************************************************
 * JavaScript for 8 Ball - No GUI for easy dissection
 * ****************************************************************************

	
 
/* ****************************************************************************
 * Script that runs as soon as js file is loaded
 * ************************************************************************** */
 
(function() {
	"use strict";
	

	/* ****************************************************************************
	 * JSON API TO SUMMON THE Io8B (INTERNET of 8 BALLS)
	 * ****************************************************************************
	
		The responsibility of predictions is too important to leave up to some
		JavaScript running in a client's browser, so we summon an external resource,
		an internet connected 8 Ball which will return a prediction in JSON format.
		
		While the physical 8 Ball is safely locked away deep within an undisclosed 
		location at the intersection of perpendicular, parallel dimensions on the 
		corner of 9th and Park in Trenton, New Jersey, the URI for accessing it's
		omnipotent knowledge can be set in the HTML tag for div.the8ball
		
		data-api-src="https://location-of-your-php-scripts.com/api/"
		
	 * ************************************************************************** */
	
	// JSON API to summon the Internet Connected 8 Ball
	var xhrSuccess = function() { this.callback.apply(this, this.arguments); };

	var xhrError = function() { console.error(this.statusText); };

	var loadFile = function(sURL, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
		var oReq = new XMLHttpRequest();
		oReq.callback = fCallback;
		oReq.arguments = Array.prototype.slice.call(arguments, 2);
		oReq.onload = xhrSuccess;
		oReq.onerror = xhrError;
		oReq.open("get", sURL, true);
		oReq.send(null);
	};

	var getAPI = function(url, display) {

		// Define the function we want to use to process the data, accepting a callback function as a parameter (which will be pased to it later)
		var process = function(callback) {
			var jsontext = JSON.parse(this.responseText);
			var data = jsontext.item;

			callback(data);
		}; // end callback processing function

		// The actual call to the loadFile, passing the two functions we wish to execute
		loadFile (url, process, display /*, argumentToPass1, argumentToPass2, etc. */);
	};

	var generate = function() {

		// Define the function we will callback to actually display the HTML formatted data in the end
		var display = function(data) {
			if( data.length > 0) {

				console.log("answer-only.js prediction: " + data);

			}

		}; // end callback display function
		
		// The URL we use to request API data
		var url = "/api/";

		// The actual call to get things started
		getAPI(url, display); // in the end, give the data to display function (defined above)
	};

	/* ****************************************************************************
	 * EXECUTION TIME
	 * ****************************************************************************

		All that script stuff above was just functions and a lock variable. Here's 
		the actual code that gets executed during runtime.
		
	 * ************************************************************************** */
	
	// attribution in the console log
	console.log("Loading 8 Ball Answer Only Code");

    // This will call the api and place the response in console log
	generate();

})();