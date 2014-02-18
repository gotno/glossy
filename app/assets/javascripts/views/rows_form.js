Glossy.Views.RowsForm = Backbone.View.extend({
  template: JST['rows/form'],

  tagName: 'div',
  className: 'rows-row-container',

  events: {
    'sortstart': 'sortStart',
    'sortstop': 'sortStop',
    'sortreceive': 'sortReceive'
  },

  initialize: function() {
    this.setupWidgets();
  },

  render: function() {
    this.$el.html(this.template({
      row: this.model
    }));

    this.widgetOrder = 0;
    this.widgetViews = [];

    this.$widgetsList = this.$('.widgets-list');

    var view = this;

    this.getSortedWidgets().forEach(function(widget) {
      view.renderWidget(widget.get('widget_type'), widget);
    });

    this.$widgetsList.sortable({
      //connectWith: '.widgets-list',
      cursorAt: { top: 8, left: 8 },
      tolerance: 'pointer',
      axis: "x",
      containment: 'section',
    });

    return this;
  },

  addWidgetText: function(event) {
    event.preventDefault();

    var widgetText = new Glossy.Models.WidgetText({
      ord: this.widgetOrder
    });

    this.widgetTexts.add(widgetText);
  },

  addWidgetImage: function(event) {
    event.preventDefault();

    var widgetImage = new Glossy.Models.WidgetImage({
      ord: this.widgetOrder
    });

    this.widgetImages.add(widgetImage);
  },

  renderWidget: function(type, widget) {
    this.$('#widgets-list-placeholder').remove();

    var newWidgetView = new Glossy.Views["Widget" + type + "Form"]({
      model: widget,
      className: "nopadding widget-edit col-md-" + (12/this.familySize)
    });

    this.widgetViews.push(newWidgetView);
    this.widgetOrder++;

    this.$widgetsList.append(newWidgetView.render().$el);
  },

  appendWidget: function(widget) {
    var type = widget.get('widget_type');

    var view = new Glossy.Views['Widget' + type + 'Form']({
      model: widget
    });
    this.widgetViews.push(view);

    if (this.model.get('widget' + type + 's').length === 1) {
      this.$widgetsList.append(view.render().$el);
    } else {
      var that = this;
      this.$('li.widget-edit').each(function(idx, li) {
        var $li = $(li);

        if ($li.attr('data-ord') > widget.get('ord')) {
          $li.before(view.render().$el);
          return false;
        } else if (idx == $('li.widget-edit').length - 1) {
          $li.after(view.render().$el);
          return false;
        }
      });
    }

    view.$el.find('i.show-hide').click(function() {
      if($(this).hasClass('fa-eye')){
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
      }
      else {
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
      }
    });

    this.getSortedWidgets();
    this.reorderWidgets();
    this.resizeWidgets();
  },

  resizeWidgets: function() {
    var fs = this.familySize;
    this.$('li.widget-edit').each(function(idx, li) {
      var $li = $(li);

      if ($li.hasClass('col-md-' + (12/(fs - 1)))) {
        $li.removeClass('col-md-' + 12/(fs - 1));
      }

      $li.addClass('col-md-' + 12/fs);
    });
  },

  sortReceive: function(event, ui) {
    this.$('#widgets-list-placeholder').remove();
    var $item = $(ui.item[0]);
    var iid = $item.attr('id')

    switch (iid) {
    case 'sidebar-text-item':
      if (this.familySize === 4) {
        $item.remove();

        var $el = $('<li id="' + iid + '">')
        $el.append($('<a href="#">TEXT</a>'));
        $('#sidebar-text').append($el);
        return false;
      }

      var widget = new Glossy.Models.WidgetText({
        ord: $item.position()['left'] - 20,
        widget_type: 'Text'
      });
      this.model.get('widgetTexts').add(widget);

      $item.remove();

      var $el = $('<li id="' + iid + '">')
      $el.append($('<a href="#">TEXT</a>'));
      $('#sidebar-text').append($el);
      break;

    case 'sidebar-image-item':
      if (this.familySize === 4) {
        $item.remove();

        var $el = $('<li id="' + iid + '">')
        $el.append($('<a href="#">IMAGE</a>'));
        $('#sidebar-image').append($el);
        return false;
      }

      var widget = new Glossy.Models.WidgetImage({
        ord: $item.position()['left'] - 20,
        widget_type: 'Image'
      });
      this.model.get('widgetImages').add(widget);

      $item.remove();

      var $el = $('<li id="' + iid + '">')
      $el.append($('<a href="#">IMAGE</a>'));
      $('#sidebar-image').append($el);
      break;

    case 'sidebar-placeholder-item': 
      if (this.familySize === 4) {
        $item.remove();

        var $el = $('<li id="' + iid + '">')
        $el.append($('<a href="#">PLACEHOLDER</a>'));
        $('#sidebar-placeholder').append($el);
        return false;
      }

      var widget = new Glossy.Models.WidgetPlaceholder({
        ord: $item.position()['left'] - 20,
        widget_type: 'Placeholder'
      });
      this.model.get('widgetPlaceholders').add(widget);

      $item.remove();

      var $el = $('<li id="' + iid + '">')
      $el.append($('<a href="#">PLACEHOLDER</a>'));
      $('#sidebar-placeholder').append($el);
      break;
    }
  },

  sortStop: function() {
    this.reorderWidgets();
  },

  reorderWidgets: function() {
    this.widgetViews.forEach(function(view) {
      var newOrd = Math.floor(view.$el.position()['left']);
      view.model.set({ ord: newOrd });
      view.$el.attr('data-ord', newOrd);
    });
  },

  getSortedWidgets: function() {
    var widgets = this.widgetTexts.models.concat(
      this.widgetImages.models
    );

    this.familySize = widgets.length;

    return widgets.sort(function(a, b) {
      var x = a.attributes['ord']; var y = b.attributes['ord'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },

  setupWidgets: function() {
    var view = this;

    // text widgets
    if (!this.model.has('widgetTexts')) {
      this.model.set('widgetTexts', new Glossy.Collections.WidgetTexts());
    }
    this.widgetTexts = this.model.get('widgetTexts');

    this.listenTo(this.widgetTexts, 'add', this.appendWidget);

    // image widgets
    if (!this.model.has('widgetImages')) {
      this.model.set('widgetImages', new Glossy.Collections.WidgetImages());
    }
    this.widgetImages = this.model.get('widgetImages');

    this.listenTo(this.widgetImages, 'add', this.appendWidget);
  },

  collect: function() {
    this.widgetViews.forEach(function(widgetView) {
      widgetView.collect();
    });
  }
});
