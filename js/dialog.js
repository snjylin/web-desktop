// 继承了Drag函数

function Dialog(opt){
  this.settings = {
    title: '属性',
    msg: 'content',
    dir: 'center',
    mark: false,
    style: {
      position: 'absolute',
      width: '300px',
      height: '200px',
      border: '1px solid #85adf2',
      borderRadius: '6px',
      background: '#fff'
    }
  };
  extend(this.settings, opt);
  this.initial();

  var dragsettings = {
    class: 'mod_'+this.settings.iNow
  };
  Drag.call(this, dragsettings);
}

extend(Dialog.prototype, Drag.prototype);

Dialog.prototype.json = {};

Dialog.prototype.initial = function(){

  if (this.json[this.settings.iNow] == undefined) {
    this.json[this.settings.iNow] = true;
  }

  if (this.json[this.settings.iNow]) {
    this.create();
    this.fnClose();
    if (this.settings.mark) {
      this.createMark();
    }
    this.json[this.settings.iNow] = false;
  }
};
Dialog.prototype.create = function(){
  this.oDialog = document.createElement('div');
  this.oDialog.className = 'mod mod_' + this.settings.iNow;
  this.oDialog.innerHTML = '<div class="mod-hd"><span class="title">' + this.settings.title + '</span><span class="fork">x</span></div>\
  <div class="mod-bd">' + this.settings.msg + '</div>\
  <div class="mod-ft"><span class="close">取消</span><span class="sure">确定</span></div>';
  document.body.appendChild(this.oDialog);

  this.setData();
};
Dialog.prototype.setData = function(){
  extend(this.oDialog.style, this.settings.style);

  switch (this.settings.dir) {
    case 'center':
      this.oDialog.style.left = (viewWidth() - this.oDialog.offsetWidth)/2 + 'px';
      this.oDialog.style.top = (viewHeight() - this.oDialog.offsetHeight)/2 + 'px';
      break;
    case 'right':
      this.oDialog.style.left = viewWidth() - this.oDialog.offsetWidth + 'px';
      this.oDialog.style.top = viewHeight() - this.oDialog.offsetHeight + 'px';
      break;
    case 'left':
      this.oDialog.style.left = '0px';
      this.oDialog.style.top = viewHeight() - this.oDialog.offsetHeight + 'px';
      break;
    default:
  }
}
Dialog.prototype.fnClose = function(){
  var This = this;
  this.oDialog.getElementsByClassName('fork')[0].onclick = function(){
    document.body.removeChild(This.oDialog);
    if (This.settings.mark) {
      document.body.removeChild(This.oMark);
    }
    This.json[This.settings.iNow] = true;
  }
  this.oDialog.getElementsByClassName('close')[0].onclick = function(){
    document.body.removeChild(This.oDialog);
    if (This.settings.mark) {
      document.body.removeChild(This.oMark);
    }
    This.json[This.settings.iNow] = true;
  }
};
Dialog.prototype.createMark = function(){
  this.oMark = document.createElement('div');
  this.oMark.id = 'mark';
  document.body.appendChild(this.oMark);

  this.oMark.style.width = viewWidth() + 'px';
  this.oMark.style.height = viewHeight() + 'px';
}
