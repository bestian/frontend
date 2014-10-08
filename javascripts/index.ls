

chainCtrl = ($scope, $sce, $title, $path,
				$dummy, $hash, $goban) !->

	
	$scope.myColumnIndex = [to 6]
	$scope.myFolderIndex = [to 10]
	$scope.myI = $hash.asArray![1] or 0
	$scope.myJ = $hash.asArray![2]	or 0
	$scope.title = $hash.asArray![0] or $title

	$scope.backup = !->
		for i in $scope.myFolderIndex
			window.open $path+$title+i+'.csv'  \_blank "width=0, height=0, titlebar=no, toolbar=no"

	$scope.trust = (url)->
		$sce.trustAsResourceUrl(url)

	$scope.keyPress = ($event) !->
		console.log $event
		$event.preventDefault()
		code = $event.keyCode
		if code == 40
			$scope.up 1
		if code == 38
			$scope.up -1
		if code == 37
			$scope.left -1
		if code == 39
			$scope.left 1
		if code == 32
			$scope.goban.data[$scope.myJ].isClosed = !$scope.goban.data[$scope.myJ].isClosed;

	$scope.updateHash = !->
		$hash.upDateFromArray [$scope.title,$scope.myI,$scope.myJ]

	$scope.up = (n) !->
		$scope.myJ = parseInt($scope.myJ);
		$scope.myJ += n
		if $scope.myJ == -1
			$scope.myJ = 0
		$scope.updateHash!


	$scope.left = (n) !->
		$scope.myI = parseInt($scope.myI);
		$scope.myI += n
		if $scope.myI == -1
			$scope.myI = 0
		$scope.updateHash!

	$scope.goban = $goban;
	$scope.goban.data = $dummy;

	$scope.goban.load 0;

toIndex = ->
	(list)->
		[to list.length-1]

myHash = ->
	data: location.hash
	asArray: ->
		@.data.replace \# '' .split \&
	upDateFromArray: (list) !->
		location.hash = \# + list.join \&


myDummy = 
		*name: '赤皮仔'
			isFolder: false
			url:'https://autolearn.hackpad.com/33EfKKhNtF8'
		*name: '夾子1'
			isFolder: true
			isClosed: false
		*name: '配色'
			isFolder: false
			pIndex: 1
			url: 'https://docs.google.com/presentation/d/1fFgk1-gO4mMT1sZV4bAIxW789YitfsOsPnz25ONK3x8/edit#slide=id.p'
		*name: '作業流程'
			isFolder: false
			pIndex: 1
			url: 'https://docs.google.com/drawings/d/10M-JkRQ5aMOCmIKkrJETZjZOQ3i2dyMcBd7e0nKviac/edit?usp=sharing'
		*name: '完形心理學'
			isFolder: false
			pIndex: 1
			url: 'https://docs.google.com/presentation/d/1frZZWrlCOapT_9edhjd5hC0X4K-2NziAvE5IsXm7A-Q/edit#slide=id.p10'
		*name: '夾子2'
			isFolder: true
			isClosed: true
		*name: '配色'
			isFolder: false
			pIndex: 5
			url: 'https://docs.google.com/presentation/d/1fFgk1-gO4mMT1sZV4bAIxW789YitfsOsPnz25ONK3x8/edit#slide=id.p'
		*name: '作業流程'
			isFolder: false
			pIndex: 5
			url: 'https://docs.google.com/drawings/d/10M-JkRQ5aMOCmIKkrJETZjZOQ3i2dyMcBd7e0nKviac/edit?usp=sharing'
		*name: '完形心理學'
			isFolder: false
			pIndex: 5
			url: 'https://docs.google.com/presentation/d/1frZZWrlCOapT_9edhjd5hC0X4K-2NziAvE5IsXm7A-Q/edit#slide=id.p10'


myGoban = ($http, $path, $title)->
	goban = new Object;

	myLoad = (num)-> 
		$http {method: "GET",url: $path + $title + num + '.csv',dataType: "text"}
			.success (data) ->
				console.log data
				data	

	goban.load = (num) !->	
		myLoad num
	#	this.data = myLoad num	

	#todo : parseData
	
	goban

angular.module 'chainApp' []
	.constant '$path' 'https://ethercalc.org/'
	.constant '$title' 'bt_frontend'
	.constant '$dummy' myDummy
	.factory '$hash' myHash
	.factory '$goban' [\$http,\$path, \$title, myGoban]
	.filter 'toIndex' toIndex
	.controller 'chainCtrl' chainCtrl
