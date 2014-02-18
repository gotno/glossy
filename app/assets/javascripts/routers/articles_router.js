Glossy.Routers.ArticlesRouter = Backbone.Router.extend({
  routes: {
    '': 'show',
    'preview': 'preview',
    'edit': 'form',
    'new': 'new'
  },

  form: function() {
    var articleView = Glossy.articleView = new Glossy.Views.ArticlesForm({
      model: Glossy.article
    });

    this._swapViews(articleView);
    this._attachSidebarControls();

    this._setupUI();
  },

  new: function() {
    var article = Glossy.article = new Glossy.Models.Article;
    var articleView = Glossy.articleView = new Glossy.Views.ArticlesForm({
      model: article
    });

    this._swapViews(articleView);
    this._attachSidebarControls();

    this._setupUI();
  },

  show: function() {
    if (Glossy.articleView) {
      Glossy.articleView.collect();
    }

    var articleView = Glossy.articleView = new Glossy.Views.ArticlesShow({
      model: Glossy.article
    });
    this._swapViews(articleView);
  },

  preview: function() {
    this.show();
    this._attachSidebarBack();
  },

  _attachSidebarControls: function() {
    var sidebar = new Glossy.Views.SidebarControls;
    $('#content').append(sidebar.render().$el);

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
  },

  _attachSidebarBack: function() {
    var sidebar = new Glossy.Views.SidebarBack;
    $('#content').append(sidebar.render().$el);
  },

  _setupUI: function() {
    // hacky fake checkbox
    $("i.show-hide").click(function(){
      if($(this).hasClass('fa-eye')){
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
      }
      else {
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
      }
    });

    /* real checkbox hack
    // this almost works, but misaligns the form-group
    $('.eyebox').change(function() {
      $checkbox = $(this);
      $icon = $checkbox.siblings("[class*=fa-]");

      var checked = $checkbox.is(":checked");

      $icon.toggleClass('fa-eye-slash', checked)
           .toggleClass('fa-eye', !checked);
    });
    // */
  },

  _swapViews: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('#content').html(view.render().$el);
  }
});
