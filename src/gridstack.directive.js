(function() {
'use strict';

var app = angular.module('gridstack-angular');

app.directive('gridstack', ['$timeout', function($timeout) {

  return {
    restrict: 'A',
    controller: 'GridstackController',
    scope: {
      onChange: '&',
      onAdded: '&',
      onRemoved: '&',
      onDragStart: '&',
      onDragStop: '&',
      onResizeStart: '&',
      onResizeStop: '&',
      gridstackHandler: '=?',
      options: '='
    },
    link: function(scope, element, attrs, controller, ngModel) {

      var gridstack = controller.init(element, scope.options);
      scope.gridstackHandler = gridstack;

      element.on('change', function(e, items) {
        $timeout(function() {
          scope.$apply();
          scope.onChange({event: e, items: items});
        });
      });

      element.on('added', function(e, items) {
        // console.log('element.on(added)', e, items);
        $timeout(function() {
          scope.$apply();
          scope.onAdded({event: e, items: items});
        });
      });


        element.on('removed', function(e, items) {
           //  console.log('element.on(removed)', e, items);
            $timeout(function() {
                scope.$apply();
                scope.onRemoved({event: e, items: items});
            });
        });


        element.on('dragstart', function(e, ui) {
        scope.onDragStart({event: e, ui: ui});
      });

      element.on('dragstop', function(e, ui) {
        $timeout(function() {
          scope.$apply();
          scope.onDragStop({event: e, ui: ui});
        });
      });

      element.on('resizestart', function(e, ui) {
        scope.onResizeStart({event: e, ui: ui});
      });

      element.on('resizestop', function(e, ui) {
        $timeout(function() {
          scope.$apply();
          scope.onResizeStop({event: e, ui: ui});
        });
      });

      // $('.grid-stack').on('added', function(event, items) {
      //   for (var i = 0; i < items.length; i++) {
      //     console.log('item added');
      //     console.log(items[i]);
      //   }
      // });

    }
  };

}]);
})();
