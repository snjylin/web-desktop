function viewWidth(){
  return document.documentElement.clientWidth;
}
function viewHeight(){
  return document.documentElement.clientHeight;
}

function extend(obj1, obj2){
  for(var attr in obj2){
    if (Object.prototype.toString.call(obj2[attr]) === '[object Object]') {
      extend(obj1[attr], obj2[attr]);
    } else {
      obj1[attr] = obj2[attr];
    }
  }
}

function ajax(params){
  var opts = {
    'type': 'get',
    'url': '',
    'data': '',
    'async': true,
    'dataType': 'application/x-www-form-urlencoded',
    'success': function(data){},
    'error': function(error){}
  };
  extend(opts, params);
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  } catch (e) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open(opts.type, opts.url, opts.async);
  if (opts.type == 'get') {
    opts.url = opts.url + '?' + opts.data;
    xhr.send();
  } else {
    xhr.setRequestHeader('content-type', opts.dataType);
    xhr.send(opts.data);
  }
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success(xhr.responseText);
      } else {
        error(xhr.status);
      }
    }
  };
}
