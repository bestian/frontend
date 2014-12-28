
(function(){
  var chainCtrl
  chainCtrl = function($scope, $window, $goban){
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : 'CPZ_frontend0',
      myI: 1,
      colMax : 10
    });

  //  $goban.myI = 1;
    $scope.goban.init();
    
    $scope.icons = {
     'CPZ_frontend0': [
     	'http://static.jsbin.com/images/dave.min.svg',
     	'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
     ],	
     'bt_frontend': [
     'http://static.jsbin.com/images/dave.min.svg',
     'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
     'http://modernweb.com/wp-content/uploads/2014/01/6_reasons_sass_header.jpg',
     'images/angularJS.jpeg',
     'http://www.optiinfo.com/images/services/ajax-website-development.png',
     'http://i.stack.imgur.com/4yTMs.png'],

      'autolearn_humanfactor':[
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg',
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg',
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg',
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg',
      'http://upload.wikimedia.org/wikipedia/commons/b/b5/Greek_uc_psi.jpg'
      ]} ;


    $scope.myOptsNew = [
      {h:'bt_frontend', n:'前端入門'},
      {h:'autolearn_humanfactor', n:'人因工程'},
      {h:'CPZ_frontend0', n:'赤皮仔前端第零班'},
      {h:'history_information',n:'資訊的歷史'},
  //    {h:'bt_backend', n:'後端入門'},
  //    {h:'bt_robot', n:'虛實整合入門'},
    ];

    $scope.quotes = [
        {n:'要看得更高更遠，就不能站在巨人的腳印上'
        },
        {n:'程式如果不能替人分擔憂愁，那也不過是一個冰冷的空殼罷了'
        },
        {n:'「如果理解這些思想，就能看穿這些技術背後的本質其實都是互通的」',
          f:'vgod',
          h:'http://blog.vgod.tw/2012/10/27/premature-optimization/'
        },
        {n:'「過早最佳化，是萬惡之源」',
         f:'Donald Knuth',
         h:'http://zh.wikipedia.org/wiki/%E9%AB%98%E5%BE%B7%E7%BA%B3'
        },
         {n:'存得起來的, 就是 storage. 看得到的, 才是 data. 看得懂的, 叫做 information. 用得出來的, 才能稱為 intelligence.',
          f:'翟本喬(Ben Jai)',
          h:'https://www.facebook.com/notes/ben-jai/iot-%E5%92%8C-big-data-%E5%95%86%E6%A9%9F%E7%9A%84%E8%BF%B7%E6%80%9D/10151577263144113'
        },
        {n:'',
          n:'到了這個世紀，我們可以看到 JavaScript 是一個非常類似的情況：表達力弱、容易出錯，需要大量時間維護，可是大家都一窩蜂跑去學，不知道為什麼。',
          f:'唐鳳(Au)',
          h:'https://hackpad.com/CUFP-FLOLAC14-PoPV1V9wVse'
        }

    ]


    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };
  };

  angular.module('chainApp', ['goban'])
    .controller('chainCtrl', ['$scope','$window', '$goban',chainCtrl]);
}).call(this);
