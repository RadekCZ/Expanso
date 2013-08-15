(function(p,u){function q(p,q,v){var t=/\s|\u0011|\u0012/,l=/\u0011|\u0012/g,r=/^(\w|[\$@\u0011\u0012])$/,n=q({init:function(a){this.originalCode=a;a=this.literalParser=new v(a);a.parse();this.code=a.code},members:{skipWhitespace:function(a,b){for(;t.test(a[b]);)++b;return b},compile:function(){var a=this.code,a=this.compileLambdas(a),a=a.replace(/@(\u0011|\u0012)?(\w|\$)/g,"this.$1$2").replace(/@/g,"this"),a=this.compileSharp(a);return this.literalParser.restore(a)},compileLambdas:function(a){for(var b=
/[^-]->|[^=]=>/g,e=0,c,d="";c=b.exec(a);)if(!(f&&c.index<f.end)){c=c.index;var g=this.getLeft(a,c),f=this.getRight(a,c+3,g.defaults);f.data=this.compileLambdas(f.data);-1!==a.slice(g.end+1,f.start).indexOf("\u0011")&&(f.data="\u0011"+f.data);-1!==a.slice(g.end+1,f.start).indexOf("\u0012")&&(f.data="\u0012"+f.data);var h="function "+g.name+g.data+" "+f.data;"="===a[c+1]&&(h="("+h+").bind(this)");d+=a.slice(e,g.start)+h;e=f.end+1}return d+=a.slice(e)},getLeft:function(a,b){for(;t.test(a[b])&&(!l.test(a[b])||
!r.test(a[b-1]));)--b;var e={end:b,name:"",defaults:""};if(")"===a[b]){for(var c=1;0<c;){--b;var d=a[b];")"===d?++c:"("===d&&--c}e.start=b;c=a.slice(b+1,e.end);c=this.parseParameters(c);e.data=c.data;e.defaults=c.defaults;for(c=b;0<=b-1&&r.test(a[b-1]);)--b;c=a.slice(b,c);""!==c.replace(l,"")&&(e.start=b,e.name=c)}else{for(;r.test(a[b]);)--b;++b;e.start=b;c=a.slice(b,e.end+1);c=this.parseParameters(c);e.data=c.data;e.defaults=c.defaults}return e},getRight:function(a,b,e){for(;t.test(a[b])&&(!l.test(a[b])||
!r.test(a[b+1]));)++b;var c={start:b};if("{"===a[b]){for(var d=1;0<d;){++b;var g=a[b];"{"===g?++d:"}"===g&&--d}c.end=b;a=a.slice(c.start,b+1);c.data=a}else{for(var f=/\(|\{|\[/,h=/\)|\}|\]/,m=/;|,/,d=0;;){g=a[b];if(0===d&&(h.test(g)||m.test(g))){--b;break}f.test(g)?++d:h.test(g)&&--d;++b}for(d=/\s/;d.test(a[b]);)--b;c.end=b;c.data="{ return "+a.slice(c.start,b+1)+"; }"}e&&(c.data=c.data.replace(/^\{/,"{ "+e));return c},parseParameters:function(a){for(var b={data:"",defaults:""},e=a.length,c=0,d=[],
g=[];c<e;){c=this.skipWhitespace(a,c);if(c>=e)break;l.test(a[c-1])&&--c;for(var f=c,h=c,m="";r.test(a[h])&&!(h>=e);)++h;f=a.slice(f,h);c=f.replace(l,"");if(""===c)break;"@"===c[0]&&(m=c+" = "+c.slice(1)+"; ",f=f.replace("@",""));d.push(f);c=this.skipWhitespace(a,h);if("="===a[c]){for(var h=c=this.skipWhitespace(a,++c),k=0;;){var s=a[c];if(0===k&&(","===s||s===u))break;"("===s?++k:")"===s&&--k;++c}h=a.slice(h,c);g.push(h);b.defaults+="if ("+f+" === undefined) { "+f+" = "+h+"; } "}else"..."===a.substr(c,
3)&&(d.pop(),b.defaults+="var "+f+" = "+n.restParameters+"(arguments, "+d.length+"); ",c+=2);b.defaults+=m;++c}b.data="("+d.join(", ")+")";b.names=d;b.values=g;return b},compileSharp:function(a){for(var b,e=/#((\w|\$|\u0011|\u0012)*)/g;b=e.exec(a);){var c=b.index,d=b[1].replace(l,"");b=c+b[0].length;if("module"===d)a=this.resolveModule(a,c,b);else if("export"===d)a=a.slice(0,c)+"return"+a.slice(b);else if("super"===d)if("("===a[b])a=a.slice(0,c)+n.superInit+a.slice(b);else if("."===a[b]){d=a.indexOf("(",
b);b=a.slice(b+1,d);b=n.superCall(b);var g=this.skipWhitespace(a,d+1);")"===a[g]&&(b=b.replace(/,\s*$/,""));a=a.slice(0,c)+b+a.slice(d+1)}else a=a.slice(0,c)+n.superConstructor+a.slice(b);else if("foreach"===d)a=this.resolveForeach(a,c,b);else if("scope"===d||""===d)a=this.resolveScope(a,c,b)}return a},resolveModule:function(a,b,e){var c=e=this.skipWhitespace(a,e);e=a.indexOf("(",e);var c=a.slice(c,e).trim(),d=a.indexOf(")",e),g=[],f=[],h=[];e=a.slice(e+1,d).split(",");for(var m=0;m<e.length;++m){var k=
e[m].split("=");if(2<=k.length){var n=k[0].replace(l,"").trim(),p=k[1].replace(l,"").trim();2<k.length&&(k=k[2].replace(l,"").trim(),h.push(k));g.push(n);f.push(p)}}return a=a.slice(0,b)+'(function (global, undefined) {\n"use strict";\nfunction definition('+g.join(", ")+") {"+a.slice(d+1)+'}\nif (typeof module === "object" && module.exports) {\nmodule.exports = definition('+(f.length?"require("+f.join("), require(")+")":"")+');\n}\nelse if (typeof define === "function" && define.amd) {\ndefine(['+
f.join(", ")+"], definition);\n}\n"+(""!==c?"else {\nglobal."+c+" = definition("+(h.length?"global."+h.join(", global."):"")+");\n}\n":"")+"})(this);"},resolveForeach:function(a,b,e){e=a.indexOf("(",e);var c=a.indexOf(")",e),d=a.slice(e+1,c);e="";var g=!1;-1===d.indexOf(" in ")&&-1===d.indexOf(" of ")&&(d=d.replace(l,""));if(-1!==d.indexOf(" in ")){var d=d.split(" in "),f=d[0].split(":"),d=d[1].trim(),h=f[0].trim();1<f.length&&(e=f[1].trim(),g=!0);a=a.slice(0,b)+(g?"var "+e+"; ":"")+"for (var "+h+
" in "+d+") if ("+(g?e+" = "+d+"["+h+"], ":"")+n.objectOwns+"("+d+", "+h+"))"+a.slice(c+1)}else-1!==d.indexOf(" of ")&&(d=d.split(" of "),f=d[0].split(":"),d=d[1].trim(),h=f[0].trim(),1<f.length&&(e=f[1].trim(),g=!0),a=a.slice(0,b)+"for (var "+h+" = 0"+(g?", "+e+" = "+d+"["+h+"]":"")+"; "+h+" < "+d+".length; ++"+h+(g?", "+e+" = "+d+"["+h+"]":"")+")"+a.slice(c+1));return a},resolveScope:function(a,b,e){for(var c=e=a.indexOf("(",e),d=1;0<d;){++e;var g=a[e];"("===g?++d:")"===g&&--d}for(var c=this.parseParameters(a.slice(c+
1,e)),f=e=a.indexOf("{",e),d=1;0<d;)++e,g=a[e],"{"===g?++d:"}"===g&&--d;d=a.slice(f,e+1);return a=a.slice(0,b)+"(function "+c.data+" "+d+")("+c.values.join(", ")+")"+a.slice(e+1)}},statics:{superInit:"this.superInit",superCall:function(a){return'this.superCall("'+a+'", '},superConstructor:"this.superConstructor",restParameters:"Array.from",objectOwns:"Object.owns"}});return n}"object"===typeof module&&module.exports?module.exports=q(require("legio/std"),require("legio/oop/construct"),require("./literal-parser")):
"function"===typeof define&&define.amd?define(["legio/std","legio/oop/construct","./literal-parser"],q):p.ExtraCompiler=q(p.Legio,p.Legio.construct,p.LiteralParser)})(this);