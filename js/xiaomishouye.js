var ul1 = document.querySelector(".items-ul");
var ul2 = document.querySelector(".items-ul2");
var ul3 = document.querySelector(".items-ul3");
var ul4 = document.querySelector(".items-ul4");
var ul5 = document.querySelector(".items-ul5");
var ul6 = document.querySelector(".items-ul6");
var ul7 = document.querySelector(".ul-right1");
function showList() {
  aj;
  ax({
    url: "./data/data2.json",
    success: function (d1) {
      //转为json对象
      var data = eval("(" + d1 + ")");
      console.log(data);
      var str1 = "";
      var str2 = "";
      var str3 = "";
      var str4 = "";
      var str5 = "";
      var str6 = "";
      for (let j = 0; j < 8; j++) {
        str1 += `
        <li class="brick-item">
        <a href="xiangqing.html?id=${data[j].id}">
          <img src="${data[j].img}" />
          <h3 class="title">${data[j].title}</h3>
          <p class="desc">${data[j].desc}</p>
          <p class="price">${data[j].price}元起</p>
        </a>
      </li>
        `;
      }
      //把拼接好的数据添加到ul1对象中
      ul1.innerHTML = str1;
      for (let k = 8; k < 16; k++) {
        str2 += `
        <li class="brick-item">
        <a href="xiangqing.html?id=${data[k].id}">
          <img src="${data[k].img}" />
          <h3 class="title">${data[k].title}</h3>
          <p class="desc">${data[k].desc}</p>
          <p class="price">${data[k].price}元起</p>
        </a>
      </li>
        `;
      }
      ul2.innerHTML = str2;
      for (let l = 16; l < 24; l++) {
        str3 += `
        <li class="brick-item">
        <a href="xiangqing.html?id=${data[l].id}">
          <img src="${data[l].img}" />
          <h3 class="title">${data[l].title}</h3>
          <p class="desc">${data[l].desc}</p>
          <p class="price">${data[l].price}元起</p>
        </a>
      </li>
        `;
      }
      ul3.innerHTML = str3;
      for (let u = 24; u < 32; u++) {
        str4 += `
        <li class="brick-item">
        <a href="xiangqing.html?id=${data[u].id}">
          <img src="${data[u].img}" />
          <h3 class="title">${data[u].title}</h3>
          <p class="desc">${data[u].desc}</p>
          <p class="price">${data[u].price}元起</p>
        </a>
      </li>
        `;
      }
      ul4.innerHTML = str4;
      for (let i = 32; i < 40; i++) {
        str5 += `
        <li class="brick-item">
        <a href="xiangqing.html?id=${data[i].id}">
          <img src="${data[i].img}" />
          <h3 class="title">${data[i].title}</h3>
          <p class="desc">${data[i].desc}</p>
          <p class="price">${data[i].price}元起</p>
        </a>
      </li>
        `;
      }
      ul5.innerHTML = str5;
      for (let o = 40; o < 48; o++) {
        str6 += `
        <li class="brick-item">
        <a href="xiangqing.html?id=${data[o].id}">
          <img src="${data[o].img}" />
          <h3 class="title">${data[o].title}</h3>
          <p class="desc">${data[o].desc}</p>
          <p class="price">${data[o].price}元起</p>
        </a>
      </li>
        `;
      }
      ul6.innerHTML = str6;
    },
  });
}
showList();
/* function showList2() {
  ajax({
    url: "./data/nav.json",
    success: function (d2) {
      //转为json对象
      var data2 = eval("(" + d2 + ")");
      var str7 = "";
      console.log(data2);
      console.log(data2.sideNav[0].child[0]);
      for (let j = 0; j < data2.sideNav[0].child.length; j++) {
        str7 += `
        <li class="li-right">
        <a href="#"
          ><img src="${data2.sideNav[0].child[j].img}" alt="" /><span
            class="text1"
            >${data2.sideNav[0].child[j].title}</span
          >
        </a>
      </li>
        `;
      }
      ul7.innerHTML = str7;
    },
  });
}
showList2();
 */
