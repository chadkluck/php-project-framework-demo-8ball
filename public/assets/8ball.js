/*! 8ball v1.0 | Chad Kluck | github.com/chadkluck/8ball */
/* ****************************************************************************
 * JavaScript for 8 Ball
 * ****************************************************************************

	Version: 1.0-20180315-2030
	Last Modified: 2018-03-15
	Author: Chad Kluck chadkluck.net
	
	GitHub: https://github.com/chadkluck/8ball-api
	In Action: https://8ball.demo.63klabs.net

 * -------------------------------------------------------------------------- *

	Dissect, explore, modify, and repurpose code for non-commercial use as you see fit.
	HTML, CSS, JS, and PHP released by the author for entertainment and educational purposes.
	See GitHub page for licensing information.
 
 * -------------------------------------------------------------------------- *
  
	NOTE: This script makes a JSON request from a URI that you will need to be
	able to place a PHP script at to generate the predictions. It can be on
	the same site or a separate site from the 8 Ball web page, but you will
	need somewhere to upload that PHP script.
  
 * -------------------------------------------------------------------------- *
 
	While there is some js working to keep the ball sized within the window
	and scalable on resize, the initial load sizes the ball and it's components
	appropriately via CSS.
	
	There are no images or js animations, everything is DIV and TEXT. 
	The DIVs are rounded and filled in, CSS takes care of the fades when js
	adds or removes classes.
	
	The main CSS components to learn from here are centering DIVs within each
	other, rounding corners to produce circles, and transitions.

 * -------------------------------------------------------------------------- *
 
	Order of operation.
	1. Page loads, 8 Ball is generated on the fly with overlay text
	2. User clicks/taps
	3. Overlay fades, ask() is invoked and waits (for the effect of suspense)
	4. After waiting the API call is made
	5. Once the API response is received the reveal() is invoked 
	6. The prediction fades in
	7. GOTO 2
	
	Note: During the Ask/Reveal cycle the user is prevented from asking 
	additional questions until the original question is complete.
	 
 * ************************************************************************** */
 
