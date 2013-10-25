require.config({
  paths: {

    "jquery"                : 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
    "underscore"            : 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.2.1/lodash.compat.min',
    "backbone"              : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.9-amdjs/backbone-min',

    // plugin    
    "swipe"		    : 'swipe',        
    
    // launch demo
    "app"                   : 'app'
  }

});

var deps = [

    // launcher
    'app', 

  	// libraries
    'jquery',
    'underscore',
    'backbone',

    // plugin
    'swipe'
];

require (deps, function (app) {

  app.start ();

});