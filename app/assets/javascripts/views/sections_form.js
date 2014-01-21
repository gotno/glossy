Glossy.Views.SectionsForm = Backbone.View.extend({
  template: JST['sections/form'],

  tagName: 'section',

  events: {
    'click a.section-add-text':  'addTextWidget',
    'click a.section-add-image': 'addImageWidget'
  },

  initialize: function() {
    this.setupWidgets();
  },

  render: function() {
    this.widgetOrder = 0;
    this.widgetViews = [];

    this.$el.html(this.template({
      section: this.model
    }));

    var view = this;
    this.getSortedWidgets().forEach(function(widget) {
      view.renderWidget(widget.get('widget_type'), widget);
    });

    return this;
  },

  addTextWidget: function(event) {
    event.preventDefault();

    var textWidget = new Glossy.Models["TextWidget"]({
      ord: this.widgetOrder
    });

    this.textWidgets.add(textWidget);
  },

  addImageWidget: function(event) {
    event.preventDefault();

    var imageWidget = new Glossy.Models.ImageWidget({
      ord: this.widgetOrder
    });

    this.imageWidgets.add(imageWidget);
  },

  renderWidget: function(type, widget) {
    var newWidgetView = new Glossy.Views[type + "WidgetForm"]({
      model: widget
    });

    this.widgetViews.push(newWidgetView);
    this.widgetOrder++;

    this.$el.append(newWidgetView.render().$el);
  },

  getSortedWidgets: function() {
    var widgets = this.textWidgets.models.concat(
      this.imageWidgets.models
    );

    return widgets.sort(function(a, b) {
      var x = a.attributes['ord']; var y = b.attributes['ord'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },

  setupWidgets: function() {
    var view = this;

    // text widgets
    if (!this.model.get('textWidgets')) {
      this.model.set('textWidgets', new Glossy.Collections.TextWidgets());
    }
    this.textWidgets = this.model.get('textWidgets');

    this.listenTo(this.textWidgets, 'add', function() {
      view.renderWidget('Text', view.textWidgets.last());
    });

    // image widgets
    if (!this.model.get('imageWidgets')) {
      this.model.set('imageWidgets', new Glossy.Collections.ImageWidgets());
    }
    this.imageWidgets = this.model.get('imageWidgets');

    this.listenTo(this.imageWidgets, 'add', function() {
      view.renderWidget('Image', view.imageWidgets.last());
    });
  },

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set({
      title:      this.$('#section_title' + ord).val(),
      show_title: this.$('#show_title' + ord).val()
    });

    this.widgetViews.forEach(function(widgetView) {
      widgetView.collect();
    });
  }
});