/* ****************************************************************************
 * Script that runs as soon as js file is loaded
 * ************************************************************************** */
 
 (function() {
	"use strict";
	
	/* ****************************************************************************
	 * LOCKING MECHNISIM TO PREVENT ASKING WHILE ALREADY ASKING
	 * ************************************************************************** */
 
	// lock it during an ask so we don't get extra clicks
	var locked = false;
	
	// locking mechanisms to prevent multiple ask sequences during an ask/reveal cycle
	var setLock = function() {
		locked = true;
	};
	
	var unLock = function() {
		locked = false;
	};
	
	var isLocked = function() {
		return locked;
	};

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

				console.log("prediction: " + data);

				document.getElementById("prediction").innerHTML = data;
				reveal();
			}

		}; // end callback display function
		
		// The URL we use to request API data
		var url = document.getElementById("the8ball").getAttribute("data-api-src");

		// The actual call to get things started
		getAPI(url, display); // in the end, give the data to display function (defined above)
	};

	/* ****************************************************************************
	 * 8 BALL FUNCTIONS
	 * ****************************************************************************

		Functions to show/hide, ask/reveal, and display the 8 Ball
		
	 * ************************************************************************** */
	
	// hide the introductory overlay if it is present
	var hideOverlay = function() {
		var o = document.getElementById("magicOverlay");
		if ( o ) {
			o.classList.add("hidden");
		}
	};
	
	// on first ask we hide the overlay, then upon reveal we delete it so it isn't in the way of screen readers and android text selection
	var removeOverlay = function() {
		var o = document.getElementById("magicOverlay");
		if ( o ) {
			o.parentNode.removeChild(o);
		}
	};

	// Invoke the 8 Ball, called on during click or touch, etc.
	// First allow time to fade, then call API for magical answer
	var ask = function() {
		if (!isLocked()) {
			setLock();
			// magicBall class should be turned away
			var e = document.getElementById("magicBall");
			e.classList.remove("reveal");
			hideOverlay();
			setTimeout(generate, 4000); // kick off the api call
		}
	};

	// Reveal the response. Invoked after the response is returned from the API
	// This is invoked from within the display() function of generate()
	var reveal = function() {
		// safe to remove the now hidden instructional overlay
		removeOverlay();
		
		// prediction can now be shown
		var e = document.getElementById("magicBall");
		e.classList.add("reveal"); // begin the fade in
		setTimeout(unLock, 4000); // wait before user can ask another question
	};
	
	/* ****************************************************************************
	 * METHODS OF ASKING
	 * ****************************************************************************

		How can we submit an ask request? Can we touch the screen? Flip the phone?
		
		What other options will be in the future? (That's not a yes or no question
		so we'll have to defer that 'til later.)
		
	 * ************************************************************************** */
	
	// can the 8 ball be touched? (user is on a touch screen device)
	var canTouch = function() {
		return ('ontouchstart' in document.documentElement);
	};
	
	// can the 8 ball be rotated? (user has a mobile device with orientation sensors)
	var canFlip = function() {
		/* return false for now */
		return false;
	};

	/* ****************************************************************************
	 * SIZING
	 * ****************************************************************************

		The CSS on the initial load does a pretty good job of making the ball 
		fit within a responsive design, but we need to account for narrow widths
		and heights of mobile devices, and change the size of the text to remain
		nicely scaled compared to the rest of the ball.
		
	 * ************************************************************************** */
	
	// while we have pretty good dimensions in the css on load, we can adjust the text size and keep the ball square within the window
	var updateSize = function() {
		
		//https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		
		// figure out what is the small of the two (width or height)
		var ballSize = ( Math.min(h,w) / 10 ); // convert to rem (because we set html css font-size: 62.5%; which means 1rem = 1px)
		
		// size of ball
		document.getElementById("the8ball").parentNode.style.maxWidth = ballSize+"rem";
		
		// size of prediction text
		document.getElementById("prediction").style.fontSize = (ballSize * 0.05 )+"rem"; // 5% of ball size
		
		// size of Number 8
		document.getElementById("theNumberEight").style.fontSize = (ballSize * 0.50 )+"rem"; // 50% of ball size
		
		// we eventually remove the magic overlay so only resize if it is still there
		var o = document.getElementById("magicOverlay");
		if ( o ) {
			
			// find the div tag within
			var d = o.getElementsByTagName("DIV")[0];
			
			// size of Magic Overlay Text
			d.style.fontSize = (ballSize * 0.07 )+"rem"; // 7% of ball size
		
			// size of Magic Overlay Text Div
			d.style.width = (ballSize * 0.80 )+"rem"; // 80% of ball size
		}

	};
	
	/* ****************************************************************************
	 * CREATE THE BALL
	 * ****************************************************************************

		We dynamically generate the 8 Ball within the div.the8ball placeholder HTML
		
		This consists of the black ball, an indigo window, prediction text, a white
		number circle, and the number 8. All of it is CSS, no images.
		
		Oh, and there's overlay text for when the page first loads.
		
		This just nests the elements inside each other, the real magic of how it is
		displayed is in the CSS.
		
	 * ************************************************************************** */
	
	// This creates the ball's HTML structure
	var createBall = function() {
		
		var abilities = ["click"]; // base action is click
		
		if ( canTouch() ) { abilities.push("tap"); } // has touch
		if ( canFlip() ) { abilities.push("flip"); } // has rotation
		
		// create the text string of options for intro text
		var strOptions = abilities[0];
		
		var arrLen = abilities.length;
		for (var i = 1; i < arrLen; i++) {
			
			// figure out the joiners (comma, spaces, "or")
			strOptions += ( arrLen > 2 ) ? ", " : " "; // we use commas only if more than 2 options (yes, the 8 ball uses Oxford comma)
			strOptions += ( i === arrLen - 1 ) ? "or " : ""; // final item, so give it an or
			
			// add the ability to instructions
			strOptions += abilities[i];
		}
		
		var s = "<p>Ask the 8 Ball a yes or no question, then "+strOptions+" to reveal the answer.</p><p>Be warned, some questions are best left un-asked rather than un-answered.</p>";

		// make the 8 Ball
		// create the prediction text area
		var prediction = document.createElement("DIV");
		prediction.id = "prediction";

		// create the round indio magic window and place the text area inside of it
		var magicWindow = document.createElement("DIV");
		magicWindow.id = "magicWindow";
		magicWindow.appendChild(prediction);
		
		// create the number 8
		var theNumberEight = document.createElement("DIV");
		theNumberEight.id = "theNumberEight";
		theNumberEight.innerHTML = "8";
		
		// create the round white number spot
		var magicNumber = document.createElement("DIV");
		magicNumber.id = "magicNumber";
		magicNumber.appendChild(theNumberEight);

		// create the round black ball and place the window inside of it
		var magicBall = document.createElement("DIV");
		magicBall.id = "magicBall";
		magicBall.appendChild(magicWindow);
		magicBall.appendChild(magicNumber);
		
		// create the initial overlay instructions
		var magicOverlay = document.createElement("DIV");
		magicOverlay.id = "magicOverlay";
		var magicOverlayDialog = document.createElement("DIV");
		magicOverlayDialog.innerHTML = s;
		magicOverlay.appendChild(magicOverlayDialog);
		
		// WAI-ARIA - we'll do this all at once in this code block so maintenance is easy
		// https://www.deque.com/blog/aria-modal-alert-dialogs-a11y-support-series-part-2/
		magicOverlayDialog.setAttribute("role","alertdialog");
		magicOverlayDialog.setAttribute("aria-labelledby","alertHeading");
		magicOverlayDialog.setAttribute("aria-describedby","alertText");
		magicOverlayDialog.getElementsByTagName('p')[0].id = "alertHeading";
		magicOverlayDialog.getElementsByTagName('p')[1].id = "alertText";
		
		// add aria-live attribute to prediction
		// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
		prediction.setAttribute("role","region");
		prediction.setAttribute("aria-live","assertive"); // user is directly interacting for this so announce it
		
		// place the magicBall and magicOverlay inside the already created DIV#the8ball element on the page
		document.getElementById("the8ball").appendChild(magicBall);
		document.getElementsByTagName('body')[0].appendChild(magicOverlay);
		
		// adjust the size
		updateSize();
	};

	/* ****************************************************************************
	 * EXECUTION TIME
	 * ****************************************************************************

		All that script stuff above was just functions and a lock variable. Here's 
		the actual code that gets executed during runtime.
		
	 * ************************************************************************** */
	
	// attribution in the console log
	console.log("Loading 8 Ball by Chad Kluck | chadkluck.net");
	console.log("8 Ball Code on GitHub: github.com/chadkluck/8ball-api");
	
	// create the ball HTML
	createBall();
	
	// attach resize listener to window (if browser window is resized after initial load)
	window.addEventListener('resize', updateSize);

	// bind the ask to the full body
	document.body.addEventListener('click', ask); // css cursor pointer needs to be set otherwise click doesn't work for touch and you'd have to use touchstart as well (which we'll do anyway)
	if ( canTouch() ) { document.body.addEventListener('touchstart', ask); } //if touch add touch
	if ( canFlip() ) { /* do nothing for now */ } /* html5 and javascript for detecting mobile device rotation isn't as good as it could be yet */

})();