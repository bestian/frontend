chainCtrl = ($window, $scope, $colMax, $path, $title
				$dummy, $goban , $timeout) !->


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
	.constant '$path' 'https://ethercalc.org/'
	.constant '$title' 'bt_frontend'
	.constant '$colMax' 6
	.constant '$dummy' myDummy
	.controller 'chainCtrl' chainCtrl
