var div1 = document.querySelector(".returntop");
var t1; //滚动距离
var dsp;
//给window对象绑定滚动事件
window.onscroll = function () {
  //获取滚动距离
  t1 = document.body.scrollTop || document.documentElement.scrollTop;
  //判断滚动距离显示按钮
  if (t1 > 700) {
    div1.style.display = "block";
  } else {
    div1.style.display = "none";
  }
};
//绑定点击事件
div1.onclick = function () {
  dsp = setInterval(function () {
    //创建每次要走的步长
    var speed = Math.ceil(t1 / 10);
    //把计算之后的距离赋值给文档对象
    document.documentElement.scrollTop = t1 - speed;
    if (t1 <= 0) {
      clearInterval(dsp);
    }
    console.log(t1);
  }, 50);
};
