// Generated by LiveScript 1.3.0
(function(){
  var chainCtrl;
  chainCtrl = function($scope, $sce, $title){
    $scope.myFolder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.myI = 0;
    $scope.myJ = 0;
    $scope.title = $title;
    $scope.backup = function(){};
    $scope.trust = function(url){
      return $sce.trustAsResourceUrl(url);
    };
    $scope.keyPress = function($event){
      var code;
      console.log($event);
      $event.preventDefault();
      code = $event.keyCode;
      if (code === 40) {
        $scope.up(1);
      }
      if (code === 38) {
        $scope.up(-1);
      }
      if (code === 37) {
        $scope.left(-1);
      }
      if (code === 39) {
        $scope.left(1);
      }
    };
    $scope.up = function(n){
      $scope.myJ += n;
    };
    $scope.left = function(n){
      $scope.myI += n;
    };
    $scope.dummy = [
      {
        name: '配色',
        url: 'https://docs.google.com/presentation/d/1fFgk1-gO4mMT1sZV4bAIxW789YitfsOsPnz25ONK3x8/edit#slide=id.p'
      }, {
        name: '作業流程',
        url: 'https://docs.google.com/drawings/d/10M-JkRQ5aMOCmIKkrJETZjZOQ3i2dyMcBd7e0nKviac/edit?usp=sharing'
      }, {
        name: '完形心理學',
        url: 'https://docs.google.com/presentation/d/1frZZWrlCOapT_9edhjd5hC0X4K-2NziAvE5IsXm7A-Q/edit#slide=id.p10'
      }
    ];
  };
  angular.module('chainApp', []).constant('$title', 'bt_frontend').controller('chainCtrl', chainCtrl);
}).call(this);
