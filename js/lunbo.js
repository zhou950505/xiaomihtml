//获取所有操作对象
var imgs = document.querySelectorAll(".img2");
var spans = document.querySelectorAll(".span1");
var left1 = document.querySelector(".left");
var right1 = document.querySelector(".right");
var wrap = document.querySelector(".wrap");
var timer1, timer2; //定时器
var index = 0; //图片和按钮的下标
move(imgs[0], 100);

//开始函数
autoMove();
function autoMove() {
  timer2 = setInterval(function () {
    hideImg();
    if (index == imgs.length - 1) {
      index = 0;
    } else {
      index++;
    }
    showImg();
  }, 4000);
}
//下一张图片
right1.onclick = function () {
  hideImg();
  if (index == imgs.length - 1) {
    index = 0;
  } else {
    index++;
  }
  showImg();
};
//上一张图片
left1.onclick = function () {
  hideImg();
  if (index == 0) {
    index = spans.length - 1;
  } else {
    index--;
  }
  showImg();
};

//给所有按钮绑定一个点击事件
for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = function () {
    hideImg();
    //把当前按钮的下标赋值给index
    index = i;
    showImg();
  };
}
//当前要隐藏的图片
function hideImg() {
  //透明图片
  imgs[index].style.opacity = 0.1;
  //把层级关系变小
  imgs[index].style.zIndex = 1;
  //清空按钮的class属性值
  spans[index].className = "";
}
//马上要显示的图片
function showImg() {
  //把层级关系变大
  imgs[index].style.zIndex = 2;
  //给按钮添加class属性值
  spans[index].className = "show";
  move(imgs[index], 1000);
}
//运动函数
function move(dom, end) {
  var opa = 10; //图片默认透明度
  clearInterval(timer1);
  timer1 = setInterval(function () {
    if (end > opa) {
      var speed = 2;
    } else {
      var speed = -2;
    }
    //临界条件
    if (Math.abs(end - opa) <= Math.abs(speed)) {
      clearInterval(timer1);
      dom.style.opacity = end / 100;
    } else {
      opa += speed;
      dom.style.opacity = opa / 100;
    }
  }, 20);
}
//给大盒子绑定鼠标移入移出事件
wrap.onmouseover = function () {
  clearInterval(timer2);
};
wrap.onmouseout = function () {
  autoMove();
};
