var Hooker = function() {
  this._hooks = [];
};

var Hooks = new Hooker;

Hooker.Hook = function(name, hook) {
  this._name = name;
  this._hook = hook;
};

Hooker.Hook.prototype.run = function(element) {
  var matching_elements = (element === undefined) ? jQuery(this._name) : element.find(this._name);

  var self = this;
  matching_elements.each(function() {
    self._hook(jQuery(this));
  });
};

Hooker.prototype.add = function(name, hook_func) {
  var hook = new Hooker.Hook(name, hook_func);
  this._hooks.push(hook);

  // schedule the hook to be run when the document loads
  jQuery(document).ready(function() {
    hook.run();
  });

  return this;
};

Hooker.prototype.run = function(element) {
  jQuery.each(this._hooks, function() {
    this.run(element);
  });
};
