window.Glossy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    Glossy.article = new Glossy.Models.Article(options.article);

    new Glossy.Routers.ArticlesRouter;
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
      }
    });

    $('#sidebar-row').sortable({
      helper: 'clone',
      connectWith: '.rows-list',
      scroll: false,

      start: function(event, ui) {
        $('#sidebar-row').find('li:hidden').show();
      }
    });

    $('#sidebar-text').sortable({
      helper: 'clone',
      connectWith: '.widgets-list',
      scroll: false,

      start: function(event, ui) {
        $('#sidebar-text').find('li:hidden').show();
      }
    });

    $('#sidebar-image').sortable({
      helper: 'clone',
      connectWith: '.widgets-list',
      scroll: false,

      start: function(event, ui) {
        $('#sidebar-image').find('li:hidden').show();
      }
    });

    $('#sidebar-placeholder').sortable({
      helper: 'clone',
      connectWith: '.widgets-list',
      scroll: false,

      start: function(event, ui) {
        $('#sidebar-placeholder').find('li:hidden').show();
      }
    });
  }
}
