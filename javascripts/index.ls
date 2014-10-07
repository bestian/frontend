toIndex = ->
	(list)->
		[to list.length-1]


chainCtrl = ($scope, $sce, $title) !->
	$scope.myFolderIndex = [to 10]
	$scope.myI = 0
	$scope.myJ = 0

	$scope.title = $title

	$scope.backup = !->

	$scope.trust = (url)->
		$sce.trustAsResourceUrl(url)

	$scope.keyPress = ($event) !->
		console.log $event
		$event.preventDefault()
	#	alert $event.keyCode
		code = $event.keyCode
		if code == 40
			$scope.up 1
		if code == 38
			$scope.up -1
		if code == 37
			$scope.left -1
		if code == 39
			$scope.left 1


	$scope.up = (n) !->
		$scope.myJ += n


	$scope.left = (n) !->
		$scope.myI += n


	$scope.dummy = 
			*name: '夾子1'
				isFolder: true
				isClosed: false
			*name: '配色'
				isFolder: false
				pIndex: 0
				url: 'https://docs.google.com/presentation/d/1fFgk1-gO4mMT1sZV4bAIxW789YitfsOsPnz25ONK3x8/edit#slide=id.p'
			*name: '作業流程'
				isFolder: false
				pIndex: 0
				url: 'https://docs.google.com/drawings/d/10M-JkRQ5aMOCmIKkrJETZjZOQ3i2dyMcBd7e0nKviac/edit?usp=sharing'
			*name: '完形心理學'
				isFolder: false
				pIndex: 0
				url: 'https://docs.google.com/presentation/d/1frZZWrlCOapT_9edhjd5hC0X4K-2NziAvE5IsXm7A-Q/edit#slide=id.p10'
			*name: '夾子2'
				isFolder: true
				isClosed: true
			*name: '配色'
				isFolder: false
				pIndex: 4
				url: 'https://docs.google.com/presentation/d/1fFgk1-gO4mMT1sZV4bAIxW789YitfsOsPnz25ONK3x8/edit#slide=id.p'
			*name: '作業流程'
				isFolder: false
				pIndex: 4
				url: 'https://docs.google.com/drawings/d/10M-JkRQ5aMOCmIKkrJETZjZOQ3i2dyMcBd7e0nKviac/edit?usp=sharing'
			*name: '完形心理學'
				isFolder: false
				pIndex: 4
				url: 'https://docs.google.com/presentation/d/1frZZWrlCOapT_9edhjd5hC0X4K-2NziAvE5IsXm7A-Q/edit#slide=id.p10'


	  


angular.module 'chainApp' []
	.constant '$title' 'bt_frontend'
	.filter 'toIndex' toIndex
	.controller 'chainCtrl' chainCtrl
