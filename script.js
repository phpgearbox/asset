var cssua=(function(html,userAgent,sa){'use strict';var PREFIX=' ua-';var R_Platform=/\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/;var R_Version=/([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g;var R_BlackBerry=/\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/;var R_Silk=/\bsilk-accelerated=true\b/;var R_FluidApp=/\bfluidapp\b/;var R_desktop=/(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/;var R_mobile=/(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/;var R_game=/(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/;var cssua={parse:function(uaStr,sa){var ua={};if(sa){ua.standalone=sa;}
uaStr=(''+uaStr).toLowerCase();if(!uaStr){return ua;}
var i,count,raw=uaStr.split(/[()]/);for(var j=0,rawCount=raw.length;j<rawCount;j++){if(j%2){var platforms=raw[j].split(';');for(i=0,count=platforms.length;i<count;i++){if(R_Platform.exec(platforms[i])){var key=RegExp.$1.split(' ').join('_'),val=RegExp.$2;if((!ua[key]||parseFloat(ua[key])<parseFloat(val))){ua[key]=val;}}}}else{var uas=raw[j].match(R_Version);if(uas){for(i=0,count=uas.length;i<count;i++){var parts=uas[i].split(/[\/\s]+/);if(parts.length&&parts[0]!=='mozilla'){ua[parts[0].split(' ').join('_')]=parts.slice(1).join('-');}}}}}
if(R_mobile.exec(uaStr)){ua.mobile=RegExp.$1;if(R_BlackBerry.exec(uaStr)){delete ua[ua.mobile];ua.blackberry=ua.version||RegExp.$3||RegExp.$2||RegExp.$1;if(RegExp.$1){ua.mobile='blackberry';}else if(ua.version==='0.0.1'){ua.blackberry='7.1.0.0';}}}else if(R_desktop.exec(uaStr)){ua.desktop=RegExp.$1;}else if(R_game.exec(uaStr)){ua.game=RegExp.$1;var game=ua.game.split(' ').join('_');if(ua.version&&!ua[game]){ua[game]=ua.version;}}
if(ua.intel_mac_os_x){ua.mac_os_x=ua.intel_mac_os_x.split('_').join('.');delete ua.intel_mac_os_x;}else if(ua.cpu_iphone_os){ua.ios=ua.cpu_iphone_os.split('_').join('.');delete ua.cpu_iphone_os;}else if(ua.cpu_os){ua.ios=ua.cpu_os.split('_').join('.');delete ua.cpu_os;}else if(ua.mobile==='iphone'&&!ua.ios){ua.ios='1';}
if(ua.opera&&ua.version){ua.opera=ua.version;delete ua.blackberry;}else if(R_Silk.exec(uaStr)){ua.silk_accelerated=true;}else if(R_FluidApp.exec(uaStr)){ua.fluidapp=ua.version;}
if(ua.applewebkit){ua.webkit=ua.applewebkit;delete ua.applewebkit;if(ua.opr){ua.opera=ua.opr;delete ua.opr;delete ua.chrome;}
if(ua.safari){if(ua.chrome||ua.crios||ua.opera||ua.silk||ua.fluidapp||ua.phantomjs||(ua.mobile&&!ua.ios)){delete ua.safari;}else if(ua.version&&!ua.rim_tablet_os){ua.safari=ua.version;}else{ua.safari=({'419':'2.0.4','417':'2.0.3','416':'2.0.2','412':'2.0','312':'1.3','125':'1.2','85':'1.0'})[parseInt(ua.safari,10)]||ua.safari;}}}else if(ua.msie||ua.trident){if(!ua.opera){ua.ie=ua.msie||ua.rv;}
delete ua.msie;if(ua.windows_phone_os){ua.windows_phone=ua.windows_phone_os;delete ua.windows_phone_os;}else if(ua.mobile==='wpdesktop'||ua.mobile==='xblwp7'||ua.mobile==='zunewp7'){ua.mobile='windows desktop';ua.windows_phone=(+ua.ie<9)?'7.0':(+ua.ie<10)?'7.5':'8.0';delete ua.windows_nt;}}else if(ua.gecko||ua.firefox){ua.gecko=ua.rv;}
if(ua.rv){delete ua.rv;}
if(ua.version){delete ua.version;}
return ua;},format:function(ua){function format(b,v){b=b.split('.').join('-');var css=PREFIX+b;if(typeof v==='string'){v=v.split(' ').join('_').split('.').join('-');var i=v.indexOf('-');while(i>0){css+=PREFIX+b+'-'+v.substring(0,i);i=v.indexOf('-',i+1);}
css+=PREFIX+b+'-'+v;}
return css;}
var uaCss='';for(var b in ua){if(b&&ua.hasOwnProperty(b)){uaCss+=format(b,ua[b]);}}
return uaCss;},encode:function(ua){var query='';for(var b in ua){if(b&&ua.hasOwnProperty(b)){if(query){query+='&';}
query+=encodeURIComponent(b)+'='+encodeURIComponent(ua[b]);}}
return query;}};cssua.userAgent=cssua.ua=cssua.parse(userAgent,sa);var ua=cssua.format(cssua.ua)+' js';if(html.className){html.className=html.className.replace(/\bno-js\b/g,'')+ua;}else{html.className=ua.substr(1);}
return cssua;})(document.documentElement,navigator.userAgent,navigator.standalone);(function($){var
hidden='hidden',borderBox='border-box',lineHeight='lineHeight',copy='<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',copyStyle=['fontFamily','fontSize','fontWeight','fontStyle','letterSpacing','textTransform','wordSpacing','textIndent'],oninput='oninput',onpropertychange='onpropertychange',test=$(copy)[0];test.setAttribute(oninput,"return");if($.isFunction(test[oninput])||onpropertychange in test){$(test).css(lineHeight,'99px');if($(test).css(lineHeight)==='99px'){copyStyle.push(lineHeight);}
$.fn.autosize=function(options){options=options||{};return this.each(function(){var
ta=this,$ta=$(ta),mirror,minHeight=$ta.height(),maxHeight=parseInt($ta.css('maxHeight'),10),active,i=copyStyle.length,resize,boxOffset=0,value=ta.value,callback=$.isFunction(options.callback);if($ta.css('box-sizing')===borderBox||$ta.css('-moz-box-sizing')===borderBox||$ta.css('-webkit-box-sizing')===borderBox){boxOffset=$ta.outerHeight()-$ta.height();}
if($ta.data('mirror')||$ta.data('ismirror')){return;}else{mirror=$(copy).data('ismirror',true).addClass(options.className||'autosizejs')[0];resize=$ta.css('resize')==='none'?'none':'horizontal';$ta.data('mirror',$(mirror)).css({overflow:hidden,overflowY:hidden,wordWrap:'break-word',resize:resize});}
maxHeight=maxHeight&&maxHeight>0?maxHeight:9e4;function adjust(){var height,overflow,original;if(!active){active=true;mirror.value=ta.value;mirror.style.overflowY=ta.style.overflowY;original=parseInt(ta.style.height,10);mirror.style.width=$ta.css('width');mirror.scrollTop=0;mirror.scrollTop=9e4;height=mirror.scrollTop;overflow=hidden;if(height>maxHeight){height=maxHeight;overflow='scroll';}else if(height<minHeight){height=minHeight;}
height+=boxOffset;ta.style.overflowY=overflow;if(original!==height){ta.style.height=height+'px';if(callback){options.callback.call(ta);}}
setTimeout(function(){active=false;},1);}}
while(i--){mirror.style[copyStyle[i]]=$ta.css(copyStyle[i]);}
$('body').append(mirror);if(onpropertychange in ta){if(oninput in ta){ta[oninput]=ta.onkeyup=adjust;}else{ta[onpropertychange]=adjust;}}else{ta[oninput]=adjust;ta.value='';ta.value=value;}
$(window).resize(adjust);$ta.bind('autosize',adjust);adjust();});};}else{$.fn.autosize=function(callback){return this;};}}(jQuery));(function($,document,window){var
defaults={transition:"elastic",speed:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.9,preloading:true,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:false,returnFocus:true,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:true,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined},colorbox='colorbox',prefix='cbox',boxElement=prefix+'Element',event_open=prefix+'_open',event_load=prefix+'_load',event_complete=prefix+'_complete',event_cleanup=prefix+'_cleanup',event_closed=prefix+'_closed',event_purge=prefix+'_purge',isIE=!$.support.leadingWhitespace,isIE6=isIE&&!window.XMLHttpRequest,event_ie6=prefix+'_IE6',$overlay,$box,$wrap,$content,$topBorder,$leftBorder,$rightBorder,$bottomBorder,$related,$window,$loaded,$loadingBay,$loadingOverlay,$title,$current,$slideshow,$next,$prev,$close,$groupControls,settings,interfaceHeight,interfaceWidth,loadedHeight,loadedWidth,element,index,photo,open,active,closing,loadingTimer,publicMethod,div="div",init;function $tag(tag,id,css){var element=document.createElement(tag);if(id){element.id=prefix+id;}
if(css){element.style.cssText=css;}
return $(element);}
function getIndex(increment){var
max=$related.length,newIndex=(index+increment)%max;return(newIndex<0)?max+newIndex:newIndex;}
function setSize(size,dimension){return Math.round((/%/.test(size)?((dimension==='x'?$window.width():$window.height())/ 100):1)*parseInt(size,10));}
function isImage(url){return settings.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(url);}
function makeSettings(){var i,data=$.data(element,colorbox);if(data==null){settings=$.extend({},defaults);if(console&&console.log){console.log('Error: cboxElement missing settings object');}}else{settings=$.extend({},data);}
for(i in settings){if($.isFunction(settings[i])&&i.slice(0,2)!=='on'){settings[i]=settings[i].call(element);}}
settings.rel=settings.rel||element.rel||$(element).data('rel')||'nofollow';settings.href=settings.href||$(element).attr('href');settings.title=settings.title||element.title;if(typeof settings.href==="string"){settings.href=$.trim(settings.href);}}
function trigger(event,callback){$(document).trigger(event);$('*',$box).trigger(event);if(callback){callback.call(element);}}
function slideshow(){var
timeOut,className=prefix+"Slideshow_",click="click."+prefix,start,stop;if(settings.slideshow&&$related[1]){start=function(){$slideshow.html(settings.slideshowStop).unbind(click).bind(event_complete,function(){if(settings.loop||$related[index+1]){timeOut=setTimeout(publicMethod.next,settings.slideshowSpeed);}}).bind(event_load,function(){clearTimeout(timeOut);}).one(click+' '+event_cleanup,stop);$box.removeClass(className+"off").addClass(className+"on");timeOut=setTimeout(publicMethod.next,settings.slideshowSpeed);};stop=function(){clearTimeout(timeOut);$slideshow.html(settings.slideshowStart).unbind([event_complete,event_load,event_cleanup,click].join(' ')).one(click,function(){publicMethod.next();start();});$box.removeClass(className+"on").addClass(className+"off");};if(settings.slideshowAuto){start();}else{stop();}}else{$box.removeClass(className+"off "+className+"on");}}
function launch(target){if(!closing){element=target;makeSettings();$related=$(element);index=0;if(settings.rel!=='nofollow'){$related=$('.'+boxElement).filter(function(){var data=$.data(this,colorbox),relRelated;if(data){relRelated=$(this).data('rel')||data.rel||this.rel;}
return(relRelated===settings.rel);});index=$related.index(element);if(index===-1){$related=$related.add(element);index=$related.length-1;}}
if(!open){open=active=true;$box.show();if(settings.returnFocus){$(element).blur();$(document).one(event_closed,function(){$(element).focus();});}
$overlay.css({"opacity":+settings.opacity,"cursor":settings.overlayClose?"pointer":"auto"}).show();settings.w=setSize(settings.initialWidth,'x');settings.h=setSize(settings.initialHeight,'y');publicMethod.position();if(isIE6){$window.bind('resize.'+event_ie6+' scroll.'+event_ie6,function(){$overlay.css({width:$window.width(),height:$window.height(),top:$window.scrollTop(),left:$window.scrollLeft()});}).trigger('resize.'+event_ie6);}
trigger(event_open,settings.onOpen);$groupControls.add($title).hide();$close.html(settings.close).show();}
publicMethod.load(true);}}
function appendHTML(){if(!$box&&document.body){init=false;$window=$(window);$box=$tag(div).attr({id:colorbox,'class':isIE?prefix+(isIE6?'IE6':'IE'):''}).hide();$overlay=$tag(div,"Overlay",isIE6?'position:absolute':'').hide();$loadingOverlay=$tag(div,"LoadingOverlay").add($tag(div,"LoadingGraphic"));$wrap=$tag(div,"Wrapper");$content=$tag(div,"Content").append($loaded=$tag(div,"LoadedContent",'width:0; height:0; overflow:hidden'),$title=$tag(div,"Title"),$current=$tag(div,"Current"),$next=$tag(div,"Next"),$prev=$tag(div,"Previous"),$slideshow=$tag(div,"Slideshow").bind(event_open,slideshow),$close=$tag(div,"Close"));$wrap.append($tag(div).append($tag(div,"TopLeft"),$topBorder=$tag(div,"TopCenter"),$tag(div,"TopRight")),$tag(div,false,'clear:left').append($leftBorder=$tag(div,"MiddleLeft"),$content,$rightBorder=$tag(div,"MiddleRight")),$tag(div,false,'clear:left').append($tag(div,"BottomLeft"),$bottomBorder=$tag(div,"BottomCenter"),$tag(div,"BottomRight"))).find('div div').css({'float':'left'});$loadingBay=$tag(div,false,'position:absolute; width:9999px; visibility:hidden; display:none');$groupControls=$next.add($prev).add($current).add($slideshow);$(document.body).append($overlay,$box.append($wrap,$loadingBay));}}
function addBindings(){if($box){if(!init){init=true;interfaceHeight=$topBorder.height()+$bottomBorder.height()+$content.outerHeight(true)-$content.height();interfaceWidth=$leftBorder.width()+$rightBorder.width()+$content.outerWidth(true)-$content.width();loadedHeight=$loaded.outerHeight(true);loadedWidth=$loaded.outerWidth(true);$next.click(function(){publicMethod.next();});$prev.click(function(){publicMethod.prev();});$close.click(function(){publicMethod.close();});$overlay.click(function(){if(settings.overlayClose){publicMethod.close();}});$(document).bind('keydown.'+prefix,function(e){var key=e.keyCode;if(open&&settings.escKey&&key===27){e.preventDefault();publicMethod.close();}
if(open&&settings.arrowKey&&$related[1]){if(key===37){e.preventDefault();$prev.click();}else if(key===39){e.preventDefault();$next.click();}}});$(document).delegate('.'+boxElement,'click',function(e){if(!(e.which>1||e.shiftKey||e.altKey||e.metaKey)){e.preventDefault();launch(this);}});}
return true;}
return false;}
if($.colorbox){return;}
$(appendHTML);publicMethod=$.fn[colorbox]=$[colorbox]=function(options,callback){var $this=this;options=options||{};appendHTML();if(addBindings()){if(!$this[0]){if($this.selector){return $this;}
$this=$('<a/>');options.open=true;}
if(callback){options.onComplete=callback;}
$this.each(function(){$.data(this,colorbox,$.extend({},$.data(this,colorbox)||defaults,options));}).addClass(boxElement);if(($.isFunction(options.open)&&options.open.call($this))||options.open){launch($this[0]);}}
return $this;};publicMethod.position=function(speed,loadedCallback){var
css,top=0,left=0,offset=$box.offset(),scrollTop,scrollLeft;$window.unbind('resize.'+prefix);$box.css({top:-9e4,left:-9e4});scrollTop=$window.scrollTop();scrollLeft=$window.scrollLeft();if(settings.fixed&&!isIE6){offset.top-=scrollTop;offset.left-=scrollLeft;$box.css({position:'fixed'});}else{top=scrollTop;left=scrollLeft;$box.css({position:'absolute'});}
if(settings.right!==false){left+=Math.max($window.width()-settings.w-loadedWidth-interfaceWidth-setSize(settings.right,'x'),0);}else if(settings.left!==false){left+=setSize(settings.left,'x');}else{left+=Math.round(Math.max($window.width()-settings.w-loadedWidth-interfaceWidth,0)/ 2);}
if(settings.bottom!==false){top+=Math.max($window.height()-settings.h-loadedHeight-interfaceHeight-setSize(settings.bottom,'y'),0);}else if(settings.top!==false){top+=setSize(settings.top,'y');}else{top+=Math.round(Math.max($window.height()-settings.h-loadedHeight-interfaceHeight,0)/ 2);}
$box.css({top:offset.top,left:offset.left});speed=($box.width()===settings.w+loadedWidth&&$box.height()===settings.h+loadedHeight)?0:speed||0;$wrap[0].style.width=$wrap[0].style.height="9999px";function modalDimensions(that){$topBorder[0].style.width=$bottomBorder[0].style.width=$content[0].style.width=(parseInt(that.style.width,10)-interfaceWidth)+'px';$content[0].style.height=$leftBorder[0].style.height=$rightBorder[0].style.height=(parseInt(that.style.height,10)-interfaceHeight)+'px';}
css={width:settings.w+loadedWidth+interfaceWidth,height:settings.h+loadedHeight+interfaceHeight,top:top,left:left};if(speed===0){$box.css(css);}
$box.dequeue().animate(css,{duration:speed,complete:function(){modalDimensions(this);active=false;$wrap[0].style.width=(settings.w+loadedWidth+interfaceWidth)+"px";$wrap[0].style.height=(settings.h+loadedHeight+interfaceHeight)+"px";if(settings.reposition){setTimeout(function(){$window.bind('resize.'+prefix,publicMethod.position);},1);}
if(loadedCallback){loadedCallback();}},step:function(){modalDimensions(this);}});};publicMethod.resize=function(options){if(open){options=options||{};if(options.width){settings.w=setSize(options.width,'x')-loadedWidth-interfaceWidth;}
if(options.innerWidth){settings.w=setSize(options.innerWidth,'x');}
$loaded.css({width:settings.w});if(options.height){settings.h=setSize(options.height,'y')-loadedHeight-interfaceHeight;}
if(options.innerHeight){settings.h=setSize(options.innerHeight,'y');}
if(!options.innerHeight&&!options.height){$loaded.css({height:"auto"});settings.h=$loaded.height();}
$loaded.css({height:settings.h});publicMethod.position(settings.transition==="none"?0:settings.speed);}};publicMethod.prep=function(object){if(!open){return;}
var callback,speed=settings.transition==="none"?0:settings.speed;$loaded.remove();$loaded=$tag(div,'LoadedContent').append(object);function getWidth(){settings.w=settings.w||$loaded.width();settings.w=settings.mw&&settings.mw<settings.w?settings.mw:settings.w;return settings.w;}
function getHeight(){settings.h=settings.h||$loaded.height();settings.h=settings.mh&&settings.mh<settings.h?settings.mh:settings.h;return settings.h;}
$loaded.hide().appendTo($loadingBay.show()).css({width:getWidth(),overflow:settings.scrolling?'auto':'hidden'}).css({height:getHeight()}).prependTo($content);$loadingBay.hide();$(photo).css({'float':'none'});callback=function(){var total=$related.length,iframe,frameBorder='frameBorder',allowTransparency='allowTransparency',complete;if(!open){return;}
function removeFilter(){if(isIE){$box[0].style.removeAttribute('filter');}}
complete=function(){clearTimeout(loadingTimer);$loadingOverlay.detach().hide();trigger(event_complete,settings.onComplete);};if(isIE){if(photo){$loaded.fadeIn(100);}}
$title.html(settings.title).add($loaded).show();if(total>1){if(typeof settings.current==="string"){$current.html(settings.current.replace('{current}',index+1).replace('{total}',total)).show();}
$next[(settings.loop||index<total-1)?"show":"hide"]().html(settings.next);$prev[(settings.loop||index)?"show":"hide"]().html(settings.previous);if(settings.slideshow){$slideshow.show();}
if(settings.preloading){$.each([getIndex(-1),getIndex(1)],function(){var src,img,i=$related[this],data=$.data(i,colorbox);if(data&&data.href){src=data.href;if($.isFunction(src)){src=src.call(i);}}else{src=i.href;}
if(isImage(src)){img=new Image();img.src=src;}});}}else{$groupControls.hide();}
if(settings.iframe){iframe=$tag('iframe')[0];if(frameBorder in iframe){iframe[frameBorder]=0;}
if(allowTransparency in iframe){iframe[allowTransparency]="true";}
if(!settings.scrolling){iframe.scrolling="no";}
$(iframe).attr({src:settings.href,name:(new Date()).getTime(),'class':prefix+'Iframe',allowFullScreen:true,webkitAllowFullScreen:true,mozallowfullscreen:true}).one('load',complete).appendTo($loaded);$(document).one(event_purge,function(){iframe.src="//about:blank";});if(settings.fastIframe){$(iframe).trigger('load');}}else{complete();}
if(settings.transition==='fade'){$box.fadeTo(speed,1,removeFilter);}else{removeFilter();}};if(settings.transition==='fade'){$box.fadeTo(speed,0,function(){publicMethod.position(0,callback);});}else{publicMethod.position(speed,callback);}};publicMethod.load=function(launched){var href,setResize,prep=publicMethod.prep,$inline;active=true;photo=false;element=$related[index];if(!launched){makeSettings();}
trigger(event_purge);trigger(event_load,settings.onLoad);settings.h=settings.height?setSize(settings.height,'y')-loadedHeight-interfaceHeight:settings.innerHeight&&setSize(settings.innerHeight,'y');settings.w=settings.width?setSize(settings.width,'x')-loadedWidth-interfaceWidth:settings.innerWidth&&setSize(settings.innerWidth,'x');settings.mw=settings.w;settings.mh=settings.h;if(settings.maxWidth){settings.mw=setSize(settings.maxWidth,'x')-loadedWidth-interfaceWidth;settings.mw=settings.w&&settings.w<settings.mw?settings.w:settings.mw;}
if(settings.maxHeight){settings.mh=setSize(settings.maxHeight,'y')-loadedHeight-interfaceHeight;settings.mh=settings.h&&settings.h<settings.mh?settings.h:settings.mh;}
href=settings.href;loadingTimer=setTimeout(function(){$loadingOverlay.show().appendTo($content);},100);if(settings.inline){$inline=$tag(div).hide().insertBefore($(href)[0]);$(document).one(event_purge,function(){$inline.replaceWith($loaded.children());});prep($(href));}else if(settings.iframe){prep(" ");}else if(settings.html){prep(settings.html);}else if(isImage(href)){$(photo=new Image()).addClass(prefix+'Photo').bind('error',function(){settings.title=false;prep($tag(div,'Error').html(settings.imgError));}).load(function(){var percent;photo.onload=null;if(settings.scalePhotos){setResize=function(){photo.height-=photo.height*percent;photo.width-=photo.width*percent;};if(settings.mw&&photo.width>settings.mw){percent=(photo.width-settings.mw)/ photo.width;setResize();}
if(settings.mh&&photo.height>settings.mh){percent=(photo.height-settings.mh)/ photo.height;setResize();}}
if(settings.h){photo.style.marginTop=Math.max(settings.h-photo.height,0)/ 2+'px';}
if($related[1]&&(settings.loop||$related[index+1])){photo.style.cursor='pointer';photo.onclick=function(){publicMethod.next();};}
if(isIE){photo.style.msInterpolationMode='bicubic';}
setTimeout(function(){prep(photo);},1);});setTimeout(function(){photo.src=href;},1);}else if(href){$loadingBay.load(href,settings.data,function(data,status){prep(status==='error'?$tag(div,'Error').html(settings.xhrError):$(this).contents());});}};publicMethod.next=function(){if(!active&&$related[1]&&(settings.loop||$related[index+1])){index=getIndex(1);publicMethod.load();}};publicMethod.prev=function(){if(!active&&$related[1]&&(settings.loop||index)){index=getIndex(-1);publicMethod.load();}};publicMethod.close=function(){if(open&&!closing){closing=true;open=false;trigger(event_cleanup,settings.onCleanup);$window.unbind('.'+prefix+' .'+event_ie6);$overlay.fadeTo(200,0);$box.stop().fadeTo(300,0,function(){$box.add($overlay).css({'opacity':1,cursor:'auto'}).hide();trigger(event_purge);$loaded.remove();setTimeout(function(){closing=false;trigger(event_closed,settings.onClosed);},1);});}};publicMethod.remove=function(){$([]).add($box).add($overlay).remove();$box=null;$('.'+boxElement).removeData(colorbox).removeClass(boxElement);$(document).undelegate('.'+boxElement);};publicMethod.element=function(){return $(element);};publicMethod.settings=defaults;}(jQuery,document,window));/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2013 M. Alsup
 * Version: 3.0.3 (11-JUL-2013)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.7.1 or later
 */;(function($,undefined){"use strict";var ver='3.0.3';function debug(s){if($.fn.cycle.debug)
log(s);}
function log(){if(window.console&&console.log)
console.log('[cycle] '+Array.prototype.join.call(arguments,' '));}
$.expr[':'].paused=function(el){return el.cyclePause;};$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};if(this.length===0&&options!='stop'){if(!$.isReady&&o.s){log('DOM not ready, queuing slideshow');$(function(){$(o.s,o.c).cycle(options,arg2);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
return this.each(function(){var opts=handleArguments(this,options,arg2);if(opts===false)
return;opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink;if(this.cycleTimeout)
clearTimeout(this.cycleTimeout);this.cycleTimeout=this.cyclePause=0;this.cycleStop=0;var $cont=$(this);var $slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children();var els=$slides.get();if(els.length<2){log('terminating; too few slides: '+els.length);return;}
var opts2=buildOptions($cont,$slides,els,opts,o);if(opts2===false)
return;var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.backwards);if(startTime){startTime+=(opts2.delay||0);if(startTime<10)
startTime=10;debug('first timeout: '+startTime);this.cycleTimeout=setTimeout(function(){go(els,opts2,0,!opts.backwards);},startTime);}});};function triggerPause(cont,byHover,onPager){var opts=$(cont).data('cycle.opts');if(!opts)
return;var paused=!!cont.cyclePause;if(paused&&opts.paused)
opts.paused(cont,opts,byHover,onPager);else if(!paused&&opts.resumed)
opts.resumed(cont,opts,byHover,onPager);}
function handleArguments(cont,options,arg2){if(cont.cycleStop===undefined)
cont.cycleStop=0;if(options===undefined||options===null)
options={};if(options.constructor==String){switch(options){case'destroy':case'stop':var opts=$(cont).data('cycle.opts');if(!opts)
return false;cont.cycleStop++;if(cont.cycleTimeout)
clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;if(opts.elements)
$(opts.elements).stop();$(cont).removeData('cycle.opts');if(options=='destroy')
destroy(cont,opts);return false;case'toggle':cont.cyclePause=(cont.cyclePause===1)?0:1;checkInstantResume(cont.cyclePause,arg2,cont);triggerPause(cont);return false;case'pause':cont.cyclePause=1;triggerPause(cont);return false;case'resume':cont.cyclePause=0;checkInstantResume(false,arg2,cont);triggerPause(cont);return false;case'prev':case'next':opts=$(cont).data('cycle.opts');if(!opts){log('options not found, "prev/next" ignored');return false;}
if(typeof arg2=='string')
opts.oneTimeFx=arg2;$.fn.cycle[options](opts);return false;default:options={fx:options};}
return options;}
else if(options.constructor==Number){var num=options;options=$(cont).data('cycle.opts');if(!options){log('options not found, can not advance slide');return false;}
if(num<0||num>=options.elements.length){log('invalid slide index: '+num);return false;}
options.nextSlide=num;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}
if(typeof arg2=='string')
options.oneTimeFx=arg2;go(options.elements,options,1,num>=options.currSlide);return false;}
return options;function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===true){var options=$(cont).data('cycle.opts');if(!options){log('options not found, can not resume');return false;}
if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}
go(options.elements,options,1,!options.backwards);}}}
function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter){try{el.style.removeAttribute('filter');}
catch(smother){}}}
function destroy(cont,opts){if(opts.next)
$(opts.next).unbind(opts.prevNextEvent);if(opts.prev)
$(opts.prev).unbind(opts.prevNextEvent);if(opts.pager||opts.pagerAnchorBuilder)
$.each(opts.pagerAnchors||[],function(){this.unbind().remove();});opts.pagerAnchors=null;$(cont).unbind('mouseenter.cycle mouseleave.cycle');if(opts.destroy)
opts.destroy(opts);}
function buildOptions($cont,$slides,els,options,o){var startingSlideSpecified;var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});var meta=$.isFunction($cont.data)?$cont.data(opts.metaAttr):null;if(meta)
opts=$.extend(opts,meta);if(opts.autostop)
opts.countdown=opts.autostopCount||els.length;var cont=$cont[0];$cont.data('cycle.opts',opts);opts.$cont=$cont;opts.stopCount=cont.cycleStop;opts.elements=els;opts.before=opts.before?[opts.before]:[];opts.after=opts.after?[opts.after]:[];if(!$.support.opacity&&opts.cleartype)
opts.after.push(function(){removeFilter(this,opts);});if(opts.continuous)
opts.after.push(function(){go(els,opts,0,!opts.backwards);});saveOriginalOpts(opts);if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg)
clearTypeFix($slides);if($cont.css('position')=='static')
$cont.css('position','relative');if(opts.width)
$cont.width(opts.width);if(opts.height&&opts.height!='auto')
$cont.height(opts.height);if(opts.startingSlide!==undefined){opts.startingSlide=parseInt(opts.startingSlide,10);if(opts.startingSlide>=els.length||opts.startSlide<0)
opts.startingSlide=0;else
startingSlideSpecified=true;}
else if(opts.backwards)
opts.startingSlide=els.length-1;else
opts.startingSlide=0;if(opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++)
opts.randomMap.push(i);opts.randomMap.sort(function(a,b){return Math.random()-0.5;});if(startingSlideSpecified){for(var cnt=0;cnt<els.length;cnt++){if(opts.startingSlide==opts.randomMap[cnt]){opts.randomIndex=cnt;}}}
else{opts.randomIndex=1;opts.startingSlide=opts.randomMap[1];}}
else if(opts.startingSlide>=els.length)
opts.startingSlide=0;opts.currSlide=opts.startingSlide||0;var first=opts.startingSlide;$slides.css({position:'absolute',top:0,left:0}).hide().each(function(i){var z;if(opts.backwards)
z=first?i<=first?els.length+(i-first):first-i:els.length-i;else
z=first?i>=first?els.length-(i-first):first-i:els.length-i;$(this).css('z-index',z);});$(els[first]).css('opacity',1).show();removeFilter(els[first],opts);if(opts.fit){if(!opts.aspect){if(opts.width)
$slides.width(opts.width);if(opts.height&&opts.height!='auto')
$slides.height(opts.height);}else{$slides.each(function(){var $slide=$(this);var ratio=(opts.aspect===true)?$slide.width()/$slide.height():opts.aspect;if(opts.width&&$slide.width()!=opts.width){$slide.width(opts.width);$slide.height(opts.width / ratio);}
if(opts.height&&$slide.height()<opts.height){$slide.height(opts.height);$slide.width(opts.height*ratio);}});}}
if(opts.center&&((!opts.fit)||opts.aspect)){$slides.each(function(){var $slide=$(this);$slide.css({"margin-left":opts.width?((opts.width-$slide.width())/ 2)+"px":0,"margin-top":opts.height?((opts.height-$slide.height())/ 2)+"px":0});});}
if(opts.center&&!opts.fit&&!opts.slideResize){$slides.each(function(){var $slide=$(this);$slide.css({"margin-left":opts.width?((opts.width-$slide.width())/ 2)+"px":0,"margin-top":opts.height?((opts.height-$slide.height())/ 2)+"px":0});});}
var reshape=(opts.containerResize||opts.containerResizeHeight)&&$cont.innerHeight()<1;if(reshape){var maxw=0,maxh=0;for(var j=0;j<els.length;j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();if(!w)w=e.offsetWidth||e.width||$e.attr('width');if(!h)h=e.offsetHeight||e.height||$e.attr('height');maxw=w>maxw?w:maxw;maxh=h>maxh?h:maxh;}
if(opts.containerResize&&maxw>0&&maxh>0)
$cont.css({width:maxw+'px',height:maxh+'px'});if(opts.containerResizeHeight&&maxh>0)
$cont.css({height:maxh+'px'});}
var pauseFlag=false;if(opts.pause)
$cont.bind('mouseenter.cycle',function(){pauseFlag=true;this.cyclePause++;triggerPause(cont,true);}).bind('mouseleave.cycle',function(){if(pauseFlag)
this.cyclePause--;triggerPause(cont,true);});if(supportMultiTransitions(opts)===false)
return false;var requeue=false;options.requeueAttempts=options.requeueAttempts||0;$slides.each(function(){var $el=$(this);this.cycleH=(opts.fit&&opts.height)?opts.height:($el.height()||this.offsetHeight||this.height||$el.attr('height')||0);this.cycleW=(opts.fit&&opts.width)?opts.width:($el.width()||this.offsetWidth||this.width||$el.attr('width')||0);if($el.is('img')){var loading=(this.cycleH===0&&this.cycleW===0&&!this.complete);if(loading){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100){log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ',this.src,this.cycleW,this.cycleH);setTimeout(function(){$(o.s,o.c).cycle(options);},opts.requeueTimeout);requeue=true;return false;}
else{log('could not determine size of image: '+this.src,this.cycleW,this.cycleH);}}}
return true;});if(requeue)
return false;opts.cssBefore=opts.cssBefore||{};opts.cssAfter=opts.cssAfter||{};opts.cssFirst=opts.cssFirst||{};opts.animIn=opts.animIn||{};opts.animOut=opts.animOut||{};$slides.not(':eq('+first+')').css(opts.cssBefore);$($slides[first]).css(opts.cssFirst);if(opts.timeout){opts.timeout=parseInt(opts.timeout,10);if(opts.speed.constructor==String)
opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed,10);if(!opts.sync)
opts.speed=opts.speed / 2;var buffer=opts.fx=='none'?0:opts.fx=='shuffle'?500:250;while((opts.timeout-opts.speed)<buffer)
opts.timeout+=opts.speed;}
if(opts.easing)
opts.easeIn=opts.easeOut=opts.easing;if(!opts.speedIn)
opts.speedIn=opts.speed;if(!opts.speedOut)
opts.speedOut=opts.speed;opts.slideCount=els.length;opts.currSlide=opts.lastSlide=first;if(opts.random){if(++opts.randomIndex==els.length)
opts.randomIndex=0;opts.nextSlide=opts.randomMap[opts.randomIndex];}
else if(opts.backwards)
opts.nextSlide=opts.startingSlide===0?(els.length-1):opts.startingSlide-1;else
opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1;if(!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init))
init($cont,$slides,opts);else if(opts.fx!='custom'&&!opts.multiFx){log('unknown transition: '+opts.fx,'; slideshow terminating');return false;}}
var e0=$slides[first];if(!opts.skipInitializationCallbacks){if(opts.before.length)
opts.before[0].apply(e0,[e0,e0,opts,true]);if(opts.after.length)
opts.after[0].apply(e0,[e0,e0,opts,true]);}
if(opts.next)
$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});if(opts.prev)
$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});if(opts.pager||opts.pagerAnchorBuilder)
buildPager(els,opts);exposeAddSlide(opts,els);return opts;}
function saveOriginalOpts(opts){opts.original={before:[],after:[]};opts.original.cssBefore=$.extend({},opts.cssBefore);opts.original.cssAfter=$.extend({},opts.cssAfter);opts.original.animIn=$.extend({},opts.animIn);opts.original.animOut=$.extend({},opts.animOut);$.each(opts.before,function(){opts.original.before.push(this);});$.each(opts.after,function(){opts.original.after.push(this);});}
function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;if(opts.fx.indexOf(',')>0){opts.multiFx=true;opts.fxs=opts.fx.replace(/\s*/g,'').split(',');for(i=0;i<opts.fxs.length;i++){var fx=opts.fxs[i];tx=txs[fx];if(!tx||!txs.hasOwnProperty(fx)||!$.isFunction(tx)){log('discarding unknown transition: ',fx);opts.fxs.splice(i,1);i--;}}
if(!opts.fxs.length){log('No valid transitions named; slideshow terminating.');return false;}}
else if(opts.fx=='all'){opts.multiFx=true;opts.fxs=[];for(var p in txs){if(txs.hasOwnProperty(p)){tx=txs[p];if(txs.hasOwnProperty(p)&&$.isFunction(tx))
opts.fxs.push(p);}}}
if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(Math.random()*20)+30;for(i=0;i<r1;i++){var r2=Math.floor(Math.random()*opts.fxs.length);opts.fxs.push(opts.fxs.splice(r2,1)[0]);}
debug('randomized fx sequence: ',opts.fxs);}
return true;}
function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];if(!opts.autostopCount)
opts.countdown++;els[prepend?'unshift':'push'](s);if(opts.els)
opts.els[prepend?'unshift':'push'](s);opts.slideCount=els.length;if(opts.random){opts.randomMap.push(opts.slideCount-1);opts.randomMap.sort(function(a,b){return Math.random()-0.5;});}
$s.css('position','absolute');$s[prepend?'prependTo':'appendTo'](opts.$cont);if(prepend){opts.currSlide++;opts.nextSlide++;}
if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg)
clearTypeFix($s);if(opts.fit&&opts.width)
$s.width(opts.width);if(opts.fit&&opts.height&&opts.height!='auto')
$s.height(opts.height);s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();$s.css(opts.cssBefore);if(opts.pager||opts.pagerAnchorBuilder)
$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts);if($.isFunction(opts.onAddSlide))
opts.onAddSlide($s);else
$s.hide();};}
$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx;opts.before=[];opts.after=[];opts.cssBefore=$.extend({},opts.original.cssBefore);opts.cssAfter=$.extend({},opts.original.cssAfter);opts.animIn=$.extend({},opts.original.animIn);opts.animOut=$.extend({},opts.original.animOut);opts.fxFn=null;$.each(opts.original.before,function(){opts.before.push(this);});$.each(opts.original.after,function(){opts.after.push(this);});var init=$.fn.cycle.transitions[fx];if($.isFunction(init))
init(opts.$cont,$(opts.elements),opts);};function go(els,opts,manual,fwd){var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];if(manual&&opts.busy&&opts.manualTrump){debug('manualTrump in go(), stopping active transition');$(els).stop(true,true);opts.busy=0;clearTimeout(p.cycleTimeout);}
if(opts.busy){debug('transition active, ignoring new tx request');return;}
if(p.cycleStop!=opts.stopCount||p.cycleTimeout===0&&!manual)
return;if(!manual&&!p.cyclePause&&!opts.bounce&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end)
opts.end(opts);return;}
var changed=false;if((manual||!p.cyclePause)&&(opts.nextSlide!=opts.currSlide)){changed=true;var fx=opts.fx;curr.cycleH=curr.cycleH||$(curr).height();curr.cycleW=curr.cycleW||$(curr).width();next.cycleH=next.cycleH||$(next).height();next.cycleW=next.cycleW||$(next).width();if(opts.multiFx){if(fwd&&(opts.lastFx===undefined||++opts.lastFx>=opts.fxs.length))
opts.lastFx=0;else if(!fwd&&(opts.lastFx===undefined||--opts.lastFx<0))
opts.lastFx=opts.fxs.length-1;fx=opts.fxs[opts.lastFx];}
if(opts.oneTimeFx){fx=opts.oneTimeFx;opts.oneTimeFx=null;}
$.fn.cycle.resetState(opts,fx);if(opts.before.length)
$.each(opts.before,function(i,o){if(p.cycleStop!=opts.stopCount)return;o.apply(next,[curr,next,opts,fwd]);});var after=function(){opts.busy=0;$.each(opts.after,function(i,o){if(p.cycleStop!=opts.stopCount)return;o.apply(next,[curr,next,opts,fwd]);});if(!p.cycleStop){queueNext();}};debug('tx firing('+fx+'); currSlide: '+opts.currSlide+'; nextSlide: '+opts.nextSlide);opts.busy=1;if(opts.fxFn)
opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);else if($.isFunction($.fn.cycle[opts.fx]))
$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent);else
$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}
else{queueNext();}
if(changed||opts.nextSlide==opts.currSlide){var roll;opts.lastSlide=opts.currSlide;if(opts.random){opts.currSlide=opts.nextSlide;if(++opts.randomIndex==els.length){opts.randomIndex=0;opts.randomMap.sort(function(a,b){return Math.random()-0.5;});}
opts.nextSlide=opts.randomMap[opts.randomIndex];if(opts.nextSlide==opts.currSlide)
opts.nextSlide=(opts.currSlide==opts.slideCount-1)?0:opts.currSlide+1;}
else if(opts.backwards){roll=(opts.nextSlide-1)<0;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=1;opts.currSlide=0;}
else{opts.nextSlide=roll?(els.length-1):opts.nextSlide-1;opts.currSlide=roll?0:opts.nextSlide+1;}}
else{roll=(opts.nextSlide+1)==els.length;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=els.length-2;opts.currSlide=els.length-1;}
else{opts.nextSlide=roll?0:opts.nextSlide+1;opts.currSlide=roll?els.length-1:opts.nextSlide-1;}}}
if(changed&&opts.pager)
opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass);function queueNext(){var ms=0,timeout=opts.timeout;if(opts.timeout&&!opts.continuous){ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd);if(opts.fx=='shuffle')
ms-=opts.speedOut;}
else if(opts.continuous&&p.cyclePause)
ms=10;if(ms>0)
p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.backwards);},ms);}}
$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);});};function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);while(opts.fx!='none'&&(t-opts.speed)<250)
t+=opts.speed;debug('calculated timeout: '+t+'; speed: '+opts.speed);if(t!==false)
return t;}
return opts.timeout;}
$.fn.cycle.next=function(opts){advance(opts,1);};$.fn.cycle.prev=function(opts){advance(opts,0);};function advance(opts,moveForward){var val=moveForward?1:-1;var els=opts.elements;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}
if(opts.random&&val<0){opts.randomIndex--;if(--opts.randomIndex==-2)
opts.randomIndex=els.length-2;else if(opts.randomIndex==-1)
opts.randomIndex=els.length-1;opts.nextSlide=opts.randomMap[opts.randomIndex];}
else if(opts.random){opts.nextSlide=opts.randomMap[opts.randomIndex];}
else{opts.nextSlide=opts.currSlide+val;if(opts.nextSlide<0){if(opts.nowrap)return false;opts.nextSlide=els.length-1;}
else if(opts.nextSlide>=els.length){if(opts.nowrap)return false;opts.nextSlide=0;}}
var cb=opts.onPrevNextEvent||opts.prevNextClick;if($.isFunction(cb))
cb(val>0,opts.nextSlide,els[opts.nextSlide]);go(els,opts,1,moveForward);return false;}
function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);});opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass);}
$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;if($.isFunction(opts.pagerAnchorBuilder)){a=opts.pagerAnchorBuilder(i,el);debug('pagerAnchorBuilder('+i+', el) returned: '+a);}
else
a='<a href="#">'+(i+1)+'</a>';if(!a)
return;var $a=$(a);if($a.parents('body').length===0){var arr=[];if($p.length>1){$p.each(function(){var $clone=$a.clone(true);$(this).append($clone);arr.push($clone[0]);});$a=$(arr);}
else{$a.appendTo($p);}}
opts.pagerAnchors=opts.pagerAnchors||[];opts.pagerAnchors.push($a);var pagerFn=function(e){e.preventDefault();opts.nextSlide=i;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}
var cb=opts.onPagerEvent||opts.pagerClick;if($.isFunction(cb))
cb(opts.nextSlide,els[opts.nextSlide]);go(els,opts,1,opts.currSlide<i);};if(/mouseenter|mouseover/i.test(opts.pagerEvent)){$a.hover(pagerFn,function(){});}
else{$a.bind(opts.pagerEvent,pagerFn);}
if(!/^click/.test(opts.pagerEvent)&&!opts.allowPagerClickBubble)
$a.bind('click.cycle',function(){return false;});var cont=opts.$cont[0];var pauseFlag=false;if(opts.pauseOnPagerHover){$a.hover(function(){pauseFlag=true;cont.cyclePause++;triggerPause(cont,true,true);},function(){if(pauseFlag)
cont.cyclePause--;triggerPause(cont,true,true);});}};$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;if(fwd)
hops=c>l?c-l:opts.slideCount-l;else
hops=c<l?l-c:l+opts.slideCount-c;return hops;};function clearTypeFix($slides){debug('applying clearType background-color hack');function hex(s){s=parseInt(s,10).toString(16);return s.length<2?'0'+s:s;}
function getBg(e){for(;e&&e.nodeName.toLowerCase()!='html';e=e.parentNode){var v=$.css(e,'background-color');if(v&&v.indexOf('rgb')>=0){var rgb=v.match(/\d+/g);return'#'+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}
if(v&&v!='transparent')
return v;}
return'#ffffff';}
$slides.each(function(){$(this).css('background-color',getBg(this));});}
$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide();if(typeof opts.cssBefore.opacity=='undefined')
opts.cssBefore.opacity=1;opts.cssBefore.display='block';if(opts.slideResize&&w!==false&&next.cycleW>0)
opts.cssBefore.width=next.cycleW;if(opts.slideResize&&h!==false&&next.cycleH>0)
opts.cssBefore.height=next.cycleH;opts.cssAfter=opts.cssAfter||{};opts.cssAfter.display='none';$(curr).css('zIndex',opts.slideCount+(rev===true?1:0));$(next).css('zIndex',opts.slideCount+(rev===true?0:1));};$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next);var speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut,animInDelay=opts.animInDelay,animOutDelay=opts.animOutDelay;$n.css(opts.cssBefore);if(speedOverride){if(typeof speedOverride=='number')
speedIn=speedOut=speedOverride;else
speedIn=speedOut=1;easeIn=easeOut=null;}
var fn=function(){$n.delay(animInDelay).animate(opts.animIn,speedIn,easeIn,function(){cb();});};$l.delay(animOutDelay).animate(opts.animOut,speedOut,easeOut,function(){$l.css(opts.cssAfter);if(!opts.sync)
fn();});if(opts.sync)fn();};$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(':eq('+opts.currSlide+')').css('opacity',0);opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.opacity=0;});opts.animIn={opacity:1};opts.animOut={opacity:0};opts.cssBefore={top:0,left:0};}};$.fn.cycle.ver=function(){return ver;};$.fn.cycle.defaults={activePagerClass:'activeSlide',after:null,allowPagerClickBubble:false,animIn:null,animInDelay:0,animOut:null,animOutDelay:0,aspect:false,autostop:0,autostopCount:0,backwards:false,before:null,center:null,cleartype:!$.support.opacity,cleartypeNoBg:false,containerResize:1,containerResizeHeight:0,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:'fade',fxFn:null,height:'auto',manualTrump:true,metaAttr:'cycle',next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:'click.cycle',pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:'click.cycle',random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:false,slideExpr:null,slideResize:1,speed:1000,speedIn:null,speedOut:null,startingSlide:undefined,sync:1,timeout:4000,timeoutFn:null,updateActivePagerLink:null,width:null};})(jQuery);
/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($){"use strict";$.fn.cycle.transitions.none=function($cont,$slides,opts){opts.fxFn=function(curr,next,opts,after){$(next).show();$(curr).hide();after();};};$.fn.cycle.transitions.fadeout=function($cont,$slides,opts){$slides.not(':eq('+opts.currSlide+')').css({display:'block','opacity':1});opts.before.push(function(curr,next,opts,w,h,rev){$(curr).css('zIndex',opts.slideCount+(rev!==true?1:0));$(next).css('zIndex',opts.slideCount+(rev!==true?0:1));});opts.animIn.opacity=1;opts.animOut.opacity=0;opts.cssBefore.opacity=1;opts.cssBefore.display='block';opts.cssAfter.zIndex=0;};$.fn.cycle.transitions.scrollUp=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssBefore.top=h;opts.cssBefore.left=0;opts.cssFirst.top=0;opts.animIn.top=0;opts.animOut.top=-h;};$.fn.cycle.transitions.scrollDown=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssFirst.top=0;opts.cssBefore.top=-h;opts.cssBefore.left=0;opts.animIn.top=0;opts.animOut.top=h;};$.fn.cycle.transitions.scrollLeft=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst.left=0;opts.cssBefore.left=w;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.left=0-w;};$.fn.cycle.transitions.scrollRight=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst.left=0;opts.cssBefore.left=-w;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.left=w;};$.fn.cycle.transitions.scrollHorz=function($cont,$slides,opts){$cont.css('overflow','hidden').width();opts.before.push(function(curr,next,opts,fwd){if(opts.rev)
fwd=!fwd;$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.left=fwd?(next.cycleW-1):(1-next.cycleW);opts.animOut.left=fwd?-curr.cycleW:curr.cycleW;});opts.cssFirst.left=0;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.top=0;};$.fn.cycle.transitions.scrollVert=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push(function(curr,next,opts,fwd){if(opts.rev)
fwd=!fwd;$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.top=fwd?(1-next.cycleH):(next.cycleH-1);opts.animOut.top=fwd?curr.cycleH:-curr.cycleH;});opts.cssFirst.top=0;opts.cssBefore.left=0;opts.animIn.top=0;opts.animOut.left=0;};$.fn.cycle.transitions.slideX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;});opts.cssBefore.left=0;opts.cssBefore.top=0;opts.cssBefore.width=0;opts.animIn.width='show';opts.animOut.width=0;};$.fn.cycle.transitions.slideY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;});opts.cssBefore.left=0;opts.cssBefore.top=0;opts.cssBefore.height=0;opts.animIn.height='show';opts.animOut.height=0;};$.fn.cycle.transitions.shuffle=function($cont,$slides,opts){var i,w=$cont.css('overflow','visible').width();$slides.css({left:0,top:0});opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);});if(!opts.speedAdjusted){opts.speed=opts.speed / 2;opts.speedAdjusted=true;}
opts.random=0;opts.shuffle=opts.shuffle||{left:-w,top:15};opts.els=[];for(i=0;i<$slides.length;i++)
opts.els.push($slides[i]);for(i=0;i<opts.currSlide;i++)
opts.els.push(opts.els.shift());opts.fxFn=function(curr,next,opts,cb,fwd){if(opts.rev)
fwd=!fwd;var $el=fwd?$(curr):$(next);$(next).css(opts.cssBefore);var count=opts.slideCount;$el.animate(opts.shuffle,opts.speedIn,opts.easeIn,function(){var hops=$.fn.cycle.hopsFromLast(opts,fwd);for(var k=0;k<hops;k++){if(fwd)
opts.els.push(opts.els.shift());else
opts.els.unshift(opts.els.pop());}
if(fwd){for(var i=0,len=opts.els.length;i<len;i++)
$(opts.els[i]).css('z-index',len-i+count);}
else{var z=$(curr).css('z-index');$el.css('z-index',parseInt(z,10)+1+count);}
$el.animate({left:0,top:0},opts.speedOut,opts.easeOut,function(){$(fwd?this:curr).hide();if(cb)cb();});});};$.extend(opts.cssBefore,{display:'block',opacity:1,top:0,left:0});};$.fn.cycle.transitions.turnUp=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=next.cycleH;opts.animIn.height=next.cycleH;opts.animOut.width=next.cycleW;});opts.cssFirst.top=0;opts.cssBefore.left=0;opts.cssBefore.height=0;opts.animIn.top=0;opts.animOut.height=0;};$.fn.cycle.transitions.turnDown=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssFirst.top=0;opts.cssBefore.left=0;opts.cssBefore.top=0;opts.cssBefore.height=0;opts.animOut.height=0;};$.fn.cycle.transitions.turnLeft=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=next.cycleW;opts.animIn.width=next.cycleW;});opts.cssBefore.top=0;opts.cssBefore.width=0;opts.animIn.left=0;opts.animOut.width=0;};$.fn.cycle.transitions.turnRight=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});$.extend(opts.cssBefore,{top:0,left:0,width:0});opts.animIn.left=0;opts.animOut.width=0;};$.fn.cycle.transitions.zoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false,true);opts.cssBefore.top=next.cycleH/2;opts.cssBefore.left=next.cycleW/2;$.extend(opts.animIn,{top:0,left:0,width:next.cycleW,height:next.cycleH});$.extend(opts.animOut,{width:0,height:0,top:curr.cycleH/2,left:curr.cycleW/2});});opts.cssFirst.top=0;opts.cssFirst.left=0;opts.cssBefore.width=0;opts.cssBefore.height=0;};$.fn.cycle.transitions.fadeZoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false);opts.cssBefore.left=next.cycleW/2;opts.cssBefore.top=next.cycleH/2;$.extend(opts.animIn,{top:0,left:0,width:next.cycleW,height:next.cycleH});});opts.cssBefore.width=0;opts.cssBefore.height=0;opts.animOut.opacity=0;};$.fn.cycle.transitions.blindX=function($cont,$slides,opts){var w=$cont.css('overflow','hidden').width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.cssBefore.left=w;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.left=w;};$.fn.cycle.transitions.blindY=function($cont,$slides,opts){var h=$cont.css('overflow','hidden').height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore.top=h;opts.cssBefore.left=0;opts.animIn.top=0;opts.animOut.top=h;};$.fn.cycle.transitions.blindZ=function($cont,$slides,opts){var h=$cont.css('overflow','hidden').height();var w=$cont.width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore.top=h;opts.cssBefore.left=w;opts.animIn.top=0;opts.animIn.left=0;opts.animOut.top=h;opts.animOut.left=w;};$.fn.cycle.transitions.growX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=this.cycleW/2;opts.animIn.left=0;opts.animIn.width=this.cycleW;opts.animOut.left=0;});opts.cssBefore.top=0;opts.cssBefore.width=0;};$.fn.cycle.transitions.growY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=this.cycleH/2;opts.animIn.top=0;opts.animIn.height=this.cycleH;opts.animOut.top=0;});opts.cssBefore.height=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.curtainX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true,true);opts.cssBefore.left=next.cycleW/2;opts.animIn.left=0;opts.animIn.width=this.cycleW;opts.animOut.left=curr.cycleW/2;opts.animOut.width=0;});opts.cssBefore.top=0;opts.cssBefore.width=0;};$.fn.cycle.transitions.curtainY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false,true);opts.cssBefore.top=next.cycleH/2;opts.animIn.top=0;opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH/2;opts.animOut.height=0;});opts.cssBefore.height=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.cover=function($cont,$slides,opts){var d=opts.direction||'left';var w=$cont.css('overflow','hidden').width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.cssAfter.display='';if(d=='right')
opts.cssBefore.left=-w;else if(d=='up')
opts.cssBefore.top=h;else if(d=='down')
opts.cssBefore.top=-h;else
opts.cssBefore.left=w;});opts.animIn.left=0;opts.animIn.top=0;opts.cssBefore.top=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.uncover=function($cont,$slides,opts){var d=opts.direction||'left';var w=$cont.css('overflow','hidden').width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(d=='right')
opts.animOut.left=w;else if(d=='up')
opts.animOut.top=-h;else if(d=='down')
opts.animOut.top=h;else
opts.animOut.left=-w;});opts.animIn.left=0;opts.animIn.top=0;opts.cssBefore.top=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.toss=function($cont,$slides,opts){var w=$cont.css('overflow','visible').width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(!opts.animOut.left&&!opts.animOut.top)
$.extend(opts.animOut,{left:w*2,top:-h/2,opacity:0});else
opts.animOut.opacity=0;});opts.cssBefore.left=0;opts.cssBefore.top=0;opts.animIn.left=0;};$.fn.cycle.transitions.wipe=function($cont,$slides,opts){var w=$cont.css('overflow','hidden').width();var h=$cont.height();opts.cssBefore=opts.cssBefore||{};var clip;if(opts.clip){if(/l2r/.test(opts.clip))
clip='rect(0px 0px '+h+'px 0px)';else if(/r2l/.test(opts.clip))
clip='rect(0px '+w+'px '+h+'px '+w+'px)';else if(/t2b/.test(opts.clip))
clip='rect(0px '+w+'px 0px 0px)';else if(/b2t/.test(opts.clip))
clip='rect('+h+'px '+w+'px '+h+'px 0px)';else if(/zoom/.test(opts.clip)){var top=parseInt(h/2,10);var left=parseInt(w/2,10);clip='rect('+top+'px '+left+'px '+top+'px '+left+'px)';}}
opts.cssBefore.clip=opts.cssBefore.clip||clip||'rect(0px 0px 0px 0px)';var d=opts.cssBefore.clip.match(/(\d+)/g);var t=parseInt(d[0],10),r=parseInt(d[1],10),b=parseInt(d[2],10),l=parseInt(d[3],10);opts.before.push(function(curr,next,opts){if(curr==next)return;var $curr=$(curr),$next=$(next);$.fn.cycle.commonReset(curr,next,opts,true,true,false);opts.cssAfter.display='block';var step=1,count=parseInt((opts.speedIn / 13),10)-1;(function f(){var tt=t?t-parseInt(step*(t/count),10):0;var ll=l?l-parseInt(step*(l/count),10):0;var bb=b<h?b+parseInt(step*((h-b)/count||1),10):h;var rr=r<w?r+parseInt(step*((w-r)/count||1),10):w;$next.css({clip:'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)'});(step++<=count)?setTimeout(f,13):$curr.css('display','none');})();});$.extend(opts.cssBefore,{display:'block',opacity:1,top:0,left:0});opts.animIn={left:0};opts.animOut={left:0};};})(jQuery);(function(jQuery){jQuery.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",10:"return",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",59:";",61:"=",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":"\"",",":"<",".":">","/":"?","\\":"|"},textAcceptingInputTypes:["text","password","number","email","url","range","date","month","week","time","datetime","datetime-local","search","color","tel"],options:{filterTextInputs:true}};function keyHandler(handleObj){if(typeof handleObj.data==="string"){handleObj.data={keys:handleObj.data};}
if(!handleObj.data||!handleObj.data.keys||typeof handleObj.data.keys!=="string"){return;}
var origHandler=handleObj.handler,keys=handleObj.data.keys.toLowerCase().split(" ");handleObj.handler=function(event){if(this!==event.target&&(/textarea|select/i.test(event.target.nodeName)||(jQuery.hotkeys.options.filterTextInputs&&jQuery.inArray(event.target.type,jQuery.hotkeys.textAcceptingInputTypes)>-1))){return;}
var special=event.type!=="keypress"&&jQuery.hotkeys.specialKeys[event.which],character=String.fromCharCode(event.which).toLowerCase(),modif="",possible={};jQuery.each(["alt","ctrl","shift"],function(index,specialKey){if(event[specialKey+'Key']&&special!==specialKey){modif+=specialKey+'+';}});if(event.metaKey&&!event.ctrlKey&&special!=="meta"){modif+="meta+";}
if(event.metaKey&&special!=="meta"&&modif.indexOf("alt+ctrl+shift+")>-1){modif=modif.replace("alt+ctrl+shift+","hyper+");}
if(special){possible[modif+special]=true;}
else{possible[modif+character]=true;possible[modif+jQuery.hotkeys.shiftNums[character]]=true;if(modif==="shift+"){possible[jQuery.hotkeys.shiftNums[character]]=true;}}
for(var i=0,l=keys.length;i<l;i++){if(possible[keys[i]]){return origHandler.apply(this,arguments);}}};}
jQuery.each(["keydown","keyup","keypress"],function(){jQuery.event.special[this]={add:keyHandler};});})(jQuery||this.jQuery||window.jQuery);(function(jQuery)
{jQuery.fn.limitMaxlength=function(options){var settings=jQuery.extend({attribute:"maxlength",onLimit:function(){},onEdit:function(){},limit:null},options);var onEdit=function(){var textarea=jQuery(this);var maxlength=!settings.limit?parseInt(textarea.attr(settings.attribute)):parseInt(settings.limit);if(textarea.val().length>maxlength){textarea.val(textarea.val().substr(0,maxlength));jQuery.proxy(settings.onLimit,this)();}
jQuery.proxy(settings.onEdit,this)(maxlength-textarea.val().length);}
this.each(onEdit);return this.keyup(onEdit).keydown(onEdit).focus(onEdit).live('input paste',onEdit);}}(jQuery));(function(root,doc,factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){factory($,root,doc);return $.mobile;});}else{factory(root.jQuery,root,doc);}}(this,document,function(jQuery,window,document,undefined){(function($,window,undefined){var nsNormalizeDict={};$.mobile=$.extend({},{version:"1.2.0",ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:true,hashListeningEnabled:true,linkBindingEnabled:true,defaultPageTransition:"fade",maxTransitionWidth:false,minScrollBack:250,touchOverflowEnabled:false,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"e",phonegapNavigationEnabled:false,autoInitializePage:true,pushStateEnabled:true,ignoreContentEnabled:false,orientationChangeEnabled:true,buttonMarkup:{hoverDelay:200},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},silentScroll:function(ypos){if($.type(ypos)!=="number"){ypos=$.mobile.defaultHomeScroll;}
$.event.special.scrollstart.enabled=false;setTimeout(function(){window.scrollTo(0,ypos);$(document).trigger("silentscroll",{x:0,y:ypos});},20);setTimeout(function(){$.event.special.scrollstart.enabled=true;},150);},nsNormalizeDict:nsNormalizeDict,nsNormalize:function(prop){if(!prop){return;}
return nsNormalizeDict[prop]||(nsNormalizeDict[prop]=$.camelCase($.mobile.ns+prop));},getInheritedTheme:function(el,defaultTheme){var e=el[0],ltr="",re=/ui-(bar|body|overlay)-([a-z])\b/,c,m;while(e){c=e.className||"";if(c&&(m=re.exec(c))&&(ltr=m[2])){break;}
e=e.parentNode;}
return ltr||defaultTheme||"a";},closestPageData:function($target){return $target.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("page");},enhanceable:function($set){return this.haveParents($set,"enhance");},hijackable:function($set){return this.haveParents($set,"ajax");},haveParents:function($set,attr){if(!$.mobile.ignoreContentEnabled){return $set;}
var count=$set.length,$newSet=$(),e,$element,excluded;for(var i=0;i<count;i++){$element=$set.eq(i);excluded=false;e=$set[i];while(e){var c=e.getAttribute?e.getAttribute("data-"+$.mobile.ns+attr):"";if(c==="false"){excluded=true;break;}
e=e.parentNode;}
if(!excluded){$newSet=$newSet.add($element);}}
return $newSet;},getScreenHeight:function(){return window.innerHeight||$(window).height();}},$.mobile);$.fn.jqmData=function(prop,value){var result;if(typeof prop!=="undefined"){if(prop){prop=$.mobile.nsNormalize(prop);}
if(arguments.length<2||value===undefined){result=this.data(prop);}else{result=this.data(prop,value);}}
return result;};$.jqmData=function(elem,prop,value){var result;if(typeof prop!=="undefined"){result=$.data(elem,prop?$.mobile.nsNormalize(prop):prop,value);}
return result;};$.fn.jqmRemoveData=function(prop){return this.removeData($.mobile.nsNormalize(prop));};$.jqmRemoveData=function(elem,prop){return $.removeData(elem,$.mobile.nsNormalize(prop));};$.fn.removeWithDependents=function(){$.removeWithDependents(this);};$.removeWithDependents=function(elem){var $elem=$(elem);($elem.jqmData('dependents')||$()).remove();$elem.remove();};$.fn.addDependents=function(newDependents){$.addDependents($(this),newDependents);};$.addDependents=function(elem,newDependents){var dependents=$(elem).jqmData('dependents')||$();$(elem).jqmData('dependents',$.merge(dependents,newDependents));};$.fn.getEncodedText=function(){return $("<div/>").text($(this).text()).html();};$.fn.jqmEnhanceable=function(){return $.mobile.enhanceable(this);};$.fn.jqmHijackable=function(){return $.mobile.hijackable(this);};var oldFind=$.find,jqmDataRE=/:jqmData\(([^)]*)\)/g;$.find=function(selector,context,ret,extra){selector=selector.replace(jqmDataRE,"[data-"+($.mobile.ns||"")+"$1]");return oldFind.call(this,selector,context,ret,extra);};$.extend($.find,oldFind);$.find.matches=function(expr,set){return $.find(expr,null,null,set);};$.find.matchesSelector=function(node,expr){return $.find(expr,null,null,[node]).length>0;};})(jQuery,this);(function($,undefined){var support={touch:"ontouchend"in document};$.mobile=$.mobile||{};$.mobile.support=$.mobile.support||{};$.extend($.support,support);$.extend($.mobile.support,support);}(jQuery));(function($,window,document,undefined){var dataPropertyName="virtualMouseBindings",touchTargetPropertyName="virtualTouchID",virtualEventNames="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),touchEventProps="clientX clientY pageX pageY screenX screenY".split(" "),mouseHookProps=$.event.mouseHooks?$.event.mouseHooks.props:[],mouseEventProps=$.event.props.concat(mouseHookProps),activeDocHandlers={},resetTimerID=0,startX=0,startY=0,didScroll=false,clickBlockList=[],blockMouseTriggers=false,blockTouchTriggers=false,eventCaptureSupported="addEventListener"in document,$document=$(document),nextTouchID=1,lastTouchID=0,threshold;$.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};function getNativeEvent(event){while(event&&typeof event.originalEvent!=="undefined"){event=event.originalEvent;}
return event;}
function createVirtualEvent(event,eventType){var t=event.type,oe,props,ne,prop,ct,touch,i,j,len;event=$.Event(event);event.type=eventType;oe=event.originalEvent;props=$.event.props;if(t.search(/^(mouse|click)/)>-1){props=mouseEventProps;}
if(oe){for(i=props.length,prop;i;){prop=props[--i];event[prop]=oe[prop];}}
if(t.search(/mouse(down|up)|click/)>-1&&!event.which){event.which=1;}
if(t.search(/^touch/)!==-1){ne=getNativeEvent(oe);t=ne.touches;ct=ne.changedTouches;touch=(t&&t.length)?t[0]:((ct&&ct.length)?ct[0]:undefined);if(touch){for(j=0,len=touchEventProps.length;j<len;j++){prop=touchEventProps[j];event[prop]=touch[prop];}}}
return event;}
function getVirtualBindingFlags(element){var flags={},b,k;while(element){b=$.data(element,dataPropertyName);for(k in b){if(b[k]){flags[k]=flags.hasVirtualBinding=true;}}
element=element.parentNode;}
return flags;}
function getClosestElementWithVirtualBinding(element,eventType){var b;while(element){b=$.data(element,dataPropertyName);if(b&&(!eventType||b[eventType])){return element;}
element=element.parentNode;}
return null;}
function enableTouchBindings(){blockTouchTriggers=false;}
function disableTouchBindings(){blockTouchTriggers=true;}
function enableMouseBindings(){lastTouchID=0;clickBlockList.length=0;blockMouseTriggers=false;disableTouchBindings();}
function disableMouseBindings(){enableTouchBindings();}
function startResetTimer(){clearResetTimer();resetTimerID=setTimeout(function(){resetTimerID=0;enableMouseBindings();},$.vmouse.resetTimerDuration);}
function clearResetTimer(){if(resetTimerID){clearTimeout(resetTimerID);resetTimerID=0;}}
function triggerVirtualEvent(eventType,event,flags){var ve;if((flags&&flags[eventType])||(!flags&&getClosestElementWithVirtualBinding(event.target,eventType))){ve=createVirtualEvent(event,eventType);$(event.target).trigger(ve);}
return ve;}
function mouseEventCallback(event){var touchID=$.data(event.target,touchTargetPropertyName);if(!blockMouseTriggers&&(!lastTouchID||lastTouchID!==touchID)){var ve=triggerVirtualEvent("v"+event.type,event);if(ve){if(ve.isDefaultPrevented()){event.preventDefault();}
if(ve.isPropagationStopped()){event.stopPropagation();}
if(ve.isImmediatePropagationStopped()){event.stopImmediatePropagation();}}}}
function handleTouchStart(event){var touches=getNativeEvent(event).touches,target,flags;if(touches&&touches.length===1){target=event.target;flags=getVirtualBindingFlags(target);if(flags.hasVirtualBinding){lastTouchID=nextTouchID++;$.data(target,touchTargetPropertyName,lastTouchID);clearResetTimer();disableMouseBindings();didScroll=false;var t=getNativeEvent(event).touches[0];startX=t.pageX;startY=t.pageY;triggerVirtualEvent("vmouseover",event,flags);triggerVirtualEvent("vmousedown",event,flags);}}}
function handleScroll(event){if(blockTouchTriggers){return;}
if(!didScroll){triggerVirtualEvent("vmousecancel",event,getVirtualBindingFlags(event.target));}
didScroll=true;startResetTimer();}
function handleTouchMove(event){if(blockTouchTriggers){return;}
var t=getNativeEvent(event).touches[0],didCancel=didScroll,moveThreshold=$.vmouse.moveDistanceThreshold,flags=getVirtualBindingFlags(event.target);didScroll=didScroll||(Math.abs(t.pageX-startX)>moveThreshold||Math.abs(t.pageY-startY)>moveThreshold);if(didScroll&&!didCancel){triggerVirtualEvent("vmousecancel",event,flags);}
triggerVirtualEvent("vmousemove",event,flags);startResetTimer();}
function handleTouchEnd(event){if(blockTouchTriggers){return;}
disableTouchBindings();var flags=getVirtualBindingFlags(event.target),t;triggerVirtualEvent("vmouseup",event,flags);if(!didScroll){var ve=triggerVirtualEvent("vclick",event,flags);if(ve&&ve.isDefaultPrevented()){t=getNativeEvent(event).changedTouches[0];clickBlockList.push({touchID:lastTouchID,x:t.clientX,y:t.clientY});blockMouseTriggers=true;}}
triggerVirtualEvent("vmouseout",event,flags);didScroll=false;startResetTimer();}
function hasVirtualBindings(ele){var bindings=$.data(ele,dataPropertyName),k;if(bindings){for(k in bindings){if(bindings[k]){return true;}}}
return false;}
function dummyMouseHandler(){}
function getSpecialEventObject(eventType){var realType=eventType.substr(1);return{setup:function(data,namespace){if(!hasVirtualBindings(this)){$.data(this,dataPropertyName,{});}
var bindings=$.data(this,dataPropertyName);bindings[eventType]=true;activeDocHandlers[eventType]=(activeDocHandlers[eventType]||0)+1;if(activeDocHandlers[eventType]===1){$document.bind(realType,mouseEventCallback);}
$(this).bind(realType,dummyMouseHandler);if(eventCaptureSupported){activeDocHandlers["touchstart"]=(activeDocHandlers["touchstart"]||0)+1;if(activeDocHandlers["touchstart"]===1){$document.bind("touchstart",handleTouchStart).bind("touchend",handleTouchEnd).bind("touchmove",handleTouchMove).bind("scroll",handleScroll);}}},teardown:function(data,namespace){--activeDocHandlers[eventType];if(!activeDocHandlers[eventType]){$document.unbind(realType,mouseEventCallback);}
if(eventCaptureSupported){--activeDocHandlers["touchstart"];if(!activeDocHandlers["touchstart"]){$document.unbind("touchstart",handleTouchStart).unbind("touchmove",handleTouchMove).unbind("touchend",handleTouchEnd).unbind("scroll",handleScroll);}}
var $this=$(this),bindings=$.data(this,dataPropertyName);if(bindings){bindings[eventType]=false;}
$this.unbind(realType,dummyMouseHandler);if(!hasVirtualBindings(this)){$this.removeData(dataPropertyName);}}};}
for(var i=0;i<virtualEventNames.length;i++){$.event.special[virtualEventNames[i]]=getSpecialEventObject(virtualEventNames[i]);}
if(eventCaptureSupported){document.addEventListener("click",function(e){var cnt=clickBlockList.length,target=e.target,x,y,ele,i,o,touchID;if(cnt){x=e.clientX;y=e.clientY;threshold=$.vmouse.clickDistanceThreshold;ele=target;while(ele){for(i=0;i<cnt;i++){o=clickBlockList[i];touchID=0;if((ele===target&&Math.abs(o.x-x)<threshold&&Math.abs(o.y-y)<threshold)||$.data(ele,touchTargetPropertyName)===o.touchID){e.preventDefault();e.stopPropagation();return;}}
ele=ele.parentNode;}}},true);}})(jQuery,window,document);(function($,window,undefined){$.each(("touchstart touchmove touchend "+"tap taphold "+"swipe swipeleft swiperight "+"scrollstart scrollstop").split(" "),function(i,name){$.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};if($.attrFn){$.attrFn[name]=true;}});var supportTouch=$.mobile.support.touch,scrollEvent="touchmove scroll",touchStartEvent=supportTouch?"touchstart":"mousedown",touchStopEvent=supportTouch?"touchend":"mouseup",touchMoveEvent=supportTouch?"touchmove":"mousemove";function triggerCustomEvent(obj,eventType,event){var originalType=event.type;event.type=eventType;$.event.handle.call(obj,event);event.type=originalType;}
$.event.special.scrollstart={enabled:true,setup:function(){var thisObject=this,$this=$(thisObject),scrolling,timer;function trigger(event,state){scrolling=state;triggerCustomEvent(thisObject,scrolling?"scrollstart":"scrollstop",event);}
$this.bind(scrollEvent,function(event){if(!$.event.special.scrollstart.enabled){return;}
if(!scrolling){trigger(event,true);}
clearTimeout(timer);timer=setTimeout(function(){trigger(event,false);},50);});}};$.event.special.tap={tapholdThreshold:750,setup:function(){var thisObject=this,$this=$(thisObject);$this.bind("vmousedown",function(event){if(event.which&&event.which!==1){return false;}
var origTarget=event.target,origEvent=event.originalEvent,timer;function clearTapTimer(){clearTimeout(timer);}
function clearTapHandlers(){clearTapTimer();$this.unbind("vclick",clickHandler).unbind("vmouseup",clearTapTimer);$(document).unbind("vmousecancel",clearTapHandlers);}
function clickHandler(event){clearTapHandlers();if(origTarget===event.target){triggerCustomEvent(thisObject,"tap",event);}}
$this.bind("vmouseup",clearTapTimer).bind("vclick",clickHandler);$(document).bind("vmousecancel",clearTapHandlers);timer=setTimeout(function(){triggerCustomEvent(thisObject,"taphold",$.Event("taphold",{target:origTarget}));},$.event.special.tap.tapholdThreshold);});}};$.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1000,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var thisObject=this,$this=$(thisObject);$this.bind(touchStartEvent,function(event){var data=event.originalEvent.touches?event.originalEvent.touches[0]:event,start={time:(new Date()).getTime(),coords:[data.pageX,data.pageY],origin:$(event.target)},stop;function moveHandler(event){if(!start){return;}
var data=event.originalEvent.touches?event.originalEvent.touches[0]:event;stop={time:(new Date()).getTime(),coords:[data.pageX,data.pageY]};if(Math.abs(start.coords[0]-stop.coords[0])>$.event.special.swipe.scrollSupressionThreshold){event.preventDefault();}}
$this.bind(touchMoveEvent,moveHandler).one(touchStopEvent,function(event){$this.unbind(touchMoveEvent,moveHandler);if(start&&stop){if(stop.time-start.time<$.event.special.swipe.durationThreshold&&Math.abs(start.coords[0]-stop.coords[0])>$.event.special.swipe.horizontalDistanceThreshold&&Math.abs(start.coords[1]-stop.coords[1])<$.event.special.swipe.verticalDistanceThreshold){start.origin.trigger("swipe").trigger(start.coords[0]>stop.coords[0]?"swipeleft":"swiperight");}}
start=stop=undefined;});});}};$.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(event,sourceEvent){$.event.special[event]={setup:function(){$(this).bind(sourceEvent,$.noop);}};});})(jQuery,this);}));
/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * The MIT License
 *
 * @author  : Washington Botelho
 * @doc     : http://wbotelhos.com/raty
 * @version : 2.6.0
 *
 */;(function($){'use strict';var methods={init:function(options){return this.each(function(){this.self=$(this);methods.destroy.call(this.self);this.opt=$.extend(true,{},$.fn.raty.defaults,options);methods._adjustCallback.call(this);methods._adjustNumber.call(this);if(this.opt.starType!=='img'){methods._adjustStarType.call(this);}
methods._adjustPath.call(this);methods._createStars.call(this);if(this.opt.cancel){methods._createCancel.call(this);}
if(this.opt.precision){methods._adjustPrecision.call(this);}
methods._createScore.call(this);methods._apply.call(this,this.opt.score);methods._target.call(this,this.opt.score);if(this.opt.readOnly){methods._lock.call(this);}else{this.style.cursor='pointer';methods._binds.call(this);}
this.self.data('options',this.opt);});},_adjustCallback:function(){var options=['number','readOnly','score','scoreName','target'];for(var i=0;i<options.length;i++){if(typeof this.opt[options[i]]==='function'){this.opt[options[i]]=this.opt[options[i]].call(this);}}},_adjustNumber:function(){this.opt.number=methods._between(this.opt.number,1,this.opt.numberMax);},_adjustPath:function(){this.opt.path=this.opt.path||'';if(this.opt.path&&this.opt.path.charAt(this.opt.path.length-1)!=='/'){this.opt.path+='/';}},_adjustPrecision:function(){this.opt.half=true;this.opt.targetType='score';},_adjustStarType:function(){this.opt.path='';var replaces=['cancelOff','cancelOn','starHalf','starOff','starOn'];for(var i=0;i<replaces.length;i++){this.opt[replaces[i]]=this.opt[replaces[i]].replace('.','-');}},_apply:function(score){methods._fill.call(this,score);if(score){if(score>0){this.score.val(methods._between(score,0,this.opt.number));}
methods._roundStars.call(this,score);}},_between:function(value,min,max){return Math.min(Math.max(parseFloat(value),min),max);},_binds:function(){if(this.cancel){methods._bindOverCancel.call(this);methods._bindClickCancel.call(this);methods._bindOutCancel.call(this);}
methods._bindOver.call(this);methods._bindClick.call(this);methods._bindOut.call(this);},_bindClick:function(){var that=this;that.stars.on('click.raty',function(evt){var star=$(this);that.score.val((that.opt.half||that.opt.precision)?that.self.data('score'):(this.alt||star.data('alt')));if(that.opt.click){that.opt.click.call(that,+that.score.val(),evt);}});},_bindClickCancel:function(){var that=this;that.cancel.on('click.raty',function(evt){that.score.removeAttr('value');if(that.opt.click){that.opt.click.call(that,null,evt);}});},_bindOut:function(){var that=this;that.self.on('mouseleave.raty',function(evt){var score=+that.score.val()||undefined;methods._apply.call(that,score);methods._target.call(that,score,evt);if(that.opt.mouseout){that.opt.mouseout.call(that,score,evt);}});},_bindOutCancel:function(){var that=this;that.cancel.on('mouseleave.raty',function(evt){var icon=that.opt.cancelOff;if(that.opt.starType!=='img'){icon=that.opt.cancelClass+' '+icon;}
methods._setIcon.call(that,this,icon);if(that.opt.mouseout){var score=+that.score.val()||undefined;that.opt.mouseout.call(that,score,evt);}});},_bindOver:function(){var that=this,action=that.opt.half?'mousemove.raty':'mouseover.raty';that.stars.on(action,function(evt){var score=methods._getScoreByPosition.call(that,evt,this);methods._fill.call(that,score);if(that.opt.half){methods._roundStars.call(that,score);that.self.data('score',score);}
methods._target.call(that,score,evt);if(that.opt.mouseover){that.opt.mouseover.call(that,score,evt);}});},_bindOverCancel:function(){var that=this;that.cancel.on('mouseover.raty',function(evt){var
starOff=that.opt.path+that.opt.starOff,icon=that.opt.cancelOn;if(that.opt.starType==='img'){that.stars.attr('src',starOff);}else{icon=that.opt.cancelClass+' '+icon;that.stars.attr('class',starOff);}
methods._setIcon.call(that,this,icon);methods._target.call(that,null,evt);if(that.opt.mouseover){that.opt.mouseover.call(that,null);}});},_buildScoreField:function(){return $('<input />',{name:this.opt.scoreName,type:'hidden'}).appendTo(this);},_createCancel:function(){var icon=this.opt.path+this.opt.cancelOff,cancel=$('<'+this.opt.starType+' />',{title:this.opt.cancelHint,'class':this.opt.cancelClass});if(this.opt.starType==='img'){cancel.attr({src:icon,alt:'x'});}else{cancel.attr('data-alt','x').addClass(icon);}
if(this.opt.cancelPlace==='left'){this.self.prepend('&#160;').prepend(cancel);}else{this.self.append('&#160;').append(cancel);}
this.cancel=cancel;},_createScore:function(){var score=$(this.opt.targetScore);this.score=score.length?score:methods._buildScoreField.call(this);},_createStars:function(){for(var i=1;i<=this.opt.number;i++){var
name=methods._nameForIndex.call(this,i),attrs={alt:i,src:this.opt.path+this.opt[name]};if(this.opt.starType!=='img'){attrs={'data-alt':i,'class':attrs.src};}
attrs.title=methods._getHint.call(this,i);$('<'+this.opt.starType+' />',attrs).appendTo(this);if(this.opt.space){this.self.append(i<this.opt.number?'&#160;':'');}}
this.stars=this.self.children(this.opt.starType);},_error:function(message){$(this).text(message);$.error(message);},_fill:function(score){var hash=0;for(var i=1;i<=this.stars.length;i++){var
icon,star=this.stars[i-1],turnOn=methods._turnOn.call(this,i,score);if(this.opt.iconRange&&this.opt.iconRange.length>hash){var irange=this.opt.iconRange[hash];icon=methods._getRangeIcon.call(this,irange,turnOn);if(i<=irange.range){methods._setIcon.call(this,star,icon);}
if(i===irange.range){hash++;}}else{icon=this.opt[turnOn?'starOn':'starOff'];methods._setIcon.call(this,star,icon);}}},_getRangeIcon:function(irange,turnOn){return turnOn?irange.on||this.opt.starOn:irange.off||this.opt.starOff;},_getScoreByPosition:function(evt,icon){var score=parseInt(icon.alt||icon.getAttribute('data-alt'),10);if(this.opt.half){var
size=methods._getSize.call(this),percent=parseFloat((evt.pageX-$(icon).offset().left)/ size);if(this.opt.precision){score=score-1+percent;}else{score=score-1+(percent>0.5?1:0.5);}}
return score;},_getSize:function(){var size;if(this.opt.starType==='img'){size=this.stars[0].width;}else{size=parseFloat(this.stars.eq(0).css('font-size'));}
if(!size){methods._error.call(this,'Could not be possible get the icon size!');}
return size;},_turnOn:function(i,score){return this.opt.single?(i===score):(i<=score);},_getHint:function(score){var hint=this.opt.hints[score-1];return hint===''?'':hint||score;},_lock:function(){var score=parseInt(this.score.val(),10),hint=score?methods._getHint.call(this,score):this.opt.noRatedMsg;this.style.cursor='';this.title=hint;this.score.prop('readonly',true);this.stars.prop('title',hint);if(this.cancel){this.cancel.hide();}
this.self.data('readonly',true);},_nameForIndex:function(i){return this.opt.score&&this.opt.score>=i?'starOn':'starOff';},_roundStars:function(score){var rest=(score%1).toFixed(2);if(rest>this.opt.round.down){var name='starOn';if(this.opt.halfShow&&rest<this.opt.round.up){name='starHalf';}else if(rest<this.opt.round.full){name='starOff';}
var
icon=this.opt[name],star=this.stars[Math.ceil(score)-1];methods._setIcon.call(this,star,icon);}},_setIcon:function(star,icon){star[this.opt.starType==='img'?'src':'className']=this.opt.path+icon;},_setTarget:function(target,score){if(score){score=this.opt.targetFormat.toString().replace('{score}',score);}
if(target.is(':input')){target.val(score);}else{target.html(score);}},_target:function(score,evt){if(this.opt.target){var target=$(this.opt.target);if(!target.length){methods._error.call(this,'Target selector invalid or missing!');}
var mouseover=evt&&evt.type==='mouseover';if(score===undefined){score=this.opt.targetText;}else if(score===null){score=mouseover?this.opt.cancelHint:this.opt.targetText;}else{if(this.opt.targetType==='hint'){score=methods._getHint.call(this,Math.ceil(score));}else if(this.opt.precision){score=parseFloat(score).toFixed(1);}
var mousemove=evt&&evt.type==='mousemove';if(!mouseover&&!mousemove&&!this.opt.targetKeep){score=this.opt.targetText;}}
methods._setTarget.call(this,target,score);}},_unlock:function(){this.style.cursor='pointer';this.removeAttribute('title');this.score.removeAttr('readonly');this.self.data('readonly',false);for(var i=0;i<this.opt.number;i++){this.stars[i].title=methods._getHint.call(this,i+1);}
if(this.cancel){this.cancel.css('display','');}},cancel:function(click){return this.each(function(){var el=$(this);if(el.data('readonly')!==true){methods[click?'click':'score'].call(el,null);this.score.removeAttr('value');}});},click:function(score){return this.each(function(){if($(this).data('readonly')!==true){methods._apply.call(this,score);if(this.opt.click){this.opt.click.call(this,score,$.Event('click'));}
methods._target.call(this,score);}});},destroy:function(){return this.each(function(){var self=$(this),raw=self.data('raw');if(raw){self.off('.raty').empty().css({cursor:raw.style.cursor}).removeData('readonly');}else{self.data('raw',self.clone()[0]);}});},getScore:function(){var score=[],value;this.each(function(){value=this.score.val();score.push(value?+value:undefined);});return(score.length>1)?score:score[0];},move:function(score){return this.each(function(){var
integer=parseInt(score,10),opt=$(this).data('options'),decimal=(+score).toFixed(1).split('.')[1];if(integer>=opt.number){integer=opt.number-1;decimal=10;}
var
size=methods._getSize.call(this),point=size / 10,star=$(this.stars[integer]),percent=star.offset().left+point*parseInt(decimal,10),evt=$.Event('mousemove',{pageX:percent});star.trigger(evt);});},readOnly:function(readonly){return this.each(function(){var self=$(this);if(self.data('readonly')!==readonly){if(readonly){self.off('.raty').children('img').off('.raty');methods._lock.call(this);}else{methods._binds.call(this);methods._unlock.call(this);}
self.data('readonly',readonly);}});},reload:function(){return methods.set.call(this,{});},score:function(){var self=$(this);return arguments.length?methods.setScore.apply(self,arguments):methods.getScore.call(self);},set:function(options){return this.each(function(){var self=$(this),actual=self.data('options'),news=$.extend({},actual,options);self.raty(news);});},setScore:function(score){return this.each(function(){if($(this).data('readonly')!==true){methods._apply.call(this,score);methods._target.call(this,score);}});}};$.fn.raty=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist!');}};$.fn.raty.defaults={cancel:false,cancelClass:'raty-cancel',cancelHint:'Cancel this rating!',cancelOff:'cancel-off.png',cancelOn:'cancel-on.png',cancelPlace:'left',click:undefined,half:false,halfShow:true,hints:['bad','poor','regular','good','gorgeous'],iconRange:undefined,mouseout:undefined,mouseover:undefined,noRatedMsg:'Not rated yet!',number:5,numberMax:20,path:undefined,precision:false,readOnly:false,round:{down:0.25,full:0.6,up:0.76},score:undefined,scoreName:'score',single:false,space:true,starHalf:'star-half.png',starOff:'star-off.png',starOn:'star-on.png',starType:'img',target:undefined,targetFormat:'{score}',targetKeep:false,targetScore:undefined,targetText:'',targetType:'hint'};})(jQuery);(function($){var methods={init:function(options){var o=$.extend({items:1,itemsOnPage:1,pages:0,displayedPages:5,edges:2,currentPage:0,hrefTextPrefix:'#page-',hrefTextSuffix:'',prevText:'Prev',nextText:'Next',ellipseText:'&hellip;',cssStyle:'light-theme',labelMap:[],selectOnClick:true,nextAtFront:false,invertPageOrder:false,useStartEdge:true,useEndEdge:true,onPageClick:function(pageNumber,event){},onInit:function(){}},options||{});var self=this;o.pages=o.pages?o.pages:Math.ceil(o.items / o.itemsOnPage)?Math.ceil(o.items / o.itemsOnPage):1;if(o.currentPage)
o.currentPage=o.currentPage-1;else
o.currentPage=!o.invertPageOrder?0:o.pages-1;o.halfDisplayed=o.displayedPages / 2;this.each(function(){self.addClass(o.cssStyle+' simple-pagination').data('pagination',o);methods._draw.call(self);});o.onInit();return this;},selectPage:function(page){methods._selectPage.call(this,page-1);return this;},prevPage:function(){var o=this.data('pagination');if(!o.invertPageOrder){if(o.currentPage>0){methods._selectPage.call(this,o.currentPage-1);}}else{if(o.currentPage<o.pages-1){methods._selectPage.call(this,o.currentPage+1);}}
return this;},nextPage:function(){var o=this.data('pagination');if(!o.invertPageOrder){if(o.currentPage<o.pages-1){methods._selectPage.call(this,o.currentPage+1);}}else{if(o.currentPage>0){methods._selectPage.call(this,o.currentPage-1);}}
return this;},getPagesCount:function(){return this.data('pagination').pages;},getCurrentPage:function(){return this.data('pagination').currentPage+1;},destroy:function(){this.empty();return this;},drawPage:function(page){var o=this.data('pagination');o.currentPage=page-1;this.data('pagination',o);methods._draw.call(this);return this;},redraw:function(){methods._draw.call(this);return this;},disable:function(){var o=this.data('pagination');o.disabled=true;this.data('pagination',o);methods._draw.call(this);return this;},enable:function(){var o=this.data('pagination');o.disabled=false;this.data('pagination',o);methods._draw.call(this);return this;},updateItems:function(newItems){var o=this.data('pagination');o.items=newItems;o.pages=methods._getPages(o);this.data('pagination',o);methods._draw.call(this);},updateItemsOnPage:function(itemsOnPage){var o=this.data('pagination');o.itemsOnPage=itemsOnPage;o.pages=methods._getPages(o);this.data('pagination',o);methods._selectPage.call(this,0);return this;},_draw:function(){var o=this.data('pagination'),interval=methods._getInterval(o),i,tagName;methods.destroy.call(this);tagName=(typeof this.prop==='function')?this.prop('tagName'):this.attr('tagName');var $panel=tagName==='UL'?this:$('<ul></ul>').appendTo(this);if(o.prevText){methods._appendItem.call(this,!o.invertPageOrder?o.currentPage-1:o.currentPage+1,{text:o.prevText,classes:'prev'});}
if(o.nextText&&o.nextAtFront){methods._appendItem.call(this,!o.invertPageOrder?o.currentPage+1:o.currentPage-1,{text:o.nextText,classes:'next'});}
if(!o.invertPageOrder){if(interval.start>0&&o.edges>0){if(o.useStartEdge){var end=Math.min(o.edges,interval.start);for(i=0;i<end;i++){methods._appendItem.call(this,i);}}
if(o.edges<interval.start&&(interval.start-o.edges!=1)){$panel.append('<li class="disabled"><span class="ellipse">'+o.ellipseText+'</span></li>');}else if(interval.start-o.edges==1){methods._appendItem.call(this,o.edges);}}}else{if(interval.end<o.pages&&o.edges>0){if(o.useStartEdge){var begin=Math.max(o.pages-o.edges,interval.end);for(i=o.pages-1;i>=begin;i--){methods._appendItem.call(this,i);}}
if(o.pages-o.edges>interval.end&&(o.pages-o.edges-interval.end!=1)){$panel.append('<li class="disabled"><span class="ellipse">'+o.ellipseText+'</span></li>');}else if(o.pages-o.edges-interval.end==1){methods._appendItem.call(this,interval.end);}}}
if(!o.invertPageOrder){for(i=interval.start;i<interval.end;i++){methods._appendItem.call(this,i);}}else{for(i=interval.end-1;i>=interval.start;i--){methods._appendItem.call(this,i);}}
if(!o.invertPageOrder){if(interval.end<o.pages&&o.edges>0){if(o.pages-o.edges>interval.end&&(o.pages-o.edges-interval.end!=1)){$panel.append('<li class="disabled"><span class="ellipse">'+o.ellipseText+'</span></li>');}else if(o.pages-o.edges-interval.end==1){methods._appendItem.call(this,interval.end);}
if(o.useEndEdge){var begin=Math.max(o.pages-o.edges,interval.end);for(i=begin;i<o.pages;i++){methods._appendItem.call(this,i);}}}}else{if(interval.start>0&&o.edges>0){if(o.edges<interval.start&&(interval.start-o.edges!=1)){$panel.append('<li class="disabled"><span class="ellipse">'+o.ellipseText+'</span></li>');}else if(interval.start-o.edges==1){methods._appendItem.call(this,o.edges);}
if(o.useEndEdge){var end=Math.min(o.edges,interval.start);for(i=end-1;i>=0;i--){methods._appendItem.call(this,i);}}}}
if(o.nextText&&!o.nextAtFront){methods._appendItem.call(this,!o.invertPageOrder?o.currentPage+1:o.currentPage-1,{text:o.nextText,classes:'next'});}},_getPages:function(o){var pages=Math.ceil(o.items / o.itemsOnPage);return pages||1;},_getInterval:function(o){return{start:Math.ceil(o.currentPage>o.halfDisplayed?Math.max(Math.min(o.currentPage-o.halfDisplayed,(o.pages-o.displayedPages)),0):0),end:Math.ceil(o.currentPage>o.halfDisplayed?Math.min(o.currentPage+o.halfDisplayed,o.pages):Math.min(o.displayedPages,o.pages))};},_appendItem:function(pageIndex,opts){var self=this,options,$link,o=self.data('pagination'),$linkWrapper=$('<li></li>'),$ul=self.find('ul');pageIndex=pageIndex<0?0:(pageIndex<o.pages?pageIndex:o.pages-1);options={text:pageIndex+1,classes:''};if(o.labelMap.length&&o.labelMap[pageIndex]){options.text=o.labelMap[pageIndex];}
options=$.extend(options,opts||{});if(pageIndex==o.currentPage||o.disabled){if(o.disabled){$linkWrapper.addClass('disabled');}else{$linkWrapper.addClass('active');}
$link=$('<span class="current">'+(options.text)+'</span>');}else{$link=$('<a href="'+o.hrefTextPrefix+(pageIndex+1)+o.hrefTextSuffix+'" class="page-link">'+(options.text)+'</a>');$link.click(function(event){return methods._selectPage.call(self,pageIndex,event);});}
if(options.classes){$link.addClass(options.classes);}
$linkWrapper.append($link);if($ul.length){$ul.append($linkWrapper);}else{self.append($linkWrapper);}},_selectPage:function(pageIndex,event){var o=this.data('pagination');o.currentPage=pageIndex;if(o.selectOnClick){methods._draw.call(this);}
return o.onPageClick(pageIndex+1,event);}};$.fn.pagination=function(method){if(methods[method]&&method.charAt(0)!='_'){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.pagination');}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.BakedItForm=function(){this.stars=[];this.stars_el=$('.gform_wrapper .rating-stars');if(BAKERS.InstantPreview){var instant_preview=new BAKERS.InstantPreview({source:'.ajax-file-upload input',target:'.image-upload-preview'});$('.ginput_preview a').bind('click',function(){instant_preview.target.html('Preview').removeAttr('style');});}};BAKERS.BakedItForm.prototype={init:function(){this.render_stars();},render_stars:function(){if(!this.stars_el.get(0)){return;}
var self=this;$('.gfield_radio li',this.stars_el).each(function(){var li=$(this);li.hide();self.stars.push({input:$('input',li),el:$('<div class="star-control">8</div>')});var i=self.stars.length-1;li.after(self.stars[i].el);self.stars[i].el.bind('click',function(){self.set_rating(i+1);});if(self.stars[i].input.is(':checked')){self.set_rating(self.stars[i].input.val());}});},set_rating:function(val){var input=this.stars[val-1].input,star=this.stars[val-1].el;input.attr('checked','checked');for(var i in this.stars){this.stars[i].el.text(8);}
star.text(7);star.prevAll('.star-control').text(7);}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Banner=function(opts){this.properties=$.extend({collapse:'.banner-collapse-section',open_handle:'.banner-copy-content .expand-text-link',close_handle:'.banner-copy-content .collapse-text-link'},opts);this.$collapse=$(this.properties.collapse);this.$open_handle=$(this.properties.open_handle);this.$close_handle=$(this.properties.close_handle);this.collapse_height=this.$collapse.height();};BAKERS.Banner.prototype={init:function(){var self=this;this.$collapse.animate({height:0,opacity:0},1000);this.$open_handle.bind('click',function(e){e.preventDefault();self.expand();});this.$close_handle.bind('click',function(e){e.preventDefault();self.collapse();});},expand:function(){this.$open_handle.css('visibility','hidden');this.$close_handle.css('visibility','visible');this.$collapse.animate({height:this.collapse_height,opacity:1},1000);},collapse:function(){this.$open_handle.css('visibility','visible');this.$close_handle.css('visibility','hidden');this.$collapse.animate({height:0,opacity:0},1000);}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Comments=function(opts){this.properties=$.extend({},opts);this.form=$('#comment-reply-form-template');this.active_form=null;};BAKERS.Comments.prototype={init:function(){var self=this;$('.comment-controls-reply').live('click',function(e){e.preventDefault();var comment_id=$(this).attr('href').substring(1);self.render_form($(this).parent(),comment_id);self.focus();});},render_form:function(target,comment_id){this.active_form=this.form.clone();$('.comment-reply-form-clone').remove();this.active_form.removeAttr('id').addClass('comment-reply-form-clone');$('.comment-reply-user-id',this.active_form).val(comment_id);target.after(this.active_form);this.active_form.fadeIn(500);},focus:function(){$('textarea',this.active_form).focus();},create:function(){},get:function(){}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.CookbookSelect=function(){this.$modal=$('.modal');this.$modal_title=$('.modal-header h3',this.$modal);this.$modal_body=$('.modal-body',this.$modal);this.$modal_footer=$('.modal-footer',this.$modal);this.$add_cookbook_btn=null;this.recipe_id=0;this.setLoading();this.init();this.$content=$('.row',this.$modal_body);};BAKERS.CookbookSelect.prototype={remove:function(){},init:function(){var self=this;this.$modal_title.text('Save recipe to cookbook...');this.$modal_body.empty().html('<div class="cookbooks-select"><div class="row"></div></div>');this.$modal.on('hidden',function(){self.hide();});},render_item:function(cookbook){return $('<a data-id="'+cookbook.id+'" href="'+cookbook.url+'" class="cookbook">'+'<span class="cookbook-title">'+'<span class="vertical-center-outer">'+'<span class="vertical-center-middle">'+'<span class="vertical-center-inner">'+
cookbook.name+'</span>'+'</span>'+'</span>'+'</span>'+'</a>');},render_add_cookbook_button:function(){var self=this;this.$add_cookbook_btn=$('<a href="/cookbooks/add" class="cookbook add-cookbook"></a>');this.$content.append(this.$add_cookbook_btn);this.$add_cookbook_btn.bind('click',function(e){self.add_cookbook(e);});},add_item:function(cookbook){var book=this.render_item(cookbook);this.$content.append(book);this.do_bindings(book);},insert_item:function(cookbook){var book=this.render_item(cookbook);this.$add_cookbook_btn.before(book);this.do_bindings(book);},do_bindings:function(item){var self=this;item.bind('click',function(e){e.preventDefault();var btn=$(this);if(self.recipe_id!==0){btn.addClass('loading');self.add_item_to_cookbook(self.recipe_id,btn.attr('data-id'),function(r){btn.removeClass('loading');if(r){BAKERS.messages.show('Recipe successfully added to cookbook. <a href="'+btn.attr('href')+'">Go to your cookbook...</a>');}});}else{BAKERS.messages.show('Please select a recipe.');}});},add_item_to_cookbook:function(item_id,cookbook_id,cb){var self=this;$.ajax({type:'get',dataType:'json',url:ajaxurl,data:{action:'save_recipe_to_cookbook',item_id:item_id,cookbook_id:cookbook_id},success:function(r){if(r===0||r==='0'||r===null){BAKERS.messages.show('There was an error adding this recipe to a cookbook.  Please try again.');if(typeof cb=='function'){cb(false);}
return;}
if(typeof r.error!='undefined'){BAKERS.messages.show(r.error);if(typeof cb=='function'){cb(false);}
return;}
if(typeof cb=='function'){cb(true);}
self.hide();},error:function(r){BAKERS.messages.show(r);if(typeof cb=='function'){cb(false);}}});},add_cookbook:function(e){var self=this,val=prompt('Enter the name of your new cookbook:');e.preventDefault();if(val){$.ajax({type:'post',dataType:'json',url:ajaxurl,data:{action:'create_cookbook',value:val},success:function(r){if(r===0||r==='0'||r===null){BAKERS.messages.show('Something went wrong when creating a new cookbook.  Please try again.');return;}
if(typeof r.error!='undefined'){BAKERS.messages.show(r.error);return;}
if(typeof r.name!='undefined'){self.insert_item(r);}},error:function(e){BAKERS.messages.show(e);return;}});}},get_cookbooks:function(){var self=this;$.ajax({type:'get',dataType:'json',url:ajaxurl,data:{action:'get_cookbooks'},success:function(r){self.unsetLoading();if(r===0||r==='0'||r===null){BAKERS.messages.show('There was an error retrieving your cookbooks, please try again.');return;}
if(typeof r.error!='undefined'){BAKERS.messages.show(r.error);return;}
if(r.length){for(var i=0,c=r.length;i<c;i++){self.add_item(r[i]);}}
self.render_add_cookbook_button();},error:function(e){self.unsetLoading();BAKERS.messages.show(e);}});},show:function(recipe_id){this.$modal.modal('show');this.recipe_id=recipe_id;this.get_cookbooks();},hide:function(){this.$modal.modal('hide');this.$content.empty();},setLoading:function(){this.$modal.addClass('loading');},unsetLoading:function(){this.$modal.removeClass('loading');}};var CookbookSelect=new BAKERS.CookbookSelect();$('[data-action="save_to_cookbook"]').live('click',function(e){e.preventDefault();CookbookSelect.show($(this).attr('data-id'));});$('.cookbook-rename').bind('click',function(e){e.preventDefault();var val=prompt('What do you want to name this cookbook?');if(val){var id=$(this).attr('data-id');BAKERS.loader.post('rename_cookbook',{cookbook_id:id,value:val},function(r){if(!r){BAKERS.messages.show('Failed to rename cookbook. Please try again.');return;}
window.location=r.url;});}});$('.remove-from-cookbook').bind('click',function(e){e.preventDefault();if(!confirm('Are you sure you want to remove this recipe?')){return false;}
var self=$(this),recipe=self.parents('.recipe'),cookbook_id=self.parents('[data-cookbook]').attr('data-cookbook'),recipe_id=self.attr('data-id');BAKERS.loader.post('remove_from_cookbook',{cookbook_id:cookbook_id,recipe_id:recipe_id},function(r){if(!r){BAKERS.messages.show('There was an error removing this recipe. Please try again.');return false;}
BAKERS.messages.show('Recipe successfully removed from cookbook.');recipe.fadeOut(500,function(){$(this).remove();});});});$('.add-recipe-book').bind('click',function(){var self=$(this),val=prompt('Enter the name of your new cookbook:');if(val){BAKERS.loader.post('create_cookbook',{value:val},function(r){if(r.error!==undefined){BAKERS.messages.show(r.error);return;}
if(r.name===undefined){return;}
self.parents('.span3').before($('<div class="span3">'+'<a class="cookbook" href="'+r.url+'">'+'<span class="cookbook-image1"></span>'+'<span class="cookbook-image2"></span>'+'<span class="cookbook-image3"></span>'+'<span class="cookbook-title">'+r.name+'</span>'+'<span class="cookbook-recipe-count"></span>'+'</a>'+'</div>'));});}
return false;});})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Expandable=function(opts){this.properties=$.extend({handle:'',target:'',openText:'',closedText:'',arrow:true},opts);if(this.properties.handle===''||this.properties.target===''){return false;}
this.$handle=$(this.properties.handle);this.$target=$(this.properties.target);this.height=this.$target.height();};BAKERS.Expandable.prototype={init:function(){if(this.properties.arrow){this.appendArrow();}
this.$target.css({height:0,opacity:0}).hide();this.register_events();},appendArrow:function(){this.$handle.append('<span class="icon icon-arrow-down"></span>');},register_events:function(){var self=this;this.$handle.bind('click',function(e){e.preventDefault();if(self.$target.height()){self.collapse();}else{self.expand();}});},setText:function(text){this.$handle.text(text);if(this.properties.arrow){this.appendArrow();}},expand:function(){if(this.properties.closedText!==''){this.setText(this.properties.closedText);}
$('.icon-arrow-down',this.$handle).removeClass('icon-arrow-down').addClass('icon-arrow-up');this.$target.stop().show().animate({height:this.height,opacity:1},500);},collapse:function(){var self=this;if(this.properties.openText!==''){this.setText(this.properties.openText);}
$('.icon-arrow-up',this.$handle).removeClass('icon-arrow-up').addClass('icon-arrow-down');this.$target.stop().animate({height:0,opacity:0},500,function(){self.$target.hide();});}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Gutter=function(opts){this.properties=$.extend({el:'#bc-gutter',speed:500,handle:$('[data-toggle="gutter"]'),close:$('#bc-gutter-collapse a')},opts);this.el=$(this.properties.el);this.ua=BAKERS.ua||null;};BAKERS.Gutter.prototype={init:function(){var self=this;this.properties.handle.bind('click',function(e){e.preventDefault();self.toggle($(this));});this.properties.close.bind('click',function(e){e.preventDefault();self.hide();});},hide:function(){if(this.ua&&(this.ua.isTablet||this.ua.isIphone)){this.el.hide();}else{this.el.slideUp(this.properties.speed);}
this.properties.handle.removeClass('active');},show:function(){if(this.ua&&(this.ua.isTablet||this.ua.isIphone)){this.el.show();}else{this.el.slideDown(this.properties.speed);}
this.properties.handle.addClass('active');},toggle:function($handle){if($handle.hasClass('active')){this.hide($handle);}else{this.show($handle);}}};})(jQuery);jQuery(document).ready(function(){var BAKERS_INGREDIENTS_CALCULATOR={};BAKERS_INGREDIENTS_CALCULATOR.conversion_units={'TEASPOONS':'volume','TABLESPOONS':'volume','CUPS':'volume','FLUID OUNCES':'volume','MILLILITRES (mL)':'volume','LITRES (L)':'volume','GRAMS (g)':'weight','OUNCES (oz)':'weight','POUNDS (lb)':'weight','KILOGRAMS (Kg)':'weight'};BAKERS_INGREDIENTS_CALCULATOR.conversion_table={'TEASPOONS':{0:'1/4',1:'1/2',2:'1',3:'2',4:'3',5:'4',6:'n/a',7:'n/a',8:'n/a',9:'n/a',10:'n/a',11:'n/a',12:'n/a',13:'n/a',14:'n/a'},'TABLESPOONS':{0:'n/a',1:'n/a',2:'0.25',3:'0.5',4:'0.75',5:'1',6:'2',7:'3',8:'4',9:'n/a',10:'n/a',11:'n/a',12:'n/a',13:'n/a',14:'n/a'},'CUPS':{0:'n/a',1:'n/a',2:'n/a',3:'n/a',4:'n/a',5:'n/a',6:'n/a',7:'1/4',8:'1/3',9:'1/2',10:'2/3',11:'1',12:'2 1/4',13:'n/a',14:'n/a'},'FLUID OUNCES':{0:'n/a',1:'n/a',2:'n/a',3:'n/a',4:'n/a',5:'n/a',6:'n/a',7:'2',8:'3',9:'4.5',10:'6',11:'8.75',12:'17.6',13:'26.4',14:'35.2'},'MILLILITRES (mL)':{0:'1.25',1:'2.5',2:'5',3:'10',4:'15',5:'20',6:'40',7:'60',8:'80',9:'125',10:'170',11:'250',12:'500',13:'750',14:'1000'},'LITRES (L)':{0:'n/a',1:'n/a',2:'n/a',3:'n/a',4:'n/a',5:'n/a',6:'n/a',7:'n/a',8:'n/a',9:'0.125',10:'0.17',11:'0.25',12:'0.5',13:'0.75',14:'1'},'GRAMS (g)':{0:'25',1:'50',2:'100',3:'200',4:'500',5:'750',6:'1000'},'KILOGRAMS (Kg)':{0:'0.025',1:'0.05',2:'0.1',3:'0.2',4:'0.5',5:'0.75',6:'1'},'OUNCES (oz)':{0:'1',1:'2',2:'4',3:'8',4:'20',5:'26.4',6:'35.3'},'POUNDS (lb)':{0:'0.06',1:'0.012',2:'0.25',3:'0.5',4:'1 .25',5:'1.65',6:'2.2'}};var unit_select_html=get_unit_select(BAKERS_INGREDIENTS_CALCULATOR.conversion_units);var unit_number_select_html=get_unit_number_select();jQuery('#sidebar-calculator .amount-wrapper .unit-type').html(unit_select_html);jQuery('#sidebar-calculator .amount-wrapper .unit-number').html(unit_number_select_html);function ingredients_calculator_select2_format(o){if(!o.id)return o.text;else return"<i class='icon-"+o.id+"'></i>"+o.text;}
jQuery('select.unit-number-list').select2();jQuery('select.unit-type-list').select2({formatResult:ingredients_calculator_select2_format,formatSelection:ingredients_calculator_select2_format});jQuery('select.unit-type-list').change(function(){var unit_type=jQuery(this).select2('val');var unit_number_options="<option value=\"\"> </option>";if(unit_type){jQuery('select.unit-number-list').removeAttr('disabled');jQuery.each(BAKERS_INGREDIENTS_CALCULATOR.conversion_table[unit_type],function(k,v){if(v!=='n/a')
unit_number_options+="<option value=\""+k+"\">"+v+"</option>";});}else{jQuery('select.unit-number-list').select2('data','');jQuery('select.unit-number-list').attr('disabled','disabled');}
jQuery('select.unit-number-list').html(unit_number_options).select2();});jQuery("#ingredient-calculate-button a").on('click',function(e){e.preventDefault();var unit_type=jQuery('select.unit-type-list').select2('val');var unit_number=jQuery('select.unit-number-list').select2('val');var is_valid=validate_ingredients_calculator_input(unit_number,unit_type);var measure=BAKERS_INGREDIENTS_CALCULATOR.conversion_units[unit_type];if(is_valid){jQuery('#conversion-list li').hide();for(var alternate_unit_type in BAKERS_INGREDIENTS_CALCULATOR.conversion_table){if(alternate_unit_type==unit_type)continue;var tmp_split=alternate_unit_type.split(" ");var class_name=tmp_split[0].toLowerCase();var alternate_measure=BAKERS_INGREDIENTS_CALCULATOR.conversion_units[alternate_unit_type];var amount=BAKERS_INGREDIENTS_CALCULATOR.conversion_table[alternate_unit_type][unit_number];var list_right_html="";var image_url="/wp-content/themes/bakers/assets/img/ingredients-calculator/conversion-"+class_name+".png";if(amount!='n/a'&&measure==alternate_measure){list_right_html+="<img class='conversion-list-icon' src="+image_url+" />";list_right_html+="<span class='conversion-list-text'>"+alternate_unit_type+"</span>";jQuery('#conversion-list li.'+class_name).show().find('.list-left').text(amount);jQuery('#conversion-list li.'+class_name).find('.list-right').html(list_right_html);jQuery('#conversion-list li.'+class_name).next('.list-divider').show();}}
jQuery('#conversion-panel').fadeIn(300);}});});var validate_ingredients_calculator_input=function(unit_number,selected_unit_type){if(isEmpty(selected_unit_type)){alert("Please select a unit type to convert.");return false;}
if(isEmpty(unit_number)){alert("Please enter a quantity.");return false;}
return true;};var isNumber=function(n){return!isNaN(parseFloat(n))&&isFinite(n);};var isEmpty=function(str){return(!str||0===str.length||/^\s*$/.test(str));};var get_unit_select=function(obj){var select_html="<select name='unit_type' class='unit-type-list'>";select_html+="<option value=''>Select unit type...</option>";for(var k in obj){select_html+="<option value='"+k+"'>"+k+"</option>";}
select_html+="</select>";return select_html;};var get_unit_number_select=function(){var select_html="<select name='unit_number' class='unit-number-list' disabled='disabled'>";select_html+="<option value=''></option>";select_html+="</select>";return select_html;}
var BAKERS=BAKERS||{};(function($){BAKERS.InstantPreview=function(opts){this.properties=$.extend({target:'',source:''},opts);if(this.properties.target===''&&this.properties.source===''){return false;}
this.target=$(this.properties.target);this.source=$(this.properties.source);this.init();};BAKERS.InstantPreview.prototype={init:function(){this.do_bindings();},reset:function(){var clone=this.source.clone();this.source.replaceWith(clone);this.source=$(this.properties.source);this.do_bindings();},do_bindings:function(){var self=this;this.source.bind('change',function(){self.read_file($(this).get(0));});},read_file:function(input){if(!input.files||!input.files[0]||!FileReader){return false;}
var self=this;if(input.files[0].type.match(/^image\//)){var reader=new FileReader();reader.onload=function(e){self.set_preview(e.target.result);};reader.readAsDataURL(input.files[0]);}else{this.reset();this.target.removeAttr('style').css('font-size','36px').html('Must upload an image');}},set_preview:function(src){this.target.css({'height':'auto','line-height':'18px'}).html('<img src="'+src+'" width="100%" />');}};})(jQuery);var BAKERS=BAKERS||{};BAKERS.Language=function(){};BAKERS.Language.prototype={MESSAGES_COMMENT_SUCCESS:'Thank you for your comment. Please allow for some time for our moderator to approve.',MESSAGES_REGISTER_LOGIN:'You must <a href="/community/join">join the community</a> and <a href="/login" onClick="_gaq.push([\'_trackEvent\', \'Login\', \'Click\']);">login</a> to use that feature.',MESSAGES_RATE_RECIPE_FAIL:'There was an error rating this recipe.'};var BAKERS=BAKERS||{};(function($){var ajaxurl=window.ajaxurl||'';BAKERS.Loader=function(opts){this.properties=$.extend({url:'//'+document.location.hostname},opts);$.ajaxSetup({cache:false});};BAKERS.Loader.prototype={load:function(path,target,cb){var self=this,el=$(target),url=path;if(el.size()){if(!this.is_full_path(path)){url=this.properties.url+path;}
$.get(url,function(html){el.html(html);self.do_callback(cb,html);});}},get:function(action,data,cb){var self=this;$.ajax({url:ajaxurl,method:'get',data:$.extend({action:action},data),success:function(r){if(!r||r==='0'){self.do_callback(cb,false);}else{self.do_callback(cb,r);}},error:function(){self.do_callback(cb,false);}});},post:function(action,data,cb){var self=this;$.ajax({url:ajaxurl,method:'post',dataType:'json',data:$.extend({action:action},data),success:function(r){if(!r||r==='0'){self.do_callback(cb,false);}else{self.do_callback(cb,r);}},error:function(){self.do_callback(cb,false);}});},is_full_path:function(path){return path.match(/^(https?|\/\/)/);},do_callback:function(cb,arg){if(typeof cb!=='function'){return;}
cb(arg);return true;}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Messages=function(opts){this.properties=$.extend({showTime:250,hideTime:500,timeout:5000},opts);this.el=null;this._timeout=null;this.$message=null;};BAKERS.Messages.prototype={init:function(){var self=this;this.el=this.render_notification_bar();this.el.appendTo('body');this.el.bind('click',function(){self.hide();});this.$message=$('.bc-message',this.el);},render_notification_bar:function(){return $('<div id="bc-messages">'+'<div class="container">'+'<div class="bc-message"></div>'+'</div>'+'</div>');},show:function(msg){if(msg===''){return;}
var self=this;clearTimeout(this._timeout);this.$message.html(msg);this.el.css({'display':'block','height':0,'opacity':0}).stop().animate({height:this.$message.innerHeight()+'px',opacity:1},this.properties.showTime,function(){self._timeout=setTimeout(function(){self.hide();},self.properties.timeout);});},hide:function(){var self=this;this.el.stop().animate({height:0,opacity:0},this.properties.hideTime,function(){self.el.hide();});}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Mobile=function(opts){this.properties=$.extend({},opts);this.$menu=$('.main-nav-collapse');this.$subcategories=$('.subcategories-collapse');};BAKERS.Mobile.prototype={init:function(){this.register_events();},register_events:function(){var self=this;$('.main-nav-collapse-handle').bind('click',function(e){e.preventDefault();var btn=$(this);if(btn.hasClass('active')){self.close_menu();btn.removeClass('active');$('span',btn).text('Open Menu');}else{self.open_menu();btn.addClass('active');$('span',btn).text('Close Menu');}});$('.subcategories-collapse-handle').bind('click',function(e){e.preventDefault();var btn=$(this);if(btn.hasClass('active')){self.close_subcats();btn.removeClass('active');}else{self.open_subcats();btn.addClass('active');}});},open_menu:function(){if(BAKERS.ua.isMobile){this.$menu.show();}else{this.$menu.slideDown(500);}},close_menu:function(){if(BAKERS.ua.isMobile){this.$menu.hide();}else{this.$menu.slideUp(500);}},open_subcats:function(){this.$subcategories.show();},close_subcats:function(){this.$subcategories.hide();}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Placeholder=function(opts){this.properties=$.extend({el:'[placeholder]'},opts);this.el=$(this.properties.el);};BAKERS.Placeholder.prototype={init:function(){var self=this;this.el.live('focus',function(){var input=$(this);if(input.val()===input.attr('placeholder')){input.val('');input.removeClass('placeholder');}}).live('blur',function(){var input=$(this);if(input.val()===''||input.val()===input.attr('placeholder')){input.addClass('placeholder');input.val(input.attr('placeholder'));}}).trigger('blur');this.el.parents('form').live('submit',function(){$(this).find(self.properties.el).each(function(){var input=$(this);if(input.val()===input.attr('placeholder')){input.val('');}});});}};})(jQuery);var BAKERS=BAKERS||{};(function($){var ajaxurl=window.ajaxurl||'';BAKERS.RatingStars=function(opts){if(!$().raty){return false;}
this.properties=$.extend({path:'/wp-content/themes/bakers/assets/img',hints:false,halfShow:true,number:5,width:'94px'},opts);};BAKERS.RatingStars.prototype={init:function(){var self=this;$('.recipe .rating-stars-off').raty({path:this.properties.path,hints:this.properties.hints,halfShow:this.properties.halfShow,number:this.properties.number,width:this.properties.width,score:function(){return $(this).attr('data-rating');},click:function(){BAKERS.messages.show(BAKERS.lang.MESSAGES_REGISTER_LOGIN);}});$('.recipe .rating-stars').raty({path:this.properties.path,hints:this.properties.hints,halfShow:this.properties.halfShow,number:this.properties.number,width:this.properties.width,score:function(){return $(this).attr('data-rating');},click:function(value){self.rate(value);}});},rate:function(val){var id=$('.rating-stars').attr('data-id');$.ajax({type:'post',dataType:'json',url:ajaxurl,data:{action:'rate_recipe',id:id,value:val},success:function(r){if(r===0||r==='0'||r===null){BAKERS.messages.show(BAKERS.lang.MESSAGES_RATE_RECIPE_FAIL);return;}
var parent=$('.rating-stars').parents('.recipe-rating');window._gaq=window._gaq||[];window._gaq.push(['_trackEvent','Star Rating','Click',val+' Star',,false]);if(r.rating){$('.rating-stars').raty('score',r.rating);$('.rating-total',parent).text(r.rating);$('.rating-text-hide',parent).removeClass('rating-text-hide');}
if(r.count){$('.rating-count',parent).text(r.count);}
if(r.message){BAKERS.messages.show(r.message);}}});}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Responsive=function(opts){this.properties=$.extend({},opts);this._change=[];this.width=0;this.already_small=false;};BAKERS.Responsive.prototype={init:function(){this.register_events();},register_events:function(){var self=this;$(window).bind('resize',function(){var w=$('.container').first().width();if(w<723){if(this.already_small){return;}
this.already_small=true;}else{this.already_small=false;}
if(!w){w='100%';self.width=0;}
if(w!==self.width){for(var i=0,c=self._change.length;i<c;i++){self._change[i]();}
self.width=w;}});},change:function(cb){this._change.push(cb);}};})(jQuery);!function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";function n(a){var b,c,d,e;if(!a||a.length<1)return a;for(b="",c=0,d=a.length;d>c;c++)e=a.charAt(c),b+=m[e]||e;return b}function o(a,b){for(var c=0,d=b.length;d>c;c+=1)if(q(a,b[c]))return c;return-1}function p(){var b=a(l);b.appendTo("body");var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function q(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function r(b,c){var d,e,f;if(null===b||b.length<1)return[];for(d=b.split(c),e=0,f=d.length;f>e;e+=1)d[e]=a.trim(d[e]);return d}function s(a){return a.outerWidth(!1)-a.width()}function t(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function u(c){c.on("mousemove",function(c){var d=i;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function v(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function w(a){var c,b=!1;return function(){return b===!1&&(c=a(),b=!0),c}}function x(a,b){var c=v(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){o(a.target,b.get())>=0&&c(a)})}function y(a){a[0]!==document.activeElement&&window.setTimeout(function(){var d,b=a[0],c=a.val().length;a.focus(),a.is(":visible")&&b===document.activeElement&&(b.setSelectionRange?b.setSelectionRange(c,c):b.createTextRange&&(d=b.createTextRange(),d.collapse(!1),d.select()))},0)}function z(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function A(a){a.preventDefault(),a.stopPropagation()}function B(a){a.preventDefault(),a.stopImmediatePropagation()}function C(b){if(!h){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);h=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),h.attr("class","select2-sizer"),a("body").append(h)}return h.text(b.val()),h.width()}function D(b,c,d){var e,g,f=[];e=b.attr("class"),e&&(e=""+e,a(e.split(" ")).each2(function(){0===this.indexOf("select2-")&&f.push(this)})),e=c.attr("class"),e&&(e=""+e,a(e.split(" ")).each2(function(){0!==this.indexOf("select2-")&&(g=d(this),g&&f.push(this))})),b.attr("class",f.join(" "))}function E(a,b,c,d){var e=n(a.toUpperCase()).indexOf(n(b.toUpperCase())),f=b.length;return 0>e?(c.push(d(a)),void 0):(c.push(d(a.substring(0,e))),c.push("<span class='select2-match'>"),c.push(d(a.substring(e,e+f))),c.push("</span>"),c.push(d(a.substring(e+f,a.length))),void 0)}function F(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function G(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page);i.callback(b)}}),e=j.call(h,l)},f)}}function H(b){var d,e,c=b,f=function(a){return""+a.text};a.isArray(c)&&(e=c,c={results:e}),a.isFunction(c)===!1&&(e=c,c=function(){return e});var g=c();return g.text&&(f=g.text,a.isFunction(f)||(d=g.text,f=function(a){return a[d]})),function(b){var g,d=b.term,e={results:[]};return""===d?(b.callback(c()),void 0):(g=function(c,e){var h,i;if(c=c[0],c.children){h={};for(i in c)c.hasOwnProperty(i)&&(h[i]=c[i]);h.children=[],a(c.children).each2(function(a,b){g(b,h.children)}),(h.children.length||b.matcher(d,f(h),c))&&e.push(h)}else b.matcher(d,f(c),c)&&e.push(c)},a(c().results).each2(function(a,b){g(b,e.results)}),b.callback(e),void 0)}}function I(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]};a(d?c():c).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g)}}function J(b,c){if(a.isFunction(b))return!0;if(!b)return!1;throw new Error(c+" must be a function or a falsy value")}function K(b){return a.isFunction(b)?b():b}function L(b){var c=0;return a.each(b,function(a,b){b.children?c+=L(b.children):c++}),c}function M(a,c,d,e){var h,i,j,k,l,f=a,g=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(i=-1,j=0,k=e.tokenSeparators.length;k>j&&(l=e.tokenSeparators[j],i=a.indexOf(l),!(i>=0));j++);if(0>i)break;if(h=a.substring(0,i),a=a.substring(i+l.length),h.length>0&&(h=e.createSearchChoice.call(this,h,c),h!==b&&null!==h&&e.id(h)!==b&&null!==e.id(h))){for(g=!1,j=0,k=c.length;k>j;j++)if(q(e.id(h),e.id(c[j]))){g=!0;break}g||d(h)}}return f!==a?a:void 0}function N(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var c,d,e,f,g,h,j,k,i={x:0,y:0},c={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case c.LEFT:case c.RIGHT:case c.UP:case c.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case c.SHIFT:case c.CTRL:case c.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},l="<div class='select2-measure-scrollbar'></div>",m={"\u24b6":"A","\uff21":"A","\xc0":"A","\xc1":"A","\xc2":"A","\u1ea6":"A","\u1ea4":"A","\u1eaa":"A","\u1ea8":"A","\xc3":"A","\u0100":"A","\u0102":"A","\u1eb0":"A","\u1eae":"A","\u1eb4":"A","\u1eb2":"A","\u0226":"A","\u01e0":"A","\xc4":"A","\u01de":"A","\u1ea2":"A","\xc5":"A","\u01fa":"A","\u01cd":"A","\u0200":"A","\u0202":"A","\u1ea0":"A","\u1eac":"A","\u1eb6":"A","\u1e00":"A","\u0104":"A","\u023a":"A","\u2c6f":"A","\ua732":"AA","\xc6":"AE","\u01fc":"AE","\u01e2":"AE","\ua734":"AO","\ua736":"AU","\ua738":"AV","\ua73a":"AV","\ua73c":"AY","\u24b7":"B","\uff22":"B","\u1e02":"B","\u1e04":"B","\u1e06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24b8":"C","\uff23":"C","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\xc7":"C","\u1e08":"C","\u0187":"C","\u023b":"C","\ua73e":"C","\u24b9":"D","\uff24":"D","\u1e0a":"D","\u010e":"D","\u1e0c":"D","\u1e10":"D","\u1e12":"D","\u1e0e":"D","\u0110":"D","\u018b":"D","\u018a":"D","\u0189":"D","\ua779":"D","\u01f1":"DZ","\u01c4":"DZ","\u01f2":"Dz","\u01c5":"Dz","\u24ba":"E","\uff25":"E","\xc8":"E","\xc9":"E","\xca":"E","\u1ec0":"E","\u1ebe":"E","\u1ec4":"E","\u1ec2":"E","\u1ebc":"E","\u0112":"E","\u1e14":"E","\u1e16":"E","\u0114":"E","\u0116":"E","\xcb":"E","\u1eba":"E","\u011a":"E","\u0204":"E","\u0206":"E","\u1eb8":"E","\u1ec6":"E","\u0228":"E","\u1e1c":"E","\u0118":"E","\u1e18":"E","\u1e1a":"E","\u0190":"E","\u018e":"E","\u24bb":"F","\uff26":"F","\u1e1e":"F","\u0191":"F","\ua77b":"F","\u24bc":"G","\uff27":"G","\u01f4":"G","\u011c":"G","\u1e20":"G","\u011e":"G","\u0120":"G","\u01e6":"G","\u0122":"G","\u01e4":"G","\u0193":"G","\ua7a0":"G","\ua77d":"G","\ua77e":"G","\u24bd":"H","\uff28":"H","\u0124":"H","\u1e22":"H","\u1e26":"H","\u021e":"H","\u1e24":"H","\u1e28":"H","\u1e2a":"H","\u0126":"H","\u2c67":"H","\u2c75":"H","\ua78d":"H","\u24be":"I","\uff29":"I","\xcc":"I","\xcd":"I","\xce":"I","\u0128":"I","\u012a":"I","\u012c":"I","\u0130":"I","\xcf":"I","\u1e2e":"I","\u1ec8":"I","\u01cf":"I","\u0208":"I","\u020a":"I","\u1eca":"I","\u012e":"I","\u1e2c":"I","\u0197":"I","\u24bf":"J","\uff2a":"J","\u0134":"J","\u0248":"J","\u24c0":"K","\uff2b":"K","\u1e30":"K","\u01e8":"K","\u1e32":"K","\u0136":"K","\u1e34":"K","\u0198":"K","\u2c69":"K","\ua740":"K","\ua742":"K","\ua744":"K","\ua7a2":"K","\u24c1":"L","\uff2c":"L","\u013f":"L","\u0139":"L","\u013d":"L","\u1e36":"L","\u1e38":"L","\u013b":"L","\u1e3c":"L","\u1e3a":"L","\u0141":"L","\u023d":"L","\u2c62":"L","\u2c60":"L","\ua748":"L","\ua746":"L","\ua780":"L","\u01c7":"LJ","\u01c8":"Lj","\u24c2":"M","\uff2d":"M","\u1e3e":"M","\u1e40":"M","\u1e42":"M","\u2c6e":"M","\u019c":"M","\u24c3":"N","\uff2e":"N","\u01f8":"N","\u0143":"N","\xd1":"N","\u1e44":"N","\u0147":"N","\u1e46":"N","\u0145":"N","\u1e4a":"N","\u1e48":"N","\u0220":"N","\u019d":"N","\ua790":"N","\ua7a4":"N","\u01ca":"NJ","\u01cb":"Nj","\u24c4":"O","\uff2f":"O","\xd2":"O","\xd3":"O","\xd4":"O","\u1ed2":"O","\u1ed0":"O","\u1ed6":"O","\u1ed4":"O","\xd5":"O","\u1e4c":"O","\u022c":"O","\u1e4e":"O","\u014c":"O","\u1e50":"O","\u1e52":"O","\u014e":"O","\u022e":"O","\u0230":"O","\xd6":"O","\u022a":"O","\u1ece":"O","\u0150":"O","\u01d1":"O","\u020c":"O","\u020e":"O","\u01a0":"O","\u1edc":"O","\u1eda":"O","\u1ee0":"O","\u1ede":"O","\u1ee2":"O","\u1ecc":"O","\u1ed8":"O","\u01ea":"O","\u01ec":"O","\xd8":"O","\u01fe":"O","\u0186":"O","\u019f":"O","\ua74a":"O","\ua74c":"O","\u01a2":"OI","\ua74e":"OO","\u0222":"OU","\u24c5":"P","\uff30":"P","\u1e54":"P","\u1e56":"P","\u01a4":"P","\u2c63":"P","\ua750":"P","\ua752":"P","\ua754":"P","\u24c6":"Q","\uff31":"Q","\ua756":"Q","\ua758":"Q","\u024a":"Q","\u24c7":"R","\uff32":"R","\u0154":"R","\u1e58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1e5a":"R","\u1e5c":"R","\u0156":"R","\u1e5e":"R","\u024c":"R","\u2c64":"R","\ua75a":"R","\ua7a6":"R","\ua782":"R","\u24c8":"S","\uff33":"S","\u1e9e":"S","\u015a":"S","\u1e64":"S","\u015c":"S","\u1e60":"S","\u0160":"S","\u1e66":"S","\u1e62":"S","\u1e68":"S","\u0218":"S","\u015e":"S","\u2c7e":"S","\ua7a8":"S","\ua784":"S","\u24c9":"T","\uff34":"T","\u1e6a":"T","\u0164":"T","\u1e6c":"T","\u021a":"T","\u0162":"T","\u1e70":"T","\u1e6e":"T","\u0166":"T","\u01ac":"T","\u01ae":"T","\u023e":"T","\ua786":"T","\ua728":"TZ","\u24ca":"U","\uff35":"U","\xd9":"U","\xda":"U","\xdb":"U","\u0168":"U","\u1e78":"U","\u016a":"U","\u1e7a":"U","\u016c":"U","\xdc":"U","\u01db":"U","\u01d7":"U","\u01d5":"U","\u01d9":"U","\u1ee6":"U","\u016e":"U","\u0170":"U","\u01d3":"U","\u0214":"U","\u0216":"U","\u01af":"U","\u1eea":"U","\u1ee8":"U","\u1eee":"U","\u1eec":"U","\u1ef0":"U","\u1ee4":"U","\u1e72":"U","\u0172":"U","\u1e76":"U","\u1e74":"U","\u0244":"U","\u24cb":"V","\uff36":"V","\u1e7c":"V","\u1e7e":"V","\u01b2":"V","\ua75e":"V","\u0245":"V","\ua760":"VY","\u24cc":"W","\uff37":"W","\u1e80":"W","\u1e82":"W","\u0174":"W","\u1e86":"W","\u1e84":"W","\u1e88":"W","\u2c72":"W","\u24cd":"X","\uff38":"X","\u1e8a":"X","\u1e8c":"X","\u24ce":"Y","\uff39":"Y","\u1ef2":"Y","\xdd":"Y","\u0176":"Y","\u1ef8":"Y","\u0232":"Y","\u1e8e":"Y","\u0178":"Y","\u1ef6":"Y","\u1ef4":"Y","\u01b3":"Y","\u024e":"Y","\u1efe":"Y","\u24cf":"Z","\uff3a":"Z","\u0179":"Z","\u1e90":"Z","\u017b":"Z","\u017d":"Z","\u1e92":"Z","\u1e94":"Z","\u01b5":"Z","\u0224":"Z","\u2c7f":"Z","\u2c6b":"Z","\ua762":"Z","\u24d0":"a","\uff41":"a","\u1e9a":"a","\xe0":"a","\xe1":"a","\xe2":"a","\u1ea7":"a","\u1ea5":"a","\u1eab":"a","\u1ea9":"a","\xe3":"a","\u0101":"a","\u0103":"a","\u1eb1":"a","\u1eaf":"a","\u1eb5":"a","\u1eb3":"a","\u0227":"a","\u01e1":"a","\xe4":"a","\u01df":"a","\u1ea3":"a","\xe5":"a","\u01fb":"a","\u01ce":"a","\u0201":"a","\u0203":"a","\u1ea1":"a","\u1ead":"a","\u1eb7":"a","\u1e01":"a","\u0105":"a","\u2c65":"a","\u0250":"a","\ua733":"aa","\xe6":"ae","\u01fd":"ae","\u01e3":"ae","\ua735":"ao","\ua737":"au","\ua739":"av","\ua73b":"av","\ua73d":"ay","\u24d1":"b","\uff42":"b","\u1e03":"b","\u1e05":"b","\u1e07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24d2":"c","\uff43":"c","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\xe7":"c","\u1e09":"c","\u0188":"c","\u023c":"c","\ua73f":"c","\u2184":"c","\u24d3":"d","\uff44":"d","\u1e0b":"d","\u010f":"d","\u1e0d":"d","\u1e11":"d","\u1e13":"d","\u1e0f":"d","\u0111":"d","\u018c":"d","\u0256":"d","\u0257":"d","\ua77a":"d","\u01f3":"dz","\u01c6":"dz","\u24d4":"e","\uff45":"e","\xe8":"e","\xe9":"e","\xea":"e","\u1ec1":"e","\u1ebf":"e","\u1ec5":"e","\u1ec3":"e","\u1ebd":"e","\u0113":"e","\u1e15":"e","\u1e17":"e","\u0115":"e","\u0117":"e","\xeb":"e","\u1ebb":"e","\u011b":"e","\u0205":"e","\u0207":"e","\u1eb9":"e","\u1ec7":"e","\u0229":"e","\u1e1d":"e","\u0119":"e","\u1e19":"e","\u1e1b":"e","\u0247":"e","\u025b":"e","\u01dd":"e","\u24d5":"f","\uff46":"f","\u1e1f":"f","\u0192":"f","\ua77c":"f","\u24d6":"g","\uff47":"g","\u01f5":"g","\u011d":"g","\u1e21":"g","\u011f":"g","\u0121":"g","\u01e7":"g","\u0123":"g","\u01e5":"g","\u0260":"g","\ua7a1":"g","\u1d79":"g","\ua77f":"g","\u24d7":"h","\uff48":"h","\u0125":"h","\u1e23":"h","\u1e27":"h","\u021f":"h","\u1e25":"h","\u1e29":"h","\u1e2b":"h","\u1e96":"h","\u0127":"h","\u2c68":"h","\u2c76":"h","\u0265":"h","\u0195":"hv","\u24d8":"i","\uff49":"i","\xec":"i","\xed":"i","\xee":"i","\u0129":"i","\u012b":"i","\u012d":"i","\xef":"i","\u1e2f":"i","\u1ec9":"i","\u01d0":"i","\u0209":"i","\u020b":"i","\u1ecb":"i","\u012f":"i","\u1e2d":"i","\u0268":"i","\u0131":"i","\u24d9":"j","\uff4a":"j","\u0135":"j","\u01f0":"j","\u0249":"j","\u24da":"k","\uff4b":"k","\u1e31":"k","\u01e9":"k","\u1e33":"k","\u0137":"k","\u1e35":"k","\u0199":"k","\u2c6a":"k","\ua741":"k","\ua743":"k","\ua745":"k","\ua7a3":"k","\u24db":"l","\uff4c":"l","\u0140":"l","\u013a":"l","\u013e":"l","\u1e37":"l","\u1e39":"l","\u013c":"l","\u1e3d":"l","\u1e3b":"l","\u017f":"l","\u0142":"l","\u019a":"l","\u026b":"l","\u2c61":"l","\ua749":"l","\ua781":"l","\ua747":"l","\u01c9":"lj","\u24dc":"m","\uff4d":"m","\u1e3f":"m","\u1e41":"m","\u1e43":"m","\u0271":"m","\u026f":"m","\u24dd":"n","\uff4e":"n","\u01f9":"n","\u0144":"n","\xf1":"n","\u1e45":"n","\u0148":"n","\u1e47":"n","\u0146":"n","\u1e4b":"n","\u1e49":"n","\u019e":"n","\u0272":"n","\u0149":"n","\ua791":"n","\ua7a5":"n","\u01cc":"nj","\u24de":"o","\uff4f":"o","\xf2":"o","\xf3":"o","\xf4":"o","\u1ed3":"o","\u1ed1":"o","\u1ed7":"o","\u1ed5":"o","\xf5":"o","\u1e4d":"o","\u022d":"o","\u1e4f":"o","\u014d":"o","\u1e51":"o","\u1e53":"o","\u014f":"o","\u022f":"o","\u0231":"o","\xf6":"o","\u022b":"o","\u1ecf":"o","\u0151":"o","\u01d2":"o","\u020d":"o","\u020f":"o","\u01a1":"o","\u1edd":"o","\u1edb":"o","\u1ee1":"o","\u1edf":"o","\u1ee3":"o","\u1ecd":"o","\u1ed9":"o","\u01eb":"o","\u01ed":"o","\xf8":"o","\u01ff":"o","\u0254":"o","\ua74b":"o","\ua74d":"o","\u0275":"o","\u01a3":"oi","\u0223":"ou","\ua74f":"oo","\u24df":"p","\uff50":"p","\u1e55":"p","\u1e57":"p","\u01a5":"p","\u1d7d":"p","\ua751":"p","\ua753":"p","\ua755":"p","\u24e0":"q","\uff51":"q","\u024b":"q","\ua757":"q","\ua759":"q","\u24e1":"r","\uff52":"r","\u0155":"r","\u1e59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1e5b":"r","\u1e5d":"r","\u0157":"r","\u1e5f":"r","\u024d":"r","\u027d":"r","\ua75b":"r","\ua7a7":"r","\ua783":"r","\u24e2":"s","\uff53":"s","\xdf":"s","\u015b":"s","\u1e65":"s","\u015d":"s","\u1e61":"s","\u0161":"s","\u1e67":"s","\u1e63":"s","\u1e69":"s","\u0219":"s","\u015f":"s","\u023f":"s","\ua7a9":"s","\ua785":"s","\u1e9b":"s","\u24e3":"t","\uff54":"t","\u1e6b":"t","\u1e97":"t","\u0165":"t","\u1e6d":"t","\u021b":"t","\u0163":"t","\u1e71":"t","\u1e6f":"t","\u0167":"t","\u01ad":"t","\u0288":"t","\u2c66":"t","\ua787":"t","\ua729":"tz","\u24e4":"u","\uff55":"u","\xf9":"u","\xfa":"u","\xfb":"u","\u0169":"u","\u1e79":"u","\u016b":"u","\u1e7b":"u","\u016d":"u","\xfc":"u","\u01dc":"u","\u01d8":"u","\u01d6":"u","\u01da":"u","\u1ee7":"u","\u016f":"u","\u0171":"u","\u01d4":"u","\u0215":"u","\u0217":"u","\u01b0":"u","\u1eeb":"u","\u1ee9":"u","\u1eef":"u","\u1eed":"u","\u1ef1":"u","\u1ee5":"u","\u1e73":"u","\u0173":"u","\u1e77":"u","\u1e75":"u","\u0289":"u","\u24e5":"v","\uff56":"v","\u1e7d":"v","\u1e7f":"v","\u028b":"v","\ua75f":"v","\u028c":"v","\ua761":"vy","\u24e6":"w","\uff57":"w","\u1e81":"w","\u1e83":"w","\u0175":"w","\u1e87":"w","\u1e85":"w","\u1e98":"w","\u1e89":"w","\u2c73":"w","\u24e7":"x","\uff58":"x","\u1e8b":"x","\u1e8d":"x","\u24e8":"y","\uff59":"y","\u1ef3":"y","\xfd":"y","\u0177":"y","\u1ef9":"y","\u0233":"y","\u1e8f":"y","\xff":"y","\u1ef7":"y","\u1e99":"y","\u1ef5":"y","\u01b4":"y","\u024f":"y","\u1eff":"y","\u24e9":"z","\uff5a":"z","\u017a":"z","\u1e91":"z","\u017c":"z","\u017e":"z","\u1e93":"z","\u1e95":"z","\u01b6":"z","\u0225":"z","\u0240":"z","\u2c6c":"z","\ua763":"z"};j=a(document),g=function(){var a=1;return function(){return a++}}(),j.on("mousemove",function(a){i.x=a.pageX,i.y=a.pageY}),d=N(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,h,i,f=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+g()),this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.body=w(function(){return c.element.closest("body")}),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(K(c.containerCss)),this.container.addClass(K(c.containerCssClass)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",A),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(c.dropdownCssClass)),this.dropdown.data("select2",this),this.dropdown.on("click",A),this.results=d=this.container.find(f),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",A),u(this.results),this.dropdown.on("mousemove-filtered touchstart touchmove touchend",f,this.bind(this.highlightUnderEvent)),x(80,this.results),this.dropdown.on("scroll-debounced",f,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),A(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),A(a))}),t(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",f,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown",function(a){a.stopPropagation()}),a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),k=k||p(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.nextSearchTerm=b},destroy:function(){var a=this.opts.element,c=a.data("select2");this.close(),this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),c!==b&&(c.container.remove(),c.dropdown.remove(),a.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show())},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:q(a.attr("locked"),"locked")||q(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,g,h=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var g,l=this.opts.id;g=function(d,e,i){var j,k,m,n,o,p,q,r,s,t;for(d=c.sortResults(d,e,f),j=0,k=d.length;k>j;j+=1)m=d[j],o=m.disabled===!0,n=!o&&l(m)!==b,p=m.children&&m.children.length>0,q=a("<li></li>"),q.addClass("select2-results-dept-"+i),q.addClass("select2-result"),q.addClass(n?"select2-result-selectable":"select2-result-unselectable"),o&&q.addClass("select2-disabled"),p&&q.addClass("select2-result-with-children"),q.addClass(h.opts.formatResultCssClass(m)),r=a(document.createElement("div")),r.addClass("select2-result-label"),t=c.formatResult(m,r,f,h.opts.escapeMarkup),t!==b&&r.html(t),q.append(r),p&&(s=a("<ul></ul>"),s.addClass("select2-result-sub"),g(m.children,s,i+1),q.append(s)),q.data("select2-data",m),e.append(q)},g(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var f,g,i,c={results:[],more:!1},e=a.term;i=function(b,c){var d;b.is("option")?a.matcher(e,b.text(),b)&&c.push(h.optionToData(b)):b.is("optgroup")&&(d=h.optionToData(b),b.children().each2(function(a,b){i(b,d.children)}),d.children.length>0&&c.push(d))},f=d.children(),this.getPlaceholder()!==b&&f.length>0&&(g=this.getPlaceholderOption(),g&&(f=f.not(g))),f.each2(function(a,b){i(b,c.results)}),a.callback(c)}),c.id=function(a){return a.id},c.formatResultCssClass=function(a){return a.css}):"query"in c||("ajax"in c?(g=c.element.data("ajax-url"),g&&g.length>0&&(c.ajax.url=g),c.query=G.call(c.element,c.ajax)):"data"in c?c.query=H(c.data):"tags"in c&&(c.query=I(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(r(b.val(),c.separator)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return q(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");return c},monitorSource:function(){var c,a=this.opts.element;a.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),c=this.bind(function(){var d,f=a.prop("disabled");f===b&&(f=!1),this.enable(!f);var d=a.prop("readonly");d===b&&(d=!1),this.readonly(d),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(K(this.opts.containerCssClass)),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(this.opts.dropdownCssClass))}),a.on("propertychange.select2 DOMAttrModified.select2",c),this.mutationCallback===b&&(this.mutationCallback=function(a){a.forEach(c)}),"undefined"!=typeof WebKitMutationObserver&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new WebKitMutationObserver(this.mutationCallback),this.propertyObserver.observe(a.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){return a===b&&(a=!1),this._readonly===a?!1:(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface(),!0)},opened:function(){return this.container.hasClass("select2-dropdown-open")},positionDropdown:function(){var q,r,s,t,b=this.dropdown,c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),g=a(window).scrollLeft()+a(window).width(),h=a(window).scrollTop()+a(window).height(),i=c.top+d,j=c.left,l=h>=i+f,m=c.top-f>=this.body().scrollTop(),n=b.outerWidth(!1),o=g>=j+n,p=b.hasClass("select2-drop-above");this.opts.dropdownAutoWidth?(t=a(".select2-results",b)[0],b.addClass("select2-drop-auto-width"),b.css("width",""),n=b.outerWidth(!1)+(t.scrollHeight===t.clientHeight?0:k.width),n>e?e=n:n=e,o=g>=j+n):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body().css("position")&&(q=this.body().offset(),i-=q.top,j-=q.left),p?(r=!0,!m&&l&&(r=!1)):(r=!1,!l&&m&&(r=!0)),o||(j=c.left+e-n),r?(i=c.top-f,this.container.addClass("select2-drop-above"),b.addClass("select2-drop-above")):(this.container.removeClass("select2-drop-above"),b.removeClass("select2-drop-above")),s=a.extend({top:i,left:j,width:e},K(this.opts.dropdownCss)),b.css(s)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),!0):!1},opening:function(){var f,b=this.containerId,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body().children().last()[0]&&this.dropdown.detach().appendTo(this.body()),f=a("#select2-drop-mask"),0==f.length&&(f=a(document.createElement("div")),f.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),f.hide(),f.appendTo(this.body()),f.on("mousedown touchstart click",function(b){var d,c=a("#select2-drop");c.length>0&&(d=c.data("select2"),d.opts.selectOnBlur&&d.selectHighlighted({noFocus:!0}),d.close({focus:!1}),b.preventDefault(),b.stopPropagation())})),this.dropdown.prev()[0]!==f[0]&&this.dropdown.before(f),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),f.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var h=this;this.container.parents().add(window).each(function(){a(this).on(d+" "+c+" "+e,function(){h.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerId,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return K(this.opts.maximumSelectionSize)},ensureHighlightVisible:function(){var c,d,e,f,g,h,i,b=this.results;if(d=this.highlight(),!(0>d)){if(0==d)return b.scrollTop(0),void 0;c=this.findHighlightableChoices().find(".select2-result-label"),e=a(c[d]),f=e.offset().top+e.outerHeight(!0),d===c.length-1&&(i=b.find("li.select2-more-results"),i.length>0&&(f=i.offset().top+i.outerHeight(!0))),g=b.offset().top+b.outerHeight(!0),f>g&&b.scrollTop(b.scrollTop()+(f-g)),h=e.offset().top-b.offset().top,0>h&&"none"!=e.css("display")&&b.scrollTop(b.scrollTop()+h)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);break}}},highlight:function(b){var d,e,c=this.findHighlightableChoices();return 0===arguments.length?o(c.filter(".select2-highlighted")[0],c.get()):(b>=c.length&&(b=c.length-1),0>b&&(b=0),this.removeHighlight(),d=a(c[b]),d.addClass("select2-highlighted"),this.ensureHighlightVisible(),e=d.data("select2-data"),e&&this.opts.element.trigger({type:"select2-highlight",val:this.id(e),choice:e}),void 0)},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var c,a=this.results,b=a.find("li.select2-more-results"),e=this.resultsPage+1,f=this,g=this.search.val(),h=this.context;0!==b.length&&(c=b.offset().top-a.offset().top-a.height(),c<=this.opts.loadMorePadding&&(b.addClass("select2-active"),this.opts.query({element:this.opts.element,term:g,page:e,context:h,matcher:this.opts.matcher,callback:this.bind(function(c){f.opened()&&(f.opts.populateResults.call(this,a,c.results,{term:g,page:e,context:h}),f.postprocessResults(c,!1,!1),c.more===!0?(b.detach().appendTo(a).text(f.opts.formatLoadMore(e+1)),window.setTimeout(function(){f.loadMoreIfNeeded()},10)):b.remove(),f.positionDropdown(),f.resultsPage=e,f.context=c.context,this.opts.element.trigger({type:"select2-loaded",items:c}))})})))},tokenize:function(){},updateResults:function(c){function m(){d.removeClass("select2-active"),h.positionDropdown()}function n(a){e.html(a),m()}var g,i,l,d=this.search,e=this.results,f=this.opts,h=this,j=d.val(),k=a.data(this.container,"select2-last-term");if((c===!0||!k||!q(j,k))&&(a.data(this.container,"select2-last-term",j),c===!0||this.showSearchInput!==!1&&this.opened())){l=++this.queryCount;var o=this.getMaximumSelectionSize();if(o>=1&&(g=this.data(),a.isArray(g)&&g.length>=o&&J(f.formatSelectionTooBig,"formatSelectionTooBig")))return n("<li class='select2-selection-limit'>"+f.formatSelectionTooBig(o)+"</li>"),void 0;if(d.val().length<f.minimumInputLength)return J(f.formatInputTooShort,"formatInputTooShort")?n("<li class='select2-no-results'>"+f.formatInputTooShort(d.val(),f.minimumInputLength)+"</li>"):n(""),c&&this.showSearch&&this.showSearch(!0),void 0;if(f.maximumInputLength&&d.val().length>f.maximumInputLength)return J(f.formatInputTooLong,"formatInputTooLong")?n("<li class='select2-no-results'>"+f.formatInputTooLong(d.val(),f.maximumInputLength)+"</li>"):n(""),void 0;f.formatSearching&&0===this.findHighlightableChoices().length&&n("<li class='select2-searching'>"+f.formatSearching()+"</li>"),d.addClass("select2-active"),this.removeHighlight(),i=this.tokenize(),i!=b&&null!=i&&d.val(i),this.resultsPage=1,f.query({element:f.element,term:d.val(),page:this.resultsPage,context:null,matcher:f.matcher,callback:this.bind(function(g){var i;if(l==this.queryCount){if(!this.opened())return this.search.removeClass("select2-active"),void 0;if(this.context=g.context===b?null:g.context,this.opts.createSearchChoice&&""!==d.val()&&(i=this.opts.createSearchChoice.call(h,d.val(),g.results),i!==b&&null!==i&&h.id(i)!==b&&null!==h.id(i)&&0===a(g.results).filter(function(){return q(h.id(this),h.id(i))}).length&&g.results.unshift(i)),0===g.results.length&&J(f.formatNoMatches,"formatNoMatches"))return n("<li class='select2-no-results'>"+f.formatNoMatches(d.val())+"</li>"),void 0;e.empty(),h.opts.populateResults.call(this,e,g.results,{term:d.val(),page:this.resultsPage,context:null}),g.more===!0&&J(f.formatLoadMore,"formatLoadMore")&&(e.append("<li class='select2-more-results'>"+h.opts.escapeMarkup(f.formatLoadMore(this.resultsPage))+"</li>"),window.setTimeout(function(){h.loadMoreIfNeeded()},10)),this.postprocessResults(g,c),m(),this.opts.element.trigger({type:"select2-loaded",items:g})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){y(this.search)},selectHighlighted:function(a){var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var a=this.select.children().first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&a||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.text()&&""===a.val())return a}},initContainerWidth:function(){function c(){var c,d,e,f,g;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(e=d[f].replace(/\s/g,"").match(/[^-]width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),e=N(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow'><b></b></span>","</a>","<input class='select2-focusser select2-offscreen' type='text'/>","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>","   </div>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e)),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(a){this.opened()&&(this.parent.close.apply(this,arguments),a=a||{focus:!0},this.focusser.removeAttr("disabled"),a.focus&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.removeAttr("disabled"),this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.removeAttr("disabled"),this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments)},initContainer:function(){var b,d=this.container,e=this.dropdown;this.opts.minimumResultsForSearch<0?this.showSearch(!1):this.showSearch(!0),this.selection=b=d.find(".select2-choice"),this.focusser=d.find(".select2-focusser"),this.focusser.attr("id","s2id_autogen"+g()),a("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.focusser.attr("id")),this.focusser.attr("tabindex",this.elementTabIndex),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){if(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)return A(a),void 0;switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),void 0;case c.ESC:return this.cancel(a),A(a),void 0}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body().get(0)&&window.setTimeout(this.bind(function(){this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.ESC){if(this.opts.openOnEnter===!1&&a.which===c.ENTER)return A(a),void 0;if(a.which==c.DOWN||a.which==c.UP||a.which==c.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),A(a),void 0}return a.which==c.DELETE||a.which==c.BACKSPACE?(this.opts.allowClear&&this.clear(),A(a),void 0):void 0}})),t(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),B(a),this.close(),this.selection.focus())})),b.on("mousedown",this.bind(function(b){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),A(b)})),e.on("mousedown",this.bind(function(){this.search.focus()})),b.on("focus",this.bind(function(a){A(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.setPlaceholder())})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()?(a=this.getPlaceholderOption())!==b&&a.is(":selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val():!1},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find(":selected");b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var g=q(e,b.id(d));return g&&(f=d),g},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return q(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&(b===!0&&d>=0?this.highlight(d):this.highlight(0)),b===!0){var g=this.opts.minimumResultsForSearch;g>=0&&this.showSearch(L(a.results)>=g)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||this.focusser.focus(),q(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var d,e,c=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),c.empty(),null!==a&&(d=this.opts.formatSelection(a,c,this.opts.escapeMarkup)),d!==b&&c.append(d),e=this.opts.formatSelectionCssClass(a,c),e!==b&&c.addClass(e),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find(":selected").each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return this.clear(c),void 0;if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d),void 0)}}),f=N(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find(":selected").each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=r(c.val(),b.separator),f=[];b.query({matcher:function(c,d,g){var h=a.grep(e,function(a){return q(a,b.id(g))}).length;return h&&f.push(g),h},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var g=e[c],h=0;h<f.length;h++){var i=f[h];if(q(g,b.id(i))){a.push(i),f.splice(h,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments)},initContainer:function(){var d,b=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=d=this.container.find(b);var e=this;this.selection.on("click",".select2-search-choice:not(.select2-locked)",function(){e.search[0].focus(),e.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+g()),a("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.search.attr("id")),this.search.on("input paste",this.bind(function(){this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var b=d.find(".select2-search-choice-focus"),e=b.prev(".select2-search-choice:not(.select2-locked)"),f=b.next(".select2-search-choice:not(.select2-locked)"),g=z(this.search);if(b.length&&(a.which==c.LEFT||a.which==c.RIGHT||a.which==c.BACKSPACE||a.which==c.DELETE||a.which==c.ENTER)){var h=b;return a.which==c.LEFT&&e.length?h=e:a.which==c.RIGHT?h=f.length?f:null:a.which===c.BACKSPACE?(this.unselect(b.first()),this.search.width(10),h=e.length?e:f):a.which==c.DELETE?(this.unselect(b.first()),this.search.width(10),h=f.length?f:null):a.which==c.ENTER&&(h=null),this.selectChoice(h),A(a),h&&h.length||this.open(),void 0}if((a.which===c.BACKSPACE&&1==this.keydowns||a.which==c.LEFT)&&0==g.offset&&!g.length)return this.selectChoice(d.find(".select2-search-choice:not(.select2-locked)").last()),A(a),void 0;if(this.selectChoice(null),this.opened())switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),this.close(),void 0;case c.ESC:return this.cancel(a),A(a),void 0}if(a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.BACKSPACE&&a.which!==c.ESC){if(a.which===c.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)&&A(a),a.which===c.ENTER&&A(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",b,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",b,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),this.updateResults(!0),this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],e=this;a(b).each(function(){o(e.id(this),c)<0&&(c.push(e.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){e.addSelectedChoice(this)}),e.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,b){this.triggerSelect(a)&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()&&this.updateResults(!0),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),b&&b.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var j,k,d=!c.locked,e=a("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),f=a("<li class='select2-search-choice select2-locked'><div></div></li>"),g=d?e:f,h=this.id(c),i=this.getVal();j=this.opts.formatSelection(c,g.find("div"),this.opts.escapeMarkup),j!=b&&g.find("div").replaceWith("<div>"+j+"</div>"),k=this.opts.formatSelectionCssClass(c,g.find("div")),k!=b&&g.addClass(k),d&&g.find(".select2-search-choice-close").on("mousedown",A).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").fadeOut("fast",this.bind(function(){this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),this.close(),this.focusSearch()})).dequeue(),A(b))})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),g.data("select2-data",c),g.insertBefore(this.searchContainer),i.push(h),this.setVal(i)},unselect:function(a){var c,d,b=this.getVal();if(a=a.closest(".select2-search-choice"),0===a.length)throw"Invalid argument: "+a+". Must be .select2-search-choice";if(c=a.data("select2-data")){for(;(d=o(this.id(c),b))>=0;)b.splice(d,1),this.setVal(b),this.select&&this.postprocessResults();a.remove(),this.opts.element.trigger({type:"removed",val:this.id(c),choice:c}),this.triggerChange({removed:c})}},postprocessResults:function(a,b,c){var d=this.getVal(),e=this.results.find(".select2-result"),f=this.results.find(".select2-result-with-children"),g=this;e.each2(function(a,b){var c=g.id(b.data("select2-data"));o(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),f.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&g.highlight(0),!this.opts.createSearchChoice&&!e.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&J(g.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+g.opts.formatNoMatches(g.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-s(this.search)},resizeSearch:function(){var a,b,c,d,e,f=s(this.search);a=C(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),r(a,this.opts.separator))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){o(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)q(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),d&&this.triggerChange({added:this.data(),removed:e}),void 0;if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,this.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var e,f,d=this;return 0===arguments.length?this.selection.find(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(f=this.data(),b||(b=[]),e=a.map(b,function(a){return d.opts.id(a)}),this.setVal(e),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(f,this.data())),void 0)}}),a.fn.select2=function(){var d,g,h,i,j,c=Array.prototype.slice.call(arguments,0),k=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],l=["opened","isFocused","container","dropdown"],m=["val","data"],n={search:"externalSearch"};return this.each(function(){if(0===c.length||"object"==typeof c[0])d=0===c.length?{}:a.extend({},c[0]),d.element=a(this),"select"===d.element.get(0).tagName.toLowerCase()?j=d.element.prop("multiple"):(j=d.multiple||!1,"tags"in d&&(d.multiple=j=!0)),g=j?new f:new e,g.init(d);else{if("string"!=typeof c[0])throw"Invalid arguments to select2 plugin: "+c;if(o(c[0],k)<0)throw"Unknown method: "+c[0];if(i=b,g=a(this).data("select2"),g===b)return;if(h=c[0],"container"===h?i=g.container:"dropdown"===h?i=g.dropdown:(n[h]&&(h=n[h]),i=g[h].apply(g,c.slice(1))),o(c[0],l)>=0||o(c[0],m)&&1==c.length)return!1}}),i===b?this:i},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return E(a.text,c.term,e,d),e.join("")},formatSelection:function(a,c,d){return a?d(a.text):b},sortResults:function(a){return a},formatResultCssClass:function(){return b},formatSelectionCssClass:function(){return b},formatNoMatches:function(){return"No matches found"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results..."},formatSearching:function(){return"Searching..."},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a.id},matcher:function(a,b){return n(""+b).toUpperCase().indexOf(n(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:M,escapeMarkup:F,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b}},a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:G,local:H,tags:I},util:{debounce:v,markMatch:E,escapeMarkup:F,stripDiacritics:n},"class":{"abstract":d,single:e,multi:f}}}}(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.Slider=function(opts){if(!$().cycle){return false;}
this.properties=$.extend({target:'',pager:null,fx:'scrollHorz',delay:-1000,timeout:7000},opts);this.el=$(this.properties.target);this.slides=this.el.find('> div');this.count=this.slides.length;this.rendered=false;if(this.count){this.init();}else{this.el.css('cursor','default');}
this._timer=null;};BAKERS.Slider.prototype={init:function(){this.render();$('img',this.el).bind('mousedown',function(e){e.preventDefault();});},exists:function(){return this.el.size()?true:false;},reset:function(){if(this.rendered){this.el.unbind('mouseenter mouseleave');if(!BAKERS.ua.ie6&&this.el.swiperight&&this.el.swipeleft){this.el.unbind('swiperight swipeleft');}
this.el.cycle('destroy');this.el.removeAttr('style');this.slides.removeAttr('style');this.rendered=false;}
this.render();},render:function(){var self=this;this.el.cycle({fx:this.properties.fx,delay:this.properties.delay,timeout:this.properties.timeout,pager:this.properties.pager});this.register_events();if($('.container').first().width()<724){this._timer=setInterval(function(){var tallest=0;$(self.slides).each(function(){var slide=$(this),img_height=$('.slider-image',slide).height(),txt_height=$('.slider-content',slide).height(),full_height=img_height+txt_height;if(tallest<full_height){tallest=full_height;}});self.el.css({height:tallest});},1000);}else{clearInterval(this._timer);this._timer=null;}
this.rendered=true;},register_events:function(){this.el.bind('mouseenter',function(){$(this).cycle('pause');}).bind('mouseleave',function(){$(this).cycle('resume');});if(!BAKERS.ua.ie6&&this.el.swiperight&&this.el.swipeleft){this.el.swiperight(function(event){event.preventDefault();$(this).cycle('prev');}).swipeleft(function(event){event.preventDefault();$(this).cycle('next');});}}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.SliderGallery=function(opts){if(!$().cycle){return false;}
this.properties=$.extend({target:'',next:'',prev:'',fx:'scrollHorz'},opts);this.el=$(this.properties.target);this.slides=this.el.find('> div');};BAKERS.SliderGallery.prototype={init:function(){if(!this.el.size()){return false;}
this.render();},exists:function(){return this.el.size()?true:false;},reset:function(){if(this.rendered){this.el.cycle('destroy');this.el.removeAttr('style');this.slides.removeAttr('style');this.rendered=false;}
this.render_cycle();},render:function(){this.render_cycle();},render_cycle:function(){this.el.cycle({fx:this.properties.fx,timeout:0,next:this.properties.next,prev:this.properties.prev});}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.SocialMedia=function(opts){this.shareURL='http://'+window.location.host;this.imgDir='http://'+this.shareURL+'/assets/';this.current_window=null;this.properties=$.extend({facebook:{sharerURL:'http://www.facebook.com/sharer.php?m2w&',title:'Facebook Share Title',description:'Facebook share description of what is to be expected when visiting the link.',url:this.shareURL,windowWidth:600,windowHeight:300},twitter:{sharerURL:'https://twitter.com/intent/tweet?',url:this.shareURL,windowWidth:550,windowHeight:257},pinterest:{sharerURL:'http://www.pinterest.com/pin/create/button/?',media:'Image URL to pin.',description:'The description about the image.',url:this.shareURL,windowWidth:600,windowHeight:300},google:{sharerURL:'https://plus.google.com/share?',title:'',description:'',url:this.shareURL,windowWidth:600,windowHeight:300}},opts);};BAKERS.SocialMedia.prototype={init:function(){var self=this;$('.social-media-btn').live('click',function(e){e.preventDefault();window._gaq=window._gaq||[];switch($(this).attr('data-type')){case'facebook':_gaq.push(['_trackEvent','Social','Facebook','Share',,false]);self.do_facebook(this);break;case'twitter':_gaq.push(['_trackEvent','Social','Twitter','Share',,false]);self.do_twitter(this);break;case'pinterest':_gaq.push(['_trackEvent','Social','Pinterest','Share',,false]);self.do_pinterest(this);break;case'google':_gaq.push(['_trackEvent','Social','Google','Share',,false]);self.do_google(this);break;}});},do_facebook:function(el){var parent=$(el).parents('.social-media');var win=this.get_window_dim(this.properties.facebook.windowWidth,this.properties.facebook.windowHeight);var options=this.get_window_options({height:win.height,width:win.width,top:win.top,left:win.left});var title=$(el).attr('data-title')||parent.attr('data-title');var description=$(el).attr('data-description')||parent.attr('data-description');var url=$(el).attr('data-url')||parent.attr('data-url');var image=$(el).attr('data-image')||parent.attr('data-image');var params=['s=100','p[title]='+encodeURIComponent(title),'p[summary]='+encodeURIComponent(description),'p[url]='+this.shareURL+url,'p[images][0]='+this.shareURL+image];this.open_window(this.properties.facebook.sharerURL+params.join('&'),options);},do_twitter:function(el){var parent=$(el).parents('.social-media');var win=this.get_window_dim(this.properties.twitter.windowWidth,this.properties.twitter.windowHeight);var options=this.get_window_options({height:win.height,width:win.width,top:win.top,left:win.left});var title=$(el).attr('data-title')||parent.attr('data-title');var url=$(el).attr('data-url')||parent.attr('data-url');var params=['source=webclient','text='+encodeURIComponent(title)+' '+this.shareURL+url];this.open_window(this.properties.twitter.sharerURL+params.join('&'),options);},do_pinterest:function(el){var parent=$(el).parents('.social-media');var win=this.get_window_dim(this.properties.pinterest.windowWidth,this.properties.pinterest.windowHeight);var options=this.get_window_options({height:win.height,width:win.width,top:win.top,left:win.left});var title=$(el).attr('data-title')||parent.attr('data-title');var description=$(el).attr('data-description')||parent.attr('data-description');var url=$(el).attr('data-url')||parent.attr('data-url');var image=$(el).attr('data-image')||parent.attr('data-image');var params=['url='+this.shareURL+url,'media='+this.shareURL+image,'description='+encodeURIComponent(title)+': '+encodeURIComponent(description)+' '+this.shareURL+url];this.open_window(this.properties.pinterest.sharerURL+params.join('&'),options);},do_google:function(el){var parent=$(el).parents('.social-media');var win=this.get_window_dim(this.properties.google.windowWidth,this.properties.google.windowHeight);var options=this.get_window_options({height:win.height,width:win.width,top:win.top,left:win.left});var url=$(el).attr('data-url')||parent.attr('data-url');var params=['url='+this.shareURL+url];this.open_window(this.properties.google.sharerURL+params.join('&'),options);},open_window:function(url,options){if(this.current_window!==null){this.current_window.close();}
this.current_window=window.open(url,'',options);this.focus_window();},focus_window:function(){if(window.focus){if(this.current_window!==null){this.current_window.focus();}else{window.focus();}
return true;}
return false;},get_window_dim:function(w,h){return{width:w,height:h,left:(screen.width-w)/ 2,top:(screen.height-h)/ 2};},get_window_options:function(opts){var options=$.extend({height:300,width:600,fullscreen:false,scrollbars:false,location:false,menubar:false,resizable:false,status:false,toolbar:false,personalbar:false,top:(screen.height-300)/ 2,left:(screen.width-600)/ 2},opts);var output=[];for(var i in options){output.push(i+'='+options[i]);}
return output.join(',');}};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.UA=function(){var ua=navigator.userAgent.toLowerCase();this.isIpad=ua.match(/(ipad)/);this.isAndroid=ua.match(/(android)/);this.isIphone=ua.match(/(iphone)/);this.isMobile=ua.match(/(mobile)/);this.isTablet=ua.match(/(tablet)/)||this.isIpad;if($.browser.msie){this.ie6=parseInt($.browser.version,10)===6;this.ie7=$.browser.version===7;this.ie10=$.browser.version===10;}};BAKERS.UA.prototype={};})(jQuery);var BAKERS=BAKERS||{};(function($){BAKERS.ua=new BAKERS.UA();BAKERS.messages=new BAKERS.Messages();BAKERS.loader=new BAKERS.Loader();BAKERS.social_media=new BAKERS.SocialMedia();BAKERS.gutter=new BAKERS.Gutter();BAKERS.placeholder=new BAKERS.Placeholder();BAKERS.rating_stars=new BAKERS.RatingStars();BAKERS.lang=new BAKERS.Language();BAKERS.comments=new BAKERS.Comments();BAKERS.mobile=new BAKERS.Mobile();BAKERS.responsive=new BAKERS.Responsive();BAKERS.messages.init();BAKERS.social_media.init();BAKERS.gutter.init();BAKERS.placeholder.init();BAKERS.rating_stars.init();BAKERS.comments.init();BAKERS.mobile.init();BAKERS.responsive.init();if($('.recipe-infinite-scroll').size()){$(window).bind('scroll',function(){var top=$(window).scrollTop();var wHeight=$(window).height();var bHeight=$('body').height();if(top<=200){$('.recipe-infinite-scroll-back-to-top').hide();}else{$('.recipe-infinite-scroll-back-to-top').show();}
if(top>=bHeight-wHeight-300){scroll_load_recipes();}});var recipe_scrolling=false;var scroll_load_recipes=function(){if(recipe_scrolling===true)
return;else
recipe_scrolling=true;var recipe_grid_container=$('.recipe-grid-container');var next_page=parseFloat(recipe_grid_container.attr('data-page'))+1;recipe_grid_container.attr('data-page',next_page);$('.recipe-infinite-scroll').addClass('loading');$.ajax({type:'get',url:recipe_grid_container.attr('data-url')+'page/'+next_page+'/',data:{'scroll':1}}).done(function(data){$('.recipe-infinite-scroll').removeClass('loading');var html=data;if(html){$('.recipe-grid-container').append(html);recipe_scrolling=false;}else{$('.recipe-infinite-scroll-note-container').hide();}});}}
var BAKERS_FLASH_MESSAGE=window.BAKERS_FLASH_MESSAGE||'';if(typeof BAKERS_FLASH_MESSAGE!=='undefined'&&BAKERS_FLASH_MESSAGE!==''){BAKERS.messages.show(BAKERS_FLASH_MESSAGE);}
if(window.location.hash==='#commented'){BAKERS.messages.show(BAKERS.lang.MESSAGES_COMMENT_SUCCESS);}
if($('body').hasClass('home-page')){BAKERS.loader.load('/ajax/slider','#slider-container',function(){BAKERS.home_slider=new BAKERS.Slider({target:'#slider',pager:'#slider-nav'});BAKERS.responsive.change(function(){BAKERS.home_slider.reset();});});BAKERS.loader.load('/ajax/home','#home-widget-container');BAKERS.home_seo=new BAKERS.Expandable({target:'.seo-footer-content',handle:'#home-find-out-more'});BAKERS.home_seo.init();}
if($('form[action$="/baked-it/"]').size()){BAKERS.baked_it_form=new BAKERS.BakedItForm();BAKERS.baked_it_form.init();}
$('#quick-search, #homepage-search').click(function(e){e.preventDefault();BAKERS.search.show();});BAKERS.baked_it_gallery=new BAKERS.SliderGallery({target:'.slider-gallery-inner',next:'.slider-gallery-pagination-next',prev:'.slider-gallery-pagination-prev'});if(BAKERS.baked_it_gallery.exists()){BAKERS.baked_it_gallery.init();BAKERS.responsive.change(function(){BAKERS.baked_it_gallery.reset();});}
if($('.banner').size()){BAKERS.banner=new BAKERS.Banner();BAKERS.banner.init({collapse:'.banner-collapse-section',open_handle:'.expand-text-link',close_handle:'.collapse-text-link'});}
BAKERS.rotating_banner=new BAKERS.Slider({target:'.rotating-banner',fx:'fade',delay:0,timeout:5000});if(BAKERS.rotating_banner.exists()){BAKERS.responsive.change(function(){BAKERS.rotating_banner.reset();});}
var baked_it_id=0;if(window.location.hash.match(/^\#?baked\-it\-[0-9]+$/))
{baked_it_id=window.location.hash.match(/[0-9]+$/);}
$('[data-toggle="baked-it"]').each(function(){var self=$(this),my_id=self.attr('data-baked-it-id'),img_title=$('img',self).attr('title'),description=self.attr('data-description'),username=self.attr('data-username'),user_avatar=self.attr('data-useravatar'),user_title=self.attr('data-usertitle'),url=self.attr('data-url'),group=self.attr('data-colorbox-group'),html='<div id="cboxTitleInside" class="clearfix">'+'<h2 class="baked-it-item-title">'+$('img',self).attr('title')+'</h2>'+'<a class="baked-it-item-user" href="/members/'+username+'/" title="View '+username+'\'s Profile">'+'<img src="'+user_avatar+'" alt="'+username+'" class="avatar" title="'+username+'" />'+
username+'</a>'+'<div class="username-title">'+user_title+'</div>'+'<div class="cbox-description">'+description+'</div>'+'</div>';var social={title:img_title,description:description.replace(/<[^>]+>/,''),image:self.attr('href'),url:url+'%23baked-it-'+my_id};var social_html='<div class="social-media"'+' data-title="'+social.title+'"'+' data-description="'+social.description+'"'+' data-image="'+social.image+'" '+' data-url="'+social.url+'">'+' <a data-type="facebook" class="social-media-btn social-media-facebook" href="#">F</a>'+' <a data-type="twitter" class="social-media-btn social-media-twitter" href="#">T</a>'+' <a data-type="pinterest" class="social-media-btn social-media-pinterest" href="#">P</a>'+' <a data-type="google" class="social-media-btn social-media-google" href="#">G</a>'+' </div>';$(this).colorbox({rel:group,title:function(){return html+social_html;},scalePhotos:true,opacity:0.8,current:'',close:'&times;',top:'8%',maxWidth:'90%',maxHeight:'60%',onLoad:function(){$('#cboxTitle').hide();},onComplete:function(){$('#cboxTitle').hide().fadeIn(1000);},transition:'fade',speed:500,open:baked_it_id===my_id});});$(window).bind("load resize",function(){if($(window).width()<767){$('.recipe-header-container').insertBefore('.recipe-user-uploaded-meta-container');}else{$('.recipe-user-uploaded-meta-container').insertBefore('.recipe-header-container');}});var $related_articles=$('.ajax-related-articles');if($related_articles.size()){BAKERS.loader.get('related_articles',{id:$related_articles.attr('data-id')},function(r){$related_articles.hide().html(r).fadeIn(500);});}
$('.search-nav-search textarea').attr('autocomplete','off');$('#ajax-search-suggest').attr('unselectable','on');if(!BAKERS.ua.isTablet&&!BAKERS.ua.isMobile){$('.recipe-showcase img,.user-avatar img').tooltip({});}
$('[data-toggle="promptlogin"]').live('click',function(){BAKERS.messages.show(BAKERS.lang.MESSAGES_REGISTER_LOGIN);return false;});var $popup_promo_close=$('.popup-promo-close a');if($popup_promo_close.size()){$popup_promo_close.bind('click',function(e){e.preventDefault();$('.popup-promo-cover,.popup-promo-wrapper').remove();});}
var $ajax_recipes=$('.ajax-recipes');if($ajax_recipes.size()){$ajax_recipes.each(function(){var self=$(this),method=self.attr('data-method'),count=self.attr('data-count'),id=self.attr('data-id');BAKERS.loader.get('recipes',{method:method,count:count,id:id},function(r){if(!r){return;}
self.html(r);});});}
var descriptionLabelObj=$('.profile-edit-description-help'),descriptionLabelText=descriptionLabelObj.text(),onEditCallback=function(remaining){descriptionLabelObj.html(descriptionLabelText+' <span>('+remaining+')</span>');if(remaining>0){$(this).css('background-color','white');}},onLimitCallback=function(){$(this).css('background-color','#ffaaaa');};$('#profile-edit-form textarea').limitMaxlength({onEdit:onEditCallback,onLimit:onLimitCallback,limit:256});if(BAKERS.ua.ie10){$('.modal').removeClass('fade');}
if(BAKERS.ua.ie7||BAKERS.ua.ie6){var ICONS={'plus':'A','bowl':'B','eye':'I','search':'S','thumb':'L','arrow-left':'<','arrow-right':'>','arrow-up':'=','arrow-down':'V','list':'?','arrow-back':'{','recipe-add':'2'};for(var icon in ICONS){$('.icon-'+icon).prepend('<span class="icon-before icon-'+icon+'-before">'+ICONS[icon]+'</span>');}
if(BAKERS.ua.ie6){Cufon.replace('.icon-before',{fontFamily:'icons'});Cufon.replace('.search-icon',{fontFamily:'icons'});Cufon.replace('.icon-button-icon',{fontFamily:'icons'});}
$('#btn-join-community span').after('<span id="btn-join-community-after" class="after">B</span>');$('.breadcrumbs li:not(:first-child)').prepend('<span>&nbsp;&gt;&nbsp;</span>');$('.slider-subtitle').before('<div class="slider-subtitle-before"></div>').after('<div class="slider-subtitle-after"></div>');if(BAKERS.ua.ie6){Cufon.replace('#btn-join-community-after',{fontFamily:'icons'});}else{$('#menu-primary-navigation > .menu-item:first-child > a span').append('<span class="after">O</span>');}}})(jQuery);var _gaq=_gaq||[];setTimeout("_gaq.push(['_trackEvent', 'Time on page', '3-minute'])",180000);var BAKERS=BAKERS||{};(function(){var competition_slider=new BAKERS.Slider({target:'#slider',pager:'#slider-nav'});competition_slider.reset();BAKERS.responsive.change(function(){competition_slider.reset();});if($('body').hasClass('single-kd_contest_page')){var competition_content=new BAKERS.Expandable({handle:'.expand-text-link',target:'.banner-collapse-section',openText:'more',closedText:'less'});competition_content.init();}
if(BAKERS.InstantPreview){var instant_preview=new BAKERS.InstantPreview({source:'.instant-preview input',target:'.summer-comp-recipe-image'});instant_preview.init();}
var KD_CONTEST_ALWAYS_WAITING_QUEUE=[];function register_vote_events(scope){if(typeof scope==='undefined'){scope=$('body');}
$('[data-toggle="recipe-vote"]',scope).on('click',function(e){e.preventDefault();if($.inArray(this,KD_CONTEST_ALWAYS_WAITING_QUEUE)===-1){KD_CONTEST_ALWAYS_WAITING_QUEUE.push(this);}else{BAKERS.messages.show('You have already voted for this recipe');return false;}
var $self=$(this),href=$self.attr('href');$.ajax({url:href}).done(function(data){if(data==='true'){var $count=$('.recipe-vote-count',$self.parent());$count.text(parseInt($count.text(),10)+1);if($self.parents('.recipe-vote')[0]){$self.remove();}
build_vote_popup({username:$self.attr('data-username'),title:$self.attr('data-title'),description:$self.attr('data-description'),twitter_description:$self.attr('data-twitter-description'),image:$self.attr('data-image'),url:$self.attr('data-url')});}else if(data==='false'){BAKERS.messages.show('You have already voted for this recipe');}});return false;});}
register_vote_events();var lazy_load=$('.recipe-lazy-load'),lazy_load_page=1,lazy_load_order='desc',lazy_load_order_by_votes=0,lazy_loading=false;if(lazy_load.get(0)){$(window).bind('scroll',function(){var $self=$(this),top=$self.scrollTop(),wHeight=$self.height(),height=$('body').height();if(top>=height-wHeight-600){load_iscroll_items();}});var load_iscroll_items=function(){if(!lazy_loading){lazy_loading=true;lazy_load_page++;$('.recipe-lazy-loader').addClass('loading');$.ajax({type:'get',url:lazy_load.attr('data-url'),data:{iscroll:1,page_num:lazy_load_page,form_id:lazy_load.attr('data-id'),order:lazy_load_order,order_by_votes:lazy_load_order_by_votes},dataType:'json'}).done(function(data){$('.recipe-lazy-loader').removeClass('loading');lazy_loading=false;if(data.found_entries){var html=$(data.entries_html);html.hide();$('.recipe-grid',lazy_load).append(html);register_vote_events(html);html.fadeIn(500);}else{$('.recipe-lazy-loader',lazy_load).hide();$('.recipe-lazy-loader',lazy_load).next('.section').hide();}});}};$('.section-tools-last-entries').bind('click',function(e){e.preventDefault();$('.active',$(this).parent()).removeClass('active');$(this).addClass('active');lazy_load_page=0;lazy_load_order='desc';lazy_load_order_by_votes=0;$('.recipe-grid',lazy_load).empty();$('.recipe-lazy-loader',lazy_load).show();$('.recipe-lazy-loader',lazy_load).next('.section').show();load_iscroll_items();});$('.section-tools-most-popular').bind('click',function(e){e.preventDefault();$('.active',$(this).parent()).removeClass('active');$(this).addClass('active');lazy_load_page=0;lazy_load_order='desc';lazy_load_order_by_votes=1;$('.recipe-grid',lazy_load).empty();$('.recipe-lazy-loader',lazy_load).show();$('.recipe-lazy-loader',lazy_load).next('.section').show();load_iscroll_items();});}
function build_vote_popup(opts){var popup=$(['<div class="popup-promo-cover"></div>','<div class="popup-promo-wrapper summer-promo">','<div class="popup-promo">','<div class="popup-promo-inner">','<div class="popup-promo-content">','<div class="popup-promo-title">Thank you for voting!</div>','<div class="popup-promo-subtitle">','Help <span class="data-username">'+opts.username+'</span> win by sharing this entry with your friends','</div>','<div class="popup-promo-description">','<div class="social-media social-media-large"','data-title="'+opts.title+'" ','data-description="'+opts.description+'"','data-image="'+opts.image+'"','data-url="'+opts.url+'">','<a data-description="'+$('#voted-facebook-text').html()+'" data-type="facebook" class="social-media-btn social-media-facebook" href="#">F</a>','<a data-title="'+$('#voted-twitter-text').html()+'" data-type="twitter" class="social-media-btn social-media-twitter" href="#">T</a>','<a data-description="'+$('#voted-pinterest-text').html()+'" data-type="pinterest" class="social-media-btn social-media-pinterest" href="#">P</a>','<a data-type="google" class="social-media-btn social-media-google" href="#">G</a>','</div>','</div>','</div>','<div class="popup-promo-close"><a class="text-btn" href="#"><strong>&times;</strong> Close</a></div>','</div>','</div>','</div>'].join(''));$('body').append(popup);$('.popup-promo-close',popup).click(function(e){e.preventDefault();popup.remove();});popup.fadeIn(500);}})(jQuery);jQuery(document).ready(function($)
{$('select.sort').change(function(event)
{$(this).closest('form').submit();});$('form.recipe-search').submit(function(event)
{if($('.recipe-search-input').val()=='Search for recipes...')
{$('.recipe-search-input').val('');}});});if(jQuery.browser.msie&&parseInt(jQuery.browser.version,10)===6)
{jQuery(function($)
{$('.row-fluid > [class*="span"]').addClass('fluid-span');});}
$(document).ready(function()
{$('#search-form form').submit(function(event)
{event.preventDefault();});$('#search-form input').keydown(function(event)
{if(event.keyCode==38||event.keyCode==40||event.keyCode==9||(event.keyCode==9&&event.shiftKey))
{event.preventDefault();}});$('#search-form input').keyup(function(event)
{if(event.keyCode==13)
{if($("#search-form .autosuggest a.option-selected").length)
{window.location.href=$("#search-form .autosuggest .option-selected").attr("href");}
else
{$('#search-form .search-text').trigger('click');}}
else if(event.keyCode==38||event.keyCode==40||event.keyCode==9||(event.keyCode==9&&event.shiftKey))
{if(event.keyCode==40||(event.keyCode==9&&!event.shiftKey))
{if($("#search-form .autosuggest a.option-selected").length)
{var option=$("#search-form .autosuggest a.option-selected").removeClass("option-selected");var option_next=null;if(option.is("#search-form .autosuggest > a:last"))
{option_next=$("#search-form .autosuggest a:last");}
else if(option.is("#search-form .autosuggest a:last"))
{option_next=$("#search-form .autosuggest a:first");}
else
{option_next=option.next();while(!option_next.is("a")){option_next=option_next.next();}}
option_next.addClass("option-selected");}
else
{$("#search-form .autosuggest  a:first").addClass("option-selected");}}
else if(event.keyCode==38||(event.keyCode==9&&event.shiftKey))
{if($("#search-form .autosuggest a.option-selected").length)
{var option=$("#search-form .autosuggest a.option-selected").removeClass("option-selected");var option_next=null;if(option.is("#search-form .autosuggest > a:first"))
{option_next=$("#search-form .autosuggest a:last");}
else if(option.is("#search-form .autosuggest a:last"))
{option_next=$("#search-form .autosuggest > a:last");}
else
{option_next=option.prev();while(!option_next.is("a")){option_next=option_next.prev();}}
option_next.addClass("option-selected");}
else
{$("#search-form .autosuggest  a:last").addClass("option-selected");}}}
else
{var value=$('#search-form input').val();if(value.length>3)
{$('#search-form input').css('background-image','url("/wp-content/themes/bakers/assets/img/ajax-loader-search.gif")');this._xhr=$.getJSON('https://api.swiftype.com/api/v1/public/engines/search.json?callback=?',{'q':value,'per_page':5,'engine_key':'PaSkzHsFJYamWeVbK971'},function(response,status,xhr)
{if(this._xhr!==xhr)return;$('#search-form input').css('background-image','url("/wp-content/themes/bakers/assets/img/search-icon.png")');var record_count=response.records.premium.length+
response.records.community.length+
response.records.products.length+
response.records.learn.length;if(record_count==0)return;var total_allowed_suggestions=7;if(record_count>total_allowed_suggestions)
{var allowed_suggestions=total_allowed_suggestions;}
else
{var allowed_suggestions=record_count;}
var total=0;var suggestions={};while(allowed_suggestions>total)
{$.each(response.records,function(type,records)
{if(records.length>0&&allowed_suggestions>total)
{if(typeof suggestions[type]=='undefined')
{suggestions[type]=[];}
var suggestion=records.shift();if(typeof suggestion.highlight.post_title=='undefined')
{var title=suggestion.post_title;}
else
{var title=suggestion.highlight.post_title;}
suggestions[type][suggestions[type].length]={'title':title,'link':suggestion.permalink,'thumb':suggestion.thumb};total++;}});}
var html='';if(typeof suggestions.premium!='undefined')
{html=html+'<h3>Recipes</h3>';$.each(suggestions.premium,function(index,suggestion)
{html=html+'<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';});}
if(typeof suggestions.community!='undefined')
{html=html+'<h3>Community Recipes</h3>';$.each(suggestions.community,function(index,suggestion)
{html=html+'<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';});}
if(typeof suggestions.products!='undefined')
{html=html+'<h3>Products</h3>';$.each(suggestions.products,function(index,suggestion)
{html=html+'<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';});}
if(typeof suggestions.learn!='undefined')
{html=html+'<h3>Learn to Bake</h3>';$.each(suggestions.learn,function(index,suggestion)
{html=html+'<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';});}
html=html+'<div class="autosuggest-bottom"><a href="/?s='+$('#search-form input').val()+'" class="bakers-btn-primary">View All Search Results</a></div>';$('#search-form .autosuggest').html(html);$('#search-form .autosuggest').show();}.bind(this));}
else
{if(value=='')
{$('#search-form .autosuggest').hide();}}}});$('#search-form input').blur(function(event)
{setTimeout(function(){$('#search-form .autosuggest').hide();},500);});$('#search-form input').focus(function(event)
{$("html,body").animate({scrollTop:$("#search-outer").offset().top},500);if($('#search-form .autosuggest').html()!='')
{$('#search-form .autosuggest').show();}});$('#search-form .search_btn').click(function()
{var value=$('#search-form input').val();if(value!=''&&value!='Search baking recipes, products and tips')
{window.location='/?s='+$('#search-form input').val();}
else
{$('#search-form input').focus();}});$('#search-form .autosuggest a').live('mouseenter',function()
{$("#search-form .autosuggest a.option-selected").removeClass("option-selected");$(this).addClass("option-selected");});$('.search-result-tab-title a').click(function()
{$('.search-result-tab-title a').removeClass('active');$(this).addClass('active');$('.search-result-tab-content .tab-content-main').hide();$('.tab-content[data-tab-no="'+$(this).attr('data-tab-no')+'"] .tab-content-main').show();});$('a.tab-content-title').click(function()
{$('.tab-content-main').hide();var el=$('.tab-content[data-tab-no="'+$(this).parent().attr('data-tab-no')+'"] .tab-content-main');var orig_height=el.css("height");el.css("height","0px");el.show();el.animate({height:orig_height},1000,'linear',function()
{$(this).css("height","");});$('html, body').animate({scrollTop:el.offset().top-73},500);return false;});$('#search-result-tab .pagination').each(function(i,e)
{var xhr;var type=$(e).attr('data-type');$(e).pagination
({displayedPages:3,pages:$(e).attr('data-no-pages'),hrefTextSuffix:'-'+type,onPageClick:function(page)
{if(xhr&&xhr.readyState!=4)xhr.abort();$('.'+type+' .tab-content-list').html
('<p class="loading-text">'+'<img src="/wp-content/themes/bakers/assets/img/ajax-loader-search.gif"> '+'<span>Loading results, please wait...</span>'+'</p>');var params={'action':'search_pagination','q':$('#search-result-tab').attr('data-query'),'page':page,'type':type};xhr=$.post(ajaxurl,params,function(r)
{$('.'+type+' .tab-content-list').html(r);});}});});});





var BAKERS = BAKERS || {};




(function($){
BAKERS.BakedItForm = function() {

	this.stars = [];
	this.stars_el = $('.gform_wrapper .rating-stars');

	if (BAKERS.InstantPreview) {
		var instant_preview = new BAKERS.InstantPreview({
			source: '.ajax-file-upload input',
			target: '.image-upload-preview'
		});

		// Gravity forms 'remove' button used after validation.
		$('.ginput_preview a').bind('click', function() {
			instant_preview.target.html('Preview').removeAttr('style');
		});

	}
};

BAKERS.BakedItForm.prototype = {
	/**
	 * Initialise Class.
	 */
	init: function() {
		this.render_stars();
	},
	/**
	 * Change gravity form radio options to stars.
	 */
	render_stars: function() {
		if ( ! this.stars_el.get(0)) {
			return;
		}

		var self = this;

		$('.gfield_radio li', this.stars_el).each(function() {
			var li = $(this);

			// Hide the radio
			li.hide();

			self.stars.push({
				input: $('input', li),
				el: $('<div class="star-control">8</div>')
			});

			var i = self.stars.length - 1;
			li.after(self.stars[i].el);


			// Check the radio when star is clicked.
			self.stars[i].el.bind('click', function() {
				self.set_rating(i + 1);
			});

			// Fill the star that is selected.
			if (self.stars[i].input.is(':checked')) {
				self.set_rating(self.stars[i].input.val());
			}
		});
	},
	/**
	 * Changes the star value.
	 */
	set_rating: function(val) {
		var input = this.stars[val - 1].input,
			star = this.stars[val - 1].el;

		input.attr('checked', 'checked');

		// Reset stars.
		for(var i in this.stars) {
			this.stars[i].el.text(8);
		}

		star.text(7);
		star.prevAll('.star-control').text(7);
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Banner = function(opts) {

	this.properties = $.extend({
		collapse: '.banner-collapse-section',
		open_handle: '.banner-copy-content .expand-text-link',
		close_handle: '.banner-copy-content .collapse-text-link'
	}, opts);

	this.$collapse = $(this.properties.collapse);
	this.$open_handle = $(this.properties.open_handle);
	this.$close_handle = $(this.properties.close_handle);

	this.collapse_height = this.$collapse.height();
};

BAKERS.Banner.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {

		var self = this;

		this.$collapse.animate({
			height: 0,
			opacity: 0
		}, 1000);

		this.$open_handle.bind('click', function(e) {
			e.preventDefault();
			self.expand();
		});

		this.$close_handle.bind('click', function(e) {
			e.preventDefault();
			self.collapse();
		});

	},
	/**
	 * Expand the content area.
	 */
	expand: function() {

		this.$open_handle.css('visibility', 'hidden');
		this.$close_handle.css('visibility', 'visible');

		this.$collapse.animate({
			height: this.collapse_height,
			opacity: 1
		}, 1000);

	},
	/**
	 * Collapse the content area.
	 */
	collapse: function() {

		this.$open_handle.css('visibility', 'visible');
		this.$close_handle.css('visibility', 'hidden');

		this.$collapse.animate({
			height: 0,
			opacity: 0
		}, 1000);
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Comments = function(opts) {

	this.properties = $.extend({

	}, opts);

	this.form = $('#comment-reply-form-template');

	this.active_form = null;
};

BAKERS.Comments.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {

		var self = this;

		$('.comment-controls-reply').live('click', function(e) {
			e.preventDefault();

			var comment_id = $(this).attr('href').substring(1);

			self.render_form($(this).parent(), comment_id);

			self.focus();
		});
	},
	/**
	 * Renders the reply form and attaches it to the target element.
	 *
	 * @param {object} target
	 * @param {integer} comment_id
	 */
	render_form: function(target, comment_id) {

		this.active_form = this.form.clone();

		$('.comment-reply-form-clone').remove();

		this.active_form.removeAttr('id').addClass('comment-reply-form-clone');

		$('.comment-reply-user-id', this.active_form).val(comment_id);

		target.after(this.active_form);

		this.active_form.fadeIn(500);
	},
	/**
	 * Focuses the text entry.
	 */
	focus: function() {
		$('textarea', this.active_form).focus();
	},
	/**
	 * Post a comment via AJAX.
	 *
	 * @param {object} comment
	 */
	create: function() {},
	/**
	 * Gets a specified comment via AJAX.
	 *
	 * @param {integer} id
	 */
	get: function() {}

};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.CookbookSelect = function() {

	this.$modal				= $('.modal');
	this.$modal_title		= $('.modal-header h3', this.$modal);
	this.$modal_body		= $('.modal-body', this.$modal);
	this.$modal_footer		= $('.modal-footer', this.$modal);
	this.$add_cookbook_btn	= null;

	// Store the ID of the recipe we're saving.
	this.recipe_id = 0;

	// 'Loading' is the modals initial state.
	this.setLoading();

	this.init();

	// Store the container where all cookbooks will be listed.
	this.$content = $('.row', this.$modal_body);
};

BAKERS.CookbookSelect.prototype = {
	/**
	 * Used for cleanup.
	 */
	remove: function() {

	},
	/**
	 * Initiate class.
	 */
	init: function() {

		var self = this;

		this.$modal_title.text('Save recipe to cookbook...');
		this.$modal_body.empty().html(
			'<div class="cookbooks-select"><div class="row"></div></div>'
		);
		this.$modal.on('hidden', function() {
			self.hide();
		});
	},
	/**
	 * Render a single cookbook item.
	 */
	render_item: function(cookbook) {
		return $('<a data-id="' + cookbook.id + '" href="' + cookbook.url + '" class="cookbook">' +
				'<span class="cookbook-title">' +
					'<span class="vertical-center-outer">' +
						'<span class="vertical-center-middle">' +
							'<span class="vertical-center-inner">' +
							cookbook.name +
							'</span>' +
						'</span>' +
					'</span>' +
				'</span>' +
			'</a>');
	},
	/**
	 * Renders the 'add a cookbook' button.
	 */
	render_add_cookbook_button: function() {

		var self = this;

		this.$add_cookbook_btn = $(
			'<a href="/cookbooks/add" class="cookbook add-cookbook"></a>'
		);

		this.$content.append(this.$add_cookbook_btn);

		this.$add_cookbook_btn.bind('click', function(e) {
			self.add_cookbook(e);
		});
	},
	/**
	 * Add a cookbook to the list.
	 */
	add_item: function(cookbook) {
		var book = this.render_item(cookbook);

		this.$content.append(book);

		this.do_bindings(book);
	},
	/**
	 * Insert a cookbook before the "add cookbook" button.
	 */
	insert_item: function(cookbook) {
		var book = this.render_item(cookbook);

		this.$add_cookbook_btn.before(book);

		this.do_bindings(book);
	},
	/**
	 * Prepare the item's event bindings.
	 */
	do_bindings: function(item) {

		var self = this;

		item.bind('click', function(e) {
			e.preventDefault();
			var btn = $(this);

			if (self.recipe_id !== 0) {
				btn.addClass('loading');

				self.add_item_to_cookbook(
					self.recipe_id,
					btn.attr('data-id'),
					function(r) {
						btn.removeClass('loading');
						if (r) {
							BAKERS.messages.show('Recipe successfully added to cookbook. <a href="' + btn.attr('href') + '">Go to your cookbook...</a>');
						}
					});
			} else {
				BAKERS.messages.show('Please select a recipe.');
			}
		});
	},
	/**
	 * Adds the recipe to a cookbook on the server.
	 */
	add_item_to_cookbook: function(item_id, cookbook_id, cb) {

		var self = this;

		$.ajax({
			type: 'get',
			dataType: 'json',
			url: ajaxurl,
			data: {
				action: 'save_recipe_to_cookbook',
				item_id: item_id,
				cookbook_id: cookbook_id
			},
			success: function(r) {
				if (r === 0 || r === '0' || r === null) {
					BAKERS.messages.show('There was an error adding this recipe to a cookbook.  Please try again.');
					if (typeof cb == 'function') {
						cb(false);
					}
					return;
				}

				if (typeof r.error != 'undefined') {
					BAKERS.messages.show(r.error);
					if (typeof cb == 'function') {
						cb(false);
					}
					return;
				}

				if (typeof cb == 'function') {
					cb(true);
				}

				self.hide();

			},
			error: function(r) {
				BAKERS.messages.show(r);

				if (typeof cb == 'function') {
					cb(false);
				}
			}
		});
	},
	/**
	 * Adds a new cookbook to the user's cookbooks.
	 */
	add_cookbook: function(e) {
		// Add Recipe Book Button
		var self = this,
			val = prompt('Enter the name of your new cookbook:');

		e.preventDefault();

		if (val) {
			$.ajax({
				type : 'post',
				dataType : 'json',
				url : ajaxurl,
				data : {
					action : 'create_cookbook',
					value : val
				},
				success : function(r) {

					if (r === 0 || r === '0' || r === null) {
						BAKERS.messages.show('Something went wrong when creating a new cookbook.  Please try again.');
						return;
					}

					if (typeof r.error != 'undefined') {
						BAKERS.messages.show(r.error);
						return;
					}

					if (typeof r.name != 'undefined') {
						self.insert_item(r);
					}
				},
				error: function(e) {
					BAKERS.messages.show(e);
					return;
				}
			});
		}

	},
	/**
	 * Get list of user's cookbooks from the server.
	 */
	get_cookbooks: function() {
		var self = this;

		$.ajax({
			type: 'get',
			dataType: 'json',
			url: ajaxurl,
			data: {
				action: 'get_cookbooks'
			},
			success: function(r) {

				self.unsetLoading();

				if (r === 0 || r === '0' || r === null) {
					BAKERS.messages.show('There was an error retrieving your cookbooks, please try again.');
					return;
				}

				if (typeof r.error != 'undefined') {
					BAKERS.messages.show(r.error);
					return;
				}

				if (r.length) {
					for(var i = 0, c = r.length; i < c; i++) {
						self.add_item(r[i]);
					}
				}

				// Ensures the add cookbook button is rendered last.
				self.render_add_cookbook_button();

			},
			error: function(e) {

				self.unsetLoading();

				BAKERS.messages.show(e);

			}
		});
	},
	/**
	 * Show the modal.
	 * @param {integer} recipe_id
	 */
	show: function(recipe_id) {
		this.$modal.modal('show');
		this.recipe_id = recipe_id;
		this.get_cookbooks();
	},
	/**
	 * Hide the modal.
	 */
	hide: function() {
		this.$modal.modal('hide');
		this.$content.empty();
	},
	/**
	 * Basic loading setter and unsetter.
	 */
	setLoading: function() {
		this.$modal.addClass('loading');
	},
	unsetLoading: function() {
		this.$modal.removeClass('loading');
	}
};


var CookbookSelect = new BAKERS.CookbookSelect();
$('[data-action="save_to_cookbook"]').live('click', function(e) {
	e.preventDefault();
	// Pass the ID of the recipe to the cookbook select.
	CookbookSelect.show($(this).attr('data-id'));
});



/*--------------
 * Cookbook Page
 *-------------*/
$('.cookbook-rename').bind('click', function(e) {

	e.preventDefault();

	var val = prompt('What do you want to name this cookbook?');
	if (val) {

		var id = $(this).attr('data-id');

		BAKERS.loader.post('rename_cookbook', {
			cookbook_id: id,
			value: val
		}, function(r) {
			if ( ! r) {
				BAKERS.messages.show('Failed to rename cookbook. Please try again.');
				return;
			}

			window.location = r.url;

		});
	}
});
$('.remove-from-cookbook').bind('click', function(e) {

	e.preventDefault();

	if ( ! confirm('Are you sure you want to remove this recipe?')) {
		return false;
	}
	var self = $(this),
		recipe = self.parents('.recipe'),
		cookbook_id = self.parents('[data-cookbook]').attr('data-cookbook'),
		recipe_id = self.attr('data-id');

	BAKERS.loader.post('remove_from_cookbook', {
		cookbook_id: cookbook_id,
		recipe_id: recipe_id
	}, function(r) {
		if ( ! r) {
			BAKERS.messages.show('There was an error removing this recipe. Please try again.');
			return false;
		}

		BAKERS.messages.show('Recipe successfully removed from cookbook.');
		recipe.fadeOut(500, function() {
			$(this).remove();
		});
	});
});
$('.add-recipe-book').bind('click', function() {
	var self = $(this),
		val = prompt('Enter the name of your new cookbook:');

	if (val) {

		BAKERS.loader.post('create_cookbook', {
			value: val
		}, function(r) {

			if (r.error !== undefined) {
				BAKERS.messages.show(r.error);
				return;
			}

			if (r.name === undefined) {
				return;
			}

			self.parents('.span3').before(
				$('<div class="span3">' +
					'<a class="cookbook" href="' + r.url + '">' +
						'<span class="cookbook-image1"></span>' +
						'<span class="cookbook-image2"></span>' +
						'<span class="cookbook-image3"></span>' +
						'<span class="cookbook-title">' + r.name + '</span>' +
						'<span class="cookbook-recipe-count"></span>' +
					'</a>' +
				'</div>'));
		});
	}
	return false;
});
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Expandable = function(opts) {

	this.properties = $.extend({
		handle: '',
		target: '',
		openText: '',
		closedText: '',
		arrow: true
	}, opts);

	// Nothing passed!
	if (this.properties.handle === '' || this.properties.target === '') {
		return false;
	}

	this.$handle = $(this.properties.handle);
	this.$target = $(this.properties.target);

	this.height = this.$target.height();
};

BAKERS.Expandable.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {

		if (this.properties.arrow) {
			this.appendArrow();
		}

		this.$target.css({
			height: 0,
			opacity: 0
		}).hide();

		this.register_events();

	},
	/**
	 * Append arrow icon to the end of the handle text.
	 */
	appendArrow: function() {
		this.$handle.append('<span class="icon icon-arrow-down"></span>');
	},
	/**
	 * Register required events.
	 */
	register_events: function() {

		var self = this;

		this.$handle.bind('click', function(e) {
			e.preventDefault();

			if (self.$target.height()) {
				self.collapse();
			} else {
				self.expand();
			}
		});
	},
	/**
	 * Change the text.
	 */
	setText: function(text) {
		this.$handle.text(text);
		if (this.properties.arrow) {
			this.appendArrow();
		}
	},
	/**
	 * Expand the container.
	 */
	expand: function() {

		if (this.properties.closedText !== '') {
			this.setText(this.properties.closedText);
		}

		$('.icon-arrow-down', this.$handle)
			.removeClass('icon-arrow-down')
			.addClass('icon-arrow-up');

		this.$target.stop().show()
			.animate({
				height: this.height,
				opacity: 1
			}, 500);
	},
	/**
	 * Collapse the container.
	 */
	collapse: function() {

		var self = this;

		if (this.properties.openText !== '') {
			this.setText(this.properties.openText);
		}

		$('.icon-arrow-up', this.$handle)
			.removeClass('icon-arrow-up')
			.addClass('icon-arrow-down');

		this.$target.stop().animate({
			height: 0,
			opacity: 0
		}, 500, function() {
			self.$target.hide();
		});
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Gutter = function(opts) {

	this.properties = $.extend({
		el: '#bc-gutter',
		speed: 500,
		handle: $('[data-toggle="gutter"]'),
		close: $('#bc-gutter-collapse a')
	}, opts);

	this.el = $(this.properties.el);

	this.ua = BAKERS.ua || null;
};

BAKERS.Gutter.prototype = {
	/**
	 * Initialise the class.
	 */
	init: function() {
		var self = this;

		this.properties.handle.bind('click', function(e) {
			e.preventDefault();
			self.toggle($(this));
		});

		this.properties.close.bind('click', function(e) {
			e.preventDefault();

			self.hide();
		});
	},
	/**
	 * Hide the gutter.
	 */
	hide: function() {
		if (this.ua && (this.ua.isTablet || this.ua.isIphone)) {
			this.el.hide();
		} else {
			this.el.slideUp(this.properties.speed);
		}

		this.properties.handle.removeClass('active');
	},
	/**
	 * Show the gutter.
	 */
	show: function() {
		if (this.ua && (this.ua.isTablet || this.ua.isIphone)) {
			this.el.show();
		} else {
			this.el.slideDown(this.properties.speed);
		}
		this.properties.handle.addClass('active');
	},
	/**
	 * Toggle between hide and show states.
	 */
	toggle: function($handle) {
		if ($handle.hasClass('active')) {
			this.hide($handle);
		} else {
			this.show($handle);
		}
	}
};
})(jQuery);

jQuery(document).ready(function(){
    
    var BAKERS_INGREDIENTS_CALCULATOR = {};

    // Initialise the parameters
    BAKERS_INGREDIENTS_CALCULATOR.conversion_units = {
		'TEASPOONS' 		: 'volume',
		'TABLESPOONS'	   	: 'volume',
		'CUPS' 				: 'volume',
		'FLUID OUNCES'		: 'volume',
		'MILLILITRES (mL)' 	: 'volume',
		'LITRES (L)'		: 'volume',
		'GRAMS (g)'			: 'weight',
		'OUNCES (oz)'		: 'weight',
		'POUNDS (lb)'		: 'weight',
		'KILOGRAMS (Kg)'	: 'weight'
	};

	BAKERS_INGREDIENTS_CALCULATOR.conversion_table = {
		'TEASPOONS' : {
			0:	'1/4',
			1:	'1/2',
			2:	'1',
			3:	'2',
			4:	'3',
			5:	'4',
			6:	'n/a',
			7:	'n/a',
			8:	'n/a',
			9:	'n/a',
			10:	'n/a',
			11:	'n/a',
			12:	'n/a',
			13:	'n/a',
			14:	'n/a'
		},
		'TABLESPOONS' : {
			0: 'n/a',
			1: 'n/a',
			2: '0.25',
			3: '0.5',
			4: '0.75',
			5: '1',
			6: '2',
			7: '3',
			8: '4',
			9: 'n/a',
			10: 'n/a',
			11: 'n/a',
			12: 'n/a',
			13: 'n/a',
			14: 'n/a'
		},
		'CUPS' : {
			0: 'n/a',
			1: 'n/a',
			2: 'n/a',
			3: 'n/a',
			4: 'n/a',
			5: 'n/a',
			6: 'n/a',
			7: '1/4',
			8: '1/3',
			9: '1/2',
			10: '2/3',
			11: '1',
			12: '2 1/4',
			13: 'n/a',
			14: 'n/a'
		},
		'FLUID OUNCES' : {
			0: 'n/a',
			1: 'n/a',
			2: 'n/a',
			3: 'n/a',
			4: 'n/a',
			5: 'n/a',
			6: 'n/a',
			7: '2',
			8: '3',
			9: '4.5',
			10: '6',
			11: '8.75',
			12: '17.6',
			13: '26.4',
			14: '35.2'
		},
		'MILLILITRES (mL)' : {
			0: '1.25',
			1: '2.5',
			2: '5',
			3: '10',
			4: '15',
			5: '20',
			6: '40',
			7: '60',
			8: '80',
			9: '125',
			10: '170',
			11: '250',
			12: '500',
			13: '750',
			14: '1000'
		},
		'LITRES (L)' : {
			0: 'n/a',
			1: 'n/a',
			2: 'n/a',
			3: 'n/a',
			4: 'n/a',
			5: 'n/a',
			6: 'n/a',
			7: 'n/a',
			8: 'n/a',
			9: '0.125',
			10: '0.17',
			11: '0.25',
			12: '0.5',
			13: '0.75',
			14: '1'
		},
		'GRAMS (g)' : {
			0: '25',
			1: '50',
			2: '100',
			3: '200',
			4: '500',
			5: '750',
			6: '1000'
		}, 
		'KILOGRAMS (Kg)' : {
			0: '0.025',
			1: '0.05',
			2: '0.1',
			3: '0.2',
			4: '0.5',
			5: '0.75',
			6: '1'
		}, 
		'OUNCES (oz)' : {
			0: '1',
			1: '2',
			2: '4',
			3: '8',
			4: '20',
			5: '26.4',
			6: '35.3'
		},
		'POUNDS (lb)' : {
			0: '0.06',
			1: '0.012',
			2: '0.25',
			3: '0.5',
			4: '1 .25',
			5: '1.65',
			6: '2.2'
		}
	};
	    
    // Insert the HTML
    var unit_select_html = get_unit_select(BAKERS_INGREDIENTS_CALCULATOR.conversion_units);
    var unit_number_select_html = get_unit_number_select();
    jQuery('#sidebar-calculator .amount-wrapper .unit-type').html(unit_select_html);
    jQuery('#sidebar-calculator .amount-wrapper .unit-number').html(unit_number_select_html);

    // Initialise select2
    function ingredients_calculator_select2_format(o) {
        if (!o.id) return o.text;
        else return "<i class='icon-" + o.id + "'></i>" + o.text;
    }

    jQuery('select.unit-number-list').select2();
    jQuery('select.unit-type-list').select2({ formatResult: ingredients_calculator_select2_format, formatSelection: ingredients_calculator_select2_format });
    
    // Populate unit-number-list
    jQuery('select.unit-type-list').change(function() {
    	var unit_type = jQuery(this).select2('val');
    	var unit_number_options = "<option value=\"\"> </option>";
    	if ( unit_type ) {
    		jQuery('select.unit-number-list').removeAttr('disabled');
			jQuery.each(BAKERS_INGREDIENTS_CALCULATOR.conversion_table[unit_type], function(k, v) {
				if ( v !== 'n/a' )
					unit_number_options += "<option value=\"" + k + "\">" + v + "</option>";
	    	});
	    } else {
	    	jQuery('select.unit-number-list').select2('data', '');
	    	jQuery('select.unit-number-list').attr('disabled', 'disabled');
	    }
    	jQuery('select.unit-number-list').html(unit_number_options).select2();
    });

    // Calculate
    jQuery("#ingredient-calculate-button a").on('click', function(e){
        e.preventDefault(); 
        var unit_type 	= jQuery('select.unit-type-list').select2('val');
        var unit_number = jQuery('select.unit-number-list').select2('val');
        var is_valid 	= validate_ingredients_calculator_input(unit_number, unit_type);
        var measure 	= BAKERS_INGREDIENTS_CALCULATOR.conversion_units[unit_type];

        if ( is_valid ) {
        	 jQuery('#conversion-list li').hide();

		  	for (var alternate_unit_type in BAKERS_INGREDIENTS_CALCULATOR.conversion_table) {
		  		if (alternate_unit_type == unit_type) continue;
		        var tmp_split	 		= alternate_unit_type.split(" ");
		        var class_name 			= tmp_split[0].toLowerCase();
		        var alternate_measure 	= BAKERS_INGREDIENTS_CALCULATOR.conversion_units[alternate_unit_type];
		        var amount 				= BAKERS_INGREDIENTS_CALCULATOR.conversion_table[alternate_unit_type][unit_number];
		        var list_right_html 	= "";
		        var image_url 			= "/wp-content/themes/bakers/assets/img/ingredients-calculator/conversion-" + class_name + ".png";
		        if ( amount != 'n/a' && measure == alternate_measure ) {
			        list_right_html 	+= "<img class='conversion-list-icon' src=" + image_url +" />";
			        list_right_html 	+= "<span class='conversion-list-text'>" + alternate_unit_type + "</span>";
			        jQuery('#conversion-list li.' + class_name).show().find('.list-left').text(amount);
			        jQuery('#conversion-list li.' + class_name).find('.list-right').html(list_right_html);
			        jQuery('#conversion-list li.' + class_name).next('.list-divider').show();
			    }
		    }
		    jQuery('#conversion-panel').fadeIn(300);
		}
    });
    
});



var validate_ingredients_calculator_input = function(unit_number, selected_unit_type){
    if( isEmpty(selected_unit_type) ){
        alert("Please select a unit type to convert.");
        return false;
    }
    if( isEmpty(unit_number) ){
        alert("Please enter a quantity.");
        return false;
    }
    return true;
};

var isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };
var isEmpty  = function(str) { return (!str || 0 === str.length || /^\s*$/.test(str)); };

var get_unit_select = function(obj){
    var select_html = "<select name='unit_type' class='unit-type-list'>";
    select_html += "<option value=''>Select unit type...</option>";
    for(var k in obj) {
        select_html += "<option value='" + k +"'>" + k + "</option>";
    }
    select_html += "</select>";
    return select_html;
};

var get_unit_number_select = function() {
    var select_html = "<select name='unit_number' class='unit-number-list' disabled='disabled'>";
    select_html += "<option value=''></option>";
    select_html += "</select>";
    return select_html;
}





var BAKERS = BAKERS || {};




(function($){
BAKERS.InstantPreview = function(opts) {

	this.properties = $.extend({
		target: '',
		source: ''
	}, opts);

	if (this.properties.target === '' && this.properties.source === '') {
		return false;
	}

	this.target = $(this.properties.target);
	this.source = $(this.properties.source);

	this.init();
};

BAKERS.InstantPreview.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {
		this.do_bindings();
	},
	/**
	 * Resets the controls.
	 */
	reset: function() {

		var clone = this.source.clone();
		this.source.replaceWith(clone);
		this.source = $(this.properties.source);

		this.do_bindings();
	},
	/**
	 * Bind Events.
	 */
	do_bindings: function() {
		var self = this;

		this.source.bind('change', function() {
			self.read_file($(this).get(0));
		});
	},
	/**
	 * Reads the selected file with FileReader.
	 */
	read_file: function(input) {

		// No files attached.
		if ( ! input.files || ! input.files[0] || ! FileReader) {
			return false;
		}

		var self = this;

		// Ensure file is image mime type.
		if (input.files[0].type.match(/^image\//)) {

			var reader = new FileReader();

			// When file is loaded, preview.
			reader.onload = function(e) {
				self.set_preview(e.target.result);
			};

			// Read the file.
			reader.readAsDataURL(input.files[0]);
		} else {
			// Reset file upload field.
			this.reset();

			this.target.removeAttr('style')
				.css('font-size', '36px')
				.html('Must upload an image');
		}
	},
	/**
	 * Set the image to the one in FileReader.
	 */
	set_preview: function(src) {
		this.target.css({
			'height': 'auto',
			'line-height': '18px'
		}).html('<img src="' + src + '" width="100%" />');
	}
};
})(jQuery);




var BAKERS = BAKERS || {};




BAKERS.Language = function() {};

BAKERS.Language.prototype = {
	MESSAGES_COMMENT_SUCCESS: 'Thank you for your comment. Please allow for some time for our moderator to approve.',
	MESSAGES_REGISTER_LOGIN: 'You must <a href="/community/join">join the community</a> and <a href="/login" onClick="_gaq.push([\'_trackEvent\', \'Login\', \'Click\']);">login</a> to use that feature.',
	MESSAGES_RATE_RECIPE_FAIL: 'There was an error rating this recipe.'
};






var BAKERS = BAKERS || {};




(function($){

var ajaxurl = window.ajaxurl || '';

BAKERS.Loader = function(opts) {

	this.properties = $.extend({
		url: '//' + document.location.hostname
	}, opts);

	$.ajaxSetup({
		cache: false
	});

};

BAKERS.Loader.prototype = {
	/**
	 * Loads html and appends it to the target element.
	 *
	 * @param {string} path
	 * @param {string|object} target
	 * @param {function} cb
	 */
	load: function(path, target, cb) {
		var self = this,
			el = $(target),
			url = path;

		if (el.size()) {

			if ( ! this.is_full_path(path)) {
				url = this.properties.url + path;
			}

			$.get(url, function(html) {
				el.html(html);

				self.do_callback(cb, html);
			});
		}
	},
	/**
	 * Gets data from the server and returns it to a callback.
	 *
	 * @param {string} action
	 * @param {object} data
	 * @param {function} cb
	 */
	get: function(action, data, cb) {

		var self = this;

		$.ajax({
			url : ajaxurl,
			method : 'get',
			data : $.extend({
				action : action
			}, data),
			success : function(r) {
				if (!r || r === '0') {
					self.do_callback(cb, false);
				} else {
					self.do_callback(cb, r);
				}
			},
			error : function() {
				self.do_callback(cb, false);
			}
		});
	},
	/**
	 * Posts data to the server and returns the response to a callback.
	 *
	 * @param {string} action
	 * @param {object} data
	 * @param {function} cb
	 */
	post: function(action, data, cb) {

		var self = this;

		$.ajax({
			url: ajaxurl,
			method: 'post',
			dataType: 'json',
			data: $.extend({
				action: action
			}, data),
			success: function(r) {
				if (!r || r === '0') {
					self.do_callback(cb, false);
				} else {
					self.do_callback(cb, r);
				}
			},
			error: function() {
				self.do_callback(cb, false);
			}
		});

	},
	/**
	 * Checks the passed url to see whether it's relative or full.
	 */
	is_full_path: function(path) {
		return path.match(/^(https?|\/\/)/);
	},
	/**
	 * Checks if callback exists and calls it.
	 */
	do_callback: function(cb, arg) {
		if (typeof cb !== 'function') {
			return;
		}

		cb(arg);

		return true;
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Messages = function(opts) {

	this.properties = $.extend({
		showTime: 250,
		hideTime: 500,
		timeout: 5000
	}, opts);

	this.el = null;
	this._timeout = null;

	this.$message = null;

};


BAKERS.Messages.prototype = {
	/**
	 * Called to initiate this object.
	 */
	init: function() {
		var self = this;

		this.el = this.render_notification_bar();

		this.el.appendTo('body');

		this.el.bind('click', function() {
			self.hide();
		});

		this.$message = $('.bc-message', this.el);
	},
	/**
	 * Renders the HTML for the notification bar.
	 */
	render_notification_bar: function() {
		return $(
			'<div id="bc-messages">' +
				'<div class="container">' +
					'<div class="bc-message"></div>' +
				'</div>' +
			'</div>'
		);
	},
	/**
	 * Displays the notification message with animation.
	 */
	show: function(msg) {
		if (msg === '') {
			return;
		}

		var self = this;

		clearTimeout(this._timeout);

		this.$message.html(msg);

		this.el.css({
			'display': 'block',
			'height': 0,
			'opacity': 0
		}).stop().animate({

			height: this.$message.innerHeight() + 'px',
			opacity: 1

		}, this.properties.showTime, function() {

			self._timeout = setTimeout(function() {
				self.hide();
			}, self.properties.timeout);

		});
	},
	/**
	 * Hides the notification message with animation.
	 */
	hide: function() {
		var self = this;

		this.el.stop().animate({
			height: 0,
			opacity: 0
		}, this.properties.hideTime, function() {
			self.el.hide();
		});
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Mobile = function(opts) {

	this.properties = $.extend({

	}, opts);

	this.$menu = $('.main-nav-collapse');
	this.$subcategories = $('.subcategories-collapse');

};

BAKERS.Mobile.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {
		this.register_events();
	},
	/**
	 * Register all events required for use by mobile.
	 */
	register_events: function() {

		var self = this;

		$('.main-nav-collapse-handle').bind('click', function(e) {
			e.preventDefault();
			var btn = $(this);

			if (btn.hasClass('active')) {
				self.close_menu();
				btn.removeClass('active');
				$('span', btn).text('Open Menu');
			} else {
				self.open_menu();
				btn.addClass('active');
				$('span', btn).text('Close Menu');
			}
		});

		$('.subcategories-collapse-handle').bind('click', function(e) {
			e.preventDefault();
			var btn = $(this);

			if (btn.hasClass('active')) {
				self.close_subcats();
				btn.removeClass('active');
			} else {
				self.open_subcats();
				btn.addClass('active');
			}
		});
	},
	/**
	 * Opens the main navigation menu.
	 */
	open_menu: function() {
		if (BAKERS.ua.isMobile) {
			this.$menu.show();
		} else {
			this.$menu.slideDown(500);
		}
	},
	/**
	 * Closes the main navigation menu.
	 */
	close_menu: function() {
		if (BAKERS.ua.isMobile) {
			this.$menu.hide();
		} else {
			this.$menu.slideUp(500);
		}
	},
	/**
	 * Opens the sub categories menu.
	 */
	open_subcats: function() {
		this.$subcategories.show();
	},
	/**
	 * Hides the sub categories menu.
	 */
	close_subcats: function() {
		this.$subcategories.hide();
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
/**
 * Placeholder fix for older browsers.  Puts the value of the placeholder
 * attribute into the value attribute if nothing has been input into the
 * text field.
 */
BAKERS.Placeholder = function(opts) {

	this.properties = $.extend({
		el: '[placeholder]'
	}, opts);

	this.el = $(this.properties.el);
};

BAKERS.Placeholder.prototype = {
	/**
	 * Initialise Class.
	 */
	init: function() {

		var self = this;

		// Field is clicked on, remove the placeholder.
		this.el.live('focus', function() {
			var input = $(this);

			if (input.val() === input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		})
		// Field is clicked off, replace the placeholder if empty.
		.live('blur', function() {
			var input = $(this);
			if (input.val() === '' || input.val() === input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		})
		// Add the placeholder!
		.trigger('blur');


		// If form is submitted, don't want to submit the placeholder!
		this.el.parents('form').live('submit', function() {
			$(this).find(self.properties.el).each(function() {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
				}
			});
		});
	}
};
})(jQuery);




var BAKERS = BAKERS || {};




(function($){

var ajaxurl = window.ajaxurl || '';

BAKERS.RatingStars = function(opts) {

	// Require Raty plugin.
	if ( ! $().raty) {
		return false;
	}

	this.properties = $.extend({
		path: '/wp-content/themes/bakers/assets/img',
		hints: false,
		halfShow: true,
		number: 5,
		width: '94px'
	}, opts);

};

BAKERS.RatingStars.prototype = {
	/**
	 * Initialise Class.
	 */
	init: function() {

		var self = this;

		// Not logged in.
		$('.recipe .rating-stars-off').raty({
			path: this.properties.path,
			hints: this.properties.hints,
			halfShow: this.properties.halfShow,
			number: this.properties.number,
			width: this.properties.width,
			score: function() {
				return $(this).attr('data-rating');
			},
			click : function() {
				BAKERS.messages.show(BAKERS.lang.MESSAGES_REGISTER_LOGIN);
				// $('#promptLoginModal').modal('show');
			}
		});


		// Logged in/active stars.
		$('.recipe .rating-stars').raty({
			path: this.properties.path,
			hints: this.properties.hints,
			halfShow: this.properties.halfShow,
			number: this.properties.number,
			width: this.properties.width,
			score: function() {
				return $(this).attr('data-rating');
			},
			click: function(value) {
				self.rate(value);
			}
		});
	},
	rate: function(val) {

		var id = $('.rating-stars').attr('data-id');

		$.ajax({
			type : 'post',
			dataType : 'json',
			url : ajaxurl,
			data : {
				action : 'rate_recipe',
				id : id,
				value : val
			},
			success : function(r) {

				if (r === 0 || r === '0' || r === null) {
					BAKERS.messages.show(BAKERS.lang.MESSAGES_RATE_RECIPE_FAIL);
					return;
				}
				
				var parent = $('.rating-stars').parents('.recipe-rating');

				window._gaq = window._gaq || [];
				window._gaq.push(['_trackEvent', 'Star Rating', 'Click', val + ' Star', , false]);

				
				if (r.rating) {
					$('.rating-stars').raty('score', r.rating);
					$('.rating-total', parent).text(r.rating);
					$('.rating-text-hide', parent).removeClass('rating-text-hide');
				}
				if (r.count) {
					$('.rating-count', parent).text(r.count);
				}

				if (r.message) {
					BAKERS.messages.show(r.message);
				}
			}
		});
	}
};

})(jQuery);






var BAKERS = BAKERS || {};




(function($){
BAKERS.Responsive = function(opts) {
	
	this.properties = $.extend({

	}, opts);

	this._change = [];

	this.width = 0;

	this.already_small = false;
};

BAKERS.Responsive.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {
		this.register_events();
	},
	/**
	 * Registers all required events.
	 */
	register_events: function() {

		var self = this;

		$(window).bind('resize', function() {
			var w = $('.container').first().width();

			if (w < 723) {
				if (this.already_small) {
					return;
				}

				this.already_small = true;
			} else {
				this.already_small = false;
			}

			if (!w) {
				w = '100%';
				self.width = 0;
			}
			if (w !== self.width) {

				for(var i = 0, c = self._change.length; i < c; i++) {
					self._change[i]();
				}

				self.width = w;
			}
		});
	},
	/**
	 * Add callback to be called when the responsive size changes.
	 */
	change: function(cb) {
		this._change.push(cb);
	}
};
})(jQuery);

/*
Copyright 2012 Igor Vaynberg

Version: 3.4.3 Timestamp: Tue Sep 17 06:47:14 PDT 2013

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.
*/
!function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";function n(a){var b,c,d,e;if(!a||a.length<1)return a;for(b="",c=0,d=a.length;d>c;c++)e=a.charAt(c),b+=m[e]||e;return b}function o(a,b){for(var c=0,d=b.length;d>c;c+=1)if(q(a,b[c]))return c;return-1}function p(){var b=a(l);b.appendTo("body");var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function q(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function r(b,c){var d,e,f;if(null===b||b.length<1)return[];for(d=b.split(c),e=0,f=d.length;f>e;e+=1)d[e]=a.trim(d[e]);return d}function s(a){return a.outerWidth(!1)-a.width()}function t(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function u(c){c.on("mousemove",function(c){var d=i;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function v(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function w(a){var c,b=!1;return function(){return b===!1&&(c=a(),b=!0),c}}function x(a,b){var c=v(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){o(a.target,b.get())>=0&&c(a)})}function y(a){a[0]!==document.activeElement&&window.setTimeout(function(){var d,b=a[0],c=a.val().length;a.focus(),a.is(":visible")&&b===document.activeElement&&(b.setSelectionRange?b.setSelectionRange(c,c):b.createTextRange&&(d=b.createTextRange(),d.collapse(!1),d.select()))},0)}function z(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function A(a){a.preventDefault(),a.stopPropagation()}function B(a){a.preventDefault(),a.stopImmediatePropagation()}function C(b){if(!h){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);h=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),h.attr("class","select2-sizer"),a("body").append(h)}return h.text(b.val()),h.width()}function D(b,c,d){var e,g,f=[];e=b.attr("class"),e&&(e=""+e,a(e.split(" ")).each2(function(){0===this.indexOf("select2-")&&f.push(this)})),e=c.attr("class"),e&&(e=""+e,a(e.split(" ")).each2(function(){0!==this.indexOf("select2-")&&(g=d(this),g&&f.push(this))})),b.attr("class",f.join(" "))}function E(a,b,c,d){var e=n(a.toUpperCase()).indexOf(n(b.toUpperCase())),f=b.length;return 0>e?(c.push(d(a)),void 0):(c.push(d(a.substring(0,e))),c.push("<span class='select2-match'>"),c.push(d(a.substring(e,e+f))),c.push("</span>"),c.push(d(a.substring(e+f,a.length))),void 0)}function F(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function G(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page);i.callback(b)}}),e=j.call(h,l)},f)}}function H(b){var d,e,c=b,f=function(a){return""+a.text};a.isArray(c)&&(e=c,c={results:e}),a.isFunction(c)===!1&&(e=c,c=function(){return e});var g=c();return g.text&&(f=g.text,a.isFunction(f)||(d=g.text,f=function(a){return a[d]})),function(b){var g,d=b.term,e={results:[]};return""===d?(b.callback(c()),void 0):(g=function(c,e){var h,i;if(c=c[0],c.children){h={};for(i in c)c.hasOwnProperty(i)&&(h[i]=c[i]);h.children=[],a(c.children).each2(function(a,b){g(b,h.children)}),(h.children.length||b.matcher(d,f(h),c))&&e.push(h)}else b.matcher(d,f(c),c)&&e.push(c)},a(c().results).each2(function(a,b){g(b,e.results)}),b.callback(e),void 0)}}function I(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]};a(d?c():c).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g)}}function J(b,c){if(a.isFunction(b))return!0;if(!b)return!1;throw new Error(c+" must be a function or a falsy value")}function K(b){return a.isFunction(b)?b():b}function L(b){var c=0;return a.each(b,function(a,b){b.children?c+=L(b.children):c++}),c}function M(a,c,d,e){var h,i,j,k,l,f=a,g=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(i=-1,j=0,k=e.tokenSeparators.length;k>j&&(l=e.tokenSeparators[j],i=a.indexOf(l),!(i>=0));j++);if(0>i)break;if(h=a.substring(0,i),a=a.substring(i+l.length),h.length>0&&(h=e.createSearchChoice.call(this,h,c),h!==b&&null!==h&&e.id(h)!==b&&null!==e.id(h))){for(g=!1,j=0,k=c.length;k>j;j++)if(q(e.id(h),e.id(c[j]))){g=!0;break}g||d(h)}}return f!==a?a:void 0}function N(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var c,d,e,f,g,h,j,k,i={x:0,y:0},c={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case c.LEFT:case c.RIGHT:case c.UP:case c.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case c.SHIFT:case c.CTRL:case c.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},l="<div class='select2-measure-scrollbar'></div>",m={"\u24b6":"A","\uff21":"A","\xc0":"A","\xc1":"A","\xc2":"A","\u1ea6":"A","\u1ea4":"A","\u1eaa":"A","\u1ea8":"A","\xc3":"A","\u0100":"A","\u0102":"A","\u1eb0":"A","\u1eae":"A","\u1eb4":"A","\u1eb2":"A","\u0226":"A","\u01e0":"A","\xc4":"A","\u01de":"A","\u1ea2":"A","\xc5":"A","\u01fa":"A","\u01cd":"A","\u0200":"A","\u0202":"A","\u1ea0":"A","\u1eac":"A","\u1eb6":"A","\u1e00":"A","\u0104":"A","\u023a":"A","\u2c6f":"A","\ua732":"AA","\xc6":"AE","\u01fc":"AE","\u01e2":"AE","\ua734":"AO","\ua736":"AU","\ua738":"AV","\ua73a":"AV","\ua73c":"AY","\u24b7":"B","\uff22":"B","\u1e02":"B","\u1e04":"B","\u1e06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24b8":"C","\uff23":"C","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\xc7":"C","\u1e08":"C","\u0187":"C","\u023b":"C","\ua73e":"C","\u24b9":"D","\uff24":"D","\u1e0a":"D","\u010e":"D","\u1e0c":"D","\u1e10":"D","\u1e12":"D","\u1e0e":"D","\u0110":"D","\u018b":"D","\u018a":"D","\u0189":"D","\ua779":"D","\u01f1":"DZ","\u01c4":"DZ","\u01f2":"Dz","\u01c5":"Dz","\u24ba":"E","\uff25":"E","\xc8":"E","\xc9":"E","\xca":"E","\u1ec0":"E","\u1ebe":"E","\u1ec4":"E","\u1ec2":"E","\u1ebc":"E","\u0112":"E","\u1e14":"E","\u1e16":"E","\u0114":"E","\u0116":"E","\xcb":"E","\u1eba":"E","\u011a":"E","\u0204":"E","\u0206":"E","\u1eb8":"E","\u1ec6":"E","\u0228":"E","\u1e1c":"E","\u0118":"E","\u1e18":"E","\u1e1a":"E","\u0190":"E","\u018e":"E","\u24bb":"F","\uff26":"F","\u1e1e":"F","\u0191":"F","\ua77b":"F","\u24bc":"G","\uff27":"G","\u01f4":"G","\u011c":"G","\u1e20":"G","\u011e":"G","\u0120":"G","\u01e6":"G","\u0122":"G","\u01e4":"G","\u0193":"G","\ua7a0":"G","\ua77d":"G","\ua77e":"G","\u24bd":"H","\uff28":"H","\u0124":"H","\u1e22":"H","\u1e26":"H","\u021e":"H","\u1e24":"H","\u1e28":"H","\u1e2a":"H","\u0126":"H","\u2c67":"H","\u2c75":"H","\ua78d":"H","\u24be":"I","\uff29":"I","\xcc":"I","\xcd":"I","\xce":"I","\u0128":"I","\u012a":"I","\u012c":"I","\u0130":"I","\xcf":"I","\u1e2e":"I","\u1ec8":"I","\u01cf":"I","\u0208":"I","\u020a":"I","\u1eca":"I","\u012e":"I","\u1e2c":"I","\u0197":"I","\u24bf":"J","\uff2a":"J","\u0134":"J","\u0248":"J","\u24c0":"K","\uff2b":"K","\u1e30":"K","\u01e8":"K","\u1e32":"K","\u0136":"K","\u1e34":"K","\u0198":"K","\u2c69":"K","\ua740":"K","\ua742":"K","\ua744":"K","\ua7a2":"K","\u24c1":"L","\uff2c":"L","\u013f":"L","\u0139":"L","\u013d":"L","\u1e36":"L","\u1e38":"L","\u013b":"L","\u1e3c":"L","\u1e3a":"L","\u0141":"L","\u023d":"L","\u2c62":"L","\u2c60":"L","\ua748":"L","\ua746":"L","\ua780":"L","\u01c7":"LJ","\u01c8":"Lj","\u24c2":"M","\uff2d":"M","\u1e3e":"M","\u1e40":"M","\u1e42":"M","\u2c6e":"M","\u019c":"M","\u24c3":"N","\uff2e":"N","\u01f8":"N","\u0143":"N","\xd1":"N","\u1e44":"N","\u0147":"N","\u1e46":"N","\u0145":"N","\u1e4a":"N","\u1e48":"N","\u0220":"N","\u019d":"N","\ua790":"N","\ua7a4":"N","\u01ca":"NJ","\u01cb":"Nj","\u24c4":"O","\uff2f":"O","\xd2":"O","\xd3":"O","\xd4":"O","\u1ed2":"O","\u1ed0":"O","\u1ed6":"O","\u1ed4":"O","\xd5":"O","\u1e4c":"O","\u022c":"O","\u1e4e":"O","\u014c":"O","\u1e50":"O","\u1e52":"O","\u014e":"O","\u022e":"O","\u0230":"O","\xd6":"O","\u022a":"O","\u1ece":"O","\u0150":"O","\u01d1":"O","\u020c":"O","\u020e":"O","\u01a0":"O","\u1edc":"O","\u1eda":"O","\u1ee0":"O","\u1ede":"O","\u1ee2":"O","\u1ecc":"O","\u1ed8":"O","\u01ea":"O","\u01ec":"O","\xd8":"O","\u01fe":"O","\u0186":"O","\u019f":"O","\ua74a":"O","\ua74c":"O","\u01a2":"OI","\ua74e":"OO","\u0222":"OU","\u24c5":"P","\uff30":"P","\u1e54":"P","\u1e56":"P","\u01a4":"P","\u2c63":"P","\ua750":"P","\ua752":"P","\ua754":"P","\u24c6":"Q","\uff31":"Q","\ua756":"Q","\ua758":"Q","\u024a":"Q","\u24c7":"R","\uff32":"R","\u0154":"R","\u1e58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1e5a":"R","\u1e5c":"R","\u0156":"R","\u1e5e":"R","\u024c":"R","\u2c64":"R","\ua75a":"R","\ua7a6":"R","\ua782":"R","\u24c8":"S","\uff33":"S","\u1e9e":"S","\u015a":"S","\u1e64":"S","\u015c":"S","\u1e60":"S","\u0160":"S","\u1e66":"S","\u1e62":"S","\u1e68":"S","\u0218":"S","\u015e":"S","\u2c7e":"S","\ua7a8":"S","\ua784":"S","\u24c9":"T","\uff34":"T","\u1e6a":"T","\u0164":"T","\u1e6c":"T","\u021a":"T","\u0162":"T","\u1e70":"T","\u1e6e":"T","\u0166":"T","\u01ac":"T","\u01ae":"T","\u023e":"T","\ua786":"T","\ua728":"TZ","\u24ca":"U","\uff35":"U","\xd9":"U","\xda":"U","\xdb":"U","\u0168":"U","\u1e78":"U","\u016a":"U","\u1e7a":"U","\u016c":"U","\xdc":"U","\u01db":"U","\u01d7":"U","\u01d5":"U","\u01d9":"U","\u1ee6":"U","\u016e":"U","\u0170":"U","\u01d3":"U","\u0214":"U","\u0216":"U","\u01af":"U","\u1eea":"U","\u1ee8":"U","\u1eee":"U","\u1eec":"U","\u1ef0":"U","\u1ee4":"U","\u1e72":"U","\u0172":"U","\u1e76":"U","\u1e74":"U","\u0244":"U","\u24cb":"V","\uff36":"V","\u1e7c":"V","\u1e7e":"V","\u01b2":"V","\ua75e":"V","\u0245":"V","\ua760":"VY","\u24cc":"W","\uff37":"W","\u1e80":"W","\u1e82":"W","\u0174":"W","\u1e86":"W","\u1e84":"W","\u1e88":"W","\u2c72":"W","\u24cd":"X","\uff38":"X","\u1e8a":"X","\u1e8c":"X","\u24ce":"Y","\uff39":"Y","\u1ef2":"Y","\xdd":"Y","\u0176":"Y","\u1ef8":"Y","\u0232":"Y","\u1e8e":"Y","\u0178":"Y","\u1ef6":"Y","\u1ef4":"Y","\u01b3":"Y","\u024e":"Y","\u1efe":"Y","\u24cf":"Z","\uff3a":"Z","\u0179":"Z","\u1e90":"Z","\u017b":"Z","\u017d":"Z","\u1e92":"Z","\u1e94":"Z","\u01b5":"Z","\u0224":"Z","\u2c7f":"Z","\u2c6b":"Z","\ua762":"Z","\u24d0":"a","\uff41":"a","\u1e9a":"a","\xe0":"a","\xe1":"a","\xe2":"a","\u1ea7":"a","\u1ea5":"a","\u1eab":"a","\u1ea9":"a","\xe3":"a","\u0101":"a","\u0103":"a","\u1eb1":"a","\u1eaf":"a","\u1eb5":"a","\u1eb3":"a","\u0227":"a","\u01e1":"a","\xe4":"a","\u01df":"a","\u1ea3":"a","\xe5":"a","\u01fb":"a","\u01ce":"a","\u0201":"a","\u0203":"a","\u1ea1":"a","\u1ead":"a","\u1eb7":"a","\u1e01":"a","\u0105":"a","\u2c65":"a","\u0250":"a","\ua733":"aa","\xe6":"ae","\u01fd":"ae","\u01e3":"ae","\ua735":"ao","\ua737":"au","\ua739":"av","\ua73b":"av","\ua73d":"ay","\u24d1":"b","\uff42":"b","\u1e03":"b","\u1e05":"b","\u1e07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24d2":"c","\uff43":"c","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\xe7":"c","\u1e09":"c","\u0188":"c","\u023c":"c","\ua73f":"c","\u2184":"c","\u24d3":"d","\uff44":"d","\u1e0b":"d","\u010f":"d","\u1e0d":"d","\u1e11":"d","\u1e13":"d","\u1e0f":"d","\u0111":"d","\u018c":"d","\u0256":"d","\u0257":"d","\ua77a":"d","\u01f3":"dz","\u01c6":"dz","\u24d4":"e","\uff45":"e","\xe8":"e","\xe9":"e","\xea":"e","\u1ec1":"e","\u1ebf":"e","\u1ec5":"e","\u1ec3":"e","\u1ebd":"e","\u0113":"e","\u1e15":"e","\u1e17":"e","\u0115":"e","\u0117":"e","\xeb":"e","\u1ebb":"e","\u011b":"e","\u0205":"e","\u0207":"e","\u1eb9":"e","\u1ec7":"e","\u0229":"e","\u1e1d":"e","\u0119":"e","\u1e19":"e","\u1e1b":"e","\u0247":"e","\u025b":"e","\u01dd":"e","\u24d5":"f","\uff46":"f","\u1e1f":"f","\u0192":"f","\ua77c":"f","\u24d6":"g","\uff47":"g","\u01f5":"g","\u011d":"g","\u1e21":"g","\u011f":"g","\u0121":"g","\u01e7":"g","\u0123":"g","\u01e5":"g","\u0260":"g","\ua7a1":"g","\u1d79":"g","\ua77f":"g","\u24d7":"h","\uff48":"h","\u0125":"h","\u1e23":"h","\u1e27":"h","\u021f":"h","\u1e25":"h","\u1e29":"h","\u1e2b":"h","\u1e96":"h","\u0127":"h","\u2c68":"h","\u2c76":"h","\u0265":"h","\u0195":"hv","\u24d8":"i","\uff49":"i","\xec":"i","\xed":"i","\xee":"i","\u0129":"i","\u012b":"i","\u012d":"i","\xef":"i","\u1e2f":"i","\u1ec9":"i","\u01d0":"i","\u0209":"i","\u020b":"i","\u1ecb":"i","\u012f":"i","\u1e2d":"i","\u0268":"i","\u0131":"i","\u24d9":"j","\uff4a":"j","\u0135":"j","\u01f0":"j","\u0249":"j","\u24da":"k","\uff4b":"k","\u1e31":"k","\u01e9":"k","\u1e33":"k","\u0137":"k","\u1e35":"k","\u0199":"k","\u2c6a":"k","\ua741":"k","\ua743":"k","\ua745":"k","\ua7a3":"k","\u24db":"l","\uff4c":"l","\u0140":"l","\u013a":"l","\u013e":"l","\u1e37":"l","\u1e39":"l","\u013c":"l","\u1e3d":"l","\u1e3b":"l","\u017f":"l","\u0142":"l","\u019a":"l","\u026b":"l","\u2c61":"l","\ua749":"l","\ua781":"l","\ua747":"l","\u01c9":"lj","\u24dc":"m","\uff4d":"m","\u1e3f":"m","\u1e41":"m","\u1e43":"m","\u0271":"m","\u026f":"m","\u24dd":"n","\uff4e":"n","\u01f9":"n","\u0144":"n","\xf1":"n","\u1e45":"n","\u0148":"n","\u1e47":"n","\u0146":"n","\u1e4b":"n","\u1e49":"n","\u019e":"n","\u0272":"n","\u0149":"n","\ua791":"n","\ua7a5":"n","\u01cc":"nj","\u24de":"o","\uff4f":"o","\xf2":"o","\xf3":"o","\xf4":"o","\u1ed3":"o","\u1ed1":"o","\u1ed7":"o","\u1ed5":"o","\xf5":"o","\u1e4d":"o","\u022d":"o","\u1e4f":"o","\u014d":"o","\u1e51":"o","\u1e53":"o","\u014f":"o","\u022f":"o","\u0231":"o","\xf6":"o","\u022b":"o","\u1ecf":"o","\u0151":"o","\u01d2":"o","\u020d":"o","\u020f":"o","\u01a1":"o","\u1edd":"o","\u1edb":"o","\u1ee1":"o","\u1edf":"o","\u1ee3":"o","\u1ecd":"o","\u1ed9":"o","\u01eb":"o","\u01ed":"o","\xf8":"o","\u01ff":"o","\u0254":"o","\ua74b":"o","\ua74d":"o","\u0275":"o","\u01a3":"oi","\u0223":"ou","\ua74f":"oo","\u24df":"p","\uff50":"p","\u1e55":"p","\u1e57":"p","\u01a5":"p","\u1d7d":"p","\ua751":"p","\ua753":"p","\ua755":"p","\u24e0":"q","\uff51":"q","\u024b":"q","\ua757":"q","\ua759":"q","\u24e1":"r","\uff52":"r","\u0155":"r","\u1e59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1e5b":"r","\u1e5d":"r","\u0157":"r","\u1e5f":"r","\u024d":"r","\u027d":"r","\ua75b":"r","\ua7a7":"r","\ua783":"r","\u24e2":"s","\uff53":"s","\xdf":"s","\u015b":"s","\u1e65":"s","\u015d":"s","\u1e61":"s","\u0161":"s","\u1e67":"s","\u1e63":"s","\u1e69":"s","\u0219":"s","\u015f":"s","\u023f":"s","\ua7a9":"s","\ua785":"s","\u1e9b":"s","\u24e3":"t","\uff54":"t","\u1e6b":"t","\u1e97":"t","\u0165":"t","\u1e6d":"t","\u021b":"t","\u0163":"t","\u1e71":"t","\u1e6f":"t","\u0167":"t","\u01ad":"t","\u0288":"t","\u2c66":"t","\ua787":"t","\ua729":"tz","\u24e4":"u","\uff55":"u","\xf9":"u","\xfa":"u","\xfb":"u","\u0169":"u","\u1e79":"u","\u016b":"u","\u1e7b":"u","\u016d":"u","\xfc":"u","\u01dc":"u","\u01d8":"u","\u01d6":"u","\u01da":"u","\u1ee7":"u","\u016f":"u","\u0171":"u","\u01d4":"u","\u0215":"u","\u0217":"u","\u01b0":"u","\u1eeb":"u","\u1ee9":"u","\u1eef":"u","\u1eed":"u","\u1ef1":"u","\u1ee5":"u","\u1e73":"u","\u0173":"u","\u1e77":"u","\u1e75":"u","\u0289":"u","\u24e5":"v","\uff56":"v","\u1e7d":"v","\u1e7f":"v","\u028b":"v","\ua75f":"v","\u028c":"v","\ua761":"vy","\u24e6":"w","\uff57":"w","\u1e81":"w","\u1e83":"w","\u0175":"w","\u1e87":"w","\u1e85":"w","\u1e98":"w","\u1e89":"w","\u2c73":"w","\u24e7":"x","\uff58":"x","\u1e8b":"x","\u1e8d":"x","\u24e8":"y","\uff59":"y","\u1ef3":"y","\xfd":"y","\u0177":"y","\u1ef9":"y","\u0233":"y","\u1e8f":"y","\xff":"y","\u1ef7":"y","\u1e99":"y","\u1ef5":"y","\u01b4":"y","\u024f":"y","\u1eff":"y","\u24e9":"z","\uff5a":"z","\u017a":"z","\u1e91":"z","\u017c":"z","\u017e":"z","\u1e93":"z","\u1e95":"z","\u01b6":"z","\u0225":"z","\u0240":"z","\u2c6c":"z","\ua763":"z"};j=a(document),g=function(){var a=1;return function(){return a++}}(),j.on("mousemove",function(a){i.x=a.pageX,i.y=a.pageY}),d=N(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,h,i,f=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+g()),this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.body=w(function(){return c.element.closest("body")}),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(K(c.containerCss)),this.container.addClass(K(c.containerCssClass)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",A),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(c.dropdownCssClass)),this.dropdown.data("select2",this),this.dropdown.on("click",A),this.results=d=this.container.find(f),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",A),u(this.results),this.dropdown.on("mousemove-filtered touchstart touchmove touchend",f,this.bind(this.highlightUnderEvent)),x(80,this.results),this.dropdown.on("scroll-debounced",f,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),A(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),A(a))}),t(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",f,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown",function(a){a.stopPropagation()}),a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),k=k||p(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.nextSearchTerm=b},destroy:function(){var a=this.opts.element,c=a.data("select2");this.close(),this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),c!==b&&(c.container.remove(),c.dropdown.remove(),a.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show())},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:q(a.attr("locked"),"locked")||q(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,g,h=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var g,l=this.opts.id;g=function(d,e,i){var j,k,m,n,o,p,q,r,s,t;for(d=c.sortResults(d,e,f),j=0,k=d.length;k>j;j+=1)m=d[j],o=m.disabled===!0,n=!o&&l(m)!==b,p=m.children&&m.children.length>0,q=a("<li></li>"),q.addClass("select2-results-dept-"+i),q.addClass("select2-result"),q.addClass(n?"select2-result-selectable":"select2-result-unselectable"),o&&q.addClass("select2-disabled"),p&&q.addClass("select2-result-with-children"),q.addClass(h.opts.formatResultCssClass(m)),r=a(document.createElement("div")),r.addClass("select2-result-label"),t=c.formatResult(m,r,f,h.opts.escapeMarkup),t!==b&&r.html(t),q.append(r),p&&(s=a("<ul></ul>"),s.addClass("select2-result-sub"),g(m.children,s,i+1),q.append(s)),q.data("select2-data",m),e.append(q)},g(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var f,g,i,c={results:[],more:!1},e=a.term;i=function(b,c){var d;b.is("option")?a.matcher(e,b.text(),b)&&c.push(h.optionToData(b)):b.is("optgroup")&&(d=h.optionToData(b),b.children().each2(function(a,b){i(b,d.children)}),d.children.length>0&&c.push(d))},f=d.children(),this.getPlaceholder()!==b&&f.length>0&&(g=this.getPlaceholderOption(),g&&(f=f.not(g))),f.each2(function(a,b){i(b,c.results)}),a.callback(c)}),c.id=function(a){return a.id},c.formatResultCssClass=function(a){return a.css}):"query"in c||("ajax"in c?(g=c.element.data("ajax-url"),g&&g.length>0&&(c.ajax.url=g),c.query=G.call(c.element,c.ajax)):"data"in c?c.query=H(c.data):"tags"in c&&(c.query=I(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(r(b.val(),c.separator)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return q(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");return c},monitorSource:function(){var c,a=this.opts.element;a.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),c=this.bind(function(){var d,f=a.prop("disabled");f===b&&(f=!1),this.enable(!f);var d=a.prop("readonly");d===b&&(d=!1),this.readonly(d),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(K(this.opts.containerCssClass)),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(this.opts.dropdownCssClass))}),a.on("propertychange.select2 DOMAttrModified.select2",c),this.mutationCallback===b&&(this.mutationCallback=function(a){a.forEach(c)}),"undefined"!=typeof WebKitMutationObserver&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new WebKitMutationObserver(this.mutationCallback),this.propertyObserver.observe(a.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){return a===b&&(a=!1),this._readonly===a?!1:(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface(),!0)},opened:function(){return this.container.hasClass("select2-dropdown-open")},positionDropdown:function(){var q,r,s,t,b=this.dropdown,c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),g=a(window).scrollLeft()+a(window).width(),h=a(window).scrollTop()+a(window).height(),i=c.top+d,j=c.left,l=h>=i+f,m=c.top-f>=this.body().scrollTop(),n=b.outerWidth(!1),o=g>=j+n,p=b.hasClass("select2-drop-above");this.opts.dropdownAutoWidth?(t=a(".select2-results",b)[0],b.addClass("select2-drop-auto-width"),b.css("width",""),n=b.outerWidth(!1)+(t.scrollHeight===t.clientHeight?0:k.width),n>e?e=n:n=e,o=g>=j+n):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body().css("position")&&(q=this.body().offset(),i-=q.top,j-=q.left),p?(r=!0,!m&&l&&(r=!1)):(r=!1,!l&&m&&(r=!0)),o||(j=c.left+e-n),r?(i=c.top-f,this.container.addClass("select2-drop-above"),b.addClass("select2-drop-above")):(this.container.removeClass("select2-drop-above"),b.removeClass("select2-drop-above")),s=a.extend({top:i,left:j,width:e},K(this.opts.dropdownCss)),b.css(s)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),!0):!1},opening:function(){var f,b=this.containerId,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body().children().last()[0]&&this.dropdown.detach().appendTo(this.body()),f=a("#select2-drop-mask"),0==f.length&&(f=a(document.createElement("div")),f.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),f.hide(),f.appendTo(this.body()),f.on("mousedown touchstart click",function(b){var d,c=a("#select2-drop");c.length>0&&(d=c.data("select2"),d.opts.selectOnBlur&&d.selectHighlighted({noFocus:!0}),d.close({focus:!1}),b.preventDefault(),b.stopPropagation())})),this.dropdown.prev()[0]!==f[0]&&this.dropdown.before(f),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),f.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var h=this;this.container.parents().add(window).each(function(){a(this).on(d+" "+c+" "+e,function(){h.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerId,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return K(this.opts.maximumSelectionSize)},ensureHighlightVisible:function(){var c,d,e,f,g,h,i,b=this.results;if(d=this.highlight(),!(0>d)){if(0==d)return b.scrollTop(0),void 0;c=this.findHighlightableChoices().find(".select2-result-label"),e=a(c[d]),f=e.offset().top+e.outerHeight(!0),d===c.length-1&&(i=b.find("li.select2-more-results"),i.length>0&&(f=i.offset().top+i.outerHeight(!0))),g=b.offset().top+b.outerHeight(!0),f>g&&b.scrollTop(b.scrollTop()+(f-g)),h=e.offset().top-b.offset().top,0>h&&"none"!=e.css("display")&&b.scrollTop(b.scrollTop()+h)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);break}}},highlight:function(b){var d,e,c=this.findHighlightableChoices();return 0===arguments.length?o(c.filter(".select2-highlighted")[0],c.get()):(b>=c.length&&(b=c.length-1),0>b&&(b=0),this.removeHighlight(),d=a(c[b]),d.addClass("select2-highlighted"),this.ensureHighlightVisible(),e=d.data("select2-data"),e&&this.opts.element.trigger({type:"select2-highlight",val:this.id(e),choice:e}),void 0)},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var c,a=this.results,b=a.find("li.select2-more-results"),e=this.resultsPage+1,f=this,g=this.search.val(),h=this.context;0!==b.length&&(c=b.offset().top-a.offset().top-a.height(),c<=this.opts.loadMorePadding&&(b.addClass("select2-active"),this.opts.query({element:this.opts.element,term:g,page:e,context:h,matcher:this.opts.matcher,callback:this.bind(function(c){f.opened()&&(f.opts.populateResults.call(this,a,c.results,{term:g,page:e,context:h}),f.postprocessResults(c,!1,!1),c.more===!0?(b.detach().appendTo(a).text(f.opts.formatLoadMore(e+1)),window.setTimeout(function(){f.loadMoreIfNeeded()},10)):b.remove(),f.positionDropdown(),f.resultsPage=e,f.context=c.context,this.opts.element.trigger({type:"select2-loaded",items:c}))})})))},tokenize:function(){},updateResults:function(c){function m(){d.removeClass("select2-active"),h.positionDropdown()}function n(a){e.html(a),m()}var g,i,l,d=this.search,e=this.results,f=this.opts,h=this,j=d.val(),k=a.data(this.container,"select2-last-term");if((c===!0||!k||!q(j,k))&&(a.data(this.container,"select2-last-term",j),c===!0||this.showSearchInput!==!1&&this.opened())){l=++this.queryCount;var o=this.getMaximumSelectionSize();if(o>=1&&(g=this.data(),a.isArray(g)&&g.length>=o&&J(f.formatSelectionTooBig,"formatSelectionTooBig")))return n("<li class='select2-selection-limit'>"+f.formatSelectionTooBig(o)+"</li>"),void 0;if(d.val().length<f.minimumInputLength)return J(f.formatInputTooShort,"formatInputTooShort")?n("<li class='select2-no-results'>"+f.formatInputTooShort(d.val(),f.minimumInputLength)+"</li>"):n(""),c&&this.showSearch&&this.showSearch(!0),void 0;if(f.maximumInputLength&&d.val().length>f.maximumInputLength)return J(f.formatInputTooLong,"formatInputTooLong")?n("<li class='select2-no-results'>"+f.formatInputTooLong(d.val(),f.maximumInputLength)+"</li>"):n(""),void 0;
f.formatSearching&&0===this.findHighlightableChoices().length&&n("<li class='select2-searching'>"+f.formatSearching()+"</li>"),d.addClass("select2-active"),this.removeHighlight(),i=this.tokenize(),i!=b&&null!=i&&d.val(i),this.resultsPage=1,f.query({element:f.element,term:d.val(),page:this.resultsPage,context:null,matcher:f.matcher,callback:this.bind(function(g){var i;if(l==this.queryCount){if(!this.opened())return this.search.removeClass("select2-active"),void 0;if(this.context=g.context===b?null:g.context,this.opts.createSearchChoice&&""!==d.val()&&(i=this.opts.createSearchChoice.call(h,d.val(),g.results),i!==b&&null!==i&&h.id(i)!==b&&null!==h.id(i)&&0===a(g.results).filter(function(){return q(h.id(this),h.id(i))}).length&&g.results.unshift(i)),0===g.results.length&&J(f.formatNoMatches,"formatNoMatches"))return n("<li class='select2-no-results'>"+f.formatNoMatches(d.val())+"</li>"),void 0;e.empty(),h.opts.populateResults.call(this,e,g.results,{term:d.val(),page:this.resultsPage,context:null}),g.more===!0&&J(f.formatLoadMore,"formatLoadMore")&&(e.append("<li class='select2-more-results'>"+h.opts.escapeMarkup(f.formatLoadMore(this.resultsPage))+"</li>"),window.setTimeout(function(){h.loadMoreIfNeeded()},10)),this.postprocessResults(g,c),m(),this.opts.element.trigger({type:"select2-loaded",items:g})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){y(this.search)},selectHighlighted:function(a){var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var a=this.select.children().first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&a||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.text()&&""===a.val())return a}},initContainerWidth:function(){function c(){var c,d,e,f,g;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(e=d[f].replace(/\s/g,"").match(/[^-]width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),e=N(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow'><b></b></span>","</a>","<input class='select2-focusser select2-offscreen' type='text'/>","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>","   </div>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e)),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(a){this.opened()&&(this.parent.close.apply(this,arguments),a=a||{focus:!0},this.focusser.removeAttr("disabled"),a.focus&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.removeAttr("disabled"),this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.removeAttr("disabled"),this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments)},initContainer:function(){var b,d=this.container,e=this.dropdown;this.opts.minimumResultsForSearch<0?this.showSearch(!1):this.showSearch(!0),this.selection=b=d.find(".select2-choice"),this.focusser=d.find(".select2-focusser"),this.focusser.attr("id","s2id_autogen"+g()),a("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.focusser.attr("id")),this.focusser.attr("tabindex",this.elementTabIndex),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){if(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)return A(a),void 0;switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),void 0;case c.ESC:return this.cancel(a),A(a),void 0}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body().get(0)&&window.setTimeout(this.bind(function(){this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.ESC){if(this.opts.openOnEnter===!1&&a.which===c.ENTER)return A(a),void 0;if(a.which==c.DOWN||a.which==c.UP||a.which==c.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),A(a),void 0}return a.which==c.DELETE||a.which==c.BACKSPACE?(this.opts.allowClear&&this.clear(),A(a),void 0):void 0}})),t(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),B(a),this.close(),this.selection.focus())})),b.on("mousedown",this.bind(function(b){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),A(b)})),e.on("mousedown",this.bind(function(){this.search.focus()})),b.on("focus",this.bind(function(a){A(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.setPlaceholder())})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()?(a=this.getPlaceholderOption())!==b&&a.is(":selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val():!1},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find(":selected");b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var g=q(e,b.id(d));return g&&(f=d),g},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return q(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&(b===!0&&d>=0?this.highlight(d):this.highlight(0)),b===!0){var g=this.opts.minimumResultsForSearch;g>=0&&this.showSearch(L(a.results)>=g)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||this.focusser.focus(),q(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var d,e,c=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),c.empty(),null!==a&&(d=this.opts.formatSelection(a,c,this.opts.escapeMarkup)),d!==b&&c.append(d),e=this.opts.formatSelectionCssClass(a,c),e!==b&&c.addClass(e),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find(":selected").each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return this.clear(c),void 0;if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d),void 0)}}),f=N(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find(":selected").each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=r(c.val(),b.separator),f=[];b.query({matcher:function(c,d,g){var h=a.grep(e,function(a){return q(a,b.id(g))}).length;return h&&f.push(g),h},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var g=e[c],h=0;h<f.length;h++){var i=f[h];if(q(g,b.id(i))){a.push(i),f.splice(h,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments)},initContainer:function(){var d,b=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=d=this.container.find(b);var e=this;this.selection.on("click",".select2-search-choice:not(.select2-locked)",function(){e.search[0].focus(),e.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+g()),a("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.search.attr("id")),this.search.on("input paste",this.bind(function(){this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var b=d.find(".select2-search-choice-focus"),e=b.prev(".select2-search-choice:not(.select2-locked)"),f=b.next(".select2-search-choice:not(.select2-locked)"),g=z(this.search);if(b.length&&(a.which==c.LEFT||a.which==c.RIGHT||a.which==c.BACKSPACE||a.which==c.DELETE||a.which==c.ENTER)){var h=b;return a.which==c.LEFT&&e.length?h=e:a.which==c.RIGHT?h=f.length?f:null:a.which===c.BACKSPACE?(this.unselect(b.first()),this.search.width(10),h=e.length?e:f):a.which==c.DELETE?(this.unselect(b.first()),this.search.width(10),h=f.length?f:null):a.which==c.ENTER&&(h=null),this.selectChoice(h),A(a),h&&h.length||this.open(),void 0}if((a.which===c.BACKSPACE&&1==this.keydowns||a.which==c.LEFT)&&0==g.offset&&!g.length)return this.selectChoice(d.find(".select2-search-choice:not(.select2-locked)").last()),A(a),void 0;if(this.selectChoice(null),this.opened())switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),this.close(),void 0;case c.ESC:return this.cancel(a),A(a),void 0}if(a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.BACKSPACE&&a.which!==c.ESC){if(a.which===c.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)&&A(a),a.which===c.ENTER&&A(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",b,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",b,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),this.updateResults(!0),this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],e=this;a(b).each(function(){o(e.id(this),c)<0&&(c.push(e.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){e.addSelectedChoice(this)}),e.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,b){this.triggerSelect(a)&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()&&this.updateResults(!0),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),b&&b.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var j,k,d=!c.locked,e=a("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),f=a("<li class='select2-search-choice select2-locked'><div></div></li>"),g=d?e:f,h=this.id(c),i=this.getVal();j=this.opts.formatSelection(c,g.find("div"),this.opts.escapeMarkup),j!=b&&g.find("div").replaceWith("<div>"+j+"</div>"),k=this.opts.formatSelectionCssClass(c,g.find("div")),k!=b&&g.addClass(k),d&&g.find(".select2-search-choice-close").on("mousedown",A).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").fadeOut("fast",this.bind(function(){this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),this.close(),this.focusSearch()})).dequeue(),A(b))})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),g.data("select2-data",c),g.insertBefore(this.searchContainer),i.push(h),this.setVal(i)},unselect:function(a){var c,d,b=this.getVal();if(a=a.closest(".select2-search-choice"),0===a.length)throw"Invalid argument: "+a+". Must be .select2-search-choice";if(c=a.data("select2-data")){for(;(d=o(this.id(c),b))>=0;)b.splice(d,1),this.setVal(b),this.select&&this.postprocessResults();a.remove(),this.opts.element.trigger({type:"removed",val:this.id(c),choice:c}),this.triggerChange({removed:c})}},postprocessResults:function(a,b,c){var d=this.getVal(),e=this.results.find(".select2-result"),f=this.results.find(".select2-result-with-children"),g=this;e.each2(function(a,b){var c=g.id(b.data("select2-data"));o(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),f.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&g.highlight(0),!this.opts.createSearchChoice&&!e.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&J(g.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+g.opts.formatNoMatches(g.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-s(this.search)},resizeSearch:function(){var a,b,c,d,e,f=s(this.search);a=C(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),r(a,this.opts.separator))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){o(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)q(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),d&&this.triggerChange({added:this.data(),removed:e}),void 0;if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,this.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var e,f,d=this;return 0===arguments.length?this.selection.find(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(f=this.data(),b||(b=[]),e=a.map(b,function(a){return d.opts.id(a)}),this.setVal(e),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(f,this.data())),void 0)}}),a.fn.select2=function(){var d,g,h,i,j,c=Array.prototype.slice.call(arguments,0),k=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],l=["opened","isFocused","container","dropdown"],m=["val","data"],n={search:"externalSearch"};return this.each(function(){if(0===c.length||"object"==typeof c[0])d=0===c.length?{}:a.extend({},c[0]),d.element=a(this),"select"===d.element.get(0).tagName.toLowerCase()?j=d.element.prop("multiple"):(j=d.multiple||!1,"tags"in d&&(d.multiple=j=!0)),g=j?new f:new e,g.init(d);else{if("string"!=typeof c[0])throw"Invalid arguments to select2 plugin: "+c;if(o(c[0],k)<0)throw"Unknown method: "+c[0];if(i=b,g=a(this).data("select2"),g===b)return;if(h=c[0],"container"===h?i=g.container:"dropdown"===h?i=g.dropdown:(n[h]&&(h=n[h]),i=g[h].apply(g,c.slice(1))),o(c[0],l)>=0||o(c[0],m)&&1==c.length)return!1}}),i===b?this:i},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return E(a.text,c.term,e,d),e.join("")},formatSelection:function(a,c,d){return a?d(a.text):b},sortResults:function(a){return a},formatResultCssClass:function(){return b},formatSelectionCssClass:function(){return b},formatNoMatches:function(){return"No matches found"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results..."},formatSearching:function(){return"Searching..."},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a.id},matcher:function(a,b){return n(""+b).toUpperCase().indexOf(n(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:M,escapeMarkup:F,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b}},a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:G,local:H,tags:I},util:{debounce:v,markMatch:E,escapeMarkup:F,stripDiacritics:n},"class":{"abstract":d,single:e,multi:f}}}}(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.Slider = function(opts) {

	// Require Cycle plugin.
	if ( ! $().cycle) {
		return false;
	}

	this.properties = $.extend({
		target: '',
		pager: null,
		fx: 'scrollHorz',
		delay: -1000,
		timeout: 7000
	}, opts);

	this.el = $(this.properties.target);

	this.slides = this.el.find('> div');
	this.count = this.slides.length;
	this.rendered = false;

	if (this.count) {
		this.init();
	} else {
		this.el.css('cursor', 'default');
	}

	this._timer = null;

};

BAKERS.Slider.prototype = {
	/**
	 * Initiate Class.
	 */
	init: function() {

		this.render();

		// Prevent default browser actions on img mousedowns.
		$('img', this.el).bind('mousedown', function(e) {
			e.preventDefault();
		});

	},
	/**
	 * Returns whether or not the required DOM elements exist.
	 */
	exists: function() {
		return this.el.size() ? true : false;
	},
	/**
	 * Resets the slider.
	 */
	reset: function() {

		if (this.rendered) {
			this.el.unbind('mouseenter mouseleave');

			if ( ! BAKERS.ua.ie6 && this.el.swiperight && this.el.swipeleft) {
				this.el.unbind('swiperight swipeleft');
			}

			this.el.cycle('destroy');
			this.el.removeAttr('style');
			this.slides.removeAttr('style');

			this.rendered = false;
		}
		this.render();
	},
	/**
	 * Render.
	 */
	render: function() {

		var self = this;

		this.el.cycle({
			fx: this.properties.fx,
			delay: this.properties.delay,
			timeout: this.properties.timeout,
			pager: this.properties.pager
		});

		this.register_events();

		if ($('.container').first().width() < 724) {
			// Find tallest slide.

			this._timer = setInterval(function() {
				var tallest = 0;
				$(self.slides).each(function() {
					var slide = $(this),
						img_height = $('.slider-image', slide).height(),
						txt_height = $('.slider-content', slide).height(),
						full_height = img_height + txt_height;

					if (tallest < full_height) {
						tallest = full_height;
					}
				});

				self.el.css({
					height: tallest
				});
			}, 1000);
		} else {
			clearInterval(this._timer);
			this._timer = null;
		}

		this.rendered = true;

	},
	/**
	 * Registers events.
	 */
	register_events: function() {

		this.el.bind('mouseenter', function() {
			$(this).cycle('pause');
		})
		.bind('mouseleave', function() {
			$(this).cycle('resume');
		});

		if ( ! BAKERS.ua.ie6 && this.el.swiperight && this.el.swipeleft) {
			this.el.swiperight(function(event) {
				event.preventDefault();
				$(this).cycle('prev');
			}).swipeleft(function(event) {
				event.preventDefault();
				$(this).cycle('next');
			});
		}
	}
};
})(jQuery);





var BAKERS = BAKERS || {};




(function($){
BAKERS.SliderGallery = function(opts) {

	// Requires the cycle and colorbox plugins.
	if ( ! $().cycle) {
		return false;
	}

	this.properties = $.extend({
		target: '',
		next: '',
		prev: '',
		fx: 'scrollHorz'
	}, opts);

	this.el = $(this.properties.target);
	this.slides = this.el.find('> div');

};

BAKERS.SliderGallery.prototype = {
	/**
	 * Initialise class.
	 */
	init: function() {

		if ( ! this.el.size()) {
			return false;
		}

		this.render();

	},
	/**
	 * Returns whether or not the required DOM elements exist.
	 */
	exists: function() {
		return this.el.size() ? true : false;
	},
	/**
	 * Resets the slider gallery.
	 */
	reset: function() {
		if (this.rendered) {
			this.el.cycle('destroy');
			this.el.removeAttr('style');
			this.slides.removeAttr('style');

			this.rendered = false;
		}

		this.render_cycle();

	},
	/** 
	 * Renders everything to do with the DOM.
	 */
	render: function() {
		this.render_cycle();
	},
	/**
	 * Attaches jQuery Cycle to the document.
	 */
	render_cycle: function() {
		this.el.cycle({
			fx: this.properties.fx,
			timeout: 0,
			next: this.properties.next,
			prev: this.properties.prev
		});
	}
};
})(jQuery);



var BAKERS = BAKERS || {};




(function($){
BAKERS.SocialMedia = function(opts) {

	this.shareURL = 'http://' + window.location.host;
	this.imgDir = 'http://' + this.shareURL + '/assets/';

	this.current_window = null;

	this.properties = $.extend({
		facebook: {
			sharerURL: 'http://www.facebook.com/sharer.php?m2w&',
			title: 'Facebook Share Title',
			description: 'Facebook share description of what is to be expected when visiting the link.',
			url: this.shareURL,
			windowWidth: 600,
			windowHeight: 300
		},
		twitter: {
			sharerURL: 'https://twitter.com/intent/tweet?',
			url: this.shareURL,
			windowWidth: 550,
			windowHeight: 257
		},
		pinterest: {
			sharerURL: 'http://www.pinterest.com/pin/create/button/?',
			media: 'Image URL to pin.',
			description: 'The description about the image.',
			url: this.shareURL,
			windowWidth: 600,
			windowHeight: 300
		},
		google: {
			sharerURL: 'https://plus.google.com/share?',
			title: '',
			description: '',
			url: this.shareURL,
			windowWidth: 600,
			windowHeight: 300
		}
	}, opts);
};

BAKERS.SocialMedia.prototype = {
	/**
	 * Initial setup.
	 */
	init: function() {

		var self = this;

		$('.social-media-btn').live('click', function(e) {

			e.preventDefault();
			window._gaq = window._gaq || [];

			switch($(this).attr('data-type')) {
				case 'facebook':
					_gaq.push(['_trackEvent', 'Social', 'Facebook', 'Share',, false]);
					self.do_facebook(this);
					break;
				case 'twitter':
					_gaq.push(['_trackEvent', 'Social', 'Twitter', 'Share',, false]);
					self.do_twitter(this);
					break;
				case 'pinterest':
					_gaq.push(['_trackEvent', 'Social', 'Pinterest', 'Share',, false]);
					self.do_pinterest(this);
					break;
				case 'google':
					_gaq.push(['_trackEvent', 'Social', 'Google', 'Share',, false]);
					self.do_google(this);
					break;
			}
		});
	},
	/**
	 * Opens a new window to share the recipe on Facebook.
	 */
	do_facebook: function(el) {

		var parent = $(el).parents('.social-media');

		// Get the dimensions.
		var win = this.get_window_dim(
			this.properties.facebook.windowWidth,
			this.properties.facebook.windowHeight
		);

		// Apply the new dimensions to the window options.
		var options = this.get_window_options({
			height: win.height,
			width: win.width,
			top: win.top,
			left: win.left
		});

		var title = $(el).attr('data-title') || parent.attr('data-title');
		var description = $(el).attr('data-description') || parent.attr('data-description');
		var url = $(el).attr('data-url') || parent.attr('data-url');
		var image = $(el).attr('data-image') || parent.attr('data-image');

		var params = [
			's=100',
			'p[title]=' + encodeURIComponent(title),
			'p[summary]=' + encodeURIComponent(description),
			'p[url]=' + this.shareURL + url,
			'p[images][0]=' + this.shareURL + image
		];

		this.open_window(
			this.properties.facebook.sharerURL + params.join('&'),
			options
		);
	},
	/**
	 * Opens a new window to share the recipe on Twitter.
	 */
	do_twitter: function(el) {

		var parent = $(el).parents('.social-media');

		var win = this.get_window_dim(
			this.properties.twitter.windowWidth,
			this.properties.twitter.windowHeight
		);

		var options = this.get_window_options({
			height: win.height,
			width: win.width,
			top: win.top,
			left: win.left
		});

		var title = $(el).attr('data-title') || parent.attr('data-title');
		var url = $(el).attr('data-url') || parent.attr('data-url');

		var params = [
			'source=webclient',
			'text=' + encodeURIComponent(title) + ' ' + this.shareURL + url
		];

		this.open_window(
			this.properties.twitter.sharerURL + params.join('&'),
			options
		);
	},
	/**
	 * Opens a new window to share the recipe on Pinterest.
	 */
	do_pinterest: function(el) {

		var parent = $(el).parents('.social-media');

		var win = this.get_window_dim(
			this.properties.pinterest.windowWidth,
			this.properties.pinterest.windowHeight
		);

		var options = this.get_window_options({
			height: win.height,
			width: win.width,
			top: win.top,
			left: win.left
		});

		var title = $(el).attr('data-title') || parent.attr('data-title');
		var description = $(el).attr('data-description') || parent.attr('data-description');
		var url = $(el).attr('data-url') || parent.attr('data-url');
		var image = $(el).attr('data-image') || parent.attr('data-image');

		var params = [
			'url=' + this.shareURL + url,
			'media=' + this.shareURL + image,
			'description=' + encodeURIComponent(title) + ': ' + encodeURIComponent(description) + ' ' + this.shareURL + url
		];

		this.open_window(
			this.properties.pinterest.sharerURL + params.join('&'),
			options
		);
	},
	/**
	 * Opens a new window to share the recipe on Google+.
	 */
	do_google: function(el) {

		var parent = $(el).parents('.social-media');

		var win = this.get_window_dim(
			this.properties.google.windowWidth,
			this.properties.google.windowHeight
		);

		var options = this.get_window_options({
			height: win.height,
			width: win.width,
			top: win.top,
			left: win.left
		});

		var url = $(el).attr('data-url') || parent.attr('data-url');

		var params = [
			'url=' + this.shareURL + url
		];

		this.open_window(
			this.properties.google.sharerURL + params.join('&'),
			options
		);

	},
	/**
	 * Creates a new window with specified parameters.
	 */
	open_window: function(url, options) {

		if (this.current_window !== null) {
			this.current_window.close();
		}

		this.current_window = window.open(
			url,
			'',
			options
		);

		this.focus_window();
	},
	/**
	 * Checks to see if the focus() method is available and then focuses the
	 * passed window.  If no window is passed, then the current window is
	 * focused.
	 *
	 * @param object win The window to focus.
	 * @return boolean
	 */
	focus_window: function() {
		if (window.focus) {
			if (this.current_window !== null) {
				this.current_window.focus();
			} else {
				window.focus();
			}
			return true;
		}
		return false;
	},
	/**
	 * Returns the position and dimensions to be used with the popup windows.
	 * The position will be calculated to appear in the centre of the screen based
	 * on the provided width and height values.
	 *
	 * @param integer w The intended width of the window.
	 * @param integer h The intended height of the window.
	 * @return object {width,height,left,top}
	 */
	get_window_dim: function(w, h) {
		return {
			width: w,
			height: h,
			left: (screen.width - w) / 2,
			top: (screen.height - h) / 2
		};
	},
	/**
	 * Returns all the options to be used when opening a popup window.  Provides
	 * a range of defaults as well if not all are passed.
	 * Will be returned in string format that is used in the window.open function.
	 *
	 * @param object opts Desired custom options to be used instead of defaults.
	 * @return string
	 */
	get_window_options: function(opts) {
		var options = $.extend({
			height: 300,
			width: 600,
			fullscreen: false,
			scrollbars: false,
			location: false,
			menubar: false,
			resizable: false,
			status: false,
			toolbar: false,
			personalbar: false,
			top: (screen.height - 300) / 2,
			left: (screen.width - 600) / 2
		}, opts);

		var output = [];
		for (var i in options) {
			output.push(i + '=' + options[i]);
		}

		return output.join(',');
	}
};
})(jQuery);






var BAKERS = BAKERS || {};




(function($){
BAKERS.UA = function() {
	// Simple ua testing.
	var ua = navigator.userAgent.toLowerCase();

	this.isIpad		= ua.match(/(ipad)/);
	this.isAndroid	= ua.match(/(android)/);
	this.isIphone	= ua.match(/(iphone)/);
	this.isMobile	= ua.match(/(mobile)/);
	this.isTablet	= ua.match(/(tablet)/) || this.isIpad;

	if ($.browser.msie) {
		this.ie6 = parseInt($.browser.version, 10) === 6;
		this.ie7 = $.browser.version === 7;
		this.ie10 = $.browser.version === 10;
	}
};

BAKERS.UA.prototype = {
};
})(jQuery);

/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1990-91 Apple Computer, Inc. All rights reserved. Copyright ©
 * 1990-1991 Type Solutions, Inc. All Rights Reserved.
 * 
 * Trademark:
 * Zeal is a trademark of Apple Computer, Inc.
 */
Cufon.registerFont({"w":360,"face":{"font-family":"icons","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"0 0 0 0 0 0 0 0 0 0","ascent":"270","descent":"-90","bbox":"-360 -288 346 72","underline-thickness":"7.03125","underline-position":"-44.2969","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":180},"-":{"w":299},"\/":{"w":350},"<":{"d":"28,-108r189,-113r0,214","w":252},"=":{"d":"16,-20r101,-189r100,189r-201,0","w":233},">":{"d":"36,-8r0,-214r176,114","w":240},"?":{"d":"25,-24r0,-28r28,0r0,28r-28,0xm25,-93r0,-28r28,0r0,28r-28,0xm25,-162r0,-28r28,0r0,28r-28,0xm81,-24r0,-28r216,0r0,28r-216,0xm81,-94r0,-28r216,0r0,28r-216,0xm81,-162r0,-28r216,0r0,28r-216,0","w":321},"@":{"d":"178,-11v-48,1,-96,-44,-94,-94r-59,0r0,-6r59,0v-2,-47,47,-94,94,-92r0,-60r4,0r0,60v48,-2,96,45,94,92r59,0r0,6r-59,0v2,49,-46,96,-94,94r0,58r-4,0r0,-58xm89,-105v-1,47,43,90,89,89r0,-89r-89,0xm89,-111r89,0r0,-87v-44,-2,-91,43,-89,87xm182,-16v45,1,91,-43,89,-89r-89,0r0,89xm182,-111r89,0v1,-44,-44,-89,-89,-87r0,87"},"A":{"d":"20,-83r0,-50r77,0r0,-77r50,0r0,77r77,0r0,50r-77,0r0,77r-50,0r0,-77r-77,0","w":243},"B":{"d":"119,-28v-34,-23,-77,-52,-78,-110v0,-6,9,-13,28,-19r-60,-41r6,-12r73,50v49,-8,118,-6,163,2v78,13,14,87,-10,108v-20,18,-38,28,-78,28v-29,0,-44,-2,-44,-6xm63,-138r40,6v-10,-9,-27,-16,-40,-6xm267,-138v-33,-14,-124,-16,-164,-9v14,11,35,4,50,19v43,1,83,-3,114,-10","w":328},"C":{"d":"-1,44r212,0r0,28r-212,0r0,-28xm-1,-260r0,-28r212,0r0,28r-212,0xm108,4v-60,0,-97,-49,-97,-114v0,-119,167,-157,189,-42r-32,0v-30,-82,-124,-42,-124,43v0,51,21,87,66,87v41,0,61,-20,61,-60r31,0v0,49,-41,86,-94,86","w":210},"D":{"d":"-1,44r216,0r0,28r-216,0r0,-28xm-1,-260r0,-28r216,0r0,28r-216,0xm202,-110v0,57,-34,108,-93,108r-84,0r0,-216r84,0v60,-2,93,50,93,108xm170,-110v0,-43,-23,-83,-68,-82r-45,0r0,164r45,0v46,2,68,-39,68,-82","w":213},"E":{"d":"24,-55r0,-112r57,48xm40,-37r59,-67v18,13,32,30,52,41v22,-9,35,-28,53,-41r58,67r-222,0xm43,-182r217,0r-109,92xm222,-119r56,-48r0,112","w":300},"F":{"d":"141,-179v-18,2,-44,-7,-43,13r0,22r43,0r0,43r-43,0r0,105r-44,0r0,-105r-34,0r0,-43r34,0v-6,-57,25,-87,87,-79r0,44","w":160},"G":{"d":"94,19v-37,1,-76,-12,-77,-44v0,-33,40,-59,77,-57v-4,-8,-5,-13,-3,-23v-32,1,-58,-25,-58,-57v0,-32,32,-58,66,-58r86,0v-13,7,-18,21,-38,21v9,9,13,21,13,37v0,30,-29,36,-34,58v14,23,48,32,45,69v-3,38,-35,54,-77,54xm143,-32v0,-41,-92,-45,-92,-1v0,19,21,34,43,34v32,0,49,-11,49,-33xm91,-201v-43,7,-22,78,11,79v42,-7,23,-77,-11,-79xm187,-153r0,-20r46,0r0,-47r21,0r0,47r47,0r0,20r-47,0r0,47r-21,0r0,-47r-46,0","w":313},"H":{"d":"222,-138v-5,39,-37,81,-102,126v-68,-52,-102,-81,-102,-138v0,-55,77,-74,102,-30v29,-46,110,-24,102,42","w":240},"I":{"d":"172,-19v-71,0,-118,-37,-146,-84r0,-11v28,-47,75,-84,146,-84v71,0,118,37,146,84r0,11v-29,47,-74,84,-146,84xm172,-176v-37,0,-67,32,-67,68v0,36,31,67,67,67v37,0,68,-30,68,-67v1,-37,-31,-69,-68,-68xm172,-141v-17,0,-33,16,-33,34v0,18,16,34,33,34v17,0,34,-17,34,-34v0,-18,-17,-34,-34,-34","w":341},"J":{"d":"-1,44r157,0r0,28r-157,0r0,-28xm-1,-260r0,-28r157,0r0,28r-157,0xm130,-218v-8,86,31,222,-61,222v-53,0,-69,-23,-64,-73r31,0v-2,28,3,48,30,48v22,0,32,-17,32,-52r0,-145r32,0","w":155},"K":{"d":"-1,44r204,0r0,28r-204,0r0,-28xm-1,-260r0,-28r204,0r0,28r-204,0xm25,-2r0,-216r32,0r0,104r105,-104r40,0r-90,88r89,128r-37,0r-75,-106r-32,33r0,73r-32,0","w":201},"L":{"d":"61,-30v1,16,-36,11,-40,3r-10,-88v1,-16,29,-5,44,-8v4,1,6,3,6,7r0,86xm207,-149v28,4,10,37,18,54v-4,9,-8,16,-3,28v-10,35,-33,59,-93,49v-20,-4,-21,-10,-51,-12v-7,0,-8,-6,-8,-13r1,-69v27,-11,30,-61,52,-78v9,-12,16,-29,20,-47v35,3,20,62,6,80v1,18,40,5,58,8","w":242},"M":{"d":"51,3v-48,-3,-22,-84,-28,-131r54,0v-10,40,18,74,54,74v36,1,67,-35,54,-74r60,0v-6,48,19,131,-29,131r-165,0xm177,-144v-19,-31,-73,-28,-91,0r-63,0v0,-35,-6,-75,28,-75r165,0v33,-1,30,40,29,75r-68,0xm131,-76v-38,0,-43,-61,-8,-67v25,-4,42,11,43,32v1,19,-16,35,-35,35xm211,-203v-24,0,-33,6,-30,30v1,13,15,13,30,13v13,0,14,-15,13,-30v0,-7,-6,-13,-13,-13","w":267},"N":{"d":"57,9v-11,-56,31,-102,15,-157v1,-28,52,-46,52,-4v0,29,-37,75,14,74v24,-7,35,-34,36,-65v1,-40,-20,-64,-57,-64v-39,0,-69,29,-68,74v3,13,20,36,4,50v-22,-10,-37,-27,-36,-59v1,-57,52,-100,118,-92v42,5,79,38,79,87v0,65,-60,127,-112,84v-9,35,-19,57,-26,72r-19,0","w":231},"O":{"d":"21,-115r113,-100r43,37r0,-23r28,0r0,49r42,37v-14,9,-17,30,-42,28r0,85r-42,0r0,-71r-57,0r0,71r-43,0r0,-85v-25,2,-28,-19,-42,-28","w":268},"P":{"d":"69,-55v-20,-1,-50,6,-51,-13r0,-76v1,-21,36,-13,58,-13r176,0v7,1,13,5,13,13v-4,30,12,82,-13,89r-39,0r0,32r-144,0r0,-32xm194,-196v12,1,14,12,13,26r-131,0v-1,-14,0,-26,13,-26r105,0xm82,-36r118,0r0,-37r-118,0r0,37xm207,-110r25,0r0,-17r-25,0r0,17","w":282},"Q":{"d":"-1,44r240,0r0,28r-240,0r0,-28xm-1,-260r0,-28r240,0r0,28r-240,0xm177,-11v-76,42,-165,-8,-165,-98v0,-68,45,-114,108,-114v62,1,106,44,106,113v0,34,-9,62,-28,82r29,23r-17,20xm119,-197v-48,0,-75,37,-75,87v0,64,49,105,109,81r-21,-17r17,-21r26,21v39,-50,17,-151,-56,-151","w":237},"R":{"d":"38,-19v-6,-2,-11,-7,-11,-15r0,-179v3,-9,31,-7,41,-7r113,3v7,-1,15,7,14,14r0,186v0,8,-8,11,-16,11v4,-2,8,-6,8,-11r0,-180v1,-7,-7,-15,-14,-14v-44,1,-96,-8,-135,-1r0,193xm161,-9v1,9,-4,15,-13,13r-104,-21r0,-195r49,10v0,39,-3,77,-7,110r18,-11r16,23v5,-27,11,-80,13,-112v13,2,27,5,28,19r0,164","w":217},"S":{"d":"101,-59v-43,1,-80,-37,-80,-80v0,-44,37,-80,80,-79v44,1,80,33,80,79v0,47,-36,79,-80,80xm101,-191v-27,0,-52,25,-52,52v0,27,25,53,52,53v27,0,52,-26,52,-53v0,-27,-25,-52,-52,-52xm156,-55v-6,-15,14,-34,28,-28r65,63v4,16,-14,35,-29,29","w":267},"T":{"d":"103,-2v-50,0,-83,-40,-83,-90r0,-99v-1,-12,9,-23,22,-23v26,0,23,30,22,56r99,0v13,-1,24,9,23,22v-5,42,-80,16,-122,23v-4,36,10,64,39,66v32,2,84,-13,83,23v-1,33,-51,22,-83,22","w":204},"U":{"d":"-1,44r224,0r0,28r-224,0r0,-28xm-1,-260r0,-28r224,0r0,28r-224,0xm112,4v-53,0,-87,-30,-87,-75r0,-147r32,0r0,142v0,36,18,53,54,53v36,0,54,-17,54,-53r0,-142r32,0r0,147v-1,45,-33,75,-85,75","w":221},"V":{"d":"17,-204r201,0r-101,189","w":234},"W":{"d":"-1,44r285,0r0,28r-285,0r0,-28xm-1,-260r0,-28r285,0r0,28r-285,0xm3,-218r33,0r40,172r49,-172r34,0r48,174r41,-174r32,0r-55,216r-35,0r-48,-172r-49,172r-35,0","w":283},"X":{"d":"-1,44r195,0r0,28r-195,0r0,-28xm-1,-260r0,-28r195,0r0,28r-195,0xm1,-2r78,-110r-72,-106r37,0r54,78r55,-78r37,0r-74,105r77,111r-38,0r-58,-84r-60,84r-36,0","w":193},"Y":{"d":"-1,44r201,0r0,28r-201,0r0,-28xm-1,-260r0,-28r201,0r0,28r-201,0xm0,-218r38,0r63,102r62,-102r36,0r-83,132r0,84r-32,0r0,-84","w":198},"Z":{"d":"-1,44r188,0r0,28r-188,0r0,-28xm-1,-260r0,-28r188,0r0,28r-188,0xm8,-2r0,-25r130,-164r-121,0r0,-27r161,0r0,27r-131,162r131,0r0,27r-170,0","w":185},"[":{"d":"112,72r0,-360r85,0r0,28r-54,0r0,304r54,0r0,28r-85,0","w":196},"\\":{"d":"-12,-288r31,0r140,360r-30,0","w":146},"]":{"d":"-1,44r55,0r0,-304r-55,0r0,-28r85,0r0,360r-85,0r0,-28","w":196},"^":{"d":"-350,44r0,-304v0,-12,5,-18,17,-18r302,0v14,0,21,7,21,21r0,301v0,12,-5,18,-17,18r-306,0v-12,0,-17,-6,-17,-18xm-45,43v12,0,15,-3,15,-15r0,-272v0,-10,-5,-15,-15,-15r-270,0v-10,0,-15,5,-15,15r0,272v0,14,2,14,15,15r270,0","w":0},"_":{"d":"-1,44r104,0r0,28r-104,0r0,-28xm-1,-260r0,-28r104,0r0,28r-104,0","w":101},"a":{"d":"80,-95r100,-157r100,157r-59,0r0,125r-81,0r0,-125r-60,0xm116,-113r43,0r0,123r42,0r0,-123r43,0r-64,-103"},"b":{"d":"57,-42r88,-88r-42,-42r181,-40r-40,182r-42,-42r-88,88xm85,-42v9,10,19,20,29,29r87,-86r30,30r28,-118r-118,28r30,31"},"c":{"d":"43,-67r0,-82r125,0r0,-59r157,100r-157,100r0,-59r-125,0xm63,-88r123,0r0,44r104,-64r-104,-64r0,43r-123,0r0,41"},"d":{"d":"56,-174r58,-58r88,88r42,-42r40,182r-182,-40r42,-42xm85,-175r86,87r-30,31r118,28r-28,-119r-30,31r-87,-87"},"e":{"d":"80,-120r60,0r0,-124r81,0r0,124r59,0r-100,158xm116,-102r64,104r64,-104r-43,0r0,-122r-42,0r0,122r-43,0"},"f":{"d":"76,-4r41,-182r42,42r88,-88r58,57r-88,89r41,41xm102,-29r118,-29r-31,-30r87,-87r-29,-29r-87,87r-30,-31"},"g":{"d":"37,-108r157,-100r0,59r125,0r0,82r-125,0r0,59xm72,-108r104,64r0,-44r123,0r0,-41r-123,0r0,-43"},"h":{"d":"79,-211r182,40r-43,43r89,88r-58,57r-88,-88r-42,42xm104,-186r28,119r31,-31r86,87r30,-29r-87,-87r31,-31"},"i":{"d":"80,-93r100,-157r100,157r-59,0r0,128r-82,0r0,-128r-59,0"},"j":{"d":"53,-38r98,-98r-42,-42r182,-40r-41,181r-42,-41r-98,98"},"k":{"d":"38,-67r0,-82r129,0r0,-59r157,100r-157,100r0,-59r-129,0"},"l":{"d":"53,-178r58,-57r98,98r42,-42r40,182r-181,-40r41,-42"},"m":{"d":"80,-119r59,0r0,-129r82,0r0,129r59,0r-100,157"},"n":{"d":"69,4r41,-182r42,42r98,-99r57,58r-98,98r42,42"},"o":{"d":"36,-108r157,-100r0,59r129,0r0,81r-129,0r0,60"},"p":{"d":"69,-219r181,40r-41,42r98,99r-58,57r-98,-98r-42,42"},"q":{"d":"60,26r120,-277r121,277r-241,0xm88,6r184,0r-92,-209"},"r":{"d":"29,-127r289,-119r-118,290xm63,-121r131,130r90,-220"},"s":{"d":"48,12r0,-241r277,120xm68,-17r209,-91r-209,-93r0,184"},"t":{"d":"30,-87r171,-170r118,288xm65,-93r220,91r-90,-221"},"u":{"d":"59,-238r241,0r-120,276xm89,-218r91,209r92,-209r-183,0"},"v":{"d":"40,32r118,-289r171,171xm74,-2r220,-90r-129,-130"},"w":{"d":"39,-108r277,-121r0,241xm87,-108r209,92r0,-184"},"x":{"d":"39,-249r289,119r-171,170xm73,-215r90,220r131,-130"},"y":{"d":"15,-108r74,-18r-62,-46r76,12r-39,-65r64,39r-11,-75r45,61r18,-74r18,74r46,-61r-11,75r64,-39r-39,65r75,-11r-61,45r74,18r-74,18r61,45r-75,-11r39,64r-65,-39r11,75r-45,-61r-18,74r-18,-74r-45,62r11,-76r-64,39r39,-64r-75,11r61,-45xm49,-109r53,14v-1,-9,-1,-17,0,-26xm58,-59r55,-7v-4,-7,-7,-15,-10,-24xm59,-159r44,33v3,-11,3,-14,10,-24xm86,-16r48,-28v-7,-5,-14,-11,-19,-18xm116,-154v5,-7,12,-12,18,-18r-46,-30xm180,-180v-39,0,-72,33,-72,72v0,39,33,72,72,72v39,0,72,-33,72,-72v0,-39,-33,-72,-72,-72xm129,13r33,-44v-9,-2,-17,-6,-24,-10xm131,-230r7,55v9,-6,14,-7,24,-10xm167,-30r12,53r14,-53v-9,1,-17,1,-26,0xm168,-186v8,-1,17,-1,25,0r-13,-53xm198,-31r32,45r-8,-55v-7,4,-15,8,-24,10xm198,-185v10,3,14,4,24,10r8,-54xm226,-172r19,18r28,-47xm226,-44r46,29r-27,-47v-6,7,-11,13,-19,18xm247,-66r54,9r-44,-33v-3,9,-6,17,-10,24xm247,-150v6,10,7,14,10,24r44,-32xm258,-95r53,-13r-53,-13v1,9,1,17,0,26"},"z":{"d":"15,-108r74,-18r-62,-46r76,12r-39,-65r64,39r-11,-75r45,61r18,-74r18,74r46,-61r-11,75r64,-39r-39,65r75,-11r-61,45r74,18r-74,18r61,45r-75,-11r39,64r-65,-39r11,75r-45,-61r-18,74r-18,-74r-45,62r11,-76r-64,39r39,-64r-75,11r61,-45"},"{":{"d":"296,-28v-20,-43,-82,-48,-143,-48v-1,18,3,42,-2,56r-137,-84v-2,-2,-3,-5,0,-7r137,-84v5,12,0,35,2,51v77,6,139,35,143,116","w":308},"~":{"d":"-180,72v-97,0,-180,-83,-180,-180v0,-97,83,-180,180,-180v97,0,180,83,180,180v0,97,-83,180,-180,180xm-299,-206v-86,95,-5,252,119,252v37,0,69,-11,98,-35xm-61,-10v85,-97,4,-252,-119,-252v-37,0,-70,12,-98,36","w":0},"\u00a0":{"w":180}}});


var BAKERS = BAKERS || {};

(function($) {
BAKERS.ua			= new BAKERS.UA();
BAKERS.messages		= new BAKERS.Messages();
BAKERS.loader		= new BAKERS.Loader();
BAKERS.social_media	= new BAKERS.SocialMedia();
BAKERS.gutter		= new BAKERS.Gutter();
BAKERS.placeholder	= new BAKERS.Placeholder();
BAKERS.rating_stars	= new BAKERS.RatingStars();
BAKERS.lang			= new BAKERS.Language();
BAKERS.comments		= new BAKERS.Comments();
BAKERS.mobile		= new BAKERS.Mobile();
BAKERS.responsive	= new BAKERS.Responsive();


/* --------------------------
 * Initiate required classes.
 * -------------------------*/
 
BAKERS.messages.init();
BAKERS.social_media.init();
BAKERS.gutter.init();
BAKERS.placeholder.init();
BAKERS.rating_stars.init();
BAKERS.comments.init();
BAKERS.mobile.init();
BAKERS.responsive.init();

/* --------------------------
*  Recipe Infinite Scroll
* -------------------------- */

if ( $('.recipe-infinite-scroll').size() ) {

	$(window).bind('scroll', function() {

		var top = $(window).scrollTop();
		var wHeight = $(window).height();
		var bHeight	= $('body').height();
		
		if ( top <= 200 ) {
			$('.recipe-infinite-scroll-back-to-top').hide();
		} else {
			$('.recipe-infinite-scroll-back-to-top').show();
		}

		if ( top >= bHeight - wHeight - 300 ) {
			scroll_load_recipes();
		}

	});

	var recipe_scrolling = false;

	var scroll_load_recipes = function() {

		if ( recipe_scrolling === true ) 
			return;
		else 
			recipe_scrolling = true;
		
		var recipe_grid_container = $('.recipe-grid-container');

		var next_page = parseFloat(recipe_grid_container.attr('data-page')) + 1;
		recipe_grid_container.attr('data-page', next_page);

		$('.recipe-infinite-scroll').addClass('loading');

		$.ajax({
			type: 'get',
			url: recipe_grid_container.attr('data-url') + 'page/' + next_page + '/',
			data: {
				'scroll' 	: 1
			}
		}).done(function(data) {
			$('.recipe-infinite-scroll').removeClass('loading');
			var html = data;
			if ( html ) {
				$('.recipe-grid-container').append(html);
				recipe_scrolling = false;
			} else {
				$('.recipe-infinite-scroll-note-container').hide();
			}
		});

	}

}

/* ------------------------------------------------------
 * Spit out any flash data in the form of a notification.
 * -----------------------------------------------------*/
 
var BAKERS_FLASH_MESSAGE = window.BAKERS_FLASH_MESSAGE || '';
if (typeof BAKERS_FLASH_MESSAGE !== 'undefined' && BAKERS_FLASH_MESSAGE !== '') {
	BAKERS.messages.show(BAKERS_FLASH_MESSAGE);
}
if (window.location.hash === '#commented') {
	BAKERS.messages.show(BAKERS.lang.MESSAGES_COMMENT_SUCCESS);
}


/* ---------------------
 * Page Sepcific Classes
 * --------------------*/
// Home Page
if ($('body').hasClass('home-page')) {
	// Load homepage content via AJAX.
	BAKERS.loader.load('/ajax/slider', '#slider-container', function() {
		BAKERS.home_slider = new BAKERS.Slider({
			target: '#slider',
			pager: '#slider-nav'
		});
		BAKERS.responsive.change(function() {
			BAKERS.home_slider.reset();
		});
	});
	BAKERS.loader.load('/ajax/home', '#home-widget-container');

	BAKERS.home_seo = new BAKERS.Expandable({
		target: '.seo-footer-content',
		handle: '#home-find-out-more'
	});
	BAKERS.home_seo.init();
}
// Baked it Form
if ($('form[action$="/baked-it/"]').size()) {
	BAKERS.baked_it_form = new BAKERS.BakedItForm();
	BAKERS.baked_it_form.init();
}


/* -----------------------------------------
 * Trigger the search nav on certain events.
 * ----------------------------------------*/
$('#quick-search, #homepage-search').click(function(e) {
	e.preventDefault();
	BAKERS.search.show();
});


/* ----------------
 * Baked It Gallery
 * ---------------*/
BAKERS.baked_it_gallery = new BAKERS.SliderGallery({
	target: '.slider-gallery-inner',
	next: '.slider-gallery-pagination-next',
	prev: '.slider-gallery-pagination-prev'
});

if (BAKERS.baked_it_gallery.exists()) {
	BAKERS.baked_it_gallery.init();

	BAKERS.responsive.change(function() {
		BAKERS.baked_it_gallery.reset();
	});
}


/* ----------------
 * Rotating Banners
 * ---------------*/
if ($('.banner').size()) {
	BAKERS.banner = new BAKERS.Banner();
	BAKERS.banner.init({
		collapse: '.banner-collapse-section',
		open_handle: '.expand-text-link',
		close_handle: '.collapse-text-link'
	});
}
BAKERS.rotating_banner = new BAKERS.Slider({
	target: '.rotating-banner',
	fx: 'fade',
	delay: 0,
	timeout: 5000
});
// Banner responsive.
if (BAKERS.rotating_banner.exists()) {
	BAKERS.responsive.change(function() {
		BAKERS.rotating_banner.reset();
	});
}

var baked_it_id = 0;
if (window.location.hash.match(/^\#?baked\-it\-[0-9]+$/))
{
	baked_it_id = window.location.hash.match(/[0-9]+$/);
}
$('[data-toggle="baked-it"]').each(function() {

	var self = $(this),
		my_id = self.attr('data-baked-it-id'),
		img_title = $('img', self).attr('title'),
		description = self.attr('data-description'),
		username = self.attr('data-username'),
		user_avatar = self.attr('data-useravatar'),
		//user_url = self.attr('data-userlink'),
		user_title = self.attr('data-usertitle'),
		url = self.attr('data-url'),
		group = self.attr('data-colorbox-group'),
		html = '<div id="cboxTitleInside" class="clearfix">' +
					'<h2 class="baked-it-item-title">' + $('img', self).attr('title') + '</h2>' +
					'<a class="baked-it-item-user" href="/members/' + username + '/" title="View ' + username + '\'s Profile">' +
						'<img src="' + user_avatar + '" alt="' + username + '" class="avatar" title="' + username + '" />' +
						username +
					'</a>' +
					'<div class="username-title">' + user_title + '</div>' +
					'<div class="cbox-description">' + description + '</div>' +
				'</div>';

	var social = {
		title: img_title,
		description: description.replace(/<[^>]+>/, ''),
		image: self.attr('href'),
		url: url + '%23baked-it-' + my_id
	};

	var social_html = '<div class="social-media"' +
						' data-title="' + social.title + '"' +
						' data-description="' + social.description + '"' +
						' data-image="' + social.image + '" ' +
						' data-url="' + social.url + '">' +
						' <a data-type="facebook" class="social-media-btn social-media-facebook" href="#">F</a>' +
						' <a data-type="twitter" class="social-media-btn social-media-twitter" href="#">T</a>' +
						' <a data-type="pinterest" class="social-media-btn social-media-pinterest" href="#">P</a>' +
						' <a data-type="google" class="social-media-btn social-media-google" href="#">G</a>' +
					' </div>';

	$(this).colorbox({
		rel: group,
		title: function() {
			return html + social_html;
		},
		scalePhotos: true,
		opacity: 0.8,
		current: '',
		close: '&times;',
		top: '8%',
		maxWidth: '90%',
		maxHeight: '60%',
		onLoad: function() {
			$('#cboxTitle').hide();
		},
		onComplete: function() {
			$('#cboxTitle').hide().fadeIn(1000);
		},
		transition: 'fade',
		speed: 500,
		open: baked_it_id === my_id
	});
});

// User uploaded recipe markup ordering
$(window).bind("load resize", function() {
	if ($(window).width() < 767) {
		$('.recipe-header-container').insertBefore('.recipe-user-uploaded-meta-container');
	} else {
		$('.recipe-user-uploaded-meta-container').insertBefore('.recipe-header-container');
	}
});

// Related Articles
var $related_articles = $('.ajax-related-articles');
if ($related_articles.size()) {
	BAKERS.loader.get('related_articles', {
		id: $related_articles.attr('data-id')
	}, function(r) {
		$related_articles.hide().html(r).fadeIn(500);
	});
}

$('.search-nav-search textarea').attr('autocomplete', 'off');
$('#ajax-search-suggest').attr('unselectable', 'on');

// Tooltips
if (!BAKERS.ua.isTablet && !BAKERS.ua.isMobile) {
	$('.recipe-showcase img,.user-avatar img').tooltip({});
}

$('[data-toggle="promptlogin"]').live('click', function() {
	BAKERS.messages.show(BAKERS.lang.MESSAGES_REGISTER_LOGIN);
	return false;
});

var $popup_promo_close = $('.popup-promo-close a');
if ($popup_promo_close.size()) {
	$popup_promo_close.bind('click', function(e) {
		e.preventDefault();
		$('.popup-promo-cover,.popup-promo-wrapper').remove();
	});
}
var $ajax_recipes = $('.ajax-recipes');
if ($ajax_recipes.size()) {
	$ajax_recipes.each(function() {

		var self = $(this),
			method = self.attr('data-method'),
			count = self.attr('data-count'),
			id = self.attr('data-id');

		BAKERS.loader.get('recipes', {
			method: method,
			count: count,
			id: id
		}, function(r) {
			if ( ! r) { return; }
			self.html(r);
		});
	});
}

// Profile textarea limit
var descriptionLabelObj = $('.profile-edit-description-help'),
	descriptionLabelText = descriptionLabelObj.text(),
	onEditCallback = function(remaining) {
		descriptionLabelObj.html(descriptionLabelText + ' <span>(' + remaining + ')</span>');

		if (remaining > 0) {
			$(this).css('background-color', 'white');
		}
	},
	onLimitCallback = function() {
		$(this).css('background-color', '#ffaaaa');
	};

	$('#profile-edit-form textarea').limitMaxlength({
		onEdit : onEditCallback,
		onLimit : onLimitCallback,
		limit : 256
	});

/* ---------------------
 * Cross Browser Support
 * --------------------*/
// IE10
if (BAKERS.ua.ie10) {
	// Modal bug fix
	$('.modal').removeClass('fade');
}
// IE7 support for :before and :after
// Icons
if (BAKERS.ua.ie7 || BAKERS.ua.ie6) {
	var ICONS = {
		'plus' : 'A',
		'bowl' : 'B',
		'eye' : 'I',
		'search' : 'S',
		'thumb' : 'L',
		'arrow-left' : '<',
		'arrow-right' : '>',
		'arrow-up' : '=',
		'arrow-down' : 'V',
		'list' : '?',
		'arrow-back' : '{',
		'recipe-add' : '2'
	};
	for (var icon in ICONS) {
		$('.icon-' + icon).prepend('<span class="icon-before icon-' + icon + '-before">' + ICONS[icon] + '</span>');
	}
	if (BAKERS.ua.ie6) {
		Cufon.replace('.icon-before', {
			fontFamily : 'icons'
		});
		Cufon.replace('.search-icon', {
			fontFamily : 'icons'
		});
		Cufon.replace('.icon-button-icon', {
			fontFamily : 'icons'
		});
	}

	$('#btn-join-community span').after('<span id="btn-join-community-after" class="after">B</span>');

	$('.breadcrumbs li:not(:first-child)').prepend('<span>&nbsp;&gt;&nbsp;</span>');

	$('.slider-subtitle').before('<div class="slider-subtitle-before"></div>').after('<div class="slider-subtitle-after"></div>');

	if (BAKERS.ua.ie6) {
		Cufon.replace('#btn-join-community-after', {
			fontFamily : 'icons'
		});
	} else {
		// Home button on nav
		$('#menu-primary-navigation > .menu-item:first-child > a span').append('<span class="after">O</span>');
	}
	
}
})(jQuery);

// Timeout event tracking
var _gaq = _gaq || []; 
setTimeout("_gaq.push(['_trackEvent', 'Time on page', '3-minute'])",180000);

// Competition JS
var BAKERS = BAKERS || {};
(function(){

// Initiate slider.
var competition_slider = new BAKERS.Slider({
	target: '#slider',
	pager: '#slider-nav'
});
//competition_slider.init();
competition_slider.reset();

// Recreate slider on responsive change.
BAKERS.responsive.change(function() {
	competition_slider.reset();
});

// More content slide
if ( $('body').hasClass('single-kd_contest_page') ) {
	var competition_content = new BAKERS.Expandable({
		handle: '.expand-text-link',
		target: '.banner-collapse-section',
		openText: 'more',
		closedText: 'less'
	});
	competition_content.init();
}

if (BAKERS.InstantPreview) {
	var instant_preview = new BAKERS.InstantPreview({
		source: '.instant-preview input',
		target: '.summer-comp-recipe-image'
	});
	instant_preview.init();
}

// Recipe voting controls.
var KD_CONTEST_ALWAYS_WAITING_QUEUE = [];
function register_vote_events(scope) {
	if (typeof scope === 'undefined') {
		scope = $('body');
	}
	$('[data-toggle="recipe-vote"]', scope).on('click', function(e) {
		e.preventDefault();

		if ($.inArray(this, KD_CONTEST_ALWAYS_WAITING_QUEUE) === -1) {
			KD_CONTEST_ALWAYS_WAITING_QUEUE.push(this);
		} else {
			BAKERS.messages.show('You have already voted for this recipe');
			return false;
		}

		var $self = $(this),
			href = $self.attr('href');

		$.ajax({
			url: href
		}).done(function(data) {
			if (data === 'true') {
				var $count = $('.recipe-vote-count', $self.parent());
				$count.text(parseInt($count.text(), 10) + 1);
				if ($self.parents('.recipe-vote')[0]) {
					$self.remove();
				}

				build_vote_popup({
					username: $self.attr('data-username'),
					title: $self.attr('data-title'),
					description: $self.attr('data-description'),
					twitter_description: $self.attr('data-twitter-description'),
					image: $self.attr('data-image'),
					url: $self.attr('data-url')
				});
			} else if (data === 'false') {
				BAKERS.messages.show('You have already voted for this recipe');
			}
		});

		return false;
	});
}
register_vote_events();

// Lazy load
var lazy_load = $('.recipe-lazy-load'),
	lazy_load_page = 1,
	lazy_load_order = 'desc',
	lazy_load_order_by_votes = 0,
	lazy_loading = false;

if (lazy_load.get(0)) {
	$(window).bind('scroll', function() {
		var $self = $(this),
			top = $self.scrollTop(),
			wHeight = $self.height(),
			height = $('body').height();

		if (top >= height - wHeight - 600) {
			load_iscroll_items();
		}
	});

	var load_iscroll_items = function() {
		if ( ! lazy_loading) {
			lazy_loading = true;
			lazy_load_page++;

			$('.recipe-lazy-loader').addClass('loading');

			$.ajax({
				type: 'get',
				url: lazy_load.attr('data-url'),
				data: {
					iscroll: 1,
					page_num: lazy_load_page,
					form_id: lazy_load.attr('data-id'),
					order: lazy_load_order,
					order_by_votes: lazy_load_order_by_votes
				},
				dataType: 'json'
			}).done(function(data) {
				$('.recipe-lazy-loader').removeClass('loading');
				lazy_loading = false;
				if (data.found_entries) {
					var html = $(data.entries_html);
					html.hide();
					$('.recipe-grid', lazy_load).append(html);

					register_vote_events(html);

					html.fadeIn(500);
				} else {
					$('.recipe-lazy-loader', lazy_load).hide();
					$('.recipe-lazy-loader', lazy_load).next('.section').hide();
				}
			});
		}
	};

	$('.section-tools-last-entries').bind('click', function(e) {
		e.preventDefault();

		$('.active', $(this).parent()).removeClass('active');
		$(this).addClass('active');

		lazy_load_page = 0;
		lazy_load_order = 'desc';
		lazy_load_order_by_votes = 0;

		$('.recipe-grid', lazy_load).empty();

		$('.recipe-lazy-loader', lazy_load).show();
		$('.recipe-lazy-loader', lazy_load).next('.section').show();

		load_iscroll_items();
	});
	$('.section-tools-most-popular').bind('click', function(e) {
		e.preventDefault();

		$('.active', $(this).parent()).removeClass('active');
		$(this).addClass('active');

		lazy_load_page = 0;
		lazy_load_order = 'desc';
		lazy_load_order_by_votes = 1;

		$('.recipe-grid', lazy_load).empty();

		$('.recipe-lazy-loader', lazy_load).show();
		$('.recipe-lazy-loader', lazy_load).next('.section').show();

		load_iscroll_items();
	});
}

function build_vote_popup(opts) {
var popup = $(['<div class="popup-promo-cover"></div>',
'<div class="popup-promo-wrapper summer-promo">',
	'<div class="popup-promo">',
		'<div class="popup-promo-inner">',
			'<div class="popup-promo-content">',
				'<div class="popup-promo-title">Thank you for voting!</div>',
				'<div class="popup-promo-subtitle">',
					'Help <span class="data-username">' + opts.username + '</span> win by sharing this entry with your friends',
				'</div>',
				'<div class="popup-promo-description">',
					'<div class="social-media social-media-large"',
					'data-title="' + opts.title + '" ',
					'data-description="' + opts.description + '"',
					'data-image="' + opts.image + '"',
					'data-url="' + opts.url + '">',
						'<a data-description="' + $('#voted-facebook-text').html() + '" data-type="facebook" class="social-media-btn social-media-facebook" href="#">F</a>',
						'<a data-title="' + $('#voted-twitter-text').html() + '" data-type="twitter" class="social-media-btn social-media-twitter" href="#">T</a>',
						'<a data-description="' + $('#voted-pinterest-text').html() + '" data-type="pinterest" class="social-media-btn social-media-pinterest" href="#">P</a>',
						'<a data-type="google" class="social-media-btn social-media-google" href="#">G</a>',
					'</div>',
				'</div>',
			'</div>',
			'<div class="popup-promo-close"><a class="text-btn" href="#"><strong>&times;</strong> Close</a></div>',
		'</div>',
	'</div>',
'</div>'].join(''));

$('body').append(popup);

$('.popup-promo-close', popup).click(function(e) {
	e.preventDefault();
	popup.remove();
});

popup.fadeIn(500);
}

})(jQuery);

jQuery(document).ready(function($)
{
	// event handler for sort drop down
	$('select.sort').change(function(event)
	{
		$(this).closest('form').submit();
	});

	// needed so we don't search for 'Search for recipes...'
	$('form.recipe-search').submit(function(event)
	{
		if ($('.recipe-search-input').val() == 'Search for recipes...')
		{
			$('.recipe-search-input').val('');
		}
	});
});

// Bootstrap IE6
if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) === 6)
{
	jQuery(function($)
	{
		$('.row-fluid > [class*="span"]').addClass('fluid-span');
	});
}

////////////////////////////////////////////////////////////////////////////////
//
// ------------------------------ SwiftType SEARCH -----------------------------
//
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function()
{
	// Prevent a traditional form submission
	$('#search-form form').submit(function(event)
	{
		event.preventDefault();
	});

	// Prevent the up/down arrows, tab and tab+shift from doing their defaults.
	$('#search-form input').keydown(function(event)
	{
		if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 9 || (event.keyCode == 9 && event.shiftKey))
		{
			event.preventDefault();
		}
	});

	// This provides auto suggest functionality
	$('#search-form input').keyup(function(event)
	{
		// If the user hits enter trigger a search request instead
		if (event.keyCode == 13)
		{
			// If autosuggest has selected option, go to that option url on enter button pressed
			if($("#search-form .autosuggest a.option-selected").length)
			{
				window.location.href = $("#search-form .autosuggest .option-selected").attr("href");
			}
			// Else, go to search result page
			else
			{
				$('#search-form .search-text').trigger('click');
			}
		}
		// If arrow navigation is used to select auto suggest item
		else if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 9 || (event.keyCode == 9 && event.shiftKey))
		{
			// Key Arrow: Down
			if(event.keyCode == 40 || (event.keyCode == 9 && !event.shiftKey))
			{
				// If option has been selected, move selection down to the next option
				if($("#search-form .autosuggest a.option-selected").length)
				{
					var option = $("#search-form .autosuggest a.option-selected").removeClass("option-selected");
					var option_next = null;

					// If last item, next item should be "View All" button
					if(option.is("#search-form .autosuggest > a:last"))
					{
						option_next = $("#search-form .autosuggest a:last");
					}
					// If "View All" button is selected, next item is going up again to the first item
					else if(option.is("#search-form .autosuggest a:last"))
					{
						option_next = $("#search-form .autosuggest a:first");
					}
					else
					{
						option_next = option.next();
						while(!option_next.is("a")) {
							option_next = option_next.next();
						}
					}
					option_next.addClass("option-selected");
				}
				// If not, select first option
				else
				{
					$("#search-form .autosuggest  a:first").addClass("option-selected");
				}
			}
			// Key Arrow: Up
			else if(event.keyCode == 38 || (event.keyCode == 9 && event.shiftKey))
			{
				// If option has been selected, move selection up to the previous option
				if($("#search-form .autosuggest a.option-selected").length)
				{
					var option = $("#search-form .autosuggest a.option-selected").removeClass("option-selected");
					var option_next = null;

					// If first item, next item should be "View All" button
					if(option.is("#search-form .autosuggest > a:first"))
					{
						option_next = $("#search-form .autosuggest a:last");
					}
					// If "View All" button is selected, next item is the last autosuggest item
					else if(option.is("#search-form .autosuggest a:last"))
					{
						option_next = $("#search-form .autosuggest > a:last");
					}
					else
					{
						option_next = option.prev();
						while(!option_next.is("a")) {
							option_next = option_next.prev();
						}
					}
					option_next.addClass("option-selected");
				}
				// If not, select first option
				else
				{
					$("#search-form .autosuggest  a:last").addClass("option-selected");
				}
			}
		}
		else
		{
			// Grab the value from the search box
			var value = $('#search-form input').val();

			// Unless we have at least 3 or more characters,
			// the auto suggest is basically useless.
			if (value.length > 3)
			{
				// Show the loading gif
				$('#search-form input').css('background-image', 'url("/wp-content/themes/bakers/assets/img/ajax-loader-search.gif")');

				// Make the JSONP request
				this._xhr = $.getJSON('https://api.swiftype.com/api/v1/public/engines/search.json?callback=?', {'q':value, 'per_page':5, 'engine_key':'PaSkzHsFJYamWeVbK971'}, function(response, status, xhr)
				{
					// Only run the latest request.
					if (this._xhr !== xhr) return;

					// Remove the loading gif
					$('#search-form input').css('background-image', 'url("/wp-content/themes/bakers/assets/img/search-icon.png")');

					// Add up all the results we have
					var record_count =
						response.records.premium.length +
						response.records.community.length +
						response.records.products.length +
						response.records.learn.length
					;

					// Make sure we have some results to show
					if (record_count == 0) return;

					/*
					 * This is going to slightly tricky. What we need to do is
					 * show a maximum of 10 suggestions, otherwise the
					 * suggestion box will become too massive and pointless.
					 * 
					 * But we don't want to show 10 Premium Recipes and none of
					 * the other types. Nor do we want to show only 2 Premium
					 * Recipes if there are no other suggestions for the other
					 * types.
					 * 
					 * Its a bit like dealing a deck of cards.
					 */

					var total_allowed_suggestions = 7;

					// This ensures we don't get stuck in the below loop,
					// when there are less the $total_allowed_suggestions.
					if (record_count > total_allowed_suggestions)
					{
						var allowed_suggestions = total_allowed_suggestions;
					}
					else
					{
						var allowed_suggestions = record_count;
					}

					// Keep track of how many suggestions we have extracted
					var total = 0;

					// Create a list of suggestions
					var suggestions = {};

					// Loop through each document type and it's suggestions until we have 10
					while (allowed_suggestions > total)
					{
						$.each(response.records, function(type, records)
						{
							if (records.length > 0 && allowed_suggestions > total)
							{
								// Create the type
								if (typeof suggestions[type] == 'undefined')
								{
									suggestions[type] = [];
								}

								// Grab the suggestion
								var suggestion = records.shift();

								// Get the title
								if (typeof suggestion.highlight.post_title == 'undefined')
								{
									var title = suggestion.post_title;
								}
								else
								{
									var title = suggestion.highlight.post_title;
								}

								// Add it to our array
								suggestions[type][suggestions[type].length] =
								{
									'title': title,
									'link': suggestion.permalink,
									'thumb': suggestion.thumb
								};

								// Increment our tally
								total++;	
							}
						});
					}

					// Now lets build some HTML
					var html = '';

					if (typeof suggestions.premium != 'undefined')
					{
						html = html + '<h3>Recipes</h3>';

						$.each(suggestions.premium, function(index, suggestion)
						{
							html = html + '<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';
						});
					}

					if (typeof suggestions.community != 'undefined')
					{
						html = html + '<h3>Community Recipes</h3>';

						$.each(suggestions.community, function(index, suggestion)
						{
							html = html + '<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';
						});
					}

					if (typeof suggestions.products != 'undefined')
					{
						html = html + '<h3>Products</h3>';

						$.each(suggestions.products, function(index, suggestion)
						{
							html = html + '<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';
						});
					}

					if (typeof suggestions.learn != 'undefined')
					{
						html = html + '<h3>Learn to Bake</h3>';

						$.each(suggestions.learn, function(index, suggestion)
						{
							html = html + '<a href="'+suggestion['link']+'" class="autosuggest_item">'+suggestion['thumb']+'<span>'+suggestion['title']+'</span></a>';
						});
					}

					html = html + '<div class="autosuggest-bottom"><a href="/?s='+$('#search-form input').val()+'" class="bakers-btn-primary">View All Search Results</a></div>';

					// Add the html to the dom
					$('#search-form .autosuggest').html(html);
					$('#search-form .autosuggest').show();

				}.bind(this));
			}
			else
			{
				if (value == '')
				{
					$('#search-form .autosuggest').hide();
				}
			}
		}
	});

	// Hide the auto suggest when input loses focus
	$('#search-form input').blur(function(event)
	{
		setTimeout(function(){ $('#search-form .autosuggest').hide(); }, 500);
	});

	// Re-show autosuggest when input regains focus
	// and autosuggest has already been fectched.
	$('#search-form input').focus(function(event)
	{
		$("html,body").animate({ scrollTop: $("#search-outer").offset().top }, 500);
		if ($('#search-form .autosuggest').html() != '')
		{
			$('#search-form .autosuggest').show();
		}
	});

	// Handle the main click event on the search button.
	// Redirect to main search page.
	$('#search-form .search_btn').click(function()
	{
		var value = $('#search-form input').val();

		if (value != '' && value != 'Search baking recipes, products and tips')
		{
			window.location = '/?s=' + $('#search-form input').val();
		}
		else
		{
			$('#search-form input').focus();
		}
	});
	
	// Handle on hover event to autosuggest item to have option-selected status
	$('#search-form .autosuggest a').live('mouseenter', function()
	{
		$("#search-form .autosuggest a.option-selected").removeClass("option-selected");
		$(this).addClass("option-selected");
	});

	// This makes the tabs work on the search results page
	$('.search-result-tab-title a').click(function()
	{
		$('.search-result-tab-title a').removeClass('active');
		$(this).addClass('active');
		$('.search-result-tab-content .tab-content-main').hide();
		$('.tab-content[data-tab-no="'+$(this).attr('data-tab-no')+'"] .tab-content-main').show();
	});

	// Mobile tabs
	$('a.tab-content-title').click(function()
	{
		$('.tab-content-main').hide();
		var el = $('.tab-content[data-tab-no="'+$(this).parent().attr('data-tab-no')+'"] .tab-content-main');
		var orig_height = el.css("height");
		el.css("height","0px");
		el.show();
		el.animate({ height: orig_height }, 1000, 'linear', function()
		{
			$(this).css("height","");
		});
		$('html, body').animate( { scrollTop: el.offset().top - 73 }, 500);
		return false;
	});

	// Search results pagination handler
	$('#search-result-tab .pagination').each(function(i, e)
	{
		var xhr;

		var type = $(e).attr('data-type');

		$(e).pagination
		({
			displayedPages: 3,
			pages: $(e).attr('data-no-pages'),
			hrefTextSuffix: '-'+type,
			onPageClick: function(page)
			{
				// Abort previous request
				if(xhr && xhr.readyState != 4) xhr.abort();

				// Show a loading gif
				$('.'+type+' .tab-content-list').html
				(
					'<p class="loading-text">'+
						'<img src="/wp-content/themes/bakers/assets/img/ajax-loader-search.gif"> '+
						'<span>Loading results, please wait...</span>'+
					'</p>'
				);

				var params =
				{
					'action': 'search_pagination',
					'q': $('#search-result-tab').attr('data-query'),
					'page': page,
					'type': type
				};

				xhr = $.post(ajaxurl, params, function(r)
				{
					$('.'+type+' .tab-content-list').html(r);
				});
			}
		});
	});	
});

/**
 * CssUserAgent (cssua.js) v2.1.28
 * http://cssuseragent.org
 * 
 * Copyright (c)2006-2014 Stephen M. McKamey.
 * Licensed under The MIT License.
 */
/*jshint smarttabs:true, regexp:false, browser:true */

/**
 * @type {Object}
 */
var cssua = (

/**
 * @param html {Object} root DOM element
 * @param userAgent {string} browser userAgent string
 * @return {Object}
 */
function(html, userAgent, sa) {
	'use strict';

	/**
	 * @const
	 * @type {string}
	 */
	var PREFIX = ' ua-';

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_Platform = /\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_Version = /([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_BlackBerry = /\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_Silk = /\bsilk-accelerated=true\b/;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_FluidApp = /\bfluidapp\b/;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_desktop = /(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_mobile = /(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/;

	/**
	 * @const
	 * @type {RegExp}
	 */
	var R_game = /(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/;

	/**
	 * The root CssUserAgent
	 * @type {Object}
	 */
	var cssua = {

		parse:
			/**
			 * @param uaStr {string}
			 * @return {Object}
			 */
			function(uaStr, sa) {

				/**
				 * @type {Object}
				 */
				var ua = {};
				if (sa) {
					ua.standalone = sa;
				}

				uaStr = (''+uaStr).toLowerCase();
				if (!uaStr) {
					return ua;
				}

				var i, count, raw = uaStr.split(/[()]/);
				for (var j=0, rawCount=raw.length; j<rawCount; j++) {
					if (j%2) {
						// inside parens covers platform identifiers
						var platforms = raw[j].split(';');
						for (i=0, count=platforms.length; i<count; i++) {
							if (R_Platform.exec(platforms[i])) {
								var key = RegExp.$1.split(' ').join('_'),
									val = RegExp.$2;

								// if duplicate entries favor highest version
								if ((!ua[key] || parseFloat(ua[key]) < parseFloat(val))) {
									ua[key] = val;
								}
							}
						}

					} else {
						// outside parens covers most version identifiers
						var uas = raw[j].match(R_Version);
						if (uas) {
							for (i=0, count=uas.length; i<count; i++) {
								var parts = uas[i].split(/[\/\s]+/);
								if (parts.length && parts[0] !== 'mozilla') {
									ua[parts[0].split(' ').join('_')] = parts.slice(1).join('-');
								}
							}
						}
					}
				}

				if (R_mobile.exec(uaStr)) {
					// mobile device indicators
					ua.mobile = RegExp.$1;
					if (R_BlackBerry.exec(uaStr)) {
						delete ua[ua.mobile];
						ua.blackberry = ua.version || RegExp.$3 || RegExp.$2 || RegExp.$1;
						if (RegExp.$1) {
							// standardize non-tablet blackberry
							ua.mobile = 'blackberry';
						} else if (ua.version === '0.0.1') {
							// fix playbook 1.0 quirk
							ua.blackberry = '7.1.0.0';
						}
					}

				} else if (R_desktop.exec(uaStr)) {
					// desktop OS indicators
					ua.desktop = RegExp.$1;

				} else if (R_game.exec(uaStr)) {
					// game console indicators
					ua.game = RegExp.$1;
					var game = ua.game.split(' ').join('_');

					if (ua.version && !ua[game]) {
						ua[game] = ua.version;
					}
				}

				// platform naming standardizations
				if (ua.intel_mac_os_x) {
					ua.mac_os_x = ua.intel_mac_os_x.split('_').join('.');
					delete ua.intel_mac_os_x;

				} else if (ua.cpu_iphone_os) {
					ua.ios = ua.cpu_iphone_os.split('_').join('.');
					delete ua.cpu_iphone_os;

				} else if (ua.cpu_os) {
					ua.ios = ua.cpu_os.split('_').join('.');
					delete ua.cpu_os;

				} else if (ua.mobile === 'iphone' && !ua.ios) {
					ua.ios = '1';
				}

				// UA naming standardizations
				if (ua.opera && ua.version) {
					ua.opera = ua.version;
					// version/XXX refers to opera
					delete ua.blackberry;

				} else if (R_Silk.exec(uaStr)) {
					ua.silk_accelerated = true;

				} else if (R_FluidApp.exec(uaStr)) {
					ua.fluidapp = ua.version;
				}

				if (ua.applewebkit) {
					ua.webkit = ua.applewebkit;
					delete ua.applewebkit;

					if (ua.opr) {
						ua.opera = ua.opr;
						delete ua.opr;
						delete ua.chrome;
					}

					if (ua.safari) {
						if (ua.chrome || ua.crios || ua.opera || ua.silk || ua.fluidapp || ua.phantomjs || (ua.mobile && !ua.ios)) {
							delete ua.safari;

						} else if (ua.version && !ua.rim_tablet_os) {
							ua.safari = ua.version;

						} else {
							ua.safari = ({
								'419': '2.0.4',
								'417': '2.0.3',
								'416': '2.0.2',
								'412': '2.0',
								'312': '1.3',
								'125': '1.2',
								'85': '1.0'
							})[parseInt(ua.safari, 10)] || ua.safari;
						}
					}

				} else if (ua.msie || ua.trident) {
					if (!ua.opera) {
						// standardize Internet Explorer
						ua.ie = ua.msie || ua.rv;
					}
					delete ua.msie;

					if (ua.windows_phone_os) {
						// standardize window phone
						ua.windows_phone = ua.windows_phone_os;
						delete ua.windows_phone_os;

					} else if (ua.mobile === 'wpdesktop' || ua.mobile === 'xblwp7' || ua.mobile === 'zunewp7') {
						ua.mobile = 'windows desktop';
						ua.windows_phone = (+ua.ie < 9) ? '7.0' : (+ua.ie < 10) ? '7.5' : '8.0';
						delete ua.windows_nt;
					}

				} else if (ua.gecko || ua.firefox) {
					ua.gecko = ua.rv;
				}

				if (ua.rv) {
					delete ua.rv;
				}
				if (ua.version) {
					delete ua.version;
				}

				return ua;
			},

		format:
			/**
			 * @param ua {Object}
			 * @return {string}
			 */
			function (ua) {
				/**
				 * @param b {string} browser key
				 * @param v {string} browser value
				 * @return {string} formatted CSS classes
				 */
				function format(b, v) {
					b = b.split('.').join('-');

					/**
					 * @type {string}
					 */
					var css = PREFIX+b;
					if (typeof v === 'string') {
						v = v.split(' ').join('_').split('.').join('-');
						var i = v.indexOf('-');
						while (i > 0) {
							// loop through chopping last '-' to end off
							// concat result onto return string
							css += PREFIX+b+'-'+v.substring(0, i);
							i = v.indexOf('-', i+1);
						}
						css += PREFIX+b+'-'+v;
					}
					return css;
				}
	
				/**
				 * @type {string}
				 */
				var	uaCss = '';
				for (var b in ua) {
					if (b && ua.hasOwnProperty(b)) {
						uaCss += format(b, ua[b]);
					}
				}
	
				// user-agent classNames
				return uaCss;
			},

		encode:
			/**
			 * Encodes parsed userAgent object as a compact URI-Encoded key-value collection
			 * @param ua {Object}
			 * @return {string}
			 */
			function(ua) {
				var query = '';
				for (var b in ua) {
					if (b && ua.hasOwnProperty(b)) {
						if (query) {
							query += '&';
						}
						query += encodeURIComponent(b)+'='+encodeURIComponent(ua[b]);
					}
				}
				return query;
			}
	};

	/**
	 * @const
	 * @type {Object}
	 */
	cssua.userAgent = cssua.ua = cssua.parse(userAgent, sa);

	/**
	 * @const
	 * @type {string}
	 */
	var ua = cssua.format(cssua.ua)+' js';

	// append CSS classes to HTML node
	if (html.className) {
		html.className = html.className.replace(/\bno-js\b/g, '') + ua;
		
	} else {
		html.className = ua.substr(1);
	}

	return cssua;

})(document.documentElement, navigator.userAgent, navigator.standalone);


// Autosize 1.13 - jQuery plugin for textareas
// (c) 2012 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php

(function ($) {
	var
	hidden = 'hidden',
	borderBox = 'border-box',
	lineHeight = 'lineHeight',
	copy = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
	// line-height is omitted because IE7/IE8 doesn't return the correct value.
	copyStyle = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent'
	],
	oninput = 'oninput',
	onpropertychange = 'onpropertychange',
	test = $(copy)[0];

	// For testing support in old FireFox
	test.setAttribute(oninput, "return");

	if ($.isFunction(test[oninput]) || onpropertychange in test) {

		// test that line-height can be accurately copied to avoid
		// incorrect value reporting in old IE and old Opera
		$(test).css(lineHeight, '99px');
		if ($(test).css(lineHeight) === '99px') {
			copyStyle.push(lineHeight);
		}

		$.fn.autosize = function (options) {
			options = options || {};

			return this.each(function () {
				var
				ta = this,
				$ta = $(ta),
				mirror,
				minHeight = $ta.height(),
				maxHeight = parseInt($ta.css('maxHeight'), 10),
				active,
				i = copyStyle.length,
				resize,
				boxOffset = 0,
				value = ta.value,
				callback = $.isFunction(options.callback);

				if ($ta.css('box-sizing') === borderBox || $ta.css('-moz-box-sizing') === borderBox || $ta.css('-webkit-box-sizing') === borderBox){
					boxOffset = $ta.outerHeight() - $ta.height();
				}

				if ($ta.data('mirror') || $ta.data('ismirror')) {
					// if autosize has already been applied, exit.
					// if autosize is being applied to a mirror element, exit.
					return;
				} else {
					mirror = $(copy).data('ismirror', true).addClass(options.className || 'autosizejs')[0];

					resize = $ta.css('resize') === 'none' ? 'none' : 'horizontal';

					$ta.data('mirror', $(mirror)).css({
						overflow: hidden,
						overflowY: hidden,
						wordWrap: 'break-word',
						resize: resize
					});
				}

				// Opera returns '-1px' when max-height is set to 'none'.
				maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

				// Using mainly bare JS in this function because it is going
				// to fire very often while typing, and needs to very efficient.
				function adjust() {
					var height, overflow, original;

					// the active flag keeps IE from tripping all over itself.  Otherwise
					// actions in the adjust function will cause IE to call adjust again.
					if (!active) {
						active = true;
						mirror.value = ta.value;
						mirror.style.overflowY = ta.style.overflowY;
						original = parseInt(ta.style.height,10);

						// Update the width in case the original textarea width has changed
						mirror.style.width = $ta.css('width');

						// Needed for IE to reliably return the correct scrollHeight
						mirror.scrollTop = 0;

						// Set a very high value for scrollTop to be sure the
						// mirror is scrolled all the way to the bottom.
						mirror.scrollTop = 9e4;

						height = mirror.scrollTop;
						overflow = hidden;
						if (height > maxHeight) {
							height = maxHeight;
							overflow = 'scroll';
						} else if (height < minHeight) {
							height = minHeight;
						}
						height += boxOffset;
						ta.style.overflowY = overflow;

						if (original !== height) {
							ta.style.height = height + 'px';
							if (callback) {
								options.callback.call(ta);
							}
						}
						
						// This small timeout gives IE a chance to draw it's scrollbar
						// before adjust can be run again (prevents an infinite loop).
						setTimeout(function () {
							active = false;
						}, 1);
					}
				}

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				while (i--) {
					mirror.style[copyStyle[i]] = $ta.css(copyStyle[i]);
				}

				$('body').append(mirror);

				if (onpropertychange in ta) {
					if (oninput in ta) {
						// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
						// so binding to onkeyup to catch most of those occassions.  There is no way that I
						// know of to detect something like 'cut' in IE9.
						ta[oninput] = ta.onkeyup = adjust;
					} else {
						// IE7 / IE8
						ta[onpropertychange] = adjust;
					}
				} else {
					// Modern Browsers
					ta[oninput] = adjust;

					// The textarea overflow is now hidden.  But Chrome doesn't reflow the text after the scrollbars are removed.
					// This is a hack to get Chrome to reflow it's text.
					ta.value = '';
					ta.value = value;
				}

				$(window).resize(adjust);

				// Allow for manual triggering if needed.
				$ta.bind('autosize', adjust);

				// Call adjust in case the textarea already contains text.
				adjust();
			});
		};
	} else {
		// Makes no changes for older browsers (FireFox3- and Safari4-)
		$.fn.autosize = function (callback) {
			return this;
		};
	}

}(jQuery));

// v1.3.21
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		transition: "elastic",
		speed: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		inline: false,
		html: false,
		iframe: false,
		fastIframe: true,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 0.9,
		preloading: true,

		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		open: false,
		returnFocus: true,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined
	},
	
	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',
	
	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',
	
	// Special Handling for IE
	isIE = !$.support.leadingWhitespace, // IE6 to IE8
	isIE6 = isIE && !window.XMLHttpRequest, // IE6
	event_ie6 = prefix + '_IE6',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	
	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	element,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Convience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : $window.height()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo || /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(url);
	}

	// Assigns function results to their respective properties
	function makeSettings() {
		var i,
			data = $.data(element, colorbox);
		
		if (data == null) {
			settings = $.extend({}, defaults);
			if (console && console.log) {
				console.log('Error: cboxElement missing settings object');
			}
		} else {
			settings = $.extend({}, data);
		}
		
		for (i in settings) {
			if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
				settings[i] = settings[i].call(element);
			}
		}
		
		settings.rel = settings.rel || element.rel || $(element).data('rel') || 'nofollow';
		settings.href = settings.href || $(element).attr('href');
		settings.title = settings.title || element.title;
		
		if (typeof settings.href === "string") {
			settings.href = $.trim(settings.href);
		}
	}

	function trigger(event, callback) {
		$(document).trigger(event);
		$('*', $box).trigger(event);
		if (callback) {
			callback.call(element);
		}
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		start,
		stop;
		
		if (settings.slideshow && $related[1]) {
			start = function () {
				$slideshow
					.html(settings.slideshowStop)
					.unbind(click)
					.bind(event_complete, function () {
						if (settings.loop || $related[index + 1]) {
							timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
						}
					})
					.bind(event_load, function () {
						clearTimeout(timeOut);
					})
					.one(click + ' ' + event_cleanup, stop);
				$box.removeClass(className + "off").addClass(className + "on");
				timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
			};
			
			stop = function () {
				clearTimeout(timeOut);
				$slideshow
					.html(settings.slideshowStart)
					.unbind([event_complete, event_load, event_cleanup, click].join(' '))
					.one(click, function () {
						publicMethod.next();
						start();
					});
				$box.removeClass(className + "on").addClass(className + "off");
			};
			
			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		} else {
			$box.removeClass(className + "off " + className + "on");
		}
	}

	function launch(target) {
		if (!closing) {
			
			element = target;
			
			makeSettings();
			
			$related = $(element);
			
			index = 0;
			
			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var data = $.data(this, colorbox),
						relRelated;

					if (data) {
						relRelated =  $(this).data('rel') || data.rel || this.rel;
					}
					
					return (relRelated === settings.rel);
				});
				index = $related.index(element);
				
				// Check direct calls to ColorBox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}
			
			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				
				$box.show();
				
				if (settings.returnFocus) {
					$(element).blur();
					$(document).one(event_closed, function () {
						$(element).focus();
					});
				}
				
				// +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
				$overlay.css({"opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();
				
				// Opens inital empty ColorBox prior to content being loaded.
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position();
				
				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}
				
				trigger(event_open, settings.onOpen);
				
				$groupControls.add($title).hide();
				
				$close.html(settings.close).show();
			}
			
			publicMethod.load(true);
		}
	}

	// ColorBox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box && document.body) {
			init = false;

			$window = $(window);
			$box = $tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
			$overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
			$loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic"));
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$loaded = $tag(div, "LoadedContent", 'width:0; height:0; overflow:hidden'),
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$next = $tag(div, "Next"),
				$prev = $tag(div, "Previous"),
				$slideshow = $tag(div, "Slideshow").bind(event_open, slideshow),
				$close = $tag(div, "Close")
			);
			
			$wrap.append( // The 3x3 Grid that makes up ColorBox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
			
			$groupControls = $next.add($prev).add($current).add($slideshow);

			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add ColorBox's event bindings
	function addBindings() {
		if ($box) {
			if (!init) {
				init = true;

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.overlayClose) {
						publicMethod.close();
					}
				});
				
				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.escKey && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.arrowKey && $related[1]) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				$(document).delegate('.'+boxElement, 'click', function(e) {
					// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
					// See: http://jacklmoore.com/notes/click-events/
					if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
						e.preventDefault();
						launch(this);
					}
				});
			}
			return true;
		}
		return false;
	}

	// Don't do anything if ColorBox already exists.
	if ($.colorbox) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.fn.colorbox.close();
	// Usage from within an iframe: parent.$.fn.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this;
		
		options = options || {};
		
		appendHTML();

		if (addBindings()) {
			if (!$this[0]) {
				if ($this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
					return $this;
				}
				// if no selector was given (ie. $.colorbox()), create a temporary element to work with
				$this = $('<a/>');
				options.open = true; // assume an immediate open
			}
			
			if (callback) {
				options.onComplete = callback;
			}
			
			$this.each(function () {
				$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			}).addClass(boxElement);
			
			if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
				launch($this[0]);
			}
		}
		
		return $this;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;
		
		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.fixed && !isIE6) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.right !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
		} else if (settings.left !== false) {
			left += setSize(settings.left, 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}
		
		if (settings.bottom !== false) {
			top += Math.max($window.height() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
		} else if (settings.top !== false) {
			top += setSize(settings.top, 'y');
		} else {
			top += Math.round(Math.max($window.height() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left});

		// setting the speed to 0 to reduce the delay between same-sized content.
		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions(that) {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt(that.style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt(that.style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		if(speed===0){ // temporary workaround to side-step jQuery-UI 1.8 bug (http://bugs.jquery.com/ticket/12273)
			$box.css(css);
		}
		$box.dequeue().animate(css, {
			duration: speed,
			complete: function () {
				modalDimensions(this);
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (settings.reposition) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if (loadedCallback) {
					loadedCallback();
				}
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}
			$loaded.css({height: settings.h});
			
			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.transition === "none" ? 0 : settings.speed;
		
		$loaded.remove();
		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
		
		$(photo).css({'float': 'none'});

		
		callback = function () {
			var total = $related.length,
				iframe,
				frameBorder = 'frameBorder',
				allowTransparency = 'allowTransparency',
				complete;
			
			if (!open) {
				return;
			}
			
			function removeFilter() {
				if (isIE) {
					$box[0].style.removeAttribute('filter');
				}
			}
			
			complete = function () {
				clearTimeout(loadingTimer);
				// Detaching forces Andriod stock browser to redraw the area underneat the loading overlay.  Hiding alone isn't enough.
				$loadingOverlay.detach().hide();
				trigger(event_complete, settings.onComplete);
			};
			
			if (isIE) {
				//This fadeIn helps the bicubic resampling to kick-in.
				if (photo) {
					$loaded.fadeIn(100);
				}
			}
			
			$title.html(settings.title).add($loaded).show();
			
			if (total > 1) { // handle grouping
				if (typeof settings.current === "string") {
					$current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
				}
				
				$next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
				$prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);
				
				if (settings.slideshow) {
					$slideshow.show();
				}
				
				// Preloads images within a rel group
				if (settings.preloading) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var src,
							img,
							i = $related[this],
							data = $.data(i, colorbox);

						if (data && data.href) {
							src = data.href;
							if ($.isFunction(src)) {
								src = src.call(i);
							}
						} else {
							src = i.href;
						}

						if (isImage(src)) {
							img = new Image();
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}
			
			if (settings.iframe) {
				iframe = $tag('iframe')[0];
				
				if (frameBorder in iframe) {
					iframe[frameBorder] = 0;
				}
				
				if (allowTransparency in iframe) {
					iframe[allowTransparency] = "true";
				}

				if (!settings.scrolling) {
					iframe.scrolling = "no";
				}
				
				$(iframe)
					.attr({
						src: settings.href,
						name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
						'class': prefix + 'Iframe',
						allowFullScreen : true, // allow HTML5 video to go fullscreen
						webkitAllowFullScreen : true,
						mozallowfullscreen : true
					})
					.one('load', complete)
					.appendTo($loaded);
				
				$(document).one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.fastIframe) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}
			
			if (settings.transition === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};
		
		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	publicMethod.load = function (launched) {
		var href, setResize, prep = publicMethod.prep, $inline;
		
		active = true;
		
		photo = false;
		
		element = $related[index];
		
		if (!launched) {
			makeSettings();
		}
		
		trigger(event_purge);
		
		trigger(event_load, settings.onLoad);
		
		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');
		
		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.href;
		
		loadingTimer = setTimeout(function () {
			$loadingOverlay.show().appendTo($content);
		}, 100);
		
		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when ColorBox closes or loads new content.
			$inline = $tag(div).hide().insertBefore($(href)[0]);

			$(document).one(event_purge, function () {
				$inline.replaceWith($loaded.children());
			});

			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(href)) {
			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.bind('error',function () {
				settings.title = false;
				prep($tag(div, 'Error').html(settings.imgError));
			})
			.load(function () {
				var percent;
				photo.onload = null; //stops animated gifs from firing the onload repeatedly.
				
				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (settings.loop || $related[index + 1])) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
						publicMethod.next();
					};
				}
				
				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}
				
				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.data, function (data, status) {
				prep(status === 'error' ? $tag(div, 'Error').html(settings.xhrError) : $(this).contents());
			});
		}
	};
		
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.loop || $related[index + 1])) {
			index = getIndex(1);
			publicMethod.load();
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.loop || index)) {
			index = getIndex(-1);
			publicMethod.load();
		}
	};

	// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup, settings.onCleanup);
			
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
			
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.remove();
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// Removes changes ColorBox made to the document, but does not remove the plugin
	// from jQuery.
	publicMethod.remove = function () {
		$([]).add($box).add($overlay).remove();
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).undelegate('.'+boxElement);
	};

	// A method for fetching the current element ColorBox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));

/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2013 M. Alsup
 * Version: 3.0.3 (11-JUL-2013)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.7.1 or later
 */
;(function($, undefined) {
"use strict";

var ver = '3.0.3';

function debug(s) {
	if ($.fn.cycle.debug)
		log(s);
}		
function log() {
	/*global console */
	if (window.console && console.log)
		console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
};


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;
		this.cycleStop = 0; // issue #108

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards);}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	if (!opts)
		return;
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop === undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			if (opts.elements)
				$(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(cont, opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			if (typeof arg2 == 'string') 
				opts.oneTimeFx = arg2;
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		}
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
}

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
}

// unbind event handlers
function destroy(cont, opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	$(cont).unbind('mouseenter.cycle mouseleave.cycle');
	if (opts.destroy) // callback
		opts.destroy(opts);
}

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	var startingSlideSpecified;
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide !== undefined) {
		opts.startingSlide = parseInt(opts.startingSlide,10);
		if (opts.startingSlide >= els.length || opts.startSlide < 0)
			opts.startingSlide = 0; // catch bogus input
		else 
			startingSlideSpecified = true;
	}
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;
	else
		opts.startingSlide = 0;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		if (startingSlideSpecified) {
			// try to find the specified starting slide and if found set start slide index in the map accordingly
			for ( var cnt = 0; cnt < els.length; cnt++ ) {
				if ( opts.startingSlide == opts.randomMap[cnt] ) {
					opts.randomIndex = cnt;
				}
			}
		}
		else {
			opts.randomIndex = 1;
			opts.startingSlide = opts.randomMap[1];
		}
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z);
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
				"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
			});
		});
	}
		
	// stretch container
	var reshape = (opts.containerResize || opts.containerResizeHeight) && $cont.innerHeight() < 1;
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (opts.containerResize && maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
		if (opts.containerResizeHeight && maxh > 0)
			$cont.css({height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.bind('mouseenter.cycle', function(){
			pauseFlag = true;
			this.cyclePause++;
			triggerPause(cont, true);
		}).bind('mouseleave.cycle', function(){
				if (pauseFlag)
					this.cyclePause--;
				triggerPause(cont, true);
		});

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			var loading = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loading) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options);}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide === 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
}

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
}

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (var p in txs) {
			if (txs.hasOwnProperty(p)) {
				tx = txs[p];
				if (txs.hasOwnProperty(p) && $.isFunction(tx))
					opts.fxs.push(p);
			}
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
}

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		// add the slide to the random map and resort
		if (opts.random) {
			opts.randomMap.push(opts.slideCount-1);
			opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		}

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
		clearTimeout(p.cycleTimeout);
	}

	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}


	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
			if (!p.cycleStop) {
				// queue next transition
				queueNext();
			}
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}
	else {
		queueNext();
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		var roll;
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length) {
				opts.randomIndex = 0;
				opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
			}
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	function queueNext() {
		// stage the next transition
		var ms = 0, timeout = opts.timeout;
		if (opts.timeout && !opts.continuous) {
			ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
         if (opts.fx == 'shuffle')
            ms -= opts.speedOut;
      }
		else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
			ms = 10;
		if (ms > 0)
			p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards); }, ms);
	}
}

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
}

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
}

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
}

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	};
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				if (pauseFlag)
					cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	}
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	}
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
}

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut, animInDelay = opts.animInDelay, animOutDelay = opts.animOutDelay;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.delay(animInDelay).animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.delay(animOutDelay).animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
    activePagerClass: 'activeSlide', // class name used for the active pager link
    after:            null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
    allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
    animIn:           null,     // properties that define how the slide animates in
    animInDelay:      0,        // allows delay before next slide transitions in	
    animOut:          null,     // properties that define how the slide animates out
    animOutDelay:     0,        // allows delay before current slide transitions out
    aspect:           false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
    autostop:         0,        // true to end slideshow after X transitions (where X == slide count)
    autostopCount:    0,        // number of transitions (optionally used with autostop to define X)
    backwards:        false,    // true to start slideshow at last slide and move backwards through the stack
    before:           null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
    center:           null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
    cleartype:        !$.support.opacity,  // true if clearType corrections should be applied (for IE)
    cleartypeNoBg:    false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
    containerResize:  1,        // resize container to fit largest slide
    containerResizeHeight:  0,  // resize containers height to fit the largest slide but leave the width dynamic
    continuous:       0,        // true to start next transition immediately after current one completes
    cssAfter:         null,     // properties that defined the state of the slide after transitioning out
    cssBefore:        null,     // properties that define the initial state of the slide before transitioning in
    delay:            0,        // additional delay (in ms) for first transition (hint: can be negative)
    easeIn:           null,     // easing for "in" transition
    easeOut:          null,     // easing for "out" transition
    easing:           null,     // easing method for both in and out transitions
    end:              null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
    fastOnEvent:      0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
    fit:              0,        // force slides to fit container
    fx:               'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
    fxFn:             null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
    height:           'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
    manualTrump:      true,     // causes manual transition to stop an active transition instead of being ignored
    metaAttr:         'cycle',  // data- attribute that holds the option data for the slideshow
    next:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
    nowrap:           0,        // true to prevent slideshow from wrapping
    onPagerEvent:     null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
    onPrevNextEvent:  null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
    pager:            null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
    pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
    pagerEvent:       'click.cycle', // name of event which drives the pager navigation
    pause:            0,        // true to enable "pause on hover"
    pauseOnPagerHover: 0,       // true to pause when hovering over pager link
    prev:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
    prevNextEvent:    'click.cycle',// event which drives the manual transition to the previous or next slide
    random:           0,        // true for random, false for sequence (not applicable to shuffle fx)
    randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
    requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
    requeueTimeout:   250,      // ms delay for requeue
    rev:              0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
    shuffle:          null,     // coords for shuffle animation, ex: { top:15, left: 200 }
    skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
    slideExpr:        null,     // expression for selecting slides (if something other than all children is required)
    slideResize:      1,        // force slide width/height to fixed size before every transition
    speed:            1000,     // speed of the transition (any valid fx speed value)
    speedIn:          null,     // speed of the 'in' transition
    speedOut:         null,     // speed of the 'out' transition
    startingSlide:    undefined,// zero-based index of the first slide to be displayed
    sync:             1,        // true if in/out transitions should occur simultaneously
    timeout:          4000,     // milliseconds between slide transitions (0 to disable auto advance)
    timeoutFn:        null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
    updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
    width:            null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
"use strict";

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (rev !== true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (rev !== true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++) {
				if (fwd)
					opts.els.push(opts.els.shift());
				else
					opts.els.unshift(opts.els.pop());
			}
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssAfter.display = '';
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);

/*jslint browser: true*/
/*jslint jquery: true*/

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

/*
 * One small change is: now keys are passed by object { keys: '...' }
 * Might be useful, when you want to pass some other data to your handler
 */

(function(jQuery) {

  jQuery.hotkeys = {
    version: "0.8",

    specialKeys: {
      8: "backspace",
      9: "tab",
      10: "return",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      59: ";",
      61: "=",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    },

    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

    options: {
      filterTextInputs: true
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data === "string") {
      handleObj.data = {
        keys: handleObj.data
      };
    }

    // Only care when a possible input has been specified
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
      return;
    }

    var origHandler = handleObj.handler,
      keys = handleObj.data.keys.toLowerCase().split(" ");

    handleObj.handler = function(event) {
      //      Don't fire in text-accepting inputs that we didn't directly bind to
      if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) ||
        (jQuery.hotkeys.options.filterTextInputs &&
          jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
        return;
      }

      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
        character = String.fromCharCode(event.which).toLowerCase(),
        modif = "",
        possible = {};

      jQuery.each(["alt", "ctrl", "shift"], function(index, specialKey) {

        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      });

      // metaKey is triggered off ctrlKey erronously
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+";
      }

      if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
        modif = modif.replace("alt+ctrl+shift+", "hyper+");
      }

      if (special) {
        possible[modif + special] = true;
      }
      else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }

  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {
      add: keyHandler
    };
  });

})(jQuery || this.jQuery || window.jQuery);

/**
 * Limit max number of characters to be able to be entered into a textarea.
 * @see: https://gist.github.com/BRMatt/360132
 */
(function(jQuery)
{
    jQuery.fn.limitMaxlength = function(options) {
	var settings = jQuery.extend({
		attribute : "maxlength",
		onLimit : function() {
		},
		onEdit : function() {
		},
		limit : null
	}, options);

	// Event handler to limit the textarea
	var onEdit = function() {
		var textarea = jQuery(this);
		var maxlength = !settings.limit ? parseInt(textarea.attr(settings.attribute)) : parseInt(settings.limit);

		if (textarea.val().length > maxlength) {
			textarea.val(textarea.val().substr(0, maxlength));

			// Call the onlimit handler within the scope of the textarea
			jQuery.proxy(settings.onLimit, this)();
		}

		// Call the onEdit handler within the scope of the textarea
		jQuery.proxy(settings.onEdit, this)(maxlength - textarea.val().length);
	}

	this.each(onEdit);

	return this.keyup(onEdit).keydown(onEdit).focus(onEdit).live('input paste', onEdit);
    }
}(jQuery));

/*
* jQuery Mobile Framework v1.2.0
* http://jquerymobile.com
*
* Copyright 2012 jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/

(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "jquery" ], function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		});
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {
(function( $, window, undefined ) {

	var nsNormalizeDict = {};

	// jQuery.mobile configurable options
	$.mobile = $.extend( {}, {

		// Version of the jQuery Mobile Framework
		version: "1.2.0",

		// Namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		// Define the url parameter used for referencing widget-generated sub-pages.
		// Translates to to example.html&ui-page=subpageIdentifier
		// hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		// Class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		// Class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		// Class used for "focus" form element state, from CSS framework
		focusClass: "ui-focus",

		// Automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		// Automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// disable to prevent jquery from bothering with links
		linkBindingEnabled: true,

		// Set default page transition - 'none' for no transitions
		defaultPageTransition: "fade",

		// Set maximum window width for transitions to apply - 'false' for no limit
		maxTransitionWidth: false,

		// Minimum scroll distance that will be remembered when returning to a page
		minScrollBack: 250,

		// DEPRECATED: the following property is no longer in use, but defined until 2.0 to prevent conflicts
		touchOverflowEnabled: false,

		// Set default dialog transition - 'none' for no transitions
		defaultDialogTransition: "pop",

		// Error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		// For error messages, which theme does the box uses?
		pageLoadErrorMessageTheme: "e",

		// replace calls to window.history.back with phonegaps navigation helper
		// where it is provided on the window object
		phonegapNavigationEnabled: false,

		//automatically initialize the DOM when it's ready
		autoInitializePage: true,

		pushStateEnabled: true,

		// allows users to opt in to ignoring content by marking a parent element as
		// data-ignored
		ignoreContentEnabled: false,

		// turn of binding to the native orientationchange due to android orientation behavior
		orientationChangeEnabled: true,

		buttonMarkup: {
			hoverDelay: 200
		},

		// TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.mobile.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout( function() {
				window.scrollTo( 0, ypos );
				$( document ).trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout( function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// Expose our cache for testing purposes.
		nsNormalizeDict: nsNormalizeDict,

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string. Add the result
		// to our nsNormalizeDict so we don't have to do this again.
		nsNormalize: function( prop ) {
			if ( !prop ) {
				return;
			}

			return nsNormalizeDict[ prop ] || ( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
		},

		// Find the closest parent with a theme class on it. Note that
		// we are not using $.fn.closest() on purpose here because this
		// method gets called quite a bit and we need it to be as fast
		// as possible.
		getInheritedTheme: function( el, defaultTheme ) {
			var e = el[ 0 ],
				ltr = "",
				re = /ui-(bar|body|overlay)-([a-z])\b/,
				c, m;

			while ( e ) {
				c = e.className || "";
				if ( c && ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
					// We found a parent with a theme class
					// on it so bail from this loop.
					break;
				}

				e = e.parentNode;
			}

			// Return the theme letter we found, if none, return the
			// specified default.

			return ltr || defaultTheme || "a";
		},

		// TODO the following $ and $.fn extensions can/probably should be moved into jquery.mobile.core.helpers
		//
		// Find the closest javascript page element to gather settings data jsperf test
		// http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
		// possibly naive, but it shows that the parsing overhead for *just* the page selector vs
		// the page and dialog selector is negligable. This could probably be speed up by
		// doing a similar parent node traversal to the one found in the inherited theme code above
		closestPageData: function( $target ) {
			return $target
				.closest( ':jqmData(role="page"), :jqmData(role="dialog")' )
				.data( "page" );
		},

		enhanceable: function( $set ) {
			return this.haveParents( $set, "enhance" );
		},

		hijackable: function( $set ) {
			return this.haveParents( $set, "ajax" );
		},

		haveParents: function( $set, attr ) {
			if ( !$.mobile.ignoreContentEnabled ) {
				return $set;
			}

			var count = $set.length,
				$newSet = $(),
				e, $element, excluded;

			for ( var i = 0; i < count; i++ ) {
				$element = $set.eq( i );
				excluded = false;
				e = $set[ i ];

				while ( e ) {
					var c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";

					if ( c === "false" ) {
						excluded = true;
						break;
					}

					e = e.parentNode;
				}

				if ( !excluded ) {
					$newSet = $newSet.add( $element );
				}
			}

			return $newSet;
		},

		getScreenHeight: function() {
			// Native innerHeight returns more accurate value for this across platforms,
			// jQuery version is here as a normalized fallback for platforms like Symbian
			return window.innerHeight || $( window ).height();
		}
	}, $.mobile );

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			if ( prop ) {
				prop = $.mobile.nsNormalize( prop );
			}

			// undefined is permitted as an explicit input for the second param
			// in this case it returns the value and does not set it to undefined
			if( arguments.length < 2 || value === undefined ){
				result = this.data( prop );
			} else {
				result = this.data( prop, value );
			}
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData( 'dependents' ) || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( $( this ), newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var dependents = $( elem ).jqmData( 'dependents' ) || $();

		$( elem ).jqmData( 'dependents', $.merge( dependents, newDependents ) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html elements text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<div/>" ).text( $( this ).text() ).html();
	};

	// fluent helper function for the mobile namespaced equivalent
	$.fn.jqmEnhanceable = function() {
		return $.mobile.enhanceable( this );
	};

	$.fn.jqmHijackable = function() {
		return $.mobile.hijackable( this );
	};

	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find,
		jqmDataRE = /:jqmData\(([^)]*)\)/g;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace( jqmDataRE, "[data-" + ( $.mobile.ns || "" ) + "$1]" );

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};
})( jQuery, this );


	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile = $.mobile || {};
		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));


// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
	mouseEventProps = $.event.props.concat( mouseHookProps ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0, threshold;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {

	while ( event && typeof event.originalEvent !== "undefined" ) {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent( event, eventType ) {

	var t = event.type,
		oe, props, ne, prop, ct, touch, i, j, len;

	event = $.Event( event );
	event.type = eventType;

	oe = event.originalEvent;
	props = $.event.props;

	// addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
	// https://github.com/jquery/jquery-mobile/issues/3280
	if ( t.search( /^(mouse|click)/ ) > -1 ) {
		props = mouseEventProps;
	}

	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if ( oe ) {
		for ( i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[ prop ] = oe[ prop ];
		}
	}

	// make sure that if the mouse and click virtual events are generated
	// without a .which one is defined
	if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
		event.which = 1;
	}

	if ( t.search(/^touch/) !== -1 ) {
		ne = getNativeEvent( oe );
		t = ne.touches;
		ct = ne.changedTouches;
		touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

		if ( touch ) {
			for ( j = 0, len = touchEventProps.length; j < len; j++) {
				prop = touchEventProps[ j ];
				event[ prop ] = touch[ prop ];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags( element ) {

	var flags = {},
		b, k;

	while ( element ) {

		b = $.data( element, dataPropertyName );

		for (  k in b ) {
			if ( b[ k ] ) {
				flags[ k ] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	return flags;
}

function getClosestElementWithVirtualBinding( element, eventType ) {
	var b;
	while ( element ) {

		b = $.data( element, dataPropertyName );

		if ( b && ( !eventType || b[ eventType ] ) ) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}

function enableTouchBindings() {
	blockTouchTriggers = false;
}

function disableTouchBindings() {
	blockTouchTriggers = true;
}

function enableMouseBindings() {
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings() {
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer() {
	clearResetTimer();
	resetTimerID = setTimeout( function() {
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration );
}

function clearResetTimer() {
	if ( resetTimerID ) {
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}

function triggerVirtualEvent( eventType, event, flags ) {
	var ve;

	if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

		ve = createVirtualEvent( event, eventType );

		$( event.target).trigger( ve );
	}

	return ve;
}

function mouseEventCallback( event ) {
	var touchID = $.data( event.target, touchTargetPropertyName );

	if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
		var ve = triggerVirtualEvent( "v" + event.type, event );
		if ( ve ) {
			if ( ve.isDefaultPrevented() ) {
				event.preventDefault();
			}
			if ( ve.isPropagationStopped() ) {
				event.stopPropagation();
			}
			if ( ve.isImmediatePropagationStopped() ) {
				event.stopImmediatePropagation();
			}
		}
	}
}

function handleTouchStart( event ) {

	var touches = getNativeEvent( event ).touches,
		target, flags;

	if ( touches && touches.length === 1 ) {

		target = event.target;
		flags = getVirtualBindingFlags( target );

		if ( flags.hasVirtualBinding ) {

			lastTouchID = nextTouchID++;
			$.data( target, touchTargetPropertyName, lastTouchID );

			clearResetTimer();

			disableMouseBindings();
			didScroll = false;

			var t = getNativeEvent( event ).touches[ 0 ];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent( "vmouseover", event, flags );
			triggerVirtualEvent( "vmousedown", event, flags );
		}
	}
}

function handleScroll( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	if ( !didScroll ) {
		triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	var t = getNativeEvent( event ).touches[ 0 ],
		didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold,
		flags = getVirtualBindingFlags( event.target );

		didScroll = didScroll ||
			( Math.abs( t.pageX - startX ) > moveThreshold ||
				Math.abs( t.pageY - startY ) > moveThreshold );


	if ( didScroll && !didCancel ) {
		triggerVirtualEvent( "vmousecancel", event, flags );
	}

	triggerVirtualEvent( "vmousemove", event, flags );
	startResetTimer();
}

function handleTouchEnd( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	disableTouchBindings();

	var flags = getVirtualBindingFlags( event.target ),
		t;
	triggerVirtualEvent( "vmouseup", event, flags );

	if ( !didScroll ) {
		var ve = triggerVirtualEvent( "vclick", event, flags );
		if ( ve && ve.isDefaultPrevented() ) {
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			t = getNativeEvent( event ).changedTouches[ 0 ];
			clickBlockList.push({
				touchID: lastTouchID,
				x: t.clientX,
				y: t.clientY
			});

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent( "vmouseout", event, flags);
	didScroll = false;

	startResetTimer();
}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler() {}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function( data, namespace ) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {} );
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if ( activeDocHandlers[ "touchstart" ] === 1 ) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function( data, namespace ) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[ eventType ];

			if ( !activeDocHandlers[ eventType ] ) {
				$document.unbind( realType, mouseEventCallback );
			}

			if ( eventCaptureSupported ) {
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.

				--activeDocHandlers[ "touchstart" ];

				if ( !activeDocHandlers[ "touchstart" ] ) {
					$document.unbind( "touchstart", handleTouchStart )
						.unbind( "touchmove", handleTouchMove )
						.unbind( "touchend", handleTouchEnd )
						.unbind( "scroll", handleScroll );
				}
			}

			var $this = $( this ),
				bindings = $.data( this, dataPropertyName );

			// teardown may be called when an element was
			// removed from the DOM. If this is the case,
			// jQuery core may have already stripped the element
			// of any data bindings so we need to check it before
			// using it.
			if ( bindings ) {
				bindings[ eventType ] = false;
			}

			// Unregister the dummy event handler.

			$this.unbind( realType, dummyMouseHandler );

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if ( !hasVirtualBindings( this ) ) {
				$this.removeData( dataPropertyName );
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( var i = 0; i < virtualEventNames.length; i++ ) {
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ) {
		var cnt = clickBlockList.length,
			target = e.target,
			x, y, ele, i, o, touchID;

		if ( cnt ) {
			x = e.clientX;
			y = e.clientY;
			threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is syntehsized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.

			ele = target;

			while ( ele ) {
				for ( i = 0; i < cnt; i++ ) {
					o = clickBlockList[ i ];
					touchID = 0;

					if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})( jQuery, window, document );


(function( $, window, undefined ) {
	// add new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"tap taphold " +
		"swipe swipeleft swiperight " +
		"scrollstart scrollstop" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	var supportTouch = $.mobile.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	function triggerCustomEvent( obj, eventType, event ) {
		var originalType = event.type;
		event.type = eventType;
		$.event.handle.call( obj, event );
		event.type = originalType;
	}

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,

		setup: function() {

			var thisObject = this,
				$this = $( thisObject ),
				scrolling,
				timer;

			function trigger( event, state ) {
				scrolling = state;
				triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind( scrollEvent, function( event ) {

				if ( !$.event.special.scrollstart.enabled ) {
					return;
				}

				if ( !scrolling ) {
					trigger( event, true );
				}

				clearTimeout( timer );
				timer = setTimeout( function() {
					trigger( event, false );
				}, 50 );
			});
		}
	};

	// also handles taphold
	$.event.special.tap = {
		tapholdThreshold: 750,

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( "vmousedown", function( event ) {

				if ( event.which && event.which !== 1 ) {
					return false;
				}

				var origTarget = event.target,
					origEvent = event.originalEvent,
					timer;

				function clearTapTimer() {
					clearTimeout( timer );
				}

				function clearTapHandlers() {
					clearTapTimer();

					$this.unbind( "vclick", clickHandler )
						.unbind( "vmouseup", clearTapTimer );
					$( document ).unbind( "vmousecancel", clearTapHandlers );
				}

				function clickHandler( event ) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if ( origTarget === event.target ) {
						triggerCustomEvent( thisObject, "tap", event );
					}
				}

				$this.bind( "vmouseup", clearTapTimer )
					.bind( "vclick", clickHandler );
				$( document ).bind( "vmousecancel", clearTapHandlers );

				timer = setTimeout( function() {
					triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
				}, $.event.special.tap.tapholdThreshold );
			});
		}
	};

	// also handles swipeleft, swiperight
	$.event.special.swipe = {
		scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a swipe.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( touchStartEvent, function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event,
					start = {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					},
					stop;

				function moveHandler( event ) {

					if ( !start ) {
						return;
					}

					var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event;

					stop = {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ]
					};

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				$this.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function( event ) {
						$this.unbind( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
								Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
								Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

								start.origin.trigger( "swipe" )
									.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
							}
						}
						start = stop = undefined;
					});
			});
		}
	};
	$.each({
		scrollstop: "scrollstart",
		taphold: "tap",
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			}
		};
	});

})( jQuery, this );

}));


/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * The MIT License
 *
 * @author  : Washington Botelho
 * @doc     : http://wbotelhos.com/raty
 * @version : 2.6.0
 *
 */

;
(function($) {
  'use strict';

  var methods = {
    init: function(options) {
      return this.each(function() {
        this.self = $(this);

        methods.destroy.call(this.self);

        this.opt = $.extend(true, {}, $.fn.raty.defaults, options);

        methods._adjustCallback.call(this);

        methods._adjustNumber.call(this);

        if (this.opt.starType !== 'img') {
          methods._adjustStarType.call(this);
        }

        methods._adjustPath.call(this);
        methods._createStars.call(this);

        if (this.opt.cancel) {
          methods._createCancel.call(this);
        }

        if (this.opt.precision) {
          methods._adjustPrecision.call(this);
        }

        methods._createScore.call(this);
        methods._apply.call(this, this.opt.score);
        methods._target.call(this, this.opt.score);

        if (this.opt.readOnly) {
          methods._lock.call(this);
        } else {
          this.style.cursor = 'pointer';

          methods._binds.call(this);
        }

        this.self.data('options', this.opt);
      });
    },

    _adjustCallback: function() {
      var options = ['number', 'readOnly', 'score', 'scoreName', 'target'];

      for (var i = 0; i < options.length; i++) {
        if (typeof this.opt[options[i]] === 'function') {
          this.opt[options[i]] = this.opt[options[i]].call(this);
        }
      }
    },

    _adjustNumber: function() {
      this.opt.number = methods._between(this.opt.number, 1, this.opt.numberMax);
    },

    _adjustPath: function() {
      this.opt.path = this.opt.path || '';

      if (this.opt.path && this.opt.path.charAt(this.opt.path.length - 1) !== '/') {
        this.opt.path += '/';
      }
    },

    _adjustPrecision: function() {
      this.opt.half       = true;
      this.opt.targetType = 'score';
    },

    _adjustStarType: function() {
      this.opt.path = '';

      var replaces = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];

      for (var i = 0; i < replaces.length; i++) {
        this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
      }
    },

    _apply: function(score) {
      methods._fill.call(this, score);

      if (score) {
        if (score > 0) {
          this.score.val(methods._between(score, 0, this.opt.number));
        }

        methods._roundStars.call(this, score);
      }
    },

    _between: function(value, min, max) {
      return Math.min(Math.max(parseFloat(value), min), max);
    },

    _binds: function() {
      if (this.cancel) {
        methods._bindOverCancel.call(this);
        methods._bindClickCancel.call(this);
        methods._bindOutCancel.call(this);
      }

      methods._bindOver.call(this);
      methods._bindClick.call(this);
      methods._bindOut.call(this);
    },

    _bindClick: function() {
      var that = this;

      that.stars.on('click.raty', function(evt) {
        var star = $(this);

        that.score.val((that.opt.half || that.opt.precision) ? that.self.data('score') : (this.alt || star.data('alt')));

        if (that.opt.click) {
          that.opt.click.call(that, +that.score.val(), evt);
        }
      });
    },

    _bindClickCancel: function() {
      var that = this;

      that.cancel.on('click.raty', function(evt) {
        that.score.removeAttr('value');

        if (that.opt.click) {
          that.opt.click.call(that, null, evt);
        }
      });
    },

    _bindOut: function() {
      var that = this;

      that.self.on('mouseleave.raty', function(evt) {
        var score = +that.score.val() || undefined;

        methods._apply.call(that, score);
        methods._target.call(that, score, evt);

        if (that.opt.mouseout) {
          that.opt.mouseout.call(that, score, evt);
        }
      });
    },

    _bindOutCancel: function() {
      var that = this;

      that.cancel.on('mouseleave.raty', function(evt) {
        var icon = that.opt.cancelOff;

        if (that.opt.starType !== 'img') {
          icon = that.opt.cancelClass + ' ' + icon;
        }

        methods._setIcon.call(that, this, icon);

        if (that.opt.mouseout) {
          var score = +that.score.val() || undefined;

          that.opt.mouseout.call(that, score, evt);
        }
      });
    },

    _bindOver: function() {
      var that   = this,
          action = that.opt.half ? 'mousemove.raty' : 'mouseover.raty';

      that.stars.on(action, function(evt) {
        var score = methods._getScoreByPosition.call(that, evt, this);

        methods._fill.call(that, score);

        if (that.opt.half) {
          methods._roundStars.call(that, score);

          that.self.data('score', score);
        }

        methods._target.call(that, score, evt);

        if (that.opt.mouseover) {
          that.opt.mouseover.call(that, score, evt);
        }
      });
    },

    _bindOverCancel: function() {
      var that = this;

      that.cancel.on('mouseover.raty', function(evt) {
        var
          starOff = that.opt.path + that.opt.starOff,
          icon    = that.opt.cancelOn;

        if (that.opt.starType === 'img') {
          that.stars.attr('src', starOff);
        } else {
          icon = that.opt.cancelClass + ' ' + icon;

          that.stars.attr('class', starOff);
        }

        methods._setIcon.call(that, this, icon);
        methods._target.call(that, null, evt);

        if (that.opt.mouseover) {
          that.opt.mouseover.call(that, null);
        }
      });
    },

    _buildScoreField: function() {
      return $('<input />', { name: this.opt.scoreName, type: 'hidden' }).appendTo(this);
    },

    _createCancel: function() {
      var icon   = this.opt.path + this.opt.cancelOff,
          cancel = $('<' + this.opt.starType + ' />', { title: this.opt.cancelHint, 'class': this.opt.cancelClass });

      if (this.opt.starType === 'img') {
        cancel.attr({ src: icon, alt: 'x' });
      } else {
        // TODO: use $.data
        cancel.attr('data-alt', 'x').addClass(icon);
      }

      if (this.opt.cancelPlace === 'left') {
        this.self.prepend('&#160;').prepend(cancel);
      } else {
        this.self.append('&#160;').append(cancel);
      }

      this.cancel = cancel;
    },

    _createScore: function() {
      var score = $(this.opt.targetScore);

      this.score = score.length ? score : methods._buildScoreField.call(this);
    },

    _createStars: function() {
      for (var i = 1; i <= this.opt.number; i++) {
        var
          name  = methods._nameForIndex.call(this, i),
          attrs = { alt: i, src: this.opt.path + this.opt[name] };

        if (this.opt.starType !== 'img') {
          attrs = { 'data-alt': i, 'class': attrs.src }; // TODO: use $.data.
        }

        attrs.title = methods._getHint.call(this, i);

        $('<' + this.opt.starType + ' />', attrs).appendTo(this);

        if (this.opt.space) {
          this.self.append(i < this.opt.number ? '&#160;' : '');
        }
      }

      this.stars = this.self.children(this.opt.starType);
    },

    _error: function(message) {
      $(this).text(message);

      $.error(message);
    },

    _fill: function(score) {
      var hash = 0;

      for (var i = 1; i <= this.stars.length; i++) {
        var
          icon,
          star   = this.stars[i - 1],
          turnOn = methods._turnOn.call(this, i, score);

        if (this.opt.iconRange && this.opt.iconRange.length > hash) {
          var irange = this.opt.iconRange[hash];

          icon = methods._getRangeIcon.call(this, irange, turnOn);

          if (i <= irange.range) {
            methods._setIcon.call(this, star, icon);
          }

          if (i === irange.range) {
            hash++;
          }
        } else {
          icon = this.opt[turnOn ? 'starOn' : 'starOff'];

          methods._setIcon.call(this, star, icon);
        }
      }
    },

    _getRangeIcon: function(irange, turnOn) {
      return turnOn ? irange.on || this.opt.starOn : irange.off || this.opt.starOff;
    },

    _getScoreByPosition: function(evt, icon) {
      var score = parseInt(icon.alt || icon.getAttribute('data-alt'), 10);

      if (this.opt.half) {
        var
          size    = methods._getSize.call(this),
          percent = parseFloat((evt.pageX - $(icon).offset().left) / size);

        if (this.opt.precision) {
          score = score - 1 + percent;
        } else {
          score = score - 1 + (percent > 0.5 ? 1 : 0.5);
        }
      }

      return score;
    },

    _getSize: function() {
      var size;

      if (this.opt.starType === 'img') {
        size = this.stars[0].width;
      } else {
        size = parseFloat(this.stars.eq(0).css('font-size'));
      }

      if (!size) {
        methods._error.call(this, 'Could not be possible get the icon size!');
      }

      return size;
    },

    _turnOn: function(i, score) {
      return this.opt.single ? (i === score) : (i <= score);
    },

    _getHint: function(score) {
      var hint = this.opt.hints[score - 1];

      return hint === '' ? '' : hint || score;
    },

    _lock: function() {
      var score = parseInt(this.score.val(), 10), // TODO: 3.1 >> [['1'], ['2'], ['3', '.1', '.2']]
          hint  = score ? methods._getHint.call(this, score) : this.opt.noRatedMsg;

      this.style.cursor   = '';
      this.title          = hint;

      this.score.prop('readonly', true);
      this.stars.prop('title', hint);

      if (this.cancel) {
        this.cancel.hide();
      }

      this.self.data('readonly', true);
    },

    _nameForIndex: function(i) {
      return this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
    },

    _roundStars: function(score) {
      var rest = (score % 1).toFixed(2);

      if (rest > this.opt.round.down) {                      // Up:   [x.76 .. x.99]
        var name = 'starOn';

        if (this.opt.halfShow && rest < this.opt.round.up) { // Half: [x.26 .. x.75]
          name = 'starHalf';
        } else if (rest < this.opt.round.full) {             // Down: [x.00 .. x.5]
          name = 'starOff';
        }

        var
          icon = this.opt[name],
          star = this.stars[Math.ceil(score) - 1];

        methods._setIcon.call(this, star, icon);
      }                                                      // Full down: [x.00 .. x.25]
    },

    _setIcon: function(star, icon) {
      star[this.opt.starType === 'img' ? 'src' : 'className'] = this.opt.path + icon;
    },

    _setTarget: function(target, score) {
      if (score) {
        score = this.opt.targetFormat.toString().replace('{score}', score);
      }

      if (target.is(':input')) {
        target.val(score);
      } else {
        target.html(score);
      }
    },

    _target: function(score, evt) {
      if (this.opt.target) {
        var target = $(this.opt.target);

        if (!target.length) {
          methods._error.call(this, 'Target selector invalid or missing!');
        }

        var mouseover = evt && evt.type === 'mouseover';

        if (score === undefined) {
          score = this.opt.targetText;
        } else if (score === null) {
          score = mouseover ? this.opt.cancelHint : this.opt.targetText;
        } else {
          if (this.opt.targetType === 'hint') {
            score = methods._getHint.call(this, Math.ceil(score));
          } else if (this.opt.precision) {
            score = parseFloat(score).toFixed(1);
          }

          var mousemove = evt && evt.type === 'mousemove';

          if (!mouseover && !mousemove && !this.opt.targetKeep) {
            score = this.opt.targetText;
          }
        }

        methods._setTarget.call(this, target, score);
      }
    },

    _unlock: function() {
      this.style.cursor = 'pointer';
      this.removeAttribute('title');

      this.score.removeAttr('readonly');

      this.self.data('readonly', false);

      for (var i = 0; i < this.opt.number; i++) {
        this.stars[i].title = methods._getHint.call(this, i + 1);
      }

      if (this.cancel) {
        this.cancel.css('display', '');
      }
    },

    cancel: function(click) {
      return this.each(function() {
        var el = $(this);

        if (el.data('readonly') !== true) {
          methods[click ? 'click' : 'score'].call(el, null);

          this.score.removeAttr('value');
        }
      });
    },

    click: function(score) {
      return this.each(function() {
        if ($(this).data('readonly') !== true) {
          methods._apply.call(this, score);

          if (this.opt.click) {
            this.opt.click.call(this, score, $.Event('click'));
          }

          methods._target.call(this, score);
        }
      });
    },

    destroy: function() {
      return this.each(function() {
        var self = $(this),
            raw  = self.data('raw');

        if (raw) {
          self.off('.raty').empty().css({ cursor: raw.style.cursor }).removeData('readonly');
        } else {
          self.data('raw', self.clone()[0]);
        }
      });
    },

    getScore: function() {
      var score = [],
          value ;

      this.each(function() {
        value = this.score.val();

        score.push(value ? +value : undefined);
      });

      return (score.length > 1) ? score : score[0];
    },

    move: function(score) {
      return this.each(function() {
        var
          integer  = parseInt(score, 10),
          opt      = $(this).data('options'),
          decimal  = (+score).toFixed(1).split('.')[1];

        if (integer >= opt.number) {
          integer = opt.number - 1;
          decimal = 10;
        }

        var
          size    = methods._getSize.call(this),
          point   = size / 10,
          star    = $(this.stars[integer]),
          percent = star.offset().left + point * parseInt(decimal, 10),
          evt     = $.Event('mousemove', { pageX: percent });

        star.trigger(evt);
      });
    },

    readOnly: function(readonly) {
      return this.each(function() {
        var self = $(this);

        if (self.data('readonly') !== readonly) {
          if (readonly) {
            self.off('.raty').children('img').off('.raty');

            methods._lock.call(this);
          } else {
            methods._binds.call(this);
            methods._unlock.call(this);
          }

          self.data('readonly', readonly);
        }
      });
    },

    reload: function() {
      return methods.set.call(this, {});
    },

    score: function() {
      var self = $(this);

      return arguments.length ? methods.setScore.apply(self, arguments) : methods.getScore.call(self);
    },

    set: function(options) {
      return this.each(function() {
        var self   = $(this),
            actual = self.data('options'),
            news   = $.extend({}, actual, options);

        self.raty(news);
      });
    },

    setScore: function(score) {
      return this.each(function() {
        if ($(this).data('readonly') !== true) {
          methods._apply.call(this, score);
          methods._target.call(this, score);
        }
      });
    }
  };

  $.fn.raty = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.raty.defaults = {
    cancel       : false,
    cancelClass  : 'raty-cancel',
    cancelHint   : 'Cancel this rating!',
    cancelOff    : 'cancel-off.png',
    cancelOn     : 'cancel-on.png',
    cancelPlace  : 'left',
    click        : undefined,
    half         : false,
    halfShow     : true,
    hints        : ['bad', 'poor', 'regular', 'good', 'gorgeous'],
    iconRange    : undefined,
    mouseout     : undefined,
    mouseover    : undefined,
    noRatedMsg   : 'Not rated yet!',
    number       : 5,
    numberMax    : 20,
    path         : undefined,
    precision    : false,
    readOnly     : false,
    round        : { down: 0.25, full: 0.6, up: 0.76 },
    score        : undefined,
    scoreName    : 'score',
    single       : false,
    space        : true,
    starHalf     : 'star-half.png',
    starOff      : 'star-off.png',
    starOn       : 'star-on.png',
    starType     : 'img',
    target       : undefined,
    targetFormat : '{score}',
    targetKeep   : false,
    targetScore  : undefined,
    targetText   : '',
    targetType   : 'hint'
  };

})(jQuery);

/**
* simplePagination.js v1.6
* A simple jQuery pagination plugin.
* http://flaviusmatis.github.com/simplePagination.js/
*
* Copyright 2012, Flavius Matis
* Released under the MIT license.
* http://flaviusmatis.github.com/license.html
*/

(function($){

	var methods = {
		init: function(options) {
			var o = $.extend({
				items: 1,
				itemsOnPage: 1,
				pages: 0,
				displayedPages: 5,
				edges: 2,
				currentPage: 0,
				hrefTextPrefix: '#page-',
				hrefTextSuffix: '',
				prevText: 'Prev',
				nextText: 'Next',
				ellipseText: '&hellip;',
				cssStyle: 'light-theme',
				labelMap: [],
				selectOnClick: true,
				nextAtFront: false,
				invertPageOrder: false,
				useStartEdge : true,
				useEndEdge : true,
				onPageClick: function(pageNumber, event) {
					// Callback triggered when a page is clicked
					// Page number is given as an optional parameter
				},
				onInit: function() {
					// Callback triggered immediately after initialization
				}
			}, options || {});

			var self = this;

			o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
			if (o.currentPage)
				o.currentPage = o.currentPage - 1;
			else
				o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
			o.halfDisplayed = o.displayedPages / 2;

			this.each(function() {
				self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
				methods._draw.call(self);
			});

			o.onInit();

			return this;
		},

		selectPage: function(page) {
			methods._selectPage.call(this, page - 1);
			return this;
		},

		prevPage: function() {
			var o = this.data('pagination');
			if (!o.invertPageOrder) {
				if (o.currentPage > 0) {
					methods._selectPage.call(this, o.currentPage - 1);
				}
			} else {
				if (o.currentPage < o.pages - 1) {
					methods._selectPage.call(this, o.currentPage + 1);
				}
			}
			return this;
		},

		nextPage: function() {
			var o = this.data('pagination');
			if (!o.invertPageOrder) {
				if (o.currentPage < o.pages - 1) {
					methods._selectPage.call(this, o.currentPage + 1);
				}
			} else {
				if (o.currentPage > 0) {
					methods._selectPage.call(this, o.currentPage - 1);
				}
			}
			return this;
		},

		getPagesCount: function() {
			return this.data('pagination').pages;
		},

		getCurrentPage: function () {
			return this.data('pagination').currentPage + 1;
		},

		destroy: function(){
			this.empty();
			return this;
		},

		drawPage: function (page) {
			var o = this.data('pagination');
			o.currentPage = page - 1;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		redraw: function(){
			methods._draw.call(this);
			return this;
		},

		disable: function(){
			var o = this.data('pagination');
			o.disabled = true;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		enable: function(){
			var o = this.data('pagination');
			o.disabled = false;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		updateItems: function (newItems) {
			var o = this.data('pagination');
			o.items = newItems;
			o.pages = methods._getPages(o);
			this.data('pagination', o);
			methods._draw.call(this);
		},

		updateItemsOnPage: function (itemsOnPage) {
			var o = this.data('pagination');
			o.itemsOnPage = itemsOnPage;
			o.pages = methods._getPages(o);
			this.data('pagination', o);
			methods._selectPage.call(this, 0);
			return this;
		},

		_draw: function() {
			var	o = this.data('pagination'),
				interval = methods._getInterval(o),
				i,
				tagName;

			methods.destroy.call(this);
			
			tagName = (typeof this.prop === 'function') ? this.prop('tagName') : this.attr('tagName');

			var $panel = tagName === 'UL' ? this : $('<ul></ul>').appendTo(this);

			// Generate Prev link
			if (o.prevText) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {text: o.prevText, classes: 'prev'});
			}

			// Generate Next link (if option set for at front)
			if (o.nextText && o.nextAtFront) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
			}

			// Generate start edges
			if (!o.invertPageOrder) {
				if (interval.start > 0 && o.edges > 0) {
					if(o.useStartEdge) {
						var end = Math.min(o.edges, interval.start);
						for (i = 0; i < end; i++) {
							methods._appendItem.call(this, i);
						}
					}
					if (o.edges < interval.start && (interval.start - o.edges != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (interval.start - o.edges == 1) {
						methods._appendItem.call(this, o.edges);
					}
				}
			} else {
				if (interval.end < o.pages && o.edges > 0) {
					if(o.useStartEdge) {
						var begin = Math.max(o.pages - o.edges, interval.end);
						for (i = o.pages - 1; i >= begin; i--) {
							methods._appendItem.call(this, i);
						}
					}

					if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (o.pages - o.edges - interval.end == 1) {
						methods._appendItem.call(this, interval.end);
					}
				}
			}

			// Generate interval links
			if (!o.invertPageOrder) {
				for (i = interval.start; i < interval.end; i++) {
					methods._appendItem.call(this, i);
				}
			} else {
				for (i = interval.end - 1; i >= interval.start; i--) {
					methods._appendItem.call(this, i);
				}
			}

			// Generate end edges
			if (!o.invertPageOrder) {
				if (interval.end < o.pages && o.edges > 0) {
					if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (o.pages - o.edges - interval.end == 1) {
						methods._appendItem.call(this, interval.end);
					}
					if(o.useEndEdge) {
						var begin = Math.max(o.pages - o.edges, interval.end);
						for (i = begin; i < o.pages; i++) {
							methods._appendItem.call(this, i);
						}
					}
				}
			} else {
				if (interval.start > 0 && o.edges > 0) {
					if (o.edges < interval.start && (interval.start - o.edges != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (interval.start - o.edges == 1) {
						methods._appendItem.call(this, o.edges);
					}

					if(o.useEndEdge) {
						var end = Math.min(o.edges, interval.start);
						for (i = end - 1; i >= 0; i--) {
							methods._appendItem.call(this, i);
						}
					}
				}
			}

			// Generate Next link (unless option is set for at front)
			if (o.nextText && !o.nextAtFront) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
			}
		},

		_getPages: function(o) {
			var pages = Math.ceil(o.items / o.itemsOnPage);
			return pages || 1;
		},

		_getInterval: function(o) {
			return {
				start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
				end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
			};
		},

		_appendItem: function(pageIndex, opts) {
			var self = this, options, $link, o = self.data('pagination'), $linkWrapper = $('<li></li>'), $ul = self.find('ul');

			pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

			options = {
				text: pageIndex + 1,
				classes: ''
			};

			if (o.labelMap.length && o.labelMap[pageIndex]) {
				options.text = o.labelMap[pageIndex];
			}

			options = $.extend(options, opts || {});

			if (pageIndex == o.currentPage || o.disabled) {
				if (o.disabled) {
					$linkWrapper.addClass('disabled');
				} else {
					$linkWrapper.addClass('active');
				}
				$link = $('<span class="current">' + (options.text) + '</span>');
			} else {
				$link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + (options.text) + '</a>');
				$link.click(function(event){
					return methods._selectPage.call(self, pageIndex, event);
				});
			}

			if (options.classes) {
				$link.addClass(options.classes);
			}

			$linkWrapper.append($link);

			if ($ul.length) {
				$ul.append($linkWrapper);
			} else {
				self.append($linkWrapper);
			}
		},

		_selectPage: function(pageIndex, event) {
			var o = this.data('pagination');
			o.currentPage = pageIndex;
			if (o.selectOnClick) {
				methods._draw.call(this);
			}
			return o.onPageClick(pageIndex + 1, event);
		}

	};

	$.fn.pagination = function(method) {

		// Method calling logic
		if (methods[method] && method.charAt(0) != '_') {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.pagination');
		}

	};

})(jQuery);

