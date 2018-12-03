function Drag(opt){
  this.opt = {
    class: ''
  }
  extend(this.opt, opt);
  this.init(this.opt);
}
Drag.prototype.init = function(opt){
  var This = this;
  this.obj = document.getElementsByClassName(opt.class)[0];
  extend(this.obj.style, this.opt.style);
  this.obj.onmousedown = function(e){
    var e = e || window.event;
    This.fnDown(e);
    window.onmousemove = function(e){
      var e = e || window.event;
      This.fnMove(e);
    }
    window.onmouseup = function(){
      This.fnUp();
    }
    return false;
  }
};
Drag.prototype.fnDown = function(e){
  this.disX = e.clientX - this.obj.offsetLeft;
  this.disY = e.clientY - this.obj.offsetTop;
};
Drag.prototype.fnMove = function(e){
  var L = e.clientX - this.disX;
  var T = e.clientY - this.disY;

  var maxLeft = document.documentElement.clientWidth - this.obj.offsetWidth;
  L<0 ? L=0 : (L>maxLeft ? L=maxLeft : L=L);

  var maxTop = document.documentElement.clientHeight - this.obj.offsetHeight;
  T<0 ? T=0 : (T>maxTop ? T=maxTop : T=T);

  this.obj.style.left = L + 'px';
  this.obj.style.top = T + 'px';
};
Drag.prototype.fnUp = function(){
  window.onmouseup = null;
  window.onmousemove = null;
};
