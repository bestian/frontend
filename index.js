
(function(){
  var chainCtrl
  chainCtrl = function($scope, $window, $goban){
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : 'bt_frontend',
      colMax : 10
    });

  //  $goban.myI = 1;
    $scope.goban.init();
    
    $scope.icons = {
     'bt_frontend': [
     'http://static.jsbin.com/images/dave.min.svg',
     'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
     'http://modernweb.com/wp-content/uploads/2014/01/6_reasons_sass_header.jpg',
     'images/angularJS.jpeg',
     'http://www.optiinfo.com/images/services/ajax-website-development.png',
     'http://i.stack.imgur.com/4yTMs.png'],

      'autolearn_humanfactor':[
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg',
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg']
    } ;


    $scope.myOptsNew = [
      {h:'bt_frontend', n:'前端入門'},
      {h:'autolearn_humanfactor', n:'人因工程'},
  //    {h:'bt_backend', n:'後端入門'},
  //    {h:'bt_robot', n:'虛實整合入門'},
    ];


    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };
  };

  angular.module('chainApp', ['goban'])
    .controller('chainCtrl', ['$scope','$window', '$goban',chainCtrl]);
}).call(this);
