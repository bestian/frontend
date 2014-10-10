chainCtrl = ($window, $scope, $colMax, $path, $title
				$dummy, $goban , $timeout) !->

	$scope.myColumnIndex = [to $colMax]
	$scope.myFolderIndex = [to 10]

	$scope.backup = !->
		for i in $scope.myFolderIndex
			window.open $path+$title+i+'.csv'  \_blank "width=0, height=0, titlebar=no, toolbar=no"

	$scope.goban = $goban;
	$scope.goban.data = $dummy;
	$scope.goban.load $goban.myI;

	$scope.navHeight = 50;

	$scope.countHeight = ->
		$window.innerHeight - 40


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
