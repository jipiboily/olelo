(function(c){c.fn.treeView=function(b){function s(a,e){if(b.stateStore){var d=jStorage.get(b.stateStore,[]);if(e)c.inArray(a,d)<0&&d.push(a);else d=c.grep(d,function(f){return f!=a});jStorage.set(b.stateStore,d)}}function t(a){return b.stateStore&&c.inArray(a,jStorage.get(b.stateStore,[]))>=0}function m(a){var e=a[3],d=c('<li><div class="'+(a[1]?"hitarea collapsed":"placeholder")+'"><div class="arrow"/><div class="'+a[2]+'"/></div><a href="'+e+'">'+a[4]+"</a></li>"),f=d.children(".hitarea");d.data("name",
a[4]).data("tree",a[0]?1:0);f.click(function(){if(f.hasClass("collapsed")){n(d,e);f.removeClass("collapsed").addClass("expanded")}else{d.children("ul").hide();f.removeClass("expanded").addClass("collapsed")}s(e,f.hasClass("expanded"));return false});if(t(e)){n(d,e);f.removeClass("collapsed").addClass("expanded")}return d}function n(a,e){function d(h){k&&jStorage.set(k,h)}function f(h){var i=c("<ul/>");c.each(h,function(o,j){i.append(m(j))});e==b.root&&a.empty();a.children("ul").remove();a.removeClass("wait").append(i)}
function u(h){d(h);var i={},o=[];c.each(h,function(j,g){i[g[4]]=g});c("> ul > li",a).each(function(){var j=c(this),g=j.data("name");if(i[g])delete i[g];else j.remove();o.push(c(this))});c.each(i,function(j,g){var p=false;c.each(o,function(v,l){if(g[0]&&!l.data("tree")||j<l.data("name")&&g[0]==l.data("tree")){p=true;l.before(m(g));return false}});p||a.children("ul").append(m(g))})}function q(){setTimeout(function(){c.ajax({url:b.url,data:{dir:e},success:u,error:function(){k&&jStorage.remove(k)}})},
b.delay)}var k=b.cacheStore?b.cacheStore+":"+e:null;if(a.children("ul").length!=0){a.children("ul").show();q()}else{a.addClass("wait");var r=k?jStorage.get(k):null;if(r){f(r);q()}else c.getJSON(b.url,{dir:e},function(h){f(h);d(h)})}}b||(b={});if(!b.root)b.root="/";if(!b.url)b.url="/_/treeview.json";if(!b.delay)b.delay=2E3;this.each(function(){n(c(this),b.root)})}})(jQuery);$.translations({en:{menu:"Menu",tree:"Tree"},de:{menu:"Men\u00fc",tree:"Baumansicht"}});
(function(){var c=$("#sidebar");c.html('<div id="treeview-tabs"><ul><li class="tabs-selected"><a href="#sidebar-menu">'+$.t("menu")+'</a></li><li><a href="#sidebar-treeview">'+$.t("tree")+'</a></li></ul></div><div id="sidebar-treeview"><h1>'+$.t("tree")+'</h1><div id="treeview"/></div><div id="sidebar-menu">'+c.html()+"</div>");$("#treeview-tabs").tabs({store:"treeview-tabs"});$("#treeview").treeView({stateStore:"treeview-state",cacheStore:"treeview-cache"})})();
