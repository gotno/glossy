window.Glossy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    Glossy.article = new Glossy.Models.Article(options.article);

    Glossy.router = new Glossy.Routers.ArticlesRouter;
    Backbone.history.start();

    $("i.show-hide").click(function(){
      if($(this).hasClass('fa-eye')){
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
      }
      else {
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
      }
    });

    $('#sidebar-section').sortable({
      helper: 'clone',
      connectWith: '.sections-list',
      scroll: false,

      start: function(event, ui) {
        $('#sidebar-section').find('li:hidden').show();
      },

      beforeStart: function() {
        //window.Glossy.articleView.sectionViews.forEach(function(view) {
          //view.rollUp();
        //}
      },

      beforeStop: function(event, ui) {
        //console.log('event: ', event);
        //console.log('ui: ', ui);
        //$(event.target).sortable('cancel');
      }
    });

    /*
    $('#sidebar-section').draggable({
      helper: 'clone',
      scroll: false,
      cursorAt: { top: 8, left: 8 },
      connectToSortable: '.sections-list'
    });

    $('#sidebar-row').draggable({
      helper: 'clone',
      scroll: false,
      cursorAt: { top: 8, left: 8 },
      connectToSortable: 'ul.rows-list'
    });

    $('#sidebar-image').draggable({
      helper: 'clone',
      scroll: false,
      cursorAt: { top: 8, left: 8 },
      connectToSortable: '.widgets-list'
    });

    $('#sidebar-text').draggable({
      helper: 'clone',
      scroll: false,
      cursorAt: { top: 8, left: 8 },
      connectToSortable: '.widgets-list'
    });

    $('#sidebar-placeholder').draggable({
      helper: 'clone',
      scroll: false,
      cursorAt: { top: 8, left: 8 },
      connectToSortable: '.widgets-list'
    });
    */
  }
}
