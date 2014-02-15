Glossy.Views.RowsShow = Backbone.View.extend({
  template: JST['rows/show'],

  tagName: 'div',

  initialize: function() {
    this.setupWidgets();
  },

  render: function() {
    this.$el.html(this.template({
      row: this.model
    }));

    this.widgetViews = [];

    this.$widgetsContainer = this.$('.widget-container');

    var view = this;

    this.getSortedWidgets().forEach(function(widget) {
      view.renderWidget(widget.get('widget_type'), widget);
    });

    return this;
  },
  
  renderWidget: function(type, widget) {
    var newWidgetView = new Glossy.Views["Widget" + type + "Show"]({
      model: widget,
      className: "col-md-" + (12/this.familySize)
    });

    this.widgetViews.push(newWidgetView);

    this.$widgetsContainer.append(newWidgetView.render().$el);
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

    // image widgets
    if (!this.model.has('widgetImages')) {
      this.model.set('widgetImages', new Glossy.Collections.WidgetImages());
    }
    this.widgetImages = this.model.get('widgetImages');
  }
});
