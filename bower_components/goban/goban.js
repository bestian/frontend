// Generated by LiveScript 1.3.0
(function(){
  var toIndex, myHash, myGoban;
  toIndex = function(){
    return function(list){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = list.length - 1; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    };
  };
  myHash = function(){
    return {
      data: location.hash,
      asArray: function(){
        return this.data.replace('#', '').split('&');
      },
      upDateFromArray: function(list){
        location.hash = '#' + list.join('&');
      }
    };
  };
  myGoban = function($http, $sce, $gobanPath, $gobanTitle, $hash, $gobanMax, $timeout, $window){
    var goban;
    goban = new Object;
    angular.extend(goban, {
      data: [],
      z: [],
      path: $gobanPath || '',
      title: $hash.asArray()[0] || $gobanTitle,
      myI: $hash.asArray()[1] || 0,
      myJ: $hash.asArray()[2] || 0,
      myK: 0,
      pageLoading: false,
      animate: new Object,
      colMax: $gobanMax || 3,
      myColumnIndex: (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = $gobanMax; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }())
    });
    angular.extend(goban, {
      setI: function(n){
        if (this.myI !== n) {
          this.loadPage();
          $timeout(function(){
            goban.myI = n;
            goban.updateHash();
            goban.load(goban.myI);
          }, 1000);
        }
      },
      setJ: function(n){
        if (this.myJ !== n) {
          this.loadPage();
          $timeout(function(){
            goban.myJ = n;
            goban.updateHash();
          }, 1000);
        }
      },
      loadPage: function(){
        this.pageLoading = true;
        if (goban.animate.delay) {
          $timeout(function(){
            goban.pageLoading = false;
          }, goban.animate.delay);
        } else {
          this.pageLoading = false;
        }
      },
      updateHash: function(){
        $hash.upDateFromArray([this.title, this.myI, this.myJ]);
      },
      load: function(num){
        var folderName;
        folderName = this.title + num;
        if (typeof this.folderNames === 'array') {
          folderName = this.folderNames[num];
        }
        $http({
          method: "GET",
          url: $gobanPath + folderName + '.csv',
          dataType: "text"
        }).success(function(data){
          goban.data = goban.parseFromCSV(data);
        }).error(function(){
          goban.sectionTitle = null;
          goban.data = [];
        });
      },
      parseFromCSV: function(csv){
        var allTextLines, bodyLines, goodList, lastFolder, bestList;
        allTextLines = csv.split(/\r\n|\n/);
        this.sectionTitle = allTextLines[1].split(',')[1];
        bodyLines = allTextLines.slice(2);
        goodList = bodyLines.map(function(text){
          text = text.replace(/(html|css|js|output),/g, '$1COMMA');
          return text.split(',').map(function(str){
            return str.replace(/COMMA/g, ',');
          });
        }).filter(function(list){
          return list[1];
        });
        lastFolder = {
          id: 0,
          set: function(n){
            this.id = n;
          }
        };
        bestList = goodList.map(function(list, index){
          var isClosed, isBlank, isIsolate, obj;
          isClosed = false;
          if (!list[0]) {
            lastFolder.set(index);
            if (list[2] && list[2].search(/expand(.+)true/ > -1)) {
              isClosed = false;
            }
            if (list[2] && list[2].search(/expand(.+)false/ > -1)) {
              isClosed = true;
            }
          } else {
            if (list[2] && list[2].search(/target(.+)_blank/ > -1)) {
              isBlank = true;
            }
            if (list[2] && list[2].search(/isolate(.+)true/ > -1)) {
              isIsolate = true;
            }
          }
          obj = (list[0] && {
            url: list[0].replace(/["\s]/g, ''),
            name: list[1].replace(/["\s]/g, ''),
            isFolder: false,
            pIndex: lastFolder.id,
            isBlank: isBlank,
            isIsolate: isIsolate
          }) || {
            name: list[1],
            isFolder: true,
            isClosed: isClosed
          };
          return obj;
        });
        return bestList;
      },
      keyDown: function($event){
        var code;
        console.log($event);
        $event.preventDefault();
        code = $event.keyCode;
        if (code === 40) {
          this.dy(1);
        }
        if (code === 38) {
          this.dy(-1);
        }
        if (code === 37) {
          this.dx(-1);
        }
        if (code === 39) {
          this.dx(1);
        }
        if (code === 32) {
          this.data[this.myJ].isClosed = !this.data[this.myJ].isClosed;
        }
      },
      dx: function(n){
        var goX;
        goX = function(n){
          goban.myI = parseInt(goban.myI);
          goban.myI += n;
          if (goban.myI === -1) {
            goban.myI = goban.colMax;
          }
          if (goban.myI === goban.colMax + 1) {
            goban.myI = 0;
          }
          goban.updateHash();
        };
        this.loadPage();
        this.load(parseInt(this.myI) + n);
        if (this.animate.delay) {
          $timeout(goX(n), this.animate.delay);
        } else {
          goX(n);
        }
      },
      dy: function(n){
        var goY;
        goY = function(n){
          goban.myJ = parseInt(goban.myJ);
          goban.myJ += n;
          if (goban.myJ === -1) {
            goban.myJ = goban.data.length - 1;
          }
          if (goban.myJ === goban.data.length) {
            goban.myJ = 0;
          }
          goban.updateHash();
        };
        this.loadPage();
        if (this.animate.delay) {
          $timeout(goY(n), this.animate.delay);
        } else {
          goY(n);
        }
      },
      dz: function(n){
        var goZ;
        goZ = function(n){
          goban.myK += n;
        };
        this.loadPage();
        if (this.animate.delay) {
          $timeout(goZ(n), this.animate.delay);
        } else {
          goZ(n);
        }
      },
      trust: function(url){
        return $sce.trustAsResourceUrl(url);
      },
      getCurrentURL: function(){
        if (this.data[this.myJ] && this.data[this.myJ].isBlank) {
          $window.open(this.data[this.myJ].url);
          return;
        }
        return this.trust((this.data[this.myJ] && this.data[this.myJ].url) || (this.data[this.myJ + 1] && this.data[this.myJ + 1].url));
      },
      backupAll: function(){
        var downloadURL, i$, ref$, len$, i;
        downloadURL = function(url, k){
          var hiddenIFrameID, iframe;
          hiddenIFrameID = 'hiddenDownloader' + k;
          iframe = document.getElementById(hiddenIFrameID);
          if (deepEq$(iframe, null, '===')) {
            iframe = document.createElement('iframe');
            iframe.id = hiddenIFrameID;
            iframe.name = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
          }
          return iframe.src = url;
        };
        for (i$ = 0, len$ = (ref$ = (fn$())).length; i$ < len$; ++i$) {
          i = ref$[i$];
          downloadURL($gobanPath + $gobanTitle + i + '.csv', i);
        }
        function fn$(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = $gobanMax; i$ <= to$; ++i$) {
            results$.push(i$);
          }
          return results$;
        }
      },
      $default: function(obj){
        angular.extend(this, obj);
        return this;
      }
    });
    return goban;
  };
  angular.module('goban', []).factory('$hash', myHash).factory('$goban', ['$http', '$sce', '$gobanPath', '$gobanTitle', '$hash', '$gobanMax', '$timeout', '$window', myGoban]).filter('toIndex', toIndex);
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
