/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Tabzilla global navigation for Mozilla projects
 *
 * This code is licensed under the Mozilla Public License 1.1.
 *
 * Event handling portions adapted from the YUI Event component used under
 * the following license:
 *
 *   Copyright © 2012 Yahoo! Inc. All rights reserved.
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
*/

function Tabzilla()
{
    if (typeof jQuery != 'undefined' && jQuery) {
        jQuery(document).ready(Tabzilla.init);
    } else {
        Tabzilla.run();
    }
}

Tabzilla.READY_POLL_INTERVAL = 40;
Tabzilla.readyInterval = null;
Tabzilla.jQueryCDNSrc =
    '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js';

Tabzilla.hasCSSTransitions = (function() {
    var div = document.createElement('div');
    div.innerHTML = '<div style="'
        + '-webkit-transition: color 1s linear;'
        + '-moz-transition: color 1s linear;'
        + '-ms-transition: color 1s linear;'
        + '-o-transition: color 1s linear;'
        + '"></div>';

    var hasTransitions = (
           (div.firstChild.style.webkitTransition !== undefined)
        || (div.firstChild.style.MozTransition !== undefined)
        || (div.firstChild.style.msTransition !== undefined)
        || (div.firstChild.style.OTransition !== undefined)
    );

    delete div;

    return hasTransitions;
})();

/**
 * Sets up the DOMReady event for Tabzilla
 *
 * Adapted from the YUI Event component. Defined in Tabzilla so we do not
 * depend on YUI or jQuery. The YUI DOMReady implementation is based on work
 * Dean Edwards, John Resig, Matthias Miller and Diego Perini.
*/
Tabzilla.run = function()
{
    var webkit = 0, isIE = false, ua = navigator.userAgent;
    var m = ua.match(/AppleWebKit\/([^\s]*)/);

    if (m && m[1]) {
        webkit = parseInt(m[1], 10);
    } else {
        m = ua.match(/Opera[\s\/]([^\s]*)/);
        if (!m || !m[1]) {
            m = ua.match(/MSIE\s([^;]*)/);
            if (m && m[1]) {
                isIE = true;
            }
        }
    }

    // Internet Explorer: use the readyState of a defered script.
    // This isolates what appears to be a safe moment to manipulate
    // the DOM prior to when the document's readyState suggests
    // it is safe to do so.
    if (isIE) {
        if (self !== self.top) {
            document.onreadystatechange = function() {
                if (document.readyState == 'complete') {
                    document.onreadystatechange = null;
                    Tabzilla.ready();
                }
            };
        } else {
            var n = document.createElement('p');
            Tabzilla.readyInterval = setInterval(function() {
                try {
                    // throws an error if doc is not ready
                    n.doScroll('left');
                    clearInterval(Tabzilla.readyInterval);
                    Tabzilla.readyInterval = null;
                    Tabzilla.ready();
                    n = null;
                } catch (ex) {
                }
            }, Tabzilla.READY_POLL_INTERVAL);
        }

    // The document's readyState in Safari currently will
    // change to loaded/complete before images are loaded.
    } else if (webkit && webkit < 525) {
        Tabzilla.readyInterval = setInterval(function() {
            var rs = document.readyState;
            if ('loaded' == rs || 'complete' == rs) {
                clearInterval(Tabzilla.readyInterval);
                Tabzilla.readyInterval = null;
                Tabzilla.ready();
            }
        }, Tabzilla.READY_POLL_INTERVAL);

    // FireFox and Opera: These browsers provide a event for this
    // moment.  The latest WebKit releases now support this event.
    } else {
        Tabzilla.addEventListener(document, 'DOMContentLoaded', Tabzilla.ready);
    }
};

Tabzilla.ready = function()
{
    if (!Tabzilla.DOMReady) {
        Tabzilla.DOMReady = true;

        var onLoad = function() {
            Tabzilla.init();
            Tabzilla.removeEventListener(
                document,
                'DOMContentLoaded',
                Tabzilla.ready
            );
        };

        // if we don't have jQuery, dynamically load jQuery from CDN
        if (typeof jQuery == 'undefined') {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = Tabzilla.jQueryCDNSrc;
            document.getElementsByTagName('body')[0].appendChild(script);

            if (script.readyState) {
                // IE
                script.onreadystatechange = function() {
                    if (   script.readyState == 'loaded'
                        || script.readyState == 'complete'
                    ) {
                        onLoad();
                    }
                };
            } else {
                // Others
                script.onload = onLoad;
            }
        } else {
            onLoad();
        }
    }
};

Tabzilla.init = function()
{
    if (!Tabzilla.hasCSSTransitions) {
        // add easing functions
        jQuery.extend(jQuery.easing, {
            'easeInOut':  function (x, t, b, c, d) {
                if (( t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        });
    }

    Tabzilla.link  = document.getElementById('tabzilla');
    Tabzilla.panel = Tabzilla.buildPanel();
    Tabzilla.fillZGContacts();
    
    // add panel as first element of body element
    var body = document.getElementsByTagName('body')[0];
    body.insertBefore(Tabzilla.panel, body.firstChild);

    // set up event listeners for link
    Tabzilla.addEventListener(Tabzilla.link, 'click', function(e) {
        Tabzilla.preventDefault(e);
        Tabzilla.toggle();
    });

    Tabzilla.$panel = jQuery(Tabzilla.panel);
    Tabzilla.$link  = jQuery(Tabzilla.link);

    Tabzilla.$panel.addClass('tabzilla-closed');
    Tabzilla.$link.addClass('tabzilla-closed');
    Tabzilla.$panel.removeClass('tabzilla-opened');
    Tabzilla.$link.removeClass('tabzilla-opened');

    Tabzilla.opened = false;
};

Tabzilla.buildPanel = function()
{
    var panel = document.createElement('div');
    panel.id = 'tabzilla-panel';
    panel.innerHTML = Tabzilla.content;
    
    return panel;
};

function sortByKey(key){
  return function(a,b){
          if (a[key] < b[key])
             return -1;
         if (a[key] > b[key])
            return 1;
         return 0;          
  }
};

Tabzilla.addEventListener = function(el, ev, handler)
{
    if (typeof el.attachEvent != 'undefined') {
        el.attachEvent('on' + ev, handler);
    } else {
        el.addEventListener(ev, handler, false);
    }
};

Tabzilla.removeEventListener = function(el, ev, handler)
{
    if (typeof el.detachEvent != 'undefined') {
        el.detachEvent('on' + ev, handler);
    } else {
        el.removeEventListener(ev, handler, false);
    }
};

Tabzilla.toggle = function()
{
    if (Tabzilla.opened) {
        Tabzilla.close();
    } else {
        Tabzilla.open();
    }
};

Tabzilla.open = function()
{
    if (Tabzilla.opened) {
        return;
    }

    if (Tabzilla.hasCSSTransitions) {
        Tabzilla.$panel.addClass('tabzilla-opened');
        Tabzilla.$link.addClass('tabzilla-opened');
        Tabzilla.$panel.removeClass('tabzilla-closed');
        Tabzilla.$link.removeClass('tabzilla-closed');
    } else {
        // jQuery animation fallback
        jQuery(Tabzilla.panel).animate({ height: 260 }, 260, 'easeInOut');
    }

    Tabzilla.opened = true;
};

Tabzilla.close = function()
{
    if (!Tabzilla.opened) {
        return;
    }

    if (Tabzilla.hasCSSTransitions) {
        Tabzilla.$panel.removeClass('tabzilla-opened');
        Tabzilla.$link.removeClass('tabzilla-opened');
        Tabzilla.$panel.addClass('tabzilla-closed');
        Tabzilla.$link.addClass('tabzilla-closed');
    } else {
        // jQuery animation fallback
        jQuery(Tabzilla.panel).animate({ height: 0 }, 260, 'easeInOut');
    }

    Tabzilla.opened = false;
};

Tabzilla.preventDefault = function(ev)
{
    if (ev.preventDefault) {
        ev.preventDefault();
    } else {
        ev.returnValue = false;
    }
};

Tabzilla.fillZGContacts = function(){
   if (!Tabzilla.panel.id) return;
   $.ajax({
       url: 'http://chapters.zmgc.net',
       dataType: 'json',
       cache: true,
       ifModified: true,
      success: function(d){   // "Type","Name","Link","Contact","Location","Icon"
        Tabzilla.zgContacts = d;
        var countries = [];
        d.rows.forEach(function(row){
          if (row[0] == 'Country') countries.push(
            {link:row[2], contact:row[3], country: row[4]}
          );  
          if (row[0] == 'Region')
             console.log(row);
        });

        //alphabetically
        countries.sort(sortByKey('country'));
        //adding link 
        countryTemplate = function (country){
          s = '<a title="'+country.country+'" class="chapters_link" href="'
          +country.link+'" target="_blank">'
      +'<div class="chapters c_'+country.country.toLowerCase()+'">'
        +'<span class="flag-margin">'+country.country+'</span></div></a>' 
        return s;
        }
        
       
        var byletter = {};
        
        //count countries starting from each letter
        countries.forEach(function(c){        
          var firstletter = c.country.toLowerCase().charAt(0);
          if (byletter[firstletter]) byletter[firstletter]++;
          else byletter[firstletter]=1;
        });
        console.log(byletter);
        //prepare containers
        var panel = $("#"+Tabzilla.panel.id);
        var $cols = []; 
        
        $cols.push(panel.find(".c_COL4"));
        $cols.push(panel.find(".c_COL3"));
        $cols.push(panel.find(".c_COL2"));
        $cols.push(panel.find(".c_COL1"));
        var columns = $cols.length;        
        var targetlen = countries.length/columns;
                
        var FirstLetter = countries[0].country.toLowerCase().charAt(0);
        var cc = [];
        
        //fill containers. this loop is buggy. should be reviewed.
        countries.forEach(function(c){
          var newFirstLetter = c.country.toLowerCase().charAt(0);
          if (FirstLetter != newFirstLetter)
          {
             
             var l1 = cc.length;
             var l2 = l1 + byletter[newFirstLetter];
             //condition maybe shd be changed..
             
             if (Math.abs(l2-targetlen) >= Math.abs(l1-targetlen)){
               var $col;
               if ($cols.length>0) $col = $cols.pop();
               cc.forEach(function(c){
                 $col.append(countryTemplate(c));
               });
               cc=[];
               
               //does not work :(
               //could generate another template with first letter raised
               $col.find('span').first().addClass("first-letter");
             }
             cc.push(c);
          }
          else cc.push(c);
          FirstLetter = newFirstLetter;
        });
        
      },
   });
}

Tabzilla.content =
    '<div id="tabzilla-contents">  <!--- INTERNATONAL CHAPTERS TABLE starts here --->' 
    +'<div id="chapters_table">'
    +'<h1>CHAPTERS WORLD WIDE:</h1>' 
    +'<div class="c_COL1">' 
    /*+'<a title="Argentina" class="chapters_link" href="http://www.zeitgeistargentina.com" target="_blank">'
      +'<div class="chapters c_argentina">'
        +'<span class="flag-margin">		Argentina</span>'
      +'</div>'
    +'</a>' */
    //+'<a title="Australia" class="chapters_link" href="http://www.zeitgeistaustralia.org" target="_blank"><div class="chapters c_australia"><span class="flag-margin">    Australia</span></div></a> <a title="Austria" class="chapters_link" href="http://www.zeitgeist-movement.at" target="_blank"><div class="chapters c_austria"><span class="flag-margin">    Austria</span></div></a> <a title="Belgium" class="chapters_link" href="http://www.thezeitgeistmovement.be" target="_blank"><div class="chapters c_belgium"><span class="flag-margin">    Belgium</span></div></a> <a title="Brasil" class="chapters_link" href="http://movimentozeitgeist.com.br" target="_blank"><div class="chapters  c_brazil"><span class="flag-margin">    Brazil</span></div></a> <a title="Bulgaria" class="chapters_link" href="http://thezeitgeistmovement.bg/" target="_blank" target="_blank"><div class="chapters  c_bulgaria"><span class="flag-margin">    Bulgaria</span></div></a> <a title="Canada" class="chapters_link" href="http://www.zeitgeist-canada.com/" target="_blank" target="_blank"><div class="chapters  c_canada"><span class="flag-margin">    Canada</span></div></a> <a title="Chile" class="chapters_link" href="http://www.zchile.cl" target="_blank"><div class="chapters c_chile"><span class="flag-margin">    Chile</span></div></a> <a title="China" class="chapters_link" href="http://www.zmcn.org/" target="_blank"><div class="chapters c_china"><span class="flag-margin">    China</span></div></a> <a title="Colombia" class="chapters_link" href="http://www.zeitgeistcolombia.com" target="_blank"><div class="chapters c_colombia"><span class="flag-margin">    Colombia</span></div></a> <a title="Costa Rica" class="chapters_link" href="http://zeitgeistcostarica.com" target="_blank"><div class="chapters c_costarica"><span class="flag-margin">    Costa Rica</span></div></a> <a title="Croatia" class="chapters_link" href="http://www.zeitgeisthr.co.cc" target="_blank"><div class="chapters  c_croatia"><span class="flag-margin">    Croatia</span></div></a> <a title="Czech Republic" class="chapters_link" href="http://www.zeitgeistmovement.cz" target="_blank"><div class="chapters c_czechrep"><span class="flag-margin">    Czech Rep.</span></div></a> <a title="Denmark" class="chapters_link" href="http://www.thezeitgeistmovement.dk" target="_blank"><div class="chapters  c_denmark"><span class="flag-margin">    Denmark</span></div></a>' 
    +'</div> <div class="c_COL2">'// <a title="Ecuador" class="chapters_link" href="http://www.zeitgeistec.com" target="_blank"><div class="chapters c_ecuador"><span class="flag-margin">		Ecuador</span></div></a> <a title="Finland" class="chapters_link" href="http://www.zeitgeist.fi" target="_blank"><div class="chapters c_finland"><span class="flag-margin">    Finland</span></div></a> <a title="France" class="chapters_link" href="http://www.mouvement-zeitgeist.fr" target="_blank"><div class="chapters  c_france"><span class="flag-margin">    France</span></div></a> <a title="Germany" class="chapters_link" href="http://zeitgeistmovement.de" target="_blank"><div class="chapters c_gernamy"><span class="flag-margin">    Germany</span></div></a> <a title="Grece" class="chapters_link" href="http://tzm.gr" target="_blank"><div class="chapters c_greece"><span class="flag-margin">    Greece</span></div></a> <a title="Guatemala" class="chapters_link" href="http://www.zeitgeistguatemala.com" target="_blank"><div class="chapters c_guatemala"><span class="flag-margin">    Guatemala</span></div></a> <a title="Hungary" class="chapters_link" href="http://www.zeitgeisthungary.com" target="_blank"><div class="chapters c_hungary"><span class="flag-margin">    Hungary</span></div></a> <a title="India" class="chapters_link" href="http://www.tzmindia.com" target="_blank"><div class="chapters c_india"><span class="flag-margin">    India</span></div></a> <a title="Irleand" class="chapters_link" href="http://www.thezeitgeistmovement.ie" target="_blank"><div class="chapters c_irleand"><span class="flag-margin">    Ireland</span></div></a> <a title="Irleand" class="chapters_link" href="http://www.izm.org.il/" target="_blank"><div class="chapters c_israel"><span class="flag-margin">    Israel</span></div></a> <a title="Italy" class="chapters_link" href="http://www.zeitgeistitalia.org/" target="_blank"><div class="chapters c_italy"><span class="flag-margin">    Italy</span></div></a> <a title="Kazakhstan" class="chapters_link" href="http://www.thezeitgeistmovement.kz/" target="_blank"><div class="chapters c_kazakhstan"><span class="flag-margin">    Kazakhstan</span></div></a> <a title="Lithuania" class="chapters_link" href="http://www.zeitgeist.lt" target="_blank"><div class="chapters  c_lithuania"><span class="flag-margin">    Lithuania</span></div></a> <a title="Macedonia" class="chapters_link" href="http://zeitgeistmk.net" target="_blank"><div class="chapters c_macedonia"><span class="flag-margin">    Macedonia</span></div></a>' 
    +'</div> <div class="c_COL3">'// <a title="Malaysia" class="chapters_link" href="http://www.zeitgeistmalaysia.com" target="_blank"><div class="chapters c_malaysia"><span class="flag-margin">    Malaysia</span></div></a> <a title="Mexico" class="chapters_link" href="http://www.zeitgeist.com.mx" target="_blank"><div class="chapters  c_mexico"><span class="flag-margin">    Mexico</span></div></a> <a title="Netherlands" class="chapters_link" href="http://zmnetherlands.com" target="_blank"><div class="chapters c_netherlands"><span class="flag-margin">    Netherlands</span></div></a> <a title="New Zealand" class="chapters_link" href="http://tzmnz.com" target="_blank"><div class="chapters  c_newzealand"><span class="flag-margin">    New Zealand</span></div></a> <a title="Nicaragua" class="chapters_link" href="http://www.znicaragua.com/" target="_blank"><div class="chapters c_nicaragua"><span class="flag-margin">    Nicaragua</span></div></a> <a title="Norway" class="chapters_link" href="http://zeitgeistbevegelsen.no" target="_blank"><div class="chapters c_norway"><span class="flag-margin">    Norway</span></div></a> <a title="Paraguay" class="chapters_link" href="http://www.zeitgeistparaguay.com" target="_blank"><div class="chapters c_paraguay"><span class="flag-margin">    Paraguay</span></div></a> <a title="Peru" class="chapters_link" href="http://www.zeitgeistperu.com" target="_blank"><div class="chapters c_peru"><span class="flag-margin">    Peru</span></div></a> <a title="Philippines" class="chapters_link" href="http://tzmpilipinas.com/" target="_blank"><div class="chapters c_philippines"><span class="flag-margin">    Philippines</span></div></a> <a title="Poland" class="chapters_link" href="http://tzmpolska.org" target="_blank"><div class="chapters c_poland"><span class="flag-margin">    Poland</span></div></a> <a title="Portugal" class="chapters_link" href="http://www.zeitgeistportugal.org" target="_blank"><div class="chapters  c_portugal"><span class="flag-margin">    Portugal</span></div></a> <a title="Romania" class="chapters_link" href="http://www.ro.zeitgeist-movement.com" target="_blank"><div class="chapters c_romania"><span class="flag-margin">    Romania</span></div></a> <a title="Russia" class="chapters_link" href="http://www.thezeitgeistmovement.ru" target="_blank"><div class="chapters  c_russia"><span class="flag-margin">    Russia</span></div></a> <a title="Serbia" class="chapters_link" href="http://zeitgeistsrbija.org" target="_blank"><div class="chapters c_serbia"><span class="flag-margin">    Serbia</span></div></a>' 
    +'</div> <div class="c_COL4">'// '//<a title="Singapore" class="chapters_link" href="http://tzmsg.org" target="_blank"><div class="chapters c_singapore"><span class="flag-margin">    Singapore</span></div></a> <a title="Slovakia" class="chapters_link" href="http://zeitgeistmovement.sk" target="_blank"><div class="chapters c_slovakia"><span class="flag-margin">    Slovakia</span></div></a> <a title="South Africa" class="chapters_link" href="http://tzmsa.co.za" target="_blank"><div class="chapters c_southafrika"><span class="flag-margin">    South Africa</span></div></a> <a title="Spain" class="chapters_link" href="http://movimientozeitgeist.org" target="_blank"><div class="chapters  c_spain"><span class="flag-margin">Spain</span></div></a> <a title="Sweden" class="chapters_link" href="http://www.thezeitgeistmovement.se" target="_blank"><div class="chapters c_sweden"><span class="flag-margin">    Sweden</span></div></a> <a title="Switzerland" class="chapters_link" href="http://swisszeitgeistmovement.ch" target="_blank"><div class="chapters c_switzerland"><span class="flag-margin">        Switzerland</span></div></a> <a title="Thailand" class="chapters_link" href="http://www.zeitgeistthailand.com" target="_blank"><div class="chapters c_thailand"><span class="flag-margin">        Thailand</span></div></a> <a title="United Kindom" class="chapters_link" href="http://www.thezeitgeistmovementuk.com" target="_blank"><div class="chapters c_unitedkingdom"><span class="flag-margin">    United Kingdom</span></div></a> <a title="Uruguay" class="chapters_link" href="http://www.zeitgeist.org.uy" target="_blank"><div class="chapters c_uruguay"><span class="flag-margin">    Uruguay</span></div></a> <a title="Venezuela" class="chapters_link" href="http://www.zeitgeistvenezuela.com" target="_blank"><div class="chapters c_venezuela"><span class="flag-margin">    Venezuela</span></div></a>'
   
    +'</div>'
    +'</div>  <!--- INTERNATONAL CHAPTERS TABLE ends here --->' 
    +'<div id="tabzilla-nav"> <ul> <li><h2>Projects</h2> <ul> <li><a href="http://www.cultureindecline.com/" title="Cutlure in Decline" target="_blank">Culture in Decline</a></li> <li><a href="http://oneplanetproject.net" title="One Planet Project" target="_blank">One Planet Project</a></li> <li><a href="http://www.wakingupmovie.com" title="Waking Up Movie" target="_blank">Waking Up Movie</a></li> <li><a href="http://www.resourcebasedcommunities.org" title="Resource Based Communities" target="_blank">Resource Based Communities</a></li> <li><a href="http://www.indiegogo.com/kontinuumgarden" title="Kontinuum Garden" target="_blank">Kontinuum Garden</a></li> <li><a href="http://www.tzmeducation.org" title="TZM Education" target="_blank">TZM Education</a></li> <li><a href="http://tzmwiki.org" title="The Zeitgeist Movement Wiki" target="_blank">TZM Wiki</a></li> </ul> </li> <li><h2>Media</h2> <ul> <li><a href="http://thezeitgeistmovement.com" title="TZM Main Site" target="_blank">TZM Main Site</a></li> <li><a href="http://zeitgeistmediaproject.com" title="Zeitgeist Media Project" target="_blank">Zeitgeist Media Project</a></li> <li><a href="http://www.blogtalkradio.com/zmglobal" title="TZM Global Radio" target="_blank">TZM Global Radio</a></li> <li><a href="http://www.zeitnews.org/" title="ZeitNews target="_blank">ZeitNews</a></li> <li><a href="http://blog.thezeitgeistmovement.com" title="The Zeitgeist Movement Blog" target="_blank">The Zeitgeist Movement Blog</a></li> <li><a href="http://www.zbnlive.com" title="Zeitgeist Brodcasting Network" target="_blank">Zeitgeist Brodcasting Network</a></li> <li><a href="http://www.blogtalkradio.com/v-radio" title="V-Radio" target="_blank">V-Radio</a></li> </ul> </li> <li><h2>Activist Networks</h2> <ul> <li><a href="http://tzmnetwork.com" title="TZM Network" target="_blank">TZM Network</a></li> <li><a href="http://www.tzmchapters.net" title="TZM Chapters Portal" target="_blank">TZM Chapters Portal</a></li> <li><a href="http://chapters.zeitgeistaustralia.org" title="Australian Atrium Platform" target="_blank">Australian Atrium Platform</a></li> </ul> </li> <li><h2>Global Events</h2> <ul> <li><a href="http://zdayglobal.org" title="Z-Day" target="_blank">Z-Day</a></li> <li><a href="http://zeitgeistmediafestival.org" title="Zeitgeist Media Festival" target="_blank">Zeitgeist Media Festival</a></li> </ul> </li> </ul> </div> </div>';

Tabzilla();
