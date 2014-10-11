chainCtrl = ($window, $scope, $dummy, $goban) !->


	$scope.goban = $goban;
	$scope.goban.data = $dummy;
	$scope.goban.load $goban.myI;
	

	$scope.navHeight = 50;

	$scope.countHeight = ->
		$window.innerHeight - 40

	$scope.countWidth = ->
		$window.innerWidth


myDummy = 
		*name: '赤皮仔'
			isFolder: false
			url:'https://autolearn.hackpad.com/33EfKKhNtF8'


angular.module 'chainApp' ['goban']
	.constant '$gobanPath' 'https://ethercalc.org/'
	.constant '$gobanTitle' 'bt_frontend'
	.constant '$gobanMax' 6
	.constant '$dummy' myDummy
	.controller 'chainCtrl' chainCtrl
