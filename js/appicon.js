function AppIcon(options){
  this.aAppicons = document.getElementsByClassName('appicon-wrapper');
  this.iNow = this.aAppicons.length;
  this.settings = {
    icon: 'img/default.png',
    name: '未命名-' + this.iNow,
    wrapper: 'appicons',
    clientHeight: '680'
  };
  extend(this.settings, options);
  this.init();
}
/**
 * 初始化
 * @return {[type]} [description]
 */
AppIcon.prototype.init = function(){
  this.create();
  this.calcposition();
  this.rename();
  this.open();
};
/**
 * 创建桌面图标
 * @return {[type]} [description]
 */
AppIcon.prototype.create = function(){
  this.oAppIcon = document.createElement('div');
  this.oAppIcon.className = 'appicon-wrapper';
  this.oAppIcon.innerHTML = '<div class="appicon">\
    <img class="ico" src="' + this.settings.icon + '">\
    <div class="name" id="name_' + this.iNow + '" contenteditable="true" style="display:none;">' + this.settings.name + '</div>\
    <p class="name">' + this.settings.name + '</p>\
  </div>';
  this.wrapper = document.getElementById(this.settings.wrapper);
  this.wrapper.appendChild(this.oAppIcon);
};
AppIcon.prototype.calcposition = function(){
  for (var i = 0; i < this.aAppicons.length; i++) {
    this.aAppicons[i].style.left = Math.floor(i / (Math.floor(this.settings.clientHeight / 100))) * 74 + 'px';
    this.aAppicons[i].style.top = i % (Math.floor(this.settings.clientHeight / 100)) * 100 + 'px';
  }
};
/**
 * 桌面图标重命名
 * @return {[type]} [description]
 */
AppIcon.prototype.rename = function(){
  var This = this;
  this.oNameInp = This.oAppIcon.getElementsByClassName('name')[0];
  this.oNameP = This.oAppIcon.getElementsByClassName('name')[1];
  this.oAppIcon.onclick = function(){
    This.timer = setTimeout(function(){
      This.oNameInp.style.display = 'block';
      This.oNameP.style.display = 'none';
    }, 500);
  };
  this.oNameInp.onfocus = function(){
    This.name = This.oNameInp.textContent;
    This.selectText(this);
  };
  this.oNameInp.onblur = function(){
    if (!This.oNameInp.textContent) {
      this.innerHTML = This.name;
    } else {
      This.name = this.textContent;
    }
    This.oNameP.innerHTML = This.name;
    this.style.display = 'none';
    This.oNameP.style.display = 'block';
  };
  this.oNameInp.ondblclick = function(){
    This.open = null;
  }
};
/**
 * 双击打开桌面图标
 * @return {[type]} [description]
 */
AppIcon.prototype.open = function(){
  var This = this;
  this.oAppIcon.ondblclick = function(){
    clearTimeout(This.timer);
    new Dialog();
  };
};
/**
 * 单击后选中文本
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
AppIcon.prototype.selectText = function(obj) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(obj);
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNodeContents(obj);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}
