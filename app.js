define ([

    // application components
    "jquery",
    "underscore",
    "backbone",
    "swipe"

], function ($, _, Backbone, swipe) {

	return { 
    start: function (options) {

      console.log('Application started');

      var $content = $('#content-holder'),

          breadcrumbsTpl = _.template(
            '<ul class="breadcrumb">' +
              '<% _.each(rows, function (row, index) { %>' +
              '<li data-index="<%= index %>">' + 
                '<% if (index != (rows.length - 1) ) { %>' +
                '<span class="divider">&rarr;</span>' + 
                '<% } %>' +
                '<a href="#"><%= row %></a>' + 
              '</li>' +
              '<% }); %>' +
            '</ul>'
          ),

          // breadcrumbs updater
          setBreadcrumbs = function($content, row){
            var $breadcrumbs = $('ul.breadcrumb'),
                $titles = $content.find('.page-row:eq(' + row + ') .page h1');

            $breadcrumbs.replaceWith( $( breadcrumbsTpl(
              {
                rows: _.map($titles, function(header){
                        return $(header).text();              
                      }) 
              }
            )));
          };

        swipe.setup ($content);

        // initial breadcrumbs state
        setBreadcrumbs($content, 0);

        // swipe verically
        $('.main-navigation').on('click', ' a:not([data-scale])', function(evt){
          var $target = $(evt.currentTarget),
              row = $target.attr('data-row');

          $target.closest('li').siblings().removeClass('active');
          $target.closest('li').addClass('active');

          swipe.setRow(row, {
            callback: function(){
              console.log('change row callback, row:', row);

              // redraw breadcrumbs
              setBreadcrumbs($content, row);
            }
          });

          $content.removeClass('scaled');

          return false;
        });

        // zoom out
        $('.main-navigation').on('click', 'a[data-scale]', function(evt){

          swipe.setScale({
            callback: function(){
              console.log('zoom out callback');
            }
          });

          $content.addClass('scaled');

          return false;
        });        

        // move horizontally by breadcrumbs
        $('.top-nav').on('click', 'a', function(evt){
          var $target = $(evt.currentTarget).closest('li'),
              index =  $target.attr('data-index');

          swipe.setIndex($target.attr('data-index'), {
            callback: function(){
              console.log('change index callback, index', index);
            }
          });

          $content.removeClass('scaled');

          return false;
        });

        // zoom in page
        $('#content-holder .page').on('click', function(evt){
          var $target = $(evt.currentTarget),
              row = $target.closest('.page-row').index(),
              index =  $target.closest('.page').index();

          swipe.setRow(row, {
            callback: function(){
              console.log('change row callback, row:', row);
            }
          });

          swipe.setIndex(index, {
            callback: function(){
              console.log('change index callback, index', index);

              // redraw breadcrumbs
              setBreadcrumbs($content, row); 
           }
          });  

          $content.removeClass('scaled');                     

          return false;
        });        


        // scroll whole for touch devices prevent
        $(document).on('touchstart', function(evt){
          evt.preventDefaults();
        });
        $('#fos-demo').on('touchstart', function(evt){
          evt.stopPropagation();
        });

    }
  };

}); 