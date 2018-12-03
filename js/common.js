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
