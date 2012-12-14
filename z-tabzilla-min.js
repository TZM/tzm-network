/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: *//**
 * Tabzilla global navigation for Mozilla projects
 *
 * This code is licensed under the Mozilla Public License 1.1.
 *
 * Event handling portions adapted from the YUI Event component used under
 * the following license:
 *
 *   Copyright � 2012 Yahoo! Inc. All rights reserved.
 *
 *   Redistribution and use of this software in source and binary forms,
 *   with or without modification, are permitted provided that the following conditions
 *   are met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   - Neither the name of Yahoo! Inc. nor the names of YUI's contributors may
 *     be used to endorse or promote products derived from this software
 *     without specific prior written permission of Yahoo! Inc.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Portions adapted from the jQuery Easing plugin written by Robert Penner and
 * used under the following license:
 *
 *   Copyright 2001 Robert Penner
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions are
 *   met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   - Neither the name of the author nor the names of contributors may be
 *     used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * @copyright 2012 silverorange Inc.
 * @license   http://www.mozilla.org/MPL/MPL-1.1.html Mozilla Public License 1.1
 * @author    Michael Gauthier <mike@silverorange.com>
 * @author    Steven Garrity <steven@silverorange.com>
*/function Tabzilla(){typeof jQuery!="undefined"&&jQuery?jQuery(document).ready(Tabzilla.init):Tabzilla.run()}function sortByKey(e){return function(t,n){return t[e]<n[e]?-1:t[e]>n[e]?1:0}}Tabzilla.READY_POLL_INTERVAL=40,Tabzilla.readyInterval=null,Tabzilla.jQueryCDNSrc="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js",Tabzilla.hasCSSTransitions=function(){var e=document.createElement("div");e.innerHTML='<div style="-webkit-transition: color 1s linear;-moz-transition: color 1s linear;-ms-transition: color 1s linear;-o-transition: color 1s linear;"></div>';var t=e.firstChild.style.webkitTransition!==undefined||e.firstChild.style.MozTransition!==undefined||e.firstChild.style.msTransition!==undefined||e.firstChild.style.OTransition!==undefined;return delete e,t}(),Tabzilla.run=function(){var e=0,t=!1,n=navigator.userAgent,r=n.match(/AppleWebKit\/([^\s]*)/);if(r&&r[1])e=parseInt(r[1],10);else{r=n.match(/Opera[\s\/]([^\s]*)/);if(!r||!r[1])r=n.match(/MSIE\s([^;]*)/),r&&r[1]&&(t=!0)}if(t)if(self!==self.top)document.onreadystatechange=function(){document.readyState=="complete"&&(document.onreadystatechange=null,Tabzilla.ready())};else{var i=document.createElement("p");Tabzilla.readyInterval=setInterval(function(){try{i.doScroll("left"),clearInterval(Tabzilla.readyInterval),Tabzilla.readyInterval=null,Tabzilla.ready(),i=null}catch(e){}},Tabzilla.READY_POLL_INTERVAL)}else e&&e<525?Tabzilla.readyInterval=setInterval(function(){var e=document.readyState;if("loaded"==e||"complete"==e)clearInterval(Tabzilla.readyInterval),Tabzilla.readyInterval=null,Tabzilla.ready()},Tabzilla.READY_POLL_INTERVAL):Tabzilla.addEventListener(document,"DOMContentLoaded",Tabzilla.ready)},Tabzilla.ready=function(){if(!Tabzilla.DOMReady){Tabzilla.DOMReady=!0;var e=function(){Tabzilla.init(),Tabzilla.removeEventListener(document,"DOMContentLoaded",Tabzilla.ready)};if(typeof jQuery=="undefined"){var t=document.createElement("script");t.type="text/javascript",t.src=Tabzilla.jQueryCDNSrc,document.getElementsByTagName("body")[0].appendChild(t),t.readyState?t.onreadystatechange=function(){(t.readyState=="loaded"||t.readyState=="complete")&&e()}:t.onload=e}else e()}},Tabzilla.init=function(){Tabzilla.hasCSSTransitions||jQuery.extend(jQuery.easing,{easeInOut:function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t+n:-r/2*(--t*(t-2)-1)+n}}),Tabzilla.link=document.getElementById("tabzilla"),Tabzilla.panel=Tabzilla.buildPanel(),Tabzilla.fillZGContacts();var e=document.getElementsByTagName("body")[0];e.insertBefore(Tabzilla.panel,e.firstChild),Tabzilla.addEventListener(Tabzilla.link,"click",function(e){Tabzilla.preventDefault(e),Tabzilla.toggle()}),Tabzilla.$panel=jQuery(Tabzilla.panel),Tabzilla.$link=jQuery(Tabzilla.link),Tabzilla.$panel.addClass("tabzilla-closed"),Tabzilla.$link.addClass("tabzilla-closed"),Tabzilla.$panel.removeClass("tabzilla-opened"),Tabzilla.$link.removeClass("tabzilla-opened"),Tabzilla.opened=!1},Tabzilla.buildPanel=function(){var e=document.createElement("div");return e.id="tabzilla-panel",e.innerHTML=Tabzilla.content,e},Tabzilla.addEventListener=function(e,t,n){typeof e.attachEvent!="undefined"?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)},Tabzilla.removeEventListener=function(e,t,n){typeof e.detachEvent!="undefined"?e.detachEvent("on"+t,n):e.removeEventListener(t,n,!1)},Tabzilla.toggle=function(){Tabzilla.opened?Tabzilla.close():Tabzilla.open()},Tabzilla.open=function(){if(Tabzilla.opened)return;Tabzilla.hasCSSTransitions?(Tabzilla.$panel.addClass("tabzilla-opened"),Tabzilla.$link.addClass("tabzilla-opened"),Tabzilla.$panel.removeClass("tabzilla-closed"),Tabzilla.$link.removeClass("tabzilla-closed")):jQuery(Tabzilla.panel).animate({height:260},260,"easeInOut"),Tabzilla.opened=!0},Tabzilla.close=function(){if(!Tabzilla.opened)return;Tabzilla.hasCSSTransitions?(Tabzilla.$panel.removeClass("tabzilla-opened"),Tabzilla.$link.removeClass("tabzilla-opened"),Tabzilla.$panel.addClass("tabzilla-closed"),Tabzilla.$link.addClass("tabzilla-closed")):jQuery(Tabzilla.panel).animate({height:0},260,"easeInOut"),Tabzilla.opened=!1},Tabzilla.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},Tabzilla.fillZGContacts=function(){if(!Tabzilla.panel.id)return;$.ajax({url:"http://chapters.zmgc.net",dataType:"json",success:function(e){Tabzilla.zgContacts=e;var t=[];e.rows.forEach(function(e){e[0]=="Country"&&t.push({link:e[2],contact:e[3],country:e[4]}),e[0]=="Region"&&console.log(e)}),t.sort(sortByKey("country")),countryTemplate=function(e){return s='<a title="'+e.country+'" class="chapters_link" href="'+e.link+'" target="_blank">'+'<div class="chapters c_'+e.country.toLowerCase()+'">'+'<span class="flag-margin">'+e.country+"</span></div></a>",s};var n={};t.forEach(function(e){var t=e.country.toLowerCase().charAt(0);n[t]?n[t]++:n[t]=1}),console.log(n);var r=$("#"+Tabzilla.panel.id),i=[];i.push(r.find(".c_COL4")),i.push(r.find(".c_COL3")),i.push(r.find(".c_COL2")),i.push(r.find(".c_COL1"));var o=i.length,u=t.length/o,a=t[0].country.toLowerCase().charAt(0),f=[];t.forEach(function(e){var t=e.country.toLowerCase().charAt(0);if(a!=t){var r=f.length,s=r+n[t];if(Math.abs(s-u)>=Math.abs(r-u)){var o;i.length>0&&(o=i.pop()),f.forEach(function(e){o.append(countryTemplate(e))}),f=[],o.find("span").first().addClass("first-letter")}f.push(e)}else f.push(e);a=t})}})},Tabzilla.content='<div id="tabzilla-contents">  <!--- INTERNATONAL CHAPTERS TABLE starts here ---><div id="chapters_table"><h1>CHAPTERS WORLD WIDE:</h1><div class="c_COL1"></div> <div class="c_COL2"></div> <div class="c_COL3"></div> <div class="c_COL4"></div></div>  <!--- INTERNATONAL CHAPTERS TABLE ends here ---><div id="tabzilla-nav"> <ul> <li><h2>Projects</h2> <ul> <li><a href="http://www.cultureindecline.com/" title="Cutlure in Decline" target="_blank">Culture in Decline</a></li> <li><a href="http://oneplanetproject.net" title="One Planet Project" target="_blank">One Planet Project</a></li> <li><a href="http://www.wakingupmovie.com" title="Waking Up Movie" target="_blank">Waking Up Movie</a></li> <li><a href="http://www.resourcebasedcommunities.org" title="Resource Based Communities" target="_blank">Resource Based Communities</a></li> <li><a href="http://www.indiegogo.com/kontinuumgarden" title="Kontinuum Garden" target="_blank">Kontinuum Garden</a></li> <li><a href="http://www.tzmeducation.org" title="TZM Education" target="_blank">TZM Education</a></li> <li><a href="http://tzmwiki.org" title="The Zeitgeist Movement Wiki" target="_blank">TZM Wiki</a></li> </ul> </li> <li><h2>Media</h2> <ul> <li><a href="http://thezeitgeistmovement.com" title="TZM Main Site" target="_blank">TZM Main Site</a></li> <li><a href="http://zeitgeistmediaproject.com" title="Zeitgeist Media Project" target="_blank">Zeitgeist Media Project</a></li> <li><a href="http://www.blogtalkradio.com/zmglobal" title="TZM Global Radio" target="_blank">TZM Global Radio</a></li> <li><a href="http://www.zeitnews.org/" title="ZeitNews target="_blank">ZeitNews</a></li> <li><a href="http://blog.thezeitgeistmovement.com" title="The Zeitgeist Movement Blog" target="_blank">The Zeitgeist Movement Blog</a></li> <li><a href="http://www.zbnlive.com" title="Zeitgeist Brodcasting Network" target="_blank">Zeitgeist Brodcasting Network</a></li> <li><a href="http://www.blogtalkradio.com/v-radio" title="V-Radio" target="_blank">V-Radio</a></li> </ul> </li> <li><h2>Activist Networks</h2> <ul> <li><a href="http://tzmnetwork.com" title="TZM Network" target="_blank">TZM Network</a></li> <li><a href="http://www.tzmchapters.net" title="TZM Chapters Portal" target="_blank">TZM Chapters Portal</a></li> <li><a href="http://chapters.zeitgeistaustralia.org" title="Australian Atrium Platform" target="_blank">Australian Atrium Platform</a></li> </ul> </li> <li><h2>Global Events</h2> <ul> <li><a href="http://zdayglobal.org" title="Z-Day" target="_blank">Z-Day</a></li> <li><a href="http://zeitgeistmediafestival.org" title="Zeitgeist Media Festival" target="_blank">Zeitgeist Media Festival</a></li> </ul> </li> </ul> </div> </div>',Tabzilla();