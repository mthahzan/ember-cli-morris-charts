import Ember from 'ember';

export
default Ember.Component.extend({
  instance: false,
  options: {},
  renderChart: function() {
    var options = this.get('options');
    options.element = this.$().attr('id');
    this.set('options', options);

    var type = this.get('type');
    if (typeof type !== 'string') {
      return false;
    }
    var chartBuilder;
    switch (type.toLowerCase()) {
      case 'area':
        chartBuilder = window.Morris.Area;
        break;
      case 'line':
        chartBuilder = window.Morris.Line;
        break;
      case 'bar':
        chartBuilder = window.Morris.Bar;
        break;
      case 'donut':
        chartBuilder = window.Morris.Donut;
        break;
    }
    this.set('instance', chartBuilder(options));
  }.on('didInsertElement'),
  listenChanges: function() {
    this.$().html('').prop('style', false);
    this.renderChart();
  }.observes('options'),
  listenDataChanges: function() {
    this.$().html('').prop('style', false);
    this.renderChart();
  }.observes('options.data'),
});