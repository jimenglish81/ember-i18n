import Ember from 'ember';
import service from 'ember-cli-i18n/services/i18n';

let localeMap = new Map();

service.getLocale = function(locale, localeStream) {
  jQuery.getJSON(Ember.String.fmt('/%@.json', locale),
    function(json) {
      localeMap.set(locale, Ember.Object.create(json));
      localeStream.notify();
    });
};

service.getLocalizedPath = function(locale, path, container) {
  let application = container.lookup('application:main');
  let localeStream = application.localeStream;
  locale = localeStream.value();

  if (localeMap.has(locale)) {
    return localeMap.get(locale).getWithDefault(path, '???' + path + '???');
  } else {
    this.getLocale(locale, localeStream);
    return ' ';   // default?
  }
};

export default service;