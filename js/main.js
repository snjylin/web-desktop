window.onload = function(){
  var oDoc = document.getElementById('doc');
  var oAppicons = document.getElementById('appicons');
  var oTaskbar = document.getElementById('taskbar');
  var oStartmenu = document.getElementById('startmenu');
  var oLaunchbar = document.getElementById('launchbar');
  var oApps = document.getElementById('Apps');
  var oLanguage = document.getElementById('language');
  var oNotearea = document.getElementById('notearea');
  var oNotearea = document.getElementById('time');
  var oNotearea = document.getElementById('show_window');

  var clientHeight = document.documentElement.clientHeight;
  document.body.style.height = clientHeight + 'px';

  oStartmenu.onclick = function(){
    new AppIcon({
      clientHeight: clientHeight
    });
  };
};
