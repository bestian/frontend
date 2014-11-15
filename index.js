
(function(){
  var chainCtrl
  chainCtrl = function($scope, $window, $goban){
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : 'bt_frontend',
      colMax : 7
    });

    $goban.myI = 1;
    $scope.goban.init();
    
    $scope.icons = 
    ['http://static.jsbin.com/images/dave.min.svg',
     'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
     'http://modernweb.com/wp-content/uploads/2014/01/6_reasons_sass_header.jpg',
     'images/angularJS.jpeg',
     'http://www.optiinfo.com/images/services/ajax-website-development.png',
     'http://i.stack.imgur.com/4yTMs.png'];
    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };
  };

  angular.module('chainApp', ['goban'])
    .controller('chainCtrl', ['$scope','$window', '$goban',chainCtrl]);
}).call(this);
