var oTable = document.querySelector('table');
var oSum = document.querySelector('#sum');
myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', {token: localStorage.token}, function(err, responseText){
  var json = JSON.parse(responseText);
  console.log(json);
  var data = json.data;
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    //一件商品的总价
    obj.goods_sum = obj.goods_price * obj.goods_number;
    oTable.innerHTML += `
                      <tr>
                        <td name="goods_id" class="id">${obj.goods_id}</td>
                        <td class="pic"><a href='goods.html?goods_id=${obj.goods_id}'><img src="${obj.goods_thumb}" ></a></td>
                        <td class="name">${obj.goods_name}</td>
                        <td class="maths"><input data-id="${obj.goods_id}" type="number" name="number" min="1" max="10" value="${obj.goods_number}" /></td>
                        <td class="price">${obj.goods_price}</td>
                        <td class="total" name="sum">${obj.goods_sum}</td>
                        <td class="oper"><input data-id="${obj.goods_id}" type="button" name="delete" value="删除" class='delete'></td>
                      </tr>
                      `;
  }
  getSum();
});

oTable.onchange = function(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (target.name === 'number') {
//    如果输入的内容不是数字，我们默认改成
    if (isNaN(parseInt(target.value))) {
      target.value = 1;
    }
    console.log(target.value, target.dataset.id);
    //得到商品的ID
    var goods_id = target.dataset.id;
    //得到商品的数量
    var number = target.value;
    //请求api修改购买的商品数量
    myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
    {goods_id, number},
    function(err, responseText) {
      var json = JSON.parse(responseText);
      console.log(json);
      if (json.code === 0) {
        // alert('更新购物车成功');
        //修改总价和小计
        //得到当前商品的价格
        var goods_price = parseInt(target.parentNode.nextElementSibling.innerText);
        //修改单个商品的总价：数量 * 价格
        target.parentNode.nextElementSibling.nextElementSibling.innerText ="¥" + parseInt(target.value) * goods_price;
        //显示总价
        getSum();
      }
    })
  }
}
oTable.addEventListener('click', function(event){
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (target.name === 'delete') {
    if (!confirm('确认要删除吗')) { //当你选择的是取消则不执行任何事情
      return;
    }
    //得到商品ID
    var goods_id = target.dataset.id;
    var number = 0;
    myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
    {goods_id, number},
    (err, responseText) => {
      var json = JSON.parse(responseText);
      console.log(json);
      if (json.code === 0) {
        // alert('更新购物车成功');
        //删除整个TR
        var tr = target.parentNode.parentNode;
        tr.parentNode.removeChild(tr);
        //显示总价
        getSum();
      }
    })
  }
});

var oClearCart = document.querySelector('#clear-cart');
oClearCart.onclick = () => {
  if (!confirm('确认要清空整个购物车吗？')) {
    return;
  }
  //得到所有的商品ID
  var oGoodsIds = document.querySelectorAll('td[name=goods_id]');
  for (var i = 0; i < oGoodsIds.length; i++) {
    var td = oGoodsIds[i];
    var goods_id = parseInt(td.innerText);
    var number = 0;
    (function(td){
      myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
      {goods_id, number},
      (err, responseText) => {
        var json = JSON.parse(responseText);
        console.log(json);
        if (json.code === 0) {
          // alert('更新购物车成功');
          //删除整个TR
          var tr = td.parentNode;
          tr.parentNode.removeChild(tr);
          //显示总价
          getSum();
        }
      });
    })(td);
  }
}

//显示出总价
function getSum() {
  var oSums = document.querySelectorAll('td[name=sum]');
  var sum = 0;
  for (var i = 0; i < oSums.length; i++) {
    sum += parseInt(oSums[i].innerText.substr(1));
  }
  localStorage.sum = sum;
  oSum.innerText = "￥" + sum;
}