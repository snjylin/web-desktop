/**
 * 获取可视区宽度
 * @return {int} 返回可视区宽度值
 */
function viewWidth(){
  return document.documentElement.clientWidth;
}
/**
 * 获取可视区高度
 * @return {int} 返回可视区高度值
 */
function viewHeight(){
  return document.documentElement.clientHeight;
}

/**
 * 扩展对象
 * @param  {Object} obj1 原对象
 * @param  {Object} obj2 要在原对象基础上扩展的对象
 * @return {Object}      扩展后的对象
 */
function extend(obj1, obj2){
  for(var attr in obj2){
    if (Object.prototype.toString.call(obj2[attr]) === '[object Object]') {
      extend(obj1[attr], obj2[attr]);
    } else {
      obj1[attr] = obj2[attr];
    }
  }
}

/**
 * 封装ajax
 * @param  {String}   url      接口地址
 * @param  {Object}   params   参数：类型，地址，数据，数据类型，等
 * @param  {Function} callback callback
 * @return {json}            返回接口json数据
 */
function ajax(url, params, callback){
  if (Object.prototype.toString.call(url) === 'object Object') {
    var params = url;
    if (Object.prototype.toString.call(params) === 'object Function') {
      var callback = params;
    }
  }
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

/**
 * 注入script脚本
 * @param  {String} url             外部script文件地址
 * @param  {String} textContentHtml script代码
 * @return {[type]}
 */
function injectScript(url, textContentHtml){
  var script = document.createElement('script');
  if (url.match('^http|^//')) {
    script.src = url;
  }  else {
    var textContentHtml = url;
    script.textContent = textContentHtml;
  }
  document.body.appendChild(script);
}

/**
 * 判断是否是IE浏览器
 * @return {Boolean} true 是 | false 不是
 */
function isIE(){
  if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;
}

/**
 * 打开新页面
 * @param  {String} url 页面链接地址
 * @return {[type]}
 */
function goToUrl(url){
  if (isIE()) {
    /*
      在IE下采用window.location.href方式跳转，referer值为空。
      在标签<a></a>里面的跳转referer不会空。
     */
    //解决ie下不能得到refer的问题
    var gotoLink = document.createElement('a');
    gotoLink.href = url;
    document.body.appendChild(gotoLink);
    gotoLink.click();
    document.body.removeChild(gotoLink);
  } else window.location.href = url;
}

/**
 * 计算字符串长度
 * @param  {String} str  要判断的字符串
 * @param  {Number} chineseCharacterLen 中文字符占的字符长度，默认为2个字符长度
 * @return {Number}      字符串长度
 */
function getStringByteLength(str, chineseCharacterLen){
  if (!str) return;
  chineseCharacterLen = chineseCharacterLen || 2;
  var templen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      templen += chineseCharacterLen;
    } else {
      templen++;
    }
  }
  return templen;
}

/**
 * 截取字符串
 * @param  {String} str                 要截取的字符串
 * @param  {Number} len                 要截取的长度
 * @param  {String} suffix              后缀
 * @param  {Number} chineseCharacterLen 每个中文字符占的长度
 * @return {String}                     截取后的字符串
 */
function cutString(str, len, suffix, chineseCharacterLen){
  if (!str) return;
  if (Object.prototype.toString.call(len) === 'object String') {
    var suffix = len;
  } else if (Object.prototype.toString.call(len) === 'object Number') {
    var chineseCharacterLen = suffix;
  }
  if (Object.prototype.toString.call(suffix) === 'object Number') {
    var chineseCharacterLen = suffix;
  }
  len = len || 3;
  suffix = suffix || '';
  chineseCharacterLen = chineseCharacterLen || 2;
  var templen = 0;
  for(var i = 0; i < str.length; i++){
    if (str.charCodeAt(i) > 127) {
      templen += chineseCharacterLen;
    } else {
      templen++;
    }
    if (templen == len) {
      return str.substring(0, i+1) + suffix;
    } else if(templen >len) {
      return str.substring(0, i) + suffix;
    }
  }
}

/**
 * 判断数据类型
 * @param  {[type]} param 需要判断数据类型的数据
 * @return {String}       返回数据类型
 */
function getType(param){
  var typeStr = Object.prototype.toString.call(param);
  switch (typeStr) {
    case 'object String':
      return 'String';
      break;
    case 'object Number':
      return 'Number';
      break;
    case 'object Boolean':
      return 'Boolean';
      break;
    case 'object Undefined':
      return 'Undefined';
      break;
    case 'object Null':
      return 'Null';
      break;
    case 'object Object':
      return 'Object';
      break;
    case 'object Function':
      return 'Function';
      break;
    case 'object Array':
      return 'Array';
      break;
    case 'object Date':
      return 'Date';
      break;
    case 'object RegExp':
      return 'RegExp';
      break;
    default:
      break;
  }
}
