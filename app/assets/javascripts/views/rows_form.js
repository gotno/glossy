Glossy.Views.RowsForm = Backbone.View.extend({
  template: JST['rows/form'],

  tagName: 'div',
  className: 'rows-row-container',

  events: {
    'sortstart': 'sortStart',
    'sortstop': 'sortStop'
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
    this.$('li#widget-list-placeholder').remove();

    var newWidgetView = new Glossy.Views["Widget" + type + "Form"]({
      model: widget,
      className: "col-md-" + (12/this.familySize)
    });

    this.widgetViews.push(newWidgetView);
    this.widgetOrder++;

    this.$widgetsList.append(newWidgetView.render().$el);
  },

  sortStart: function(event, ui) {
  },

  sortStop: function(event, ui) {
    this.reorderWidgets();
  },

  reorderWidgets: function() {
    this.widgetViews.forEach(function(view) {
      view.model.set({
        ord: Math.floor(view.$el.position()['left'])
      });
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

    this.listenTo(this.widgetTexts, 'add', function() {
      view.renderWidget('Text', view.widgetTexts.last());
    });

    // image widgets
    if (!this.model.has('widgetImages')) {
      this.model.set('widgetImages', new Glossy.Collections.WidgetImages());
    }
    this.widgetImages = this.model.get('widgetImages');

    this.listenTo(this.widgetImages, 'add', function() {
      view.renderWidget('Image', view.widgetImages.last());
    });
  },

  collect: function() {
    this.widgetViews.forEach(function(widgetView) {
      widgetView.collect();
    });
  }
});
