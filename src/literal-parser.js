(function(l,p){function k(l,k){var q=/\s|\u0011|\u0012/,n=/\u0011|\u0012/g;return k({init:function(c){this.originalCode=this.code=c;this.literals=[]},members:{parse:function(){var c=this.code,f=0,g=['"',"'","`","/"];a:for(;;){for(var a=Infinity,b,e=0;e<g.length;++e){var d=c.indexOf(g[e],f);-1!==d&&d<a&&(a=d,b=g[e])}if(Number.isFinite(a))if('"'===b||"'"===b||"`"===b)d=this.findNext(b,a+1,!0),-1===d&&this.error(a),f=a+this.putId("string-"+("`"===b?"expanso":'"'===b?"double":"single"),a,d),c=this.code;
else{if("/"===b){if("/"===this.get(a+1))d=this.findNext("\n",a+2),-1===d?d=c.length-1:("\r"===this.get(d-1)&&--d,--d),f=a+this.putId("comment-line",a,d);else if("*"===this.get(a+1))d=this.findNext("*/",a+2),-1===d&&this.error(a),f=a+this.putId("comment-block",a,d+1);else{f=/\)|\]|\w|\$/;for(d=1;0<=a-d;++d)if(e=this.get(a-d),!q.test(e)){if(f.test(e)){f=a+1;continue a}break}d=this.findNext("/",a+1,!0);-1===d&&this.error(a);for(c=/^(g|i|m)/;c.test(this.get(d+1));)++d;c="regexp";"#"===this.get(a-1)?(c+=
"-expanso",a-=1):n.test(this.get(a-1))&&"#"===this.get(a-2)&&(c+="-expanso",a-=2);f=a+this.putId(c,a,d)}c=this.code}}else break}return c},restore:function(c){c===p&&(c=this.code);for(var f=this.literals,g="",a=0;;){for(var b=Infinity,e,d,h,m=0;m<f.length;++m)h="'"+m+'"',e=c.indexOf(h,a),-1!==e&&e<b&&(b=e,d=m);if(Infinity===b)break;h="'"+d+'"';e=b;g+=c.slice(a,e)+f[d].data;a=e+h.length}return g+=c.slice(a)},get:function(c){return this.code[c]},findNext:function(c,f,g){for(var a=-1;;){a=this.code.indexOf(c,
f);if(-1===a)break;if(g){f=0;for(var b=1;;++b){var e=this.get(a-b);if(!n.test(e))if("\\"===e)++f;else break}if(0!==f%2){f=a+1;continue}}break}return a},putId:function(c,f,g){++g;var a=this.code,b=a.slice(f,g);if("regexp-expanso"===c)b=b.slice(1);else if("string-expanso"===c){var b=b.slice(1,-1).replace(n,"").replace(/\\`/g,"`"),e=f-a.lastIndexOf("\n",f)-1,b=b.replace(RegExp("\\n( ){"+e+"}","g"),"\n"),e=b.indexOf("\n"),d=b.lastIndexOf("\n");d===b.length-1&&("\r"===b[d-1]&&--d,b=b.slice(0,d));if(0===
e||1===e&&"\r"===b[0])b=b.slice(e+1);var b=JSON.stringify(b),h=b[0],b=b.replace(/#\{@(\w|\$)([^\}]+)\}/g,function(a,b,c){return h+" + this."+b+c.replace(/\\"/g,'"').replace(/\\\\/,"\\")+" + "+h}).replace(/#\{@([^\}]+)\}/g,function(a,b){return h+" + this"+b.replace(/\\"/g,'"').replace(/\\\\/,"\\")+" + "+h}).replace(/#\{([^\}]+)\}/g,function(a,b){return h+" + "+b.replace(/\\"/g,'"').replace(/\\\\/,"\\")+" + "+h})}c="'"+(this.literals.push({type:c,data:b})-1)+'"';this.code=a.slice(0,f)+c+a.slice(g);
return c.length},error:function(c){throw"Parse error starting in position "+c+"!\n"+this.code.substr(c,30)+"\u2026";}}})}"object"===typeof module&&module.exports?module.exports=k(require("legio/std"),require("legio/oop/construct")):"function"===typeof define&&define.amd?define(["legio/std","legio/oop/construct"],k):l.LiteralParser=k(l.Legio,l.Legio.construct)})(this);