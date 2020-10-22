var div1 = document.querySelector(".divv");

var ids = location.search;
var data;
if (ids) {
  var mm = ids.split("=")[1];
  ajax({
    url: "./data/data2.json",
    data: "id=" + mm,
    success: function (dt1) {
      //拼接
      console.log(dt1);
      data = JSON.parse(dt1);
      var str = `
     
      <div class="pic"> 
        <img src="${data[mm].img}" alt="" />
      </div>
      <div class="information">
        <h2>${data[mm].title}</h2>
        <p class="small-text">
          「十年献礼，巅峰美学！最高享24期免息，低至221元起/期；加149元得199元55W立式风冷无线充；加69元得皮革保护壳」120X
          超远变焦 / 120W 秒充科技 / 120Hz刷新率 + 240Hz采样率 /
          骁龙865旗舰处理器 / 双模5G / 10倍混合光学变焦 /
          OIS光学防抖+EIS数字防抖 / 2000万超清前置相机 /
          双串蝶式石墨烯基锂离子电池 / 等效4500mAh大电量 / 120W
          有线秒充+50W无线秒充+10W无线反充 / WiFi 6 / 多功能NFC / 红外遥控
        </p>
        <p class="ziying">小米自营</p>
        <p class="price">${data[mm].price}元</p>
        <img src="./img/sanjiliandong.jpg" alt="" class="sjld" />
        <a href="" class="btn-jiaru" code=${data[mm].id}>加入购物车</a>
      </div>
    
            `;
      div1.innerHTML = str;
      $(".divv").on("click", ".btn-jiaru", function () {
        // 如果没有商品则加入商品到购物车里;

        let goodsArr = [];
        if (localStorage.getItem("goods")) {
          goodsArr = JSON.parse(localStorage.getItem("goods"));
        }
        let code = $(this).attr("code");
        // 设置一个标志属性
        let flag = false;
        $.each(goodsArr, function (index, item) {
          if (item.code === code) {
            item.num++;
            flag = true;
            return false;
          }
        });
        // 如果购物车里含有数据则值进行数量加一
        if (!flag) {
          goodsArr.push({
            code: code,
            num: 1,
          });
        }
        //    数据存储到本地
        localStorage.setItem("goods", JSON.stringify(goodsArr));
        alert("添加成功");
      });
    },
  });
} else {
  alert("未知商品，请重新选择");
  location.href = "./xiaomishouye.html";
}

/* div1.onclick = function (e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  //判断点击的对象是否为‘加入购物车’
  if (target.innerHTML == "加入购物车") {
    //获取locaStrong中的shopCart对象
    var shopCart = localStorage.getItem("shopCart");
    //判断该键名是否存在
    if (shopCart) {
      //转为json对象
      var arr1 = JSON.parse(shopCart);
      var a = 0; //判断locaStrong中是否有现在要添加的商品
      //遍历arr1对象
      arr1.forEach(function (item) {
        //判断该内容是否跟我们添加的内容相同
        if (item.goods_id == data.goods_id) {
          //如果已存在，那么直接修改当前数组对象中对应商品的数量
          item.cart_number++;
          localStorage.setItem("shopCart", JSON.stringify(arr1));
          a = 1;
        }
      });
      //判断a是否为0，如果为0时，代表当前添加的商品，在locaStrong中不存在
      if (!a) {
        //修改当前添加的商品数量
        data.cart_number = 1;
        //把当前添加的商品追加到数组中
        arr1.push(data);
        localStorage.setItem("shopCart", JSON.stringify(arr1));
      }
    } else {
      data.cart_number = 1;
      localStorage.setItem("shopCart", JSON.stringify([data]));
    }
  }
}; */
