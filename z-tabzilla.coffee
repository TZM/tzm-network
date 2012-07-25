Tabzilla = ->
  if typeof jQuery isnt "undefined" and jQuery
    jQuery(document).ready Tabzilla.init
  else
    Tabzilla.run()
Tabzilla.READY_POLL_INTERVAL = 40
Tabzilla.readyInterval = null
Tabzilla.jQueryCDNSrc = "//https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
Tabzilla.hasCSSTransitions = (->
  div = document.createElement("div")
  div.innerHTML = "<div style=\"" + "-webkit-transition: color 1s linear;" + "-moz-transition: color 1s linear;" + "-ms-transition: color 1s linear;" + "-o-transition: color 1s linear;" + "\"></div>"
  hasTransitions = (div.firstChild.style.webkitTransition isnt `undefined`) or (div.firstChild.style.MozTransition isnt `undefined`) or (div.firstChild.style.msTransition isnt `undefined`) or (div.firstChild.style.OTransition isnt `undefined`)
  delete div

  hasTransitions
)()
Tabzilla.run = ->
  webkit = 0
  isIE = false
  ua = navigator.userAgent
  m = ua.match(/AppleWebKit\/([^\s]*)/)
  if m and m[1]
    webkit = parseInt(m[1], 10)
  else
    m = ua.match(/Opera[\s\/]([^\s]*)/)
    if not m or not m[1]
      m = ua.match(/MSIE\s([^;]*)/)
      isIE = true  if m and m[1]
  if isIE
    if self isnt self.top
      document.onreadystatechange = ->
        if document.readyState is "complete"
          document.onreadystatechange = null
          Tabzilla.ready()
    else
      n = document.createElement("p")
      Tabzilla.readyInterval = setInterval(->
        try
          n.doScroll "left"
          clearInterval Tabzilla.readyInterval
          Tabzilla.readyInterval = null
          Tabzilla.ready()
          n = null
      , Tabzilla.READY_POLL_INTERVAL)
  else if webkit and webkit < 525
    Tabzilla.readyInterval = setInterval(->
      rs = document.readyState
      if "loaded" is rs or "complete" is rs
        clearInterval Tabzilla.readyInterval
        Tabzilla.readyInterval = null
        Tabzilla.ready()
    , Tabzilla.READY_POLL_INTERVAL)
  else
    Tabzilla.addEventListener document, "DOMContentLoaded", Tabzilla.ready

Tabzilla.ready = ->
  unless Tabzilla.DOMReady
    Tabzilla.DOMReady = true
    onLoad = ->
      Tabzilla.init()
      Tabzilla.removeEventListener document, "DOMContentLoaded", Tabzilla.ready

    if typeof jQuery is "undefined"
      script = document.createElement("script")
      script.type = "text/javascript"
      script.src = Tabzilla.jQueryCDNSrc
      document.getElementsByTagName("body")[0].appendChild script
      if script.readyState
        script.onreadystatechange = ->
          onLoad()  if script.readyState is "loaded" or script.readyState is "complete"
      else
        script.onload = onLoad
    else
      onLoad()

Tabzilla.init = ->
  unless Tabzilla.hasCSSTransitions
    jQuery.extend jQuery.easing,
      easeInOut: (x, t, b, c, d) ->
        return c / 2 * t * t + b  if (t /= d / 2) < 1
        -c / 2 * ((--t) * (t - 2) - 1) + b
  Tabzilla.link = document.getElementById("tabzilla")
  Tabzilla.panel = Tabzilla.buildPanel()
  body = document.getElementsByTagName("body")[0]
  body.insertBefore Tabzilla.panel, body.firstChild
  Tabzilla.addEventListener Tabzilla.link, "click", (e) ->
    Tabzilla.preventDefault e
    Tabzilla.toggle()

  Tabzilla.$panel = jQuery(Tabzilla.panel)
  Tabzilla.$link = jQuery(Tabzilla.link)
  Tabzilla.$panel.addClass "tabzilla-closed"
  Tabzilla.$link.addClass "tabzilla-closed"
  Tabzilla.$panel.removeClass "tabzilla-opened"
  Tabzilla.$link.removeClass "tabzilla-opened"
  Tabzilla.opened = false

Tabzilla.buildPanel = ->
  panel = document.createElement("div")
  panel.id = "tabzilla-panel"
  panel.innerHTML = Tabzilla.content
  panel

Tabzilla.addEventListener = (el, ev, handler) ->
  unless typeof el.attachEvent is "undefined"
    el.attachEvent "on" + ev, handler
  else
    el.addEventListener ev, handler, false

Tabzilla.removeEventListener = (el, ev, handler) ->
  unless typeof el.detachEvent is "undefined"
    el.detachEvent "on" + ev, handler
  else
    el.removeEventListener ev, handler, false

Tabzilla.toggle = ->
  if Tabzilla.opened
    Tabzilla.close()
  else
    Tabzilla.open()

Tabzilla.open = ->
  return  if Tabzilla.opened
  if Tabzilla.hasCSSTransitions
    Tabzilla.$panel.addClass "tabzilla-opened"
    Tabzilla.$link.addClass "tabzilla-opened"
    Tabzilla.$panel.removeClass "tabzilla-closed"
    Tabzilla.$link.removeClass "tabzilla-closed"
  else
    jQuery(Tabzilla.panel).animate
      height: 260
    , 260, "easeInOut"
  Tabzilla.opened = true

Tabzilla.close = ->
  return  unless Tabzilla.opened
  if Tabzilla.hasCSSTransitions
    Tabzilla.$panel.removeClass "tabzilla-opened"
    Tabzilla.$link.removeClass "tabzilla-opened"
    Tabzilla.$panel.addClass "tabzilla-closed"
    Tabzilla.$link.addClass "tabzilla-closed"
  else
    jQuery(Tabzilla.panel).animate
      height: 0
    , 260, "easeInOut"
  Tabzilla.opened = false

Tabzilla.preventDefault = (ev) ->
  if ev.preventDefault
    ev.preventDefault()
  else
    ev.returnValue = false

