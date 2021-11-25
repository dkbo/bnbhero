(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{413:function(t,e,n){"use strict";e.a=[{name:"Tier 1-1",success:70,hploss:200,exp:100,reward:.0033},{name:"Tier 1-2",success:67,hploss:200,exp:110,reward:.00396},{name:"Tier 1-3",success:63,hploss:200,exp:120,reward:.0462},{name:"Tier 2-1",success:59,hploss:200,exp:130,reward:.00528},{name:"Tier 2-2",success:55,hploss:200,exp:150,reward:.00594},{name:"Tier 2-3",success:51,hploss:200,exp:200,reward:.0066},{name:"Boss 1",success:28,hploss:400,exp:400,reward:.0242}]},416:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return u})),n.d(e,"f",(function(){return l})),n.d(e,"e",(function(){return d})),n.d(e,"c",(function(){return f})),n.d(e,"d",(function(){return m}));var r=n(417),a=n.n(r),s=n(413),i=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,a=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){a=!0,s=t}finally{try{!r&&o.return&&o.return()}finally{if(a)throw s}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},o=function(t){return a.a.encode(t)},u=function(t){return a.a.decode(t)},c=function(t){try{return JSON.parse(t)}catch(t){return""}},l=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];localStorage[o(t)]=o(n?JSON.stringify(e):e)},d=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=localStorage[o(t)];if(n)try{var r=u(n);return e?c(r):r}catch(t){return""}return""},f=function(t){var e,n=t.card,r=t.build,a=(t.gas,i(n,4)),s=a[0],o=a[1],u=a[2],c=a[3],l=i(r,4),d=l[0],f=l[1],m=l[2],h=l[3],p=2==+(e=d)?30:3==+e?60:4==+e?140:0,v=function(t){return 2==+t?3:3==+t?6:4==+t?16:0}(f),y=function(t){return 2==+t?-5:3==+t?-12:4==+t?-28:0}(m),w=86.4*(100+y)/100;return{buildData:{attr:p,reward:v,exp:function(t){return 2==+t?30:3==+t?60:4==+t?90:0}(h),dishp:y},cardData:{vatk:10*(s-1)+o+p,vdef:10*(s-1)+u+p,vagi:10*(s-1)+c+p,hpcd:w,everyDayHp:(86400/w).strip(4)}}},m=function(t){var e=t.cardData,n=t.buildData,r=t.gas,a=e.vatk,i=e.vdef,o=e.vagi,u=e.everyDayHp,c=n.reward,l=n.exp;return s.a.map((function(t){var e=t.name,n=t.success,s=t.hploss,d=t.exp,f=t.reward,m=n+a/100,h=f*(100+c)/100,p=h+o*h/1e3,v=s-i/10,y=u/(((100-m)*s+m*v)/100),w=m/100*(d+l),g=Math.ceil(y*w),b=(y*(m/100*p-r)).strip(4);return{name:e,successC:m,rewardC:p.strip(8),hplossC:v,everyXp:g,everyRewrad:b}}))}},426:function(t,e,n){},452:function(t,e,n){"use strict";n(426)},456:function(t,e,n){"use strict";n.r(e);var r=n(416),a=n(433),s=n.n(a),i=n(413),o=n(451),u=n.n(o);var c={name:"FightData",data:function(){return{api:"https://graphql.bitquery.io",walletAddress:Object(r.e)("walletAddress")||"",dataAddress:"0xde9fFb228C1789FEf3F08014498F2b16c57db855",filterHero:"",filterEnemyType:"",network:"bsc",eventType:"Fight",columns:[{title:"英雄",key:"_attackingHero"},{title:"敵人",key:"enemyType"},{title:"獎勵",key:"rewards"},{title:"經驗值",key:"xpGained"},{title:"損血",key:"hpLoss"},{title:"時間",key:"date"}],data:[],isLoading:!1}},beforeMount:function(){this.walletAddress&&this.handleCalc()},methods:{handleCalc:function(){var t,e=this;return(t=regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,e.fetchGetCount();case 3:return n=t.sent,t.next=6,e.fetchGetFightData(n);case 6:e.isLoading=!1;case 7:case"end":return t.stop()}}),t,e)})),function(){var e=t.apply(this,arguments);return new Promise((function(t,n){return function r(a,s){try{var i=e[a](s),o=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(o).then((function(t){r("next",t)}),(function(t){r("throw",t)}));t(o)}("next")}))})()},fetchGetCount:function(){return s.a.post(this.api,{query:"query ($network: EthereumNetwork!, $address: String!, $eventType: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $to: ISO8601DateTime, $txFrom: [String!]) {\n  ethereum(network: $network) {\n    smartContractEvents(\n      options: {limit: $limit, offset: $offset}\n      date: {since: $from, till: $to}\n      txFrom: {in: $txFrom}\n      smartContractAddress: {is: $address}\n      smartContractEvent: {is: $eventType}\n    ) {\n      count(smartContractEvent: {is: $eventType})\n      __typename\n    }\n    __typename\n  }\n}",variables:{network:this.network,address:this.dataAddress,eventType:this.eventType,offset:0,limit:1e4,from:null,to:null,txFrom:[this.walletAddress]}}).then((function(t){return t.data.data.ethereum.smartContractEvents[0].count})).catch((function(t){return console.error(t,"查詢戰鬥數據失敗"),-1}))},fetchGetFightData:function(t){return s.a.post(this.api,{query:'query ($network: EthereumNetwork!, $address: String!, $eventType: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $to: ISO8601DateTime, $txFrom: [String!]) {\n  ethereum(network: $network) {\n    smartContractEvents(\n      options: {desc: "block.height", limit: $limit, offset: $offset}\n      date: {since: $from, till: $to}\n      txFrom: {in: $txFrom}\n      smartContractAddress: {is: $address}\n      smartContractEvent: {is: $eventType}\n    ) {\n      smartContractEvent {\n        name\n        __typename\n      }\n      block {\n        height\n        timestamp {\n          iso8601\n          unixtime\n          __typename\n        }\n        __typename\n      }\n      arguments {\n        value\n        argument\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}',variables:{network:this.network,address:this.dataAddress,eventType:this.eventType,offset:0,limit:t,from:null,to:null,txFrom:[this.walletAddress]}}).then(this.handleFightData).catch((function(t){return console.error(t,"查詢戰鬥數據失敗"),[]}))},handleFightData:function(t){var e=t.data.data.ethereum.smartContractEvents;this.data=e.map((function(t){var e=t.arguments,n=t.block,r={};return e.slice(1,7).forEach((function(t){var e=t.argument,n=t.value;return r[e]=function(t,e){switch(t){case"enemyType":return i.a[e].name;case"rewards":return e/1e18;default:return e}}(e,n)})),r.date=u.a.unix(n.timestamp.unixtime).format("YYYY/MM/DD HH:mm:ss"),r})),Object(r.f)("walletAddress",this.walletAddress)},rowClassName:function(t){return t.rewards?"":"table-fair"}},computed:{tableData:function(){var t=this;return this.filterHero||this.filterEnemyType?this.data.filter((function(e){var n=e._attackingHero,r=e.enemyType;return(n.includes(t.filterHero)||!t.filterHero)&&(r.includes(t.filterEnemyType)||!t.filterEnemyType)})):this.data},fightCount:function(){return this.tableData.length},fightSuccess:function(){return this.tableData.filter((function(t){return t.rewards})).length},fightFair:function(){return this.fightCount-this.fightSuccess}}},l=(n(452),n(2)),d=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("Row",[n("Col",{attrs:{span:"6"}},[n("Input",{attrs:{placeholder:"bsc 錢包位址"},model:{value:t.walletAddress,callback:function(e){t.walletAddress=e},expression:"walletAddress"}})],1),t._v(" "),n("Col",{attrs:{span:"6"}},[n("Input",{attrs:{placeholder:"篩選英雄"},model:{value:t.filterHero,callback:function(e){t.filterHero=e},expression:"filterHero"}})],1),t._v(" "),n("Col",{attrs:{span:"6"}},[n("Input",{attrs:{placeholder:"篩選敵人"},model:{value:t.filterEnemyType,callback:function(e){t.filterEnemyType=e},expression:"filterEnemyType"}})],1),t._v(" "),n("Col",{attrs:{span:"6"}},[n("Button",{attrs:{loading:t.isLoading,type:"success",long:"",icon:"ios-search"},on:{click:t.handleCalc}},[t._v("\n                    計算\n                ")])],1)],1),t._v(" "),t.tableData.length?n("Row",[n("Col",{staticClass:"info",attrs:{span:"24"}},[t._v("\n            總戰鬥次數: "+t._s(t.fightCount)+"\n            戰鬥成功: "+t._s(t.fightSuccess)+"\n            戰鬥失敗: "+t._s(t.fightFair)+"\n            實際勝率: "+t._s((t.fightSuccess/t.fightCount*100).toFixed(2))+"%\n        ")])],1):t._e(),t._v(" "),n("Table",{attrs:{"row-class-name":t.rowClassName,columns:t.columns,data:t.tableData}})],1)}),[],!1,null,"2e20b416",null);e.default=d.exports}}]);
//# sourceMappingURL=FightData241e52967c5cd73057c4.js.map