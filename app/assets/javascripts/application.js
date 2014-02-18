//= require jquery
//= require jquery_ujs
//= require jquery-ui-1.10.4.custom
//= require jquery.serializeJSON
//= require underscore
//= require backbone
//= require bootstrap
//= require glossy
//= require_tree ../templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .

// ugly jquery-ui-sortable beforeStart hack
var oldMouseStart = $.ui.sortable.prototype._mouseStart;
$.ui.sortable.prototype._mouseStart = function(event, overrideHandle, noActivation) {
   this._trigger("beforeStart", event, this._uiHash());
   oldMouseStart.apply(this, [event, overrideHandle, noActivation]);
};
