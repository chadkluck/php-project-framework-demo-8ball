<?php
/*  ============================================================================================
    ********************************************************************************************
	8Ball API: Functions for Application
    ********************************************************************************************

	Chad Leigh Kluck (chadkluck.net / 63klabs.net)
	Version: 0.0.2-20200419
	github.com/ustlibraries

	********************************************************************************************

	FILE LAST MODIFIED: 20200419 - ChadKluck

	PURPOSE: Core functions for application

	********************************************************************************************
	********************************************************************************************

		This is function template file from the PHP PROJECT FRAMEWORK library.
		Visit github.com/chadkluck/php-project-framework page for more information.
		FRAMEWORK FILE: inc/functions-app.php
		FRAMEWORK FILE VERSION: 2018-03-19

	********************************************************************************************
	============================================================================================
*/

/*  ============================================================================================
    ********************************************************************************************
    APP FUNCTIONS
	********************************************************************************************
*/

function summonAnswer() {
		// randomly pick a response
	
		$responses = array();
		$responses = [ "It is certain",
					  "It is decidedly so",
					  "Without a doubt",
					  "Yes definitely",
					  "You may rely on it",
					  "As I see it, yes",
					  "Most likely",
					  "Outlook good",
					  "Yes",
					  "Signs point to yes",
					  "Reply hazy try again",
					  "Ask again later",
					  "Better not tell you now",
					  "Cannot predict now",
					  "Concentrate and ask again",
					  "Don't count on it",
					  "My reply is no",
					  "My sources say no",
					  "Outlook not so good",
					  "Very doubtful"
					];
	
		$response = array();
		$response['item'] = $responses[array_rand($responses)];
		
		return $response;
}

/*  ============================================================================================
    ********************************************************************************************
    REQUIRED FUNCTIONS
	********************************************************************************************

	These functions are required for use with inc/lib/php-project-framework but are up to you
	to develop and extend for your needs

	********************************************************************************************
*/

/* **************************************************************************
 *  userIsAdmin()
 *
 */

function userIsAdmin() {
	return false;
}

/* **************************************************************************
 *  userIsUser()
 *
 */

function userIsUser() {
	return false;
}


?>