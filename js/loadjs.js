function LoadJs(urlList){
  var scriptsArr = [];
  for (var i = 0; i < urlList.length; i++) {
    (function(i){
        setTimeout(function(){
          scriptsArr[i] = document.createElement('script');
          scriptsArr[i].src = urlList[i];
          document.body.appendChild(scriptsArr[i]);
        },0);
    })(i);
  }
}

LoadJs([
  'js/tools.js',
  'js/drag.js',
  'js/dialog.js',
  'js/appicon.js',
  'js/main.js'
]);