Tabzilla.content = "<div id=\"tabzilla-contents\">  <!--- INTERNATONAL CHAPTERS TABLE starts here ---> <table class=\"chapters_table\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody>  <tr><td colspan=\"4\">\t<h1>CHAPTERS WORLD WIDE:</h1><td></tr> <tr><!--- FIRST ROW --->   <td class=\"c_COL1\"> <a title=\"Argentina\" class=\"chapters_link\" href=\"http://www.zeitgeistargentina.com\" target=\"_blank\"><div class=\"chapters c_argentina\"><span class=\"flag-margin\">\t\tArgentina</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Ecuador\" class=\"chapters_link\" href=\"http://www.zeitgeistec.com\" target=\"_blank\"><div class=\"chapters c_ecuador\"><span class=\"flag-margin\">\t\tEcuador</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Netherlands\" class=\"chapters_link\" href=\"http://zmnetherlands.com\" target=\"_blank\"><div class=\"chapters c_netherlands\"><span class=\"flag-margin\">    Netherlands</span></div></a> </td> <td class=\"c_COL4\"> <a title=\"Switzerland\" class=\"chapters_link\" href=\"http://swisszeitgeistmovement.ch\" target=\"_blank\"><div class=\"chapters c_switzerland\"><span class=\"flag-margin\">        Switzerland</span></div></a> </td>   </tr><tr><!--- SECOND ROW --->   <td class=\"c_COL1\"> <a title=\"Australia\" class=\"chapters_link\" href=\"http://www.zeitgeistaustralia.org\" target=\"_blank\"><div class=\"chapters c_australia\"><span class=\"flag-margin\">    Australia</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Finland\" class=\"chapters_link\" href=\"http://www.zeitgeist.fi\" target=\"_blank\"><div class=\"chapters c_finland\"><span class=\"flag-margin\">    Finland</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"New Zealand\" class=\"chapters_link\" href=\"http://tzmnz.com\" target=\"_blank\"><div class=\"chapters  c_newzealand\"><span class=\"flag-margin\">    New Zealand</span></div></a> </td> <td class=\"c_COL4\"> <a title=\"United Kindom\" class=\"chapters_link\" href=\"http://www.thezeitgeistmovementuk.com\" target=\"_blank\"><div class=\"chapters c_unitedkingdom\"><span class=\"flag-margin\">    United Kingdom</span></div></a> </td>   </tr><tr><!--- THRID ROW --->   <td class=\"c_COL1\"> <a title=\"Austria\" class=\"chapters_link\" href=\"http://zeitgeist-movement.at\" target=\"_blank\"><div class=\"chapters c_austria\"><span class=\"flag-margin\">    Austria</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"France\" class=\"chapters_link\" href=\"http://www.mouvement-zeitgeist.fr\" target=\"_blank\"><div class=\"chapters  c_france\"><span class=\"flag-margin\">    France</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Norway\" class=\"chapters_link\" href=\"http://zeitgeistbevegelsen.no\" target=\"_blank\"><div class=\"chapters c_norway\"><span class=\"flag-margin\">    Norway</span></div></a> </td> <td class=\"c_COL4\"> <a title=\"Uruguay\" class=\"chapters_link\" href=\"http://www.zeitgeist.org.uy\" target=\"_blank\"><div class=\"chapters c_uruguay\"><span class=\"flag-margin\">    Uruguay</span></div></a> </td>   </tr><tr><!--- FOURTH ROW --->   <td class=\"c_COL1\"> <a title=\"Belgium\" class=\"chapters_link\" href=\"http://www.thezeitgeistmovement.be\" target=\"_blank\"><div class=\"chapters c_belgium\"><span class=\"flag-margin\">    Belgium</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Deucheland\" class=\"chapters_link\" href=\"http://zeitgeistmovement.de\" target=\"_blank\"><div class=\"chapters c_gernamy\"><span class=\"flag-margin\">    Germany</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Paraguay\" class=\"chapters_link\" href=\"http://www.zeitgeistparaguay.com\" target=\"_blank\"><div class=\"chapters c_paraguay\"><span class=\"flag-margin\">    Paraguay</span></div></a> </td> <td class=\"c_COL4\"> <a title=\"Venezuela\" class=\"chapters_link\" href=\"http://www.zeitgeistvenezuela.com\" target=\"_blank\"><div class=\"chapters c_venezuela\"><span class=\"flag-margin\">    Venezuela</span></div></a> </td>   </tr><tr><!--- FIFTH ROW --->   <td class=\"c_COL1\"> <a title=\"Brasil\" class=\"chapters_link\" href=\"http://movimentozeitgeist.com.br\" target=\"_blank\"><div class=\"chapters  c_brazil\"><span class=\"flag-margin\">    Brazil</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Grece\" class=\"chapters_link\" href=\"http://tzm.gr\" target=\"_blank\"><div class=\"chapters c_greece\"><span class=\"flag-margin\">    Greece</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Peru\" class=\"chapters_link\" href=\"http://www.zeitgeistperu.com\" target=\"_blank\"><div class=\"chapters c_peru\"><span class=\"flag-margin\">    Peru</span></div></a> </td> <td class=\"c_COL4\"> <a title=\"Virgin Islands\" class=\"chapters_link\" href=\"http://tzmvirginislands.groupsite.com\" target=\"_blank\"><div class=\"chapters c_virgin\"><span class=\"flag-margin\">    Virgin Islands</span></div></a> </td>   </tr><tr><!--- SIXTH ROW --->   <td class=\"c_COL1\"> <a title=\"Bulgaria\" class=\"chapters_link\" href=\"http://zgeist.net\" target=\"_blank\" target=\"_blank\"><div class=\"chapters  c_bulgaria\"><span class=\"flag-margin\">    Bulgaria</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Hungary\" class=\"chapters_link\" href=\"http://zeitgeisthungary.com\" target=\"_blank\"><div class=\"chapters c_hungary\"><span class=\"flag-margin\">    Hungary</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Polska\" class=\"chapters_link\" href=\"http://tzmpolska.org\" target=\"_blank\"><div class=\"chapters c_poland\"><span class=\"flag-margin\">    Poland</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr><tr><!--- SEVENTH ROW --->   <td class=\"c_COL1\"> <a title=\"Canada\" class=\"chapters_link\" href=\"http://www.zeitgeist-canada.com\" target=\"_blank\"><div class=\"chapters c_canada\"><span class=\"flag-margin\">    Canada</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"India\" class=\"chapters_link\" href=\"http://tzmindia.com\" target=\"_blank\"><div class=\"chapters c_india\"><span class=\"flag-margin\">    India</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Portugal\" class=\"chapters_link\" href=\"http://www.zeitgeistportugal.org\" target=\"_blank\"><div class=\"chapters  c_portugal\"><span class=\"flag-margin\">    Portugal</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr><tr><!--- EIGHT ROW --->   <td class=\"c_COL1\"> <a title=\"Chile\" class=\"chapters_link\" href=\"http://zchile.cl\" target=\"_blank\"><div class=\"chapters c_chile\"><span class=\"flag-margin\">    Chile</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Irleand\" class=\"chapters_link\" href=\"http://www.thezeitgeistmovement.ie\" target=\"_blank\"><div class=\"chapters c_irleand\"><span class=\"flag-margin\">    Ireland</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Russia\" class=\"chapters_link\" href=\"http://www.thezeitgeistmovement.ru\" target=\"_blank\"><div class=\"chapters  c_russia\"><span class=\"flag-margin\">    Russia</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr><tr><!--- NINETH ROW --->   <td class=\"c_COL1\"> <a title=\"Colombia\" class=\"chapters_link\" href=\"http://www.zeitgeistcolombia.com\" target=\"_blank\"><div class=\"chapters c_colombia\"><span class=\"flag-margin\">    Colombia</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Romania\" class=\"chapters_link\" href=\"http://www.ro.zeitgeist-movement.com\" target=\"_blank\"><div class=\"chapters c_romania\"><span class=\"flag-margin\">    Romania</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Serbia\" class=\"chapters_link\" href=\"http://zeitgeistsrbija.org\" target=\"_blank\"><div class=\"chapters c_serbia\"><span class=\"flag-margin\">    Serbia</span></div></a>  </td> <td class=\"c_COL4\"></td>   </tr><tr><!--- TENTH ROW --->    <td class=\"c_COL1\"> <a title=\"Costa Rica\" class=\"chapters_link\" href=\"http://zeitgeistcostarica.com\" target=\"_blank\"><div class=\"chapters c_costarica\"><span class=\"flag-margin\">    Costa Rica</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Lithuania\" class=\"chapters_link\" href=\"http://www.zeitgeist.lt\" target=\"_blank\"><div class=\"chapters  c_lithuania\"><span class=\"flag-margin\">    Lithuania</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Singapore\" class=\"chapters_link\" href=\"http://tzmsg.org\" target=\"_blank\"><div class=\"chapters c_singapore\"><span class=\"flag-margin\">    Singapore</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr><tr><!--- ELEVENTH ROW --->   <td class=\"c_COL1\"> <a title=\"Croatia\" class=\"chapters_link\" href=\"http://www.zeitgeisthr.co.cc\" target=\"_blank\"><div class=\"chapters  c_croatia\"><span class=\"flag-margin\">    Croatia</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Macedonia\" class=\"chapters_link\" href=\"http://zeitgeistmk.net\" target=\"_blank\"><div class=\"chapters c_macedonia\"><span class=\"flag-margin\">    Macedonia</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Slovenia\" class=\"chapters_link\" href=\"http://www.zeitgeist.si\" target=\"_blank\"><div class=\"chapters c_slovenia\"><span class=\"flag-margin\">    Slovenia</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr><tr><!--- TWELVETH ROW --->   <td class=\"c_COL1\"> <a title=\"Czech Republic\" class=\"chapters_link\" href=\"http://www.zeitgeistmovement.cz\" target=\"_blank\"><div class=\"chapters c_czechrep\"><span class=\"flag-margin\">    Czech Rep.</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"South Africa\" class=\"chapters_link\" href=\"http://tzmsa.co.za\" target=\"_blank\"><div class=\"chapters c_southafrika\"><span class=\"flag-margin\">    South Africa</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Slovakia\" class=\"chapters_link\" href=\"http://zeitgeistmovement.sk\" target=\"_blank\"><div class=\"chapters c_slovakia\"><span class=\"flag-margin\">    Slovakia</span></div></a> </td> <td class=\"c_COL4\">  </td>    </tr><tr><!--- THRITEENTH ROW --->   <td class=\"c_COL1\"> <a title=\"Denmark\" class=\"chapters_link\" href=\"http://thezeitgeistmovement.dk\" target=\"_blank\"><div class=\"chapters  c_denmark\"><span class=\"flag-margin\">    Denmark</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Mexico\" class=\"chapters_link\" href=\"http://www.zeitgeist.com.mx\" target=\"_blank\"><div class=\"chapters  c_mexico\"><span class=\"flag-margin\">    Mexico</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Spain\" class=\"chapters_link\" href=\"http://movimientozeitgeist.org\" target=\"_blank\"><div class=\"chapters  c_spain\"><span class=\"flag-margin\">Spain</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr><tr><!--- FOURTEENTH ROW --->   <td class=\"c_COL1\"> <a title=\"Dominican Republic\" class=\"chapters_link\" href=\"http://www.zeitgeistrd.org\" target=\"_blank\"><div class=\"chapters  c_dominican\"><span class=\"flag-margin\">    Dominican Rep.</span></div></a> </td> <td class=\"c_COL2\"> <a title=\"Mongolia\" class=\"chapters_link\" href=\"http://www.thezeitgeistmovement.mn\" target=\"_blank\"><div class=\"chapters c_mongolia\"><span class=\"flag-margin\">Mongolia</span></div></a> </td> <td class=\"c_COL3\"> <a title=\"Sweden\" class=\"chapters_link\" href=\"http://www.thezeitgeistmovement.se\" target=\"_blank\"><div class=\"chapters c_sweden\"><span class=\"flag-margin\">    Sweden</span></div></a> </td> <td class=\"c_COL4\">  </td>   </tr>   </tbody></table>  <!-- Spares <a class=\"chapters_link\" href=\"http://www.zeitgeist.org.il/\" target=\"_blank\"><div class=\"chapters c_israel\"><span class=\"flag-margin\">    Israel</span></div></a> <a class=\"chapters_link\" href=\"http://www.zmjp.net/\" target=\"_blank\"><div class=\"chapters  c_japan\"><span class=\"flag-margin\">    Japan</span></div></a> --> <!--- INTERNATONAL CHAPTERS TABLE ends here --->  <div id=\"tabzilla-nav\"> <ul> <li><h2>Projects</h2> <ul> <li><a href=\"http://oneplanetproject.net\" title=\"One Planet Project\" target=\"_blank\">One Planet Project</a></li> <li><a href=\"http://www.wakingupmovie.com\" title=\"Waking Up Movie\" target=\"_blank\">Waking Up Movie</a></li> <li><a href=\"http://www.resourcebasedcommunities.org\" title=\"Resource Based Communities\" target=\"_blank\">Resource Based Communities</a></li> <li><a href=\"http://www.indiegogo.com/kontinuumgarden\" title=\"Kontinuum Garden\" target=\"_blank\">Kontinuum Garden</a></li> <li><a href=\"http://www.tzmeducation.org\" title=\"TZM Education\" target=\"_blank\">TZM Education</a></li> <li><a href=\"http://www.cultureindecline.com/\" title=\"Cutlure in Decline\" target=\"_blank\">Culture in Decline</a></li> </ul> </li> <li><h2>Media</h2> <ul> <li><a href=\"http://thezeitgeistmovement.com\" title=\"TZM Main Site\" target=\"_blank\">TZM Main Site</a></li> <li><a href=\"http://zeitgeistmediaproject.com title=\"Zeitgeist Media Project\" target=\"_blank\">Zeitgeist Media Project</a></li> <li><a href=\"http://www.blogtalkradio.com/zmglobal\" title=\"TZM Global Radio\" target=\"_blank\">TZM Global Radio</a></li> <li><a href=\"http://www.zeitnews.org/\" title=\"ZeitNews target=\"_blank\">ZeitNews</a></li> <li><a href=\"http://blog.thezeitgeistmovement.com\" title=\"The Zeitgeist Movement Blog\" target=\"_blank\">The Zeitgeist Movement Blog</a></li> <li><a href=\"http://www.zbnlive.com\" title=\"Zeitgeist Brodcasting Network\" target=\"_blank\">Zeitgeist Brodcasting Network</a></li> <li><a href=\"http://www.blogtalkradio.com/v-radio\" title=\"V-Radio\" target=\"_blank\">V-Radio</a></li> </ul> </li> <li><h2>Activist Networks</h2> <ul> <li><a href=\"http://tzmnetwork.com\" title=\"TZM Network\" target=\"_blank\">TZM Network</a></li> <li><a href=\"http://www.tzmchapters.net\" title=\"TZM Chapters Portal\" target=\"_blank\">TZM Chapters Portal</a></li> <li><a href=\"http://chapters.zeitgeistaustralia.org\" title=\"Australian Atrium Platform\" target=\"_blank\">Australian Atrium Platform</a></li> </ul> </li> <li><h2>Global Events</h2> <ul> <li><a href=\"http://zdayglobal.org\" title=\"Z-Day\" target=\"_blank\">Z-Day</a></li> <li><a href=\"http://zeitgeistmediafestival.org\" title=\"Zeitgeist Media Festival\" target=\"_blank\">Zeitgeist Media Festival</a></li> </ul> </li> </ul> </div> </div>"
Tabzilla()
