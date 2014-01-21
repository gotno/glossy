Glossy.Views.SectionsEdit = Backbone.View.extend({
  template: JST['sections/edit'],

  tagName: 'section',

  events: {
    'click a.section-add-text':  'addTextWidget',
    'click a.section-add-image': 'addImageWidget'
  },

  initialize: function() {
    var view = this;

    this.widgetOrder = 0;
    this.widgetViews = [];

    if (!this.model.get('textWidgets')) {
      this.model.set('textWidgets', new Glossy.Collections.TextWidgets());
    }
    this.listenTo(this.model.get('textWidgets'), 'add', function() {
      view.renderWidget('Text', view.model.get('textWidgets').last());
    });

    if (!this.model.get('imageWidgets')) {
      this.model.set('imageWidgets', new Glossy.Collections.ImageWidgets());
    }
    this.listenTo(this.model.get('imageWidgets'), 'add', this.renderImageWidget);
  },

  render: function() {
    this.$el.html(this.template({
      section: this.model
    }));

    return this;
  },

  addTextWidget: function(event) {
    event.preventDefault();

    var textWidget = new Glossy.Models["TextWidget"]({
      ord: this.widgetOrder
    });

    this.model.get('textWidgets').add(textWidget);
  },

  renderWidget: function(type, widget) {
    var newWidgetView = new Glossy.Views[type + "WidgetForm"]({
      model: widget
    });

    this.widgetViews.push(newWidgetView);

    this.$el.append(newWidgetView.render().$el);
  },

  addImageWidget: function(event) {
    event.preventDefault();
  },

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set('title', this.$('#section_title' + ord).val());
    this.model.set('show_title', this.$('#show_title' + ord).val());

    this.widgetViews.forEach(function(widget) {
      widget.collect();
    });
  }
});
