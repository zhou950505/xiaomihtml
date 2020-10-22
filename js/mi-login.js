var tabs = document.querySelector(".tabs");
//获取form表单对象
var frm = document.querySelector("form");
tabs.addEventListener("click", function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.className == "a2") {
    document.querySelector("#s1").style.display = "none";
    document.querySelector("#s2").style.display = "none";
    document.querySelector("#s3").style.display = "block";
  }
  if (target.className == "a1") {
    document.querySelector("#s1").style.display = "block";
    document.querySelector("#s2").style.display = "block";
    document.querySelector("#s3").style.display = "none";
  }
});
frm.onsubmit = function () {
  //获取表单输入框中的内容
  var u1 = document.querySelector("[name='user1']").value;
  var p1 = document.querySelector("[name='pass1']").value;
  //调用ahax对象
  ajax({
    url: "./php/login.php",
    data: `username=${u1}&password=${p1}`,
    success: function (dt1) {
      //判断登录是否成功
      if (dt1 == 1) {
        //保存登录账号
        setCookie("login", u1, 1200);
        // location.href = "./miminegwc.html";
        //获取地址栏中的参数
        var search1 = location.search;
        //判断该参数是否存在
        if (search1) {
          // console.log(search1);
          //获取参数值
          var path1 = search1.split("=")[1];
          //直接把获取的参数值作为跳转地址
          location.href = path1;
        } else {
          location.href = "./miminegwc.html";
        }
      } else {
        alert("账号或密码错误");
      }
    },
  });
  return false;
};
