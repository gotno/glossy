Glossy.Views.RowsForm = Backbone.View.extend({
  template: JST['rows/form'],

  attributes: {
    class: 'row'
  },

  events: {
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
    var newWidgetView = new Glossy.Views["Widget" + type + "Form"]({
      model: widget
    });

    this.widgetViews.push(newWidgetView);
    this.widgetOrder++;

    var $listEl = $('<li>');
    $listEl.html(newWidgetView.render().$el);
    this.$widgetsList.append($listEl);
  },

  getSortedWidgets: function() {
    var widgets = this.widgetTexts.models.concat(
      this.widgetImages.models
    );

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
