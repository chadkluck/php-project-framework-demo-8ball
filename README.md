# 8ball-api

A magical API that returns answers to questions asked of it. The application uses PHP and JavaScript.

Utilizes [https://github.com/chadkluck/php-project-framework](php-project-framework) and [https://github.com/chadkluck/js-template](js-template).

Update custom/config.ini.php to restrict request origins and debugging. The code is here to play with mainly for educational purposes.

See a demo at [https://8ball.demo.63klabs.net]

# Installation

Because 8Ball API utilizes php-project-framework and js-template, it provides a good tutorial on using these two packages.

Basic installation assumes you are able to place files in a public, web-accessible directory (such as www, web, public, etc) and a private directory that is not web accessible. See advanced installation if this is not possible or if you do not place the public files in the root of the web directory.

## Basic Installation

The public directory is your web root directory. It does not have to be named public, but for the purposes of installation instructions we refer to it as the public directory.

1. Place the files and directories from the public directory into the root web directory (web, www, public) of your site.
2. Place the private directory into the same parent directory as your public so that it is not publicly accessible. The public and private directory should be siblings.
3. Rename `private/app/_custom` to `private/app/custom` and `public/inc/_custom` to `public/inc/custom`
4. Test. Visit your website and test. You should see an 8 Ball. You should then be able to ask a question out loud and click for an answer.
5. In config.ini.php you can follow the comments to update CORS and debug parameters and security.

## Advanced Installation

Follow the directions as listed under Basic Installation with the following changes:

1. If you renamed or moved your private directory to a different location, you need to update the location in public/inc/inc. Follow the comments in that file. In that file you'll also see you can rename private/app directory in case you have several apps running on the same server and wish to utilize a central copy of private/lib/php-project-framework.
2. If you are unable to store files outside of the root web directory then you can place the private directory within the public directory. There is an .htaccess file in the private directory that prevents public viewing of the private contents, but it is recommended you do not place your private directory in a public area.
3. If you are placing the contents of public into a sub-directory on your website then you'll need to update `[paths] assets` in your config.ini.php. Follow the comments in that file. You'll also need to update the paths in public/index.html.
4. You'll need to update `[paths] assets` in your config.ini.php if you wish to use a CDN to serve your app's static assets.
5. You can also install the api on a separate server than the index.html and assets. Just update where the api makes its call index.html.

# Tutorial

This application can be used as a learning example to walk you through various components of php-project-framework and js-template.

## php-project-framework

Look at the code for public/api/index.php

You'll see the main function that makes a call to a global function called `summonAnswer()`. This function, along with all code specific to the application, resides in private/app/functions-app.php.

It could have been kept in the api index.php page, but this is a learning example and what if we wanted to reuse that code on another page? functions-app.php allows you to store all your application code in one place. To extend this app you can add more functions to this file.

There are additional functions provided by php-project-framework, these are stored in `private/lib/php-project-framework` and should not be touched if you wish to easily update to new releases of the framework. Treat anything located in private/lib as external libraries.

For more information [https://github.com/chadkluck/php-project-framework](visit php-project-framework on GitHub).

## js-template

Look at the code for public/assets/answer-only.js

For demonstration purposes, this is a simplified version of 8ball.js which only produces an answer and not the graphics and animation of the 8 Ball.

This file uses js-template which provides api functionality. js-template can be used to quickly create JavaScript projects that call APIs. You'll see that it is a self invoking function that allows parameters to be passed to it.

For more information [https://github.com/chadkluck/js-template](visit js-template on GitHub).

## API calls

An api is similar to a web page except it is raw data that can be ingested and then used in your script like an array of data. You can even view your API endpoint by bringing up https://yoursitedomain.com/api/ in a browser.

Here's another example you can play with: [https://api.chadkluck.net/games].