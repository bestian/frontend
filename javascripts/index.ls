

chainCtrl = ($scope, $sce, $title, $path, $colMax,
				$dummy, $hash, $goban , $timeout) !->

	$scope.path = $path	
	$scope.myColumnIndex = [to $colMax]
	$scope.myFolderIndex = [to 10]
	$scope.myI = $hash.asArray![1] or 0
	$scope.myJ = $hash.asArray![2]	or 0
	$scope.title = $hash.asArray![0] or $title

	$scope.pageLoading = false;

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


	loadPage = !->
		$scope.pageLoading = true	
		$timeout (!-> $scope.pageLoading = false),2300

	$scope.setI = (n) !->
		if $scope.myI != n
			loadPage!
			$timeout (!-> 
				$scope.myI = n
				$scope.updateHash!
				$scope.goban.load $scope.myI),1000

	$scope.setJ = (n) !->		
		if $scope.myJ != n
			loadPage!
			$timeout (!-> 
				$scope.myJ = n
				$scope.updateHash!),1000

	$scope.left = (n) !->
		loadPage!
		$scope.goban.load parseInt($scope.myI) + n
		$timeout (!-> 
			$scope.myI = parseInt($scope.myI)
			$scope.myI += n
			if $scope.myI == -1
				$scope.myI = $colMax
			if $scope.myI == $colMax + 1
				$scope.myI = 0
			$scope.updateHash!
			),1000


	$scope.up = (n) !->
		loadPage!
		$timeout (!-> 
			$scope.myJ = parseInt($scope.myJ)
			$scope.myJ += n
			if $scope.myJ == -1
				$scope.myJ = $scope.goban.data.length-1
			if $scope.myJ == $scope.goban.data.length
				$scope.myJ = 0
			$scope.updateHash!),1000
		



	$scope.goban = $goban;
	$scope.goban.data = $dummy;
	$scope.goban.load $scope.myI;

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


	parseFromCSV = (csv) ->
		allTextLines = csv.split(/\r\n|\n/)
		bodyLines = allTextLines.slice(2)
		goodList = bodyLines
					.map (text) -> text.split \,
					.filter (list) -> list[1]

		lastFolder = {id:0 , set: (n)!-> this.id = n}
		
		bestList = goodList.map (list,index) ->
						isClosed = false
						if not list[0]
							lastFolder.set(index)
							if list[2] and list[2].search /expand(.+)true/ > -1
								isClosed = true

						obj = (list[0]
						and {url: list[0].replace(/["\s]/g, ''), name: list[1].replace(/["\s]/g, ''), isFolder: false, pIndex: lastFolder.id})
							or { name: list[1], isFolder: true, isClosed: isClosed}

						obj
	#	console.log(bestList)
		bestList

	goban.load = (num) !->
		$http {method: "GET",url: $path + $title + num + '.csv',dataType: "text"}
				.success (data) ->
					goban.data = parseFromCSV data

	#todo : parseData
	
	goban

angular.module 'chainApp' []
	.constant '$path' 'https://ethercalc.org/'
	.constant '$title' 'bt_frontend'
	.constant '$colMax' 6
	.constant '$dummy' myDummy
	.factory '$hash' myHash
	.factory '$goban' [\$http,\$path, \$title, myGoban]
	.filter 'toIndex' toIndex
	.controller 'chainCtrl' chainCtrl
