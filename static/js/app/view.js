/**
 * View layer.
 */

(function () {

  var Views = {},
    views = {},
    VIEW = new t('<div t-view="{{=id}}">{{content()}}</div>'),
    current = null;

  t.macro('view', function (name, id, scope) {
    var view, View;

    if (!(name || id)) return '';
    if (id) view = views[id];

    if (!view) {
      view = {};
      View = t.view(name);
      if (!View) return '';
      View.apply(view, Array.prototype.slice.call(arguments, 2));
    }

    view.id = id || name + '-' + (+(new Date()));
    view.data = scope ? this.resolve(this.scope, scope) : this.scope;

    view.parent = current;
    current = view;

    views[id] = view;
    
    return VIEW.render(view);
  });

  t.macro('content', function () {
    var view = this.scope;

    view.render(view.data, function (html) {
      view.el = view.el || document.querySelector('[t-view="' + view.id + '"]');

      if (!view.el) {
        var df = document.createDocumentFragment();
        df.appendChild(document.createElement('div'));
        df.firstChild.setAttribute('t-view', view.id);
        df.firstChild.innerHTML = html;
        view.el = df;
      } else {
        view.el.innerHTML = html;
      }
    });

    return '';
  });

  // Registers or retrieves a view class by name.
  t.view = function (name, fn) {
    if (fn)
      Views[name] = fn;

    return Views[name];
  };

})();