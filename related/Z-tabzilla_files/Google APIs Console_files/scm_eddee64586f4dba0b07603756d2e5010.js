(function(){try{var h=void 0,k=!0,n=null,q=!1,r=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ba=function(a,b,c){return a.call.apply(a.bind,arguments)},ca=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},s=function(a,b,c){s=Function.prototype.bind&&
-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return s.apply(n,arguments)},t=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}},fa=Date.now||function(){return+new Date},u=function(a,b){var c=a.split("."),d=r;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&b!==h?d[e]=b:d=d[e]?d[e]:d[e]={}};window.gbar.tev&&window.gbar.tev(3,"m");window.gbar.bls&&window.gbar.bls("m");var ga=function(){};(function(a){a.K=function(){a.L||(a.L=new a)}})(ga);var ha=n;var v=window.gbar;var w={C:1,Q:2,P:3,F:4,D:5,H:6,G:7,M:8};var ia=[],y=n,z=function(a,b){ia.push([a,b])},B=function(a,b){var c=n;b&&(c={m:b});v.tev&&v.tev(a,"m",c)};u("gbar.mddn",function(){for(var a=[],b=0,c;c=ia[b];++b)a.push(c[0]);return a.join(",")});z("il",{init:function(){ga.K();var a;if(!ha){a:{a=["gbar","logger"];for(var b=r,c;c=a.shift();)if(b[c]!=n)b=b[c];else{a=n;break a}a=b}ha=a||{}}a=ha;"function"==aa(a.il)&&a.il(8,h)}});var ma=function(a,b){if(window.gbar.logger._itl(b))return b;var c=a.stack;if(c){for(var c=c.replace(/\s*$/,"").split("\n"),d=[],e=0;e<c.length;e++)d.push(ja(c[e]));c=d}else c=ka();for(var d=c,e=0,g=d.length-1,f=0;f<=g;f++)if(d[f]&&0<=d[f].name.indexOf("_mlToken")){e=f+1;break}0==e&&g--;c=[];for(f=e;f<=g;f++)d[f]&&!(0<=d[f].name.indexOf("_onErrorToken"))&&c.push("> "+la(d[f]));d=[b,"&jsst=",c.join("")];e=d.join("");if(!window.gbar.logger._itl(e)||2<c.length&&(d[2]=c[0]+"..."+c[c.length-1],e=d.join(""),
!window.gbar.logger._itl(e)))return e;return b};z("er",{init:function(){window.gbar.logger._aem=ma}});var ja=function(a){var b=a.match(na);return b?new oa(b[1]||"",b[2]||"",b[3]||"","",b[4]||b[5]||""):(b=a.match(pa))?new oa("",b[1]||"","",b[2]||"",b[3]||""):n},na=RegExp("^    at(?: (?:(.*?)\\.)?((?:new )?(?:[a-zA-Z_$][\\w$]*|<anonymous>))(?: \\[as ([a-zA-Z_$][\\w$]*)\\])?)? (?:\\(unknown source\\)|\\(native\\)|\\((?:eval at )?((?:http|https|file)://[^\\s)]+|javascript:.*)\\)|((?:http|https|file)://[^\\s)]+|javascript:.*))$"),pa=/^([a-zA-Z_$][\w$]*)?(\(.*\))?@(?::0|((?:http|https|file):\/\/[^\s)]+|javascript:.*))$/,
ka=function(){for(var a=[],b=arguments.callee.caller,c=0;b&&20>c;){var d;d=(d=Function.prototype.toString.call(b).match(qa))?d[1]:"";var e=b,g=["("];if(e.arguments)for(var f=0;f<e.arguments.length;f++){var l=e.arguments[f];0<f&&g.push(", ");"string"==typeof l?g.push('"',l,'"'):g.push(""+l)}else g.push("unknown");g.push(")");a.push(new oa("",d,"",g.join(""),""));try{if(b==b.caller)break;b=b.caller}catch(j){break}c++}return a},qa=/^function ([a-zA-Z_$][\w$]*)/,oa=function(a,b,c,d,e){this.o=a;this.name=
b;this.n=c;this.B=d;this.t=e},la=function(a){var b=[a.o?a.o+".":"",a.name?a.name:"anonymous",a.B,a.n?" [as "+a.n+"]":""];a.t&&(b.push(" at "),b.push(a.t));a=b.join("");for(b=window.location.href.replace(/#.*/,"");0<=a.indexOf(b);)a=a.replace(b,"[page]");return a=a.replace(/http.*?extern_js.*?\.js/g,"[xjs]")};var ra=function(a){this.v=a},sa=/\s*;\s*/;ra.prototype.set=function(a,b,c,d,e,g){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');c!==h||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";g=g?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(fa()+1E3*c)).toUTCString();this.v.cookie=a+"="+b+e+d+c+g};
ra.prototype.get=function(a,b){for(var c=a+"=",d=(this.v.cookie||"").split(sa),e=0,g;g=d[e];e++){if(0==g.lastIndexOf(c,0))return g.substr(c.length);if(g==a)return""}return b};var C=new ra(document);C.R=3950;var D=window.gbar.i;var ta,I=function(a,b,c,d,e){try{var g=ta;if(e!=h&&e!=n)if(0<=e&&1>=e)g=e;else{H(Error(b+"_"+c+"_"+e),"up","log");return}if(Math.random()<=g){var f=["//www.google.com/gen_204?atyp=i","zx="+(new Date).getTime(),"ogsr="+g/1,"ct="+b,"cad="+c,"id="+a,"loc="+(window.google?window.google.sn:""),"ogprm=up"];d&&f.push(d);v.logger.log(f.join("&"))}}catch(l){H(Error(b+"_"+c+"_"+e),"up","log")}};u("gbar.up.sl",I);u("gbar.up.spl",function(a,b,c,d){I(a,b,c,"tpt="+d.join(","))});
z("up",{init:function(a){ta=a.sp;v.up.tp()}});var va=function(a){this.b={};D.g=s(this.z,this);D.h=s(this.w,this);for(var b=this.b,a=a.p.split(":"),c=0,d;d=a[c];++c)if(d=d.split(","),5==d.length){var e={};e.id=d[0];e.key=d[1];e.a=d[2];e.N=D.c(d[3],0);e.O=D.c(d[4],0);b[e.a]=e}ua(this)},Aa={7:["gbprc","gbprca"]};va.prototype.z=function(a){if(a=this.b[a])Ba(a),I(a.id,a.a,"d",h,1)};va.prototype.w=function(a){if(a=this.b[a])Ba(a),I(a.id,a.a,"h",h,1)};
var Ba=function(a){var b=Aa[a.a];if(b)for(var c=0;c<b.length;c++){var d=document.getElementById(b[c]);d&&J(d,"gbto")}if("7"==a.a&&(b=Ca()))b=b.style,b.width="",b.height="",b.visibility="",b.top="",b.left="";b=a.key;(a=C.get("OGP",""))&&(a+=":");for(var a=a+("-"+b),e;50<a.length&&-1!=(e=a.indexOf(":"));)a=a.substring(e+1);e=window.location.hostname;b=e.indexOf(".google.");e=0<b?e.substring(b):h;50>=a.length&&e&&C.set("OGP",a,2592E3,"/",e)},ua=function(a){for(var b in a.b)if(a.b.hasOwnProperty(b)){var c=
a.b[b];v.up.r(c.a,function(a){if(a&&-1==C.get("OGP","").indexOf("-"+c.key)){var a=c,b=Aa[a.a];if(b)for(var g=0;g<b.length;g++){var f=document.getElementById(b[g]);f&&K(f,"gbto");I(a.id,a.a,"i")}if("7"==a.a&&(a=document.getElementById("gbprcc")))if(b=Ca())a.appendChild(b),b=b.style,b.width=a.offsetWidth+"px",b.height=a.offsetHeight+"px",b.visibility="visible",b.top="-1px",b.left="-1px"}})}},Ca=function(){var a=document.getElementById("gbprcs");if(a)return a;a=document.createElement("iframe");a.frameBorder=
"0";a.tabIndex="-1";a.id="gbprcs";a.src="javascript:''";M("gbw").appendChild(a);return a};z("pm",{init:function(a){new va(a)}});var Ea=function(a){for(var b=0,c=(""+Da).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),a=(""+a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=Math.max(c.length,a.length),e=0;0==b&&e<d;e++){var g=c[e]||"",f=a[e]||"",l=RegExp("(\\d*)(\\D*)","g"),j=RegExp("(\\d*)(\\D*)","g");do{var m=l.exec(g)||["","",""],p=j.exec(f)||["","",""];if(0==m[0].length&&0==p[0].length)break;b=((0==m[1].length?0:parseInt(m[1],10))<(0==p[1].length?0:parseInt(p[1],10))?-1:(0==m[1].length?0:parseInt(m[1],10))>(0==p[1].length?
0:parseInt(p[1],10))?1:0)||((0==m[2].length)<(0==p[2].length)?-1:(0==m[2].length)>(0==p[2].length)?1:0)||(m[2]<p[2]?-1:m[2]>p[2]?1:0)}while(0==b)}return b};var Fa=function(a,b){this.width=a;this.height=b};var N,Ga,O,Ha,Ia=function(){return r.navigator?r.navigator.userAgent:n};Ha=O=Ga=N=q;var P;if(P=Ia()){var Ja=r.navigator;N=0==P.indexOf("Opera");Ga=!N&&-1!=P.indexOf("MSIE");O=!N&&-1!=P.indexOf("WebKit");Ha=!N&&!O&&"Gecko"==Ja.product}var T=Ga,Ka=Ha,La=O,Ma=function(){var a=r.document;return a?a.documentMode:h},Na;
a:{var U="",V;if(N&&r.opera)var Oa=r.opera.version,U="function"==typeof Oa?Oa():Oa;else if(Ka?V=/rv\:([^\);]+)(\)|;)/:T?V=/MSIE\s+([^\);]+)(\)|;)/:La&&(V=/WebKit\/(\S+)/),V)var Pa=V.exec(Ia()),U=Pa?Pa[1]:"";if(T){var Qa=Ma();if(Qa>parseFloat(U)){Na=""+Qa;break a}}Na=U}var Da=Na,Ra={},Sa;var Ta=r.document;Ta&&T&&(Sa=Ma()||("CSS1Compat"==Ta.compatMode?parseInt(Da,10):5));var Ua=Sa;if(Ka||T)if(!T||!(T&&9<=Ua))Ka&&(Ra["1.9.1"]||(Ra["1.9.1"]=0<=Ea("1.9.1")));T&&(Ra["9"]||(Ra["9"]=0<=Ea("9")));var bb=function(a){bb[" "](a);return a};bb[" "]=function(){};var cb=function(a,b){try{return bb(a[b]),k}catch(c){}return q};var H=function(a,b,c){var d={};d._sn=["m",b,c].join(".");window.gbar.logger.ml(a,d)};var db,mb=function(){eb();u("gbar.addHover",fb);u("gbar.close",gb);u("gbar.cls",hb);u("gbar.tg",ib);u("gbar.rdd",jb);u("gbar.bsy",kb);v.adh("gbd4",function(){lb(5)});v.adh("gbd5",function(){lb(6)})},nb=function(){db===h&&(db=/MSIE (\d+)\.(\d+);/.exec(navigator.userAgent));return db},W="",X=h,ob=h,pb=h,qb=h,rb=q,sb=h,tb="gbzt,gbgt,gbg0l,gbmt,gbml1,gbmlb,gbqfb,gbqfba,gbqfbb,gbqfqw".split(","),Y=document.addEventListener?function(a,b,c,d){a.addEventListener(b,c,!!d)}:document.attachEvent?function(a,
b,c){a.attachEvent("on"+b,c)}:function(a,b,c){var b="on"+b,d=a[b];a[b]=function(){var a=d.apply(this,arguments),b=c.apply(this,arguments);return a==h?b:b==h?a:b&&a}},M=function(a){return document.getElementById(a)},ub=function(){var a=M("gbx1");return v.kn&&v.kn()&&a?a.clientWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth},vb=function(a){if(pb===h){var b=document.body.style;pb=!(b.WebkitBoxShadow!==h||b.MozBoxShadow!==
h||b.boxShadow!==h||b.BoxShadow!==h)}if(pb){var b=a.id+"-gbxms",c=M(b);c||(c=document.createElement("span"),c.id=b,c.className="gbxms",a.appendChild(c));qb===h&&(qb=c.offsetHeight<a.offsetHeight/2);qb&&(c.style.height=a.offsetHeight-5+"px",c.style.width=a.offsetWidth-3+"px")}},wb=function(a,b){if(a){var c=a.style,d=b||M(W);d&&(a.parentNode&&a.parentNode.appendChild(d),d=d.style,d.width=a.offsetWidth+"px",d.height=a.offsetHeight+"px",d.left=c.left,d.right=c.right)}},xb=function(a){try{if(X&&(!v.eh[X]||
!(!a&&!window.event?0:(a||window.event).ctrlKey||(a||window.event).metaKey||2==(a||window.event).which))){var b=M(W);b&&(b.style.cssText="",b.style.visibility="hidden");var c=M(X);if(c){c.style.cssText="";c.style.visibility="hidden";var d=c.getAttribute("aria-owner"),e=d?M(d):n;e&&(J(e.parentNode,"gbto"),e.blur())}ob&&(ob(),ob=h);var g=v.ch[X];if(g)for(var a=0,f;f=g[a];a++)try{f()}catch(l){H(l,"sb","cdd1")}X=h}}catch(j){H(j,"sb","cdd2")}},lb=function(a){var b={s:!X?"o":"c"};-1!=a&&v.logger.il(a,b)},
K=function(a,b){if(cb(a,"className")){var c=a.className;Z(a,b)||(a.className+=(""!=c?" ":"")+b)}},J=function(a,b){var c=a.className,d=RegExp("\\s?\\b"+b+"\\b");c&&c.match(d)&&(a.className=c.replace(d,""))},Z=function(a,b){var c=a.className;return!(!c||!c.match(RegExp("\\b"+b+"\\b")))},ib=function(a,b,c,d){try{a=a||window.event;c=c||q;if(!W){var e=document.createElement("iframe");e.frameBorder="0";e.tabIndex="-1";W=e.id="gbs";e.src="javascript:''";e.setAttribute("aria-hidden","true");e.setAttribute("title",
"empty");M("gbw").appendChild(e)}rb||(Y(document,"click",gb),Y(document,"keyup",yb),rb=k);c||(a.preventDefault&&a.preventDefault(),a.returnValue=q,a.cancelBubble=k);if(!b)for(var b=a.target||a.srcElement,g=b.parentNode.id;!Z(b.parentNode,"gbt");){if("gb"==g)return;b=b.parentNode;g=b.parentNode.id}var f=b.getAttribute("aria-owns");if(f&&f.length)if(d||b.focus(),X==f)hb(f);else{var l=b.offsetWidth,a=0;do a+=b.offsetLeft||0;while(b=b.offsetParent);if(sb===h){var j=M("gb"),m,p=document.defaultView;if(p&&
p.getComputedStyle){var Q=p.getComputedStyle(j,"");Q&&(m=Q.direction)}else m=j.currentStyle?j.currentStyle.direction:j.style.direction;sb="rtl"==m}j=sb?q:k;b=sb?q:k;"gbd"==f&&(b=!b);"gbz"==f&&(b=!b,j=!j);X&&xb();var x=v.bh[f];if(x)for(var E=0,L;L=x[E];E++)try{L()}catch(Db){H(Db,"sb","t1")}var x=a,F=M(f);if(F){var R=F.style,da=F.offsetWidth;if(da<l){R.width=l+"px";var da=l,G=F.offsetWidth;G!=l&&(R.width=l-(G-l)+"px")}G=5;if(0>x)var S=ub(),wa=window.document,Va="CSS1Compat"==wa.compatMode?wa.documentElement:
wa.body,G=G-(S-(new Fa(Va.clientWidth,Va.clientHeight)).width);var ea,A,S=ub();if(b){if(ea=j?Math.max(S-x-da,G):S-x-l,A=-(S-x-l-ea),nb()){var xa,ya=nb();xa=ya&&1<ya.length?new Number(ya[1]):n;(6==xa||7==xa&&"BackCompat"==document.compatMode)&&(A-=2)}}else ea=j?x:Math.max(x+l-da,G),A=ea-x;var Wa=M("gbw"),Xa=M("gb");if(Wa&&Xa){var Ya=Wa.offsetLeft;Ya!=Xa.offsetLeft&&(A-=Ya)}vb(F);R.right=b?A+"px":"auto";R.left=b?"auto":A+"px";R.visibility="visible";var Za=F.getAttribute("aria-owner"),$a=Za?M(Za):n;
$a&&K($a.parentNode,"gbto");var za=M(W);za&&(wb(F,za),za.style.visibility="visible");X=f}var ab=v.dh[f];if(ab)for(E=0;L=ab[E];E++)try{L()}catch(Eb){H(Eb,"sb","t2")}}}catch(Fb){H(Fb,"sb","t3")}},yb=function(a){if(X)try{var a=a||window.event,b=a.target||a.srcElement;if(a.keyCode&&b)if(a.keyCode&&27==a.keyCode)xb();else if("a"==b.tagName.toLowerCase()&&-1!=b.className.indexOf("gbgt")&&(13==a.keyCode||3==a.keyCode)){var c=document.getElementById(X);if(c&&"gbz"!=c.id){var d=c.getElementsByTagName("a");
d&&d.length&&d[0].focus&&d[0].focus()}}}catch(e){H(e,"sb","kuh")}},eb=function(){var a=M("gb");if(a){J(a,"gbpdjs");for(var b=a.getElementsByTagName("a"),a=[],c=M("gbqfw"),d=0,e;e=b[d];d++)a.push(e);if(c){var g=M("gbqfqw"),d=M("gbqfwc"),b=M("gbqfwe");e=c.getElementsByTagName("button");c=[];g&&!v.sg.c&&c.push(g);if(e&&0<e.length)for(var g=0,f;f=e[g];g++)c.push(f);d&&b&&(c.push(d),c.push(b));for(d=0;b=c[d];d++)a.push(b)}for(d=0;c=a[d];d++)(b=zb(c))&&Ab(c,t(Bb,b))}},fb=function(a){var b=zb(a);b&&Ab(a,
t(Bb,b))},zb=function(a){for(var b=0,c;c=tb[b];b++)if(Z(a,c))return c},Ab=function(a,b){var c=function(a,b){return function(c){try{var c=c||window.event,f,l=c.relatedTarget;f=l&&cb(l,"parentNode")?l:n;var j;if(!(j=a===f))if(a===f)j=q;else{for(;f&&f!==a;)f=f.parentNode;j=f===a}j||b(c,a)}catch(m){H(m,"sb","bhe")}}}(a,b);Y(a,"mouseover",c);Y(a,"mouseout",c)},Bb=function(a,b,c){try{if(a+="-hvr","mouseover"==b.type){K(c,a);var d=document.activeElement;if(d&&cb(d,"className")){var e=Z(d,"gbgt")||Z(d,"gbzt"),
g=Z(c,"gbgt")||Z(c,"gbzt");e&&g&&d.blur()}}else"mouseout"==b.type&&J(c,a)}catch(f){H(f,"sb","moaoh")}},gb=function(a){xb(a)},hb=function(a){a==X&&xb()},jb=function(a){a&&"visible"==a.style.visibility&&(vb(a),wb(a))},kb=function(){try{var a=document.getElementById("gbd3");if(a)return"visible"==a.style.visibility.toLowerCase()}catch(b){H(b,"sb","bsy")}return q};z("base",{init:function(){mb()}});var Cb=function(){this.u=q;this.u||(Y(window,"resize",s(this.J,this),k),this.u=k)};Cb.prototype.e=0;Cb.prototype.I=function(){v.elg();this.e=0};Cb.prototype.J=function(){v.elg();this.e&&window.clearTimeout(this.e);this.e=window.setTimeout(s(this.I,this),1500)};z("el",{init:function(){new Cb}});var $=function(){this.k=q;if(!v.sg.c){var a=document.getElementById("gbqfq"),b=document.getElementById("gbqfqwb"),c=document.getElementById("gbqfqw"),d=document.getElementById("gbqfb");if(!this.k){a&&b&&(Y(a,"focus",s(this.d,this,c)),Y(a,"blur",s(this.j,this,c)),Y(b,"click",s(this.f,this,a)));d&&(Y(d,"click",t(K,d,"gbqfb-no-focus")),Y(d,"blur",t(J,d,"gbqfb-no-focus")));var a=document.getElementById("gbqfqb"),b=document.getElementById("gbqfwd"),c=document.getElementById("gbqfwc"),d=document.getElementById("gbqfqc"),
e=document.getElementById("gbqfwf"),g=document.getElementById("gbqfwe");a&&b&&d&&e&&(Y(a,"focus",s(this.d,this,c)),Y(a,"blur",s(this.j,this,c)),Y(b,"click",s(this.f,this,a)),Y(d,"focus",s(this.d,this,g)),Y(d,"blur",s(this.j,this,g)),Y(e,"click",s(this.f,this,d)));this.k=k}a=document.getElementById("gbqfqw");document.activeElement==document.getElementById("gbqfq")&&this.d(a)}u("gbar.qfhi",s(this.A,this))};$.prototype.d=function(a){try{a&&K(a,"gbqfqwf")}catch(b){H(b,"sf","stf")}};
$.prototype.j=function(a){try{a&&J(a,"gbqfqwf")}catch(b){H(b,"sf","stb")}};$.prototype.f=function(a){try{a&&a.focus()}catch(b){H(b,"sf","sf")}};$.prototype.A=function(a){var b=document.getElementById("gbqffd");if(b&&(b.innerHTML="",a))for(var c in a){var d=document.createElement("input");d.name=c;d.value=a[c];d.type="hidden";b.appendChild(d)}};z("sf",{init:function(){new $}});B(w.M);
(function(){B(w.F);var a,b;for(a=0;(b=v.bnc[a])&&!("m"==b[0]);++a);b&&!b[1].l&&(a=function(){for(var a=v.mdc,d=v.mdi||{},e=0,g;g=ia[e];++e){var f=g[0],l=a[f],j=d[f],m;if(m=l){if(j=!j){var p;a:{j=f;if(m=v.mdd)try{if(!y){y={};var Q=m.split(/;/);for(m=0;m<Q.length;++m)y[Q[m]]=k}p=y[j];break a}catch(x){v.logger&&v.logger.ml(x)}p=q}j=!p}m=j}if(m){B(w.H,f);try{g[1].init(l),d[f]=k}catch(E){v.logger&&v.logger.ml(E)}B(w.G,f)}}if(a=v.qd.m){v.qd.m=[];for(d=0;e=a[d];++d)try{e()}catch(L){v.logger&&v.logger.ml(L)}}b[1].l=k;
B(w.D);a:{for(a=0;d=v.bnc[a];++a)if((d[1].auto||"m"==d[0])&&!d[1].l){a=q;break a}a=k}a&&B(w.C)},!b[1].libs||v.agl&&v.agl(b[1].libs)?a():b[1].i=a)})();}catch(e){window.gbar&&gbar.logger&&gbar.logger.ml(e,{"_sn":"m.init","_mddn":(gbar.mddn?gbar.mddn():"0")});}})();
