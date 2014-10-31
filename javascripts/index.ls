chainCtrl = ($window, $scope, $dummy, $goban) !->


	$scope.goban = $goban
	$scope.goban.data = $dummy
	$scope.goban.load $goban.myI
	

	$scope.icons = ['http://static.jsbin.com/images/dave.min.svg',
			'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
			'http://modernweb.com/wp-content/uploads/2014/01/6_reasons_sass_header.jpg',
			'http://www.w3schools.com/angular/pic_angular.jpg']

	$scope.navHeight = 50

	$scope.countHeight = ->
		$window.innerHeight - 40
	$scope.countWidth = ->
		$window.innerWidth - 220




myDummy = 
		*name: '赤皮仔'
			isFolder: false
			url:'https://autolearn.hackpad.com/33EfKKhNtF8'


angular.module 'chainApp' ['goban']
	.constant '$gobanPath' 'https://ethercalc.org/'
	.constant '$gobanTitle' 'bt_frontend'
	.constant '$gobanMax' 7
	.constant '$dummy' myDummy
	.controller 'chainCtrl' chainCtrl