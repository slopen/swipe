require.config({
  paths: {

    "jquery"                : 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
    "underscore"                : 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.2.1/lodash.compat.min',
    "backbone"              : 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.9-amdjs/backbone-min',

    // plugin    
    "swipe"		              : 'swipe',        
    
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