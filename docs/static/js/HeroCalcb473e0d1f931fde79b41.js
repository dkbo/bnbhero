(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{443:function(a,e,r){"use strict";e.a=[{name:"Tier 1-1",success:70,hploss:200,exp:100,reward:.003135},{name:"Tier 1-2",success:67,hploss:200,exp:110,reward:.003762},{name:"Tier 1-3",success:63,hploss:200,exp:120,reward:.004389},{name:"Tier 2-1",success:59,hploss:200,exp:130,reward:.005016},{name:"Tier 2-2",success:55,hploss:200,exp:150,reward:.005643},{name:"Tier 2-3",success:51,hploss:200,exp:200,reward:.00627},{name:"Boss 1",success:28,hploss:400,exp:400,reward:.02299}]},455:function(a,e,r){"use strict";r.d(e,"b",(function(){return l})),r.d(e,"a",(function(){return o})),r.d(e,"f",(function(){return u})),r.d(e,"e",(function(){return d})),r.d(e,"c",(function(){return h})),r.d(e,"d",(function(){return m}));var t=r(482),n=r.n(t),c=r(443),s=function(a,e){if(Array.isArray(a))return a;if(Symbol.iterator in Object(a))return function(a,e){var r=[],t=!0,n=!1,c=void 0;try{for(var s,l=a[Symbol.iterator]();!(t=(s=l.next()).done)&&(r.push(s.value),!e||r.length!==e);t=!0);}catch(a){n=!0,c=a}finally{try{!t&&l.return&&l.return()}finally{if(n)throw c}}return r}(a,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},l=function(a){return n.a.encode(a)},o=function(a){return n.a.decode(a)},i=function(a){try{return JSON.parse(a)}catch(a){return""}},u=function(a,e){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];localStorage[l(a)]=l(r?JSON.stringify(e):e)},d=function(a){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=localStorage[l(a)];if(r)try{var t=o(r);return e?i(t):t}catch(a){return""}return""},h=function(a){var e,r=a.card,t=a.build,n=(a.gas,s(r,4)),c=n[0],l=n[1],o=n[2],i=n[3],u=s(t,4),d=u[0],h=u[1],m=u[2],p=u[3],f=2==+(e=d)?30:3==+e?60:4==+e?140:0,v=function(a){return 2==+a?3:3==+a?6:4==+a?16:0}(h),y=function(a){return 2==+a?-5:3==+a?-13:4==+a?-28:0}(m),g=86.4*(100+y)/100;return{buildData:{attr:f,reward:v,exp:function(a){return 2==+a?30:3==+a?60:4==+a?90:0}(p),dishp:y},cardData:{vatk:10*(c-1)+l+f,vdef:10*(c-1)+o+f,vagi:10*(c-1)+i+f,hpcd:g,everyDayHp:(86400/g).strip(4)}}},m=function(a){var e=a.cardData,r=a.buildData,t=a.gas,n=e.vatk,s=e.vdef,l=e.vagi,o=e.everyDayHp,i=r.reward,u=r.exp;return c.a.map((function(a){var e=a.name,r=a.success,c=a.hploss,d=a.exp,h=a.reward,m=r+n/100,p=h*(100+i)/100,f=p+l*p/1500,v=Math.ceil(c-s/20),y=o/(((100-m)*c+m*v)/100),g=m/100*(d+u),b=Math.ceil(y*g),w=(y*(m/100*f-t)).strip(4);return{name:e,successC:m,rewardC:f.strip(8),hplossC:v,everyXp:b,everyRewrad:w}}))}},514:function(a,e,r){},624:function(a,e,r){"use strict";r(514)},930:function(a,e,r){"use strict";r.r(e);var t=r(455),n=[{name:"傳說 Legendary",arr:[{name:"Sir Asten (澄騎)",card:[800,700,600]},{name:"URIAH THE SAGE (澄法)",card:[800,700,600]},{name:"DUKE DUSCAIR IV (澄騎)",card:[800,700,600]}]},{name:"史詩 EPIC",arr:[{name:"Elrik The Imbuer (紫賊)",card:[900,500,500]},{name:"Xegis Branfyre (紫法)",card:[800,500,600]},{name:"Helia Stormcall (紫法)",card:[800,400,700]}]},{name:"稀有",arr:[{name:"Arnulf of Esplin (藍校尉)",card:[600,700,400]},{name:"Sir Bertrand (藍光頭)",card:[600,600,500]},{name:"Lady Ella of Tir (藍法)",card:[600,400,700]},{name:"Balen Fellwood (藍獵人)",card:[700,500,500]}]},{name:"罕見",arr:[{name:"Demisov The Bold (綠光頭)",card:[500,800,300]},{name:"Thalas One-Eye (綠獵)",card:[700,300,600]},{name:"Reis Of The Knife (綠賊)",card:[500,300,800]},{name:"Andin Olis (綠士兵)",card:[500,500,600]}]},{name:"普通",arr:[{name:"Esfel Of Lordan (黃賊)",card:[400,300,800]},{name:"Dayne of Gerston (黃劍兵)",card:[500,500,500]},{name:"Jan Rhylen (黃盾兵)",card:[500,700,300]},{name:"Sivalas Zefen (黃獵人)",card:[600,300,600]},{name:"Torlov Branhart (黃民兵)",card:[500,600,400]},{name:"Lena Ashwood (黃女獵)",card:[500,400,600]}]}],c={name:"CalcInput",props:{v:Array,PH:Array}},s=r(2),l=Object(s.a)(c,(function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("Row",a._l(a.v,(function(e,t){return r("Col",{key:t,attrs:{span:24/a.v.length}},[r("Input",{attrs:{number:"",placeholder:a.PH[t]},model:{value:a.v[t],callback:function(e){a.$set(a.v,t,e)},expression:"v[i]"}})],1)})),1)}),[],!1,null,null,null).exports,o=Object.assign||function(a){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(a[t]=r[t])}return a},i=function(a,e){if(Array.isArray(a))return a;if(Symbol.iterator in Object(a))return function(a,e){var r=[],t=!0,n=!1,c=void 0;try{for(var s,l=a[Symbol.iterator]();!(t=(s=l.next()).done)&&(r.push(s.value),!e||r.length!==e);t=!0);}catch(a){n=!0,c=a}finally{try{!t&&l.return&&l.return()}finally{if(n)throw c}}return r}(a,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function u(a){if(Array.isArray(a)){for(var e=0,r=Array(a.length);e<a.length;e++)r[e]=a[e];return r}return Array.from(a)}var d={name:"HeroCalc",data:function(){var a=Object(t.e)("HeroCalc")||[];return{heroData:n,gas:"",name:"",name2:"",card:["","","",""],build:["","","",""],columns:[{title:"英雄素質 Hero Info",align:"center",className:"color5",children:[{title:"回血CD HP CD",key:"hpcd",align:"center",className:"color5"},{title:"每日血量 Day HP",key:"everyDayHp",align:"center",className:"color5"},{title:"攻擊 Atk",key:"vatk",align:"center",className:"color5"},{title:"防禦 Def",key:"vdef",align:"center",className:"color5"},{title:"速度 Agi",key:"vagi",align:"center",className:"color5"}]},{title:"建築物加成 Building Buff",align:"center",className:"color5",children:[{title:"屬性 Attr",key:"attr",align:"center",className:"color5"},{title:"獎勵(%) Rewards",key:"reward",align:"center",className:"color5"},{title:"扣血(%) hploss",key:"dishp",align:"center",className:"color5"},{title:"EXP",key:"exp",align:"center",className:"color5"}]}],columns2:[{title:"怪物數據 Enemies Data",align:"center",className:"color5",children:[{title:"怪物名字 Enemies ",key:"name",align:"center",className:"color5"},{title:"總成功率(%) Success",key:"successC",align:"center",className:"color5"},{title:"戰鬥成功扣血量 succesd Hploss",key:"hplossC",align:"center",className:"color5"},{title:"獎金 Rewards",key:"rewardC",align:"center",className:"color5"},{title:"期望每天經驗 Day XP",key:"everyXp",align:"center",className:"color5"},{title:"期望每天獎金 Day Rewards",key:"everyRewrad",align:"center",className:"color5"}]}],data:[],data2:[],storage:a}},mounted:function(){try{var a=JSON.parse(Object(t.a)(this.$route.query.search)),e=a.card,r=a.build,n=a.name,c=a.gas;this.card=e,this.build=r,this.name=n,this.gas=c,this.handleCalc(!1)}catch(a){}},computed:{getheroData:function(){return this.heroData}},methods:{handleChange:function(a){var e=a.split("."),r=i(e,2),t=r[0],n=r[1],c=this.getheroData[t].arr[n],s=c.name,l=c.card;this.card=[this.card[0]].concat(u(l)),this.name=s},handleCalc:function(){var a=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=Object(t.b)(JSON.stringify({build:this.build,card:this.card,name:this.name,gas:this.gas}));this.$router.push({path:"",query:{search:e}});var r=Object(t.c)(this),n=r.buildData,c=r.cardData;if(this.data=[o({},n,c)],this.data2=Object(t.d)({buildData:n,cardData:c,gas:this.gas}),a){var s=[].concat(u(this.build)),l=[].concat(u(this.card)),i=this.name;this.storage.unshift({name:i,build:s,card:l}),this.storage.length>7&&this.storage.pop(),Object(t.f)("HeroCalc",this.storage)}},handleRecodeCalc:function(a){var e=this.storage[a],r=e.build,t=e.card,n=e.name;this.name=n,this.card=[].concat(u(t)),this.build=[].concat(u(r)),this.handleCalc(!1)}},components:{CalcInput:l}},h=(r(624),Object(s.a)(d,(function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"container"},[r("Row",[r("Col",{attrs:{span:"12"}},[r("Row",[r("Col",{attrs:{span:"24"}},[r("Button",{attrs:{type:"info",long:""}},[a._v("\n                      建築物等級 Building Level\n                  ")])],1)],1),a._v(" "),r("CalcInput",{attrs:{v:a.build,PH:["Training Ground","BNB Vault","Town Inn","Barracks"]}}),a._v(" "),r("Row",[r("Col",{attrs:{span:"24"}},[r("Button",{attrs:{type:"info",long:""}},[a._v("\n                      卡片資料 Card\n                  ")])],1),a._v(" "),r("Col",{attrs:{span:"8"}},[r("Select",{attrs:{filterable:"",long:""},on:{input:a.handleChange},model:{value:a.name2,callback:function(e){a.name2=e},expression:"name2"}},a._l(a.getheroData,(function(e,t){return r("OptionGroup",{key:e.name,attrs:{label:e.name}},a._l(e.arr,(function(a,e){return r("Option",{key:a.name,attrs:{value:t+"."+e,label:a.name}})})),1)})),1)],1),a._v(" "),r("Col",{attrs:{span:"8"}},[r("Input",{attrs:{placeholder:"英雄名稱 Hero Name"},model:{value:a.name,callback:function(e){a.name=e},expression:"name"}})],1),a._v(" "),r("Col",{attrs:{span:"8"}},[r("Input",{attrs:{placeholder:"Gas"},model:{value:a.gas,callback:function(e){a.gas=e},expression:"gas"}})],1)],1),a._v(" "),r("Row",[r("Col",{attrs:{span:"24"}},[r("Button",{attrs:{type:"info",long:""}},[a._v("\n                      等級 Level、攻 atk、防 def、速 agi\n                  ")])],1)],1),a._v(" "),r("CalcInput",{attrs:{v:a.card,PH:["等級 Level","攻擊 Atk","防禦 Def","速度 Agi"]}}),a._v(" "),r("Row",[r("Col",{attrs:{span:"24"}},[r("Button",{attrs:{type:"success",long:"",icon:"ios-search"},on:{click:a.handleCalc}},[a._v("\n                      計算(calculate)\n                  ")])],1)],1)],1),a._v(" "),r("Col",{attrs:{span:"12"}},a._l(a.storage,(function(e,t){var n=e.name,c=e.card,s=e.build;return r("Button",{key:t,attrs:{type:"ghost",long:"",icon:"ios-search"},on:{click:function(e){return a.handleRecodeCalc(t)}}},[a._v("\n              "+a._s(n+" "+c.join()+"|"+s.join())+"\n          ")])})),1)],1),a._v(" "),r("Row",[r("Col",{attrs:{span:"24"}},[r("Table",{attrs:{border:"",columns:a.columns,data:a.data}})],1)],1),a._v(" "),r("Row",[r("Col",{attrs:{span:"24"}},[r("Table",{attrs:{border:"",columns:a.columns2,data:a.data2}})],1)],1)],1)}),[],!1,null,"1c5c01ba",null));e.default=h.exports}}]);
//# sourceMappingURL=HeroCalcb473e0d1f931fde79b41.js.map