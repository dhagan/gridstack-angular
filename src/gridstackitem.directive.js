(function() {
'use strict';

  // function newuuid () {
  //       // http://www.ietf.org/rfc/rfc4122.txt
  //       var s = [];
  //       var hexDigits = "0123456789abcdef";
  //       for (var i = 0; i < 36; i++) {
  //           s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  //       }
  //       s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  //       s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  //       s[8] = s[13] = s[18] = s[23] = "-";
  //       return s.join("");
  //   }

var app = angular.module('gridstack-angular');

app.directive('gridstackItem', ['$timeout', function($timeout) {

  return {
    restrict: 'A',
    controller: 'GridstackController',
    require: '^gridstack',
    scope: {
      gridstackItem: '=',
      onItemAdded: '&',
      onItemRemoved: '&',
      gsItemId: '=?',
      gsItemX: '=',
      gsItemY: '=',
      gsItemWidth: '=',
      gsItemHeight: '=',
      gsItemAutopos: '=',
      gsItemMinHeight: '=?',
      gsItemMaxHeight: '=?',
      gsItemMinWidth: '=?',
      gsItemMaxWidth: '=?'
    },
    link: function(scope, element, attrs, controller) {
      if (scope.gsItemId) {
        $(element).attr('data-gs-id', scope.gsItemId);
      }
      $(element).attr('data-gs-x', scope.gsItemX);
      $(element).attr('data-gs-y', scope.gsItemY);
      $(element).attr('data-gs-width', scope.gsItemWidth);
      $(element).attr('data-gs-height', scope.gsItemHeight);
      $(element).attr('data-gs-min-width', scope.gsItemMinWidth);
      $(element).attr('data-gs-min-height', scope.gsItemMinHeight);
      $(element).attr('data-gs-max-width', scope.gsItemMaxWidth);
      $(element).attr('data-gs-max-height', scope.gsItemMaxHeight);
      $(element).attr('data-gs-auto-position', scope.gsItemAutopos);

      var widget = controller.addItem(element);
      var item = element.data('_gridstack_node');
      $timeout(function() {
        scope.onItemAdded({item: item});
      }, 1);


      var propertyChanged = function(newVal, oldVal) {
        if(newVal != oldVal) {
          controller.gridstack.update($(element), scope.gsItemX, scope.gsItemY, scope.gsItemWidth, scope.gsItemHeight);
        }
      };

      scope.$watch(function() { return $(element).attr('data-gs-id'); }, function(val) {
        scope.gsItemId = val;
      });

      scope.$watch(function() { return $(element).attr('data-gs-x'); }, function(val) {
        scope.gsItemX = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-y'); }, function(val) {
        scope.gsItemY = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-width'); }, function(val) {
        scope.gsItemWidth = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-height'); }, function(val) {
        scope.gsItemHeight = Number(val);
      });

      scope.$watch('gsItemX', propertyChanged);
      scope.$watch('gsItemY', propertyChanged);
      scope.$watch('gsItemWidth', propertyChanged);
      scope.$watch('gsItemHeight', propertyChanged);

      element.bind('$destroy', function() {
        var item = element.data('_gridstack_node');
        scope.onItemRemoved({item: item});
        controller.removeItem(element);
      });

    }

  };

}]);
})();
