angular.module("checkApp",[])
	.controller("chkCtrl", myCHK);


function myCHK ($scope) {

	//models

	angular.extend($scope,
		{
			qline: 80,
			maxline: 99,

			catas: ['版型','樣式','資料','功能','使用者經驗'],
				//30 * 5 = 150
				//80+ 及格

			qs:[
				[ // html
					{n:'能否看得清楚呢?', s:10},
					{n:'區塊的分隔是否明確呢?', s:8, hint:'margin和padding'},
					{n:'控制和檢視區是否有分離呢?', s:5},
					{n:'區塊的寬高設定是否合理呢?', s:5},
					{n:'有無抽屜、下拉等隱藏式區塊?呢', s:2, hint:'select,CSS Psudo Class, ng-class或ng-show/ng-hide'},
				],
				[  //css
					{n:'樣式與配色與主題調和嗎?', s:10},
					{n:'是否有用SASS做跨瀏覽器與程式碼簡化呢?', s:8},
					{n:'有做感應試設計讓手機直放也能看清楚嗎?', s:5, keyword:'CSS Media Query',hint:'@media screen and (max-width : 600px)或ng-class'},
					{n:'是否有用SASS做特效呢?', s:5, hint:'compass/css3, @include transistion, @include animation, @include keyframes'},
					{n:'有做responsive,讓列表機列印時也能友善嗎?', s:2, keyword:'CSS Media Query', hint:'@media print'}
				],  
				[  //data.js
					{n:'有無收集到大部份一開始設定的資料呢?', s:10},
					{n:'有無將資料規格化，讓angular可以綁定呢?', s:8},
					{n:'有無收集到全部一開始設定的資料嗎?', s:5},
					{n:'有創建原生的元素/資料嗎?', s:5, hint:'鍵入、攝影、錄影、錄音'},
					{n:'有無抓取遠端元素/資料並注意到授權呢?', s:2, hint:'$http,iframe或src'},
				],
				[  //app.js
					{n:'有用到偵測輸入的語法嗎?', s:10, hint: '如ng-model, ng-keydown,或ng-mouseover'},
					{n:'有將資料綁定到內文嗎?', s:8, hint: '如ng-repeat, ng-bind, ng-bind-template或{{    }}'},
					{n:'有將變數或資料綁定到樣式呢?', s:5, hint: 'ng-class或ng-style'},
					{n:'有更新成angular1.3的寫法嗎?', s:5, keyword:'angular 1.3'},
					{n:'有用到ng-src來設定元素嗎?', s:2},
				],
				[ // UX
					{n:'有達成一開始設定的使用目標嗎?', s:10},
					{n:'使用方式是否簡明易懂呢?', s:8},
					{n:'有無友善合理的視覺提示呢?', s:5},
					{n:'對使用者的各個動作，有無提供即時正向的回饋呢?', s:5},
					{n:'在設計或功能上，有無會讓人留下印象的「亮點」呢?', s:2},
				]
			]
		});

	//methods
	angular.extend($scope, {
		countSubTotal: function(k){
			var ans = 0;
			for (var i = 0; i < this.qs[k].length; i++) {
				var o = this.qs[k][i];
				if (o.ok) ans += o.s;
			};
			return ans;
		},
		countSubMax: function(k){
			var ans = 0;
			for (var i = 0; i < this.qs[k].length; i++) {
				var o = this.qs[k][i];
				ans += o.s;
			};
			return ans;
		},
		countTotal: function(){
			var ans = 0;
			for (var i = 0; i < this.qs.length; i++) {
				ans += this.countSubTotal(i);
			};
			return ans;
		},
		countTotalMax: function(){
			var ans = 0;
			for (var i = 0; i < this.qs.length; i++) {
				ans += this.countSubMax(i);
			};
			return ans;
		}
	});
}