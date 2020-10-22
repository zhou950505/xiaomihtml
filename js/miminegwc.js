var data; //全局变量存放所有商品信息
var content = document.querySelector("#content"); //获取内容部分的父级元素
var xiaoshi = document.querySelector(".cart-top");
var ul_list = document.querySelector(".rec-list");
var shopCart;
showCart();
function showCart() {
  ajax({
    url: "./data/data2.json",
    success: function (dd) {
      var arr = JSON.parse(dd);
      console.log(arr[1]);
      //获取localstorage中的shopCart对应数据
      shopCart = localStorage.getItem("goods");
      if (shopCart) {
        //把shopCart中的数据转换为json对象
        shopCart = JSON.parse(shopCart);
        shopCart.forEach((item, index) => {
          console.log(item);
          console.log(arr[item.code]);
          console.log(item.code);
          var $str2 = $(`
            <ul class="list">
            <li class="item1">
              <input type="checkbox" name="single" />
            </li>
            <li class="item2">
              <img src="${arr[item.code].img}" />
              <span>${arr[item.code].title}</span>
            </li>
            <li class="item3"><span>${arr[item.code].price}</span>元</li>
            <li class="item4">
              <button>-</button>
              <input type="text" value="1" />
              <button>+</button>
            </li>
            <li class="item5"><span>${arr[item.code].price}</span>元</li>
            <li class="item6">
              <p class="sc">❌</p>
            </li>
          </ul>
            `);
          // 把该商品添加到购物车
          $("#shoppingcar").append($str2);
        });
      }
    },
  });
}

xiaoshi.onclick = function (a) {
  var a = a || window.event;
  var target = a.target || a.srcElement;
  if ((target.className = "btn-shopping")) {
    document.querySelector(".cart-top").style.display = "none";
  }
};
//绑定点击事件
content.onclick = function (e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  //添加商品数量
  if (target.innerHTML == "+") {
    //获取输入框的value值
    var val = $(target).prev().val();
    val++;
    //给输入框重新赋值
    $(target).prev().val(val);
    //获取单价
    var price = $(target).parent().prev()[0].lastElementChild.innerHTML;
    //数量乘以单价
    var xiaoji = parseInt(val) * parseFloat(price);
    //给小计重新赋值
    $(target).parent().next()[0].lastElementChild.innerHTML = xiaoji.toFixed(2);
    zongji();
    // tongji();
  }

  //减少商品数量
  if (target.innerHTML == "-") {
    //获取输入框的value值
    var val = $(target).next().val();
    if (val <= 1) {
      val = 1;
    } else {
      val--;
    }
    //给输入框重新赋值
    $(target).next().val(val);
    //获取单价
    var price = $(target).parent().prev()[0].lastElementChild.innerHTML;
    //数量乘以单价
    var xiaoji = parseInt(val) * parseFloat(price);
    //给小计重新赋值
    $(target).parent().next()[0].lastElementChild.innerHTML = xiaoji.toFixed(2);
    zongji();
    // tongji();
  }
  //判断点击的是否为选中框
  if (target.name == "single") {
    //获取所有的class=list的ul对象
    var uls = document.getElementsByClassName("list");
    var a = 0; //统计商品选中框被选中的次数
    //遍历商品
    for (var i = 0; i < uls.length; i++) {
      if (uls[i].firstElementChild.firstElementChild.checked) {
        a++;
      }
    }
    //是否所有商品都被选中了
    if (a == uls.length) {
      $("#all1")[0].checked = true;
    } else {
      $("#all1")[0].checked = false;
    }
    // tongji();
  }
  //判断点击的是否为全选框
  if (target.id == "all1") {
    quan(target);
  }

  //删除一个商品
  if (target.className == "sc") {
    //获取要删除的商品
    var uls = $(target).parents("ul")[0];
    uls.remove();
    totalgoods();
    // tongji();
    zongji();
  }
  function selectgoods() {
    var uls = document.getElementsByClassName("list");
    var sum = 0;
    for (var i = 0; i < uls.length; i++) {
      var a = 0;
      if (uls[i].firstElementChild.firstElementChild.checked) {
        a++;
      }
      sum += parseInt(a);
    }
    $(".select-goods").html(sum);
  }
  selectgoods();
  zongji();
};
//全选
function quan(target) {
  //获取所有的class=list的ul对象
  var uls = document.getElementsByClassName("list");
  //遍历商品
  for (var i = 0; i < uls.length; i++) {
    if (target.checked) {
      uls[i].firstElementChild.firstElementChild.checked = true;
    } else {
      uls[i].firstElementChild.firstElementChild.checked = false;
    }
  }
  // tongji();
}
showList();
function showList() {
  ajax({
    url: "./data/slide.json",
    success: function (dd) {
      //转为json对象
      data = JSON.parse(dd);
      var slide1 = eval("(" + dd + ")");
      var str1 = "";
      for (let i = 0; i < 20; i++) {
        str1 += `
            <li class="rec-item">
            <a href="#">
              <img src="${slide1.data.list.list[i].img}" alt="" />
              <div class="rec-name">${slide1.data.list.list[i].goods_name}</div>
              <div class="rec-price">${slide1.data.list.list[i].goods_price}元</div>
              <div class="rec-tips">${slide1.data.list.list[i].seckill_Price}人好评</div>
            </a>
            <div class="rec-action">
              <a href="#" class="btn" data-id=${slide1.data.list.list[i].goods_id} onclick="addShop(this)">加入购物车</a>
            </div>
          </li>
            `;
      }
      ul_list.innerHTML = str1;
    },
  });
}
function addShop(btn) {
  //获取当前点击对象的id值
  var id = $(btn).attr("data-id");
  //根据获取的id值，去所有商品中查询对应的数据
  data.data.list.list.forEach((item) => {
    if (item.goods_id == id) {
      var $ul = $(`
      <ul class="list">
      <li class="item1">
        <input type="checkbox" name="single" />
      </li>
      <li class="item2">
        <img src="${item.img}" />
        <span>${item.goods_name}</span>
      </li>
      <li class="item3"><span>${item.goods_price}</span>元</li>
      <li class="item4">
        <button>-</button>
        <input type="text" value="1" />
        <button>+</button>
      </li>
      <li class="item5"><span>${item.goods_price}</span>元</li>
      <li class="item6">
        <p class="sc">❌</p>
      </li>
    </ul>
      `);
      //把该商品添加到购物车
      $("#shoppingcar").append($ul);
    }
  });
  zongji();
  totalgoods();
  // tongji();
  // quan($("#all1"[0]));
}
zongji();
totalgoods();
//总计
function zongji() {
  //获取所有的class=list的ul对象
  var uls = document.getElementsByClassName("list");
  var sum = 0;
  //遍历每个商品列表
  /*   for (var i = 0; i < uls.length; i++) {
    //获取每个商品的小计
    sum += parseFloat(
      uls[i].querySelector(".item5").lastElementChild.innerHTML
    );
  } */
  for (var i = 0; i < uls.length; i++) {
    //判断该商品是否被选中
    if (uls[i].firstElementChild.firstElementChild.checked) {
      //获取每个商品的小计
      sum += parseFloat(
        uls[i].querySelector(".item5").lastElementChild.innerHTML
      );
    }
  }
  //获取总计的位置，赋值
  $(".total-right>span").html(sum);
}
// tongji();
function totalgoods() {
  var uls = document.getElementsByClassName("list");
  var sum = 0;
  for (var i = 0; i < uls.length; i++) {
    sum = parseFloat(uls.length);
  }
  $(".total-goods").html(sum);
}
totalgoods();
/* function selectgoods() {
  var uls = document.getElementsByClassName("list");
  var sum = 0;
  for (var i = 0; i < uls.length; i++) {
    var a = 0;
    if (uls[i].firstElementChild.firstElementChild.checked) {
      a++;
    }
    console.log(a);
    sum = parseInt(a);
  }
  $(".select-goods").html(sum);
} */
