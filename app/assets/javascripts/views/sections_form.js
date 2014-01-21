Glossy.Views.SectionsForm = Backbone.View.extend({
  template: JST['sections/form'],

  tagName: 'section',

  events: {
    'click a.section-add-text':  'addTextWidget',
    'click a.section-add-image': 'addImageWidget'
  },

  initialize: function() {
    var view = this;

    if (!this.model.get('textWidgets')) {
      this.model.set('textWidgets', new Glossy.Collections.TextWidgets());
    }
    this.listenTo(this.model.get('textWidgets'), 'add', function() {
      view.renderWidget('Text', view.model.get('textWidgets').last());
    });

    if (!this.model.get('imageWidgets')) {
      this.model.set('imageWidgets', new Glossy.Collections.ImageWidgets());
    }
    this.listenTo(this.model.get('imageWidgets'), 'add', function() {
      view.renderWidget('Image', view.model.get('imageWidgets').last());
    });
  },

  render: function() {
    this.widgetOrder = 0;
    this.widgetViews = [];

    this.$el.html(this.template({
      section: this.model
    }));

    // THIS DOES NOT RESPECT ORD. FIX.
    var view = this;
    this.model.get('textWidgets').each(function(widget) {
      view.renderWidget('Text', widget);
    });
    this.model.get('imageWidgets').each(function(widget) {
      view.renderWidget('Image', widget);
    });

    return this;
  },

  addTextWidget: function(event) {
    event.preventDefault();

    var textWidget = new Glossy.Models["TextWidget"]({
      ord: this.widgetOrder
    });

    this.model.get('textWidgets').add(textWidget);
  },

  addImageWidget: function(event) {
    event.preventDefault();

    var imageWidget = new Glossy.Models.ImageWidget({
      ord: this.widgetOrder
    });

    this.model.get('imageWidgets').add(imageWidget);
  },

  renderWidget: function(type, widget) {
    var newWidgetView = new Glossy.Views[type + "WidgetForm"]({
      model: widget
    });

    this.widgetViews.push(newWidgetView);
    this.widgetOrder++;

    this.$el.append(newWidgetView.render().$el);
  },

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set({
      title:      this.$('#section_title' + ord).val(),
      show_title: this.$('#show_title' + ord).val()
    });

    this.widgetViews.forEach(function(widget) {
      widget.collect();
    });
  }
});
