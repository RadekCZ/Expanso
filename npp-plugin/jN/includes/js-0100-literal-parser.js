(function(k,n){function h(k,h){var l=/\s|\u0011|\u0012/,m=/\u0011|\u0012/g;return h({init:function(c){this.originalCode=this.code=c;this.literals=[]},members:{parse:function(){var c=this.code,d=0,g=['"',"'","/"];a:for(;;){for(var a=Infinity,f,e=0;e<g.length;++e){var b=c.indexOf(g[e],d);-1!==b&&b<a&&(a=b,f=g[e])}if(Number.isFinite(a))if('"'===f||"'"==f){b=this.findNext(f,a+1,!0);if(-1===b)throw this.error(a);d=a+this.putId("string-"+('"'===f?"double":"single"),a,b);c=this.code}else{if("/"===f){if("/"===
this.get(a+1))b=this.findNext("\n",a+2),-1===b?b=c.length-1:("\r"===this.get(b-1)&&--b,--b),d=a+this.putId("comment-line",a,b);else if("*"===this.get(a+1)){b=this.findNext("*/",a+2);if(-1===b)throw this.error(a);d=a+this.putId("comment-block",a,b+1)}else{d=/\)|\]|\w|\$/;for(b=1;0<=a-b;++b)if(e=this.get(a-b),!l.test(e)){if(d.test(e)){d=a+1;continue a}break}b=this.findNext("/",a+1,!0);-1===b&&this.error(a);for(c=/^(g|i|m)/;c.test(this.get(b+1));)++b;d=a+this.putId("regexp",a,b)}c=this.code}}else break}return c},
restore:function(c){for(var d=this.literals,g="",a=0;;){for(var f=Infinity,e,b,h,k=0;k<d.length;++k)h="'"+k+'"',e=c.indexOf(h,a),-1!==e&&e<f&&(f=e,b=k);if(Infinity===f)break;h="'"+b+'"';e=f;g+=c.slice(a,e)+d[b].data;a=e+h.length}return g+=c.slice(a)},get:function(c){return this.code[c]},findNext:function(c,d,g){for(var a=-1;;){a=this.code.indexOf(c,d);if(-1===a)break;if(g){d=0;for(var f=1;;++f){var e=this.get(a-f);if(!m.test(e))if("\\"===e)++d;else break}if(0!==d%2){d=a+1;continue}}break}return a},
putId:function(c,d,g){++g;var a=this.code,f=a.slice(d,g);c="'"+(this.literals.push({type:c,data:f})-1)+'"';this.code=a.slice(0,d)+c+a.slice(g);return c.length},error:function(c){throw"Parse error starting in position "+c+"!\n"+this.code.substr(c,30)+"\u2026";}}})}"object"===typeof module&&module.exports?module.exports=h(require("legio/std"),require("legio/oop/construct")):"function"===typeof define&&define.amd?define(["legio/std","legio/oop/construct"],h):k.LiteralParser=h(k.Legio,k.Legio.construct)})(Global.get);
Global.unpack();