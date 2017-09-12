var oGoods = document.querySelector('#goods');
var goods_id = getQueryString('goods_id');
console.log(goods_id);
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', {
    goods_id 
}, function(err, responseText){
    var json = JSON.parse(responseText);
    var obj = json.data[0];
    console.log(json);
    oGoods.innerHTML = `
    <div>
    	<h1>商品信息</h1>
        <img src="${obj.goods_thumb}">
        <h2>${obj.goods_name}</h2>
        <p>${obj.goods_desc}</p>
        <div id="btn">
        	<button class="btn1" >+</button>
        	 <span class="num">1</span>
        	 <button class="btn2">-</button>
        </div>
        <span>¥${obj.price}</span>
        <input type="button" id="add-to-cart" value="添加到购物车">
    </div>
    `;
    var btn1 = document.querySelector('.btn1');
    var btn2 = document.querySelector('.btn2');
	var num = document.querySelector('.num');
	btn1.onclick = function(){
		if (btn1.innerHTML=="+") {
			num.innerHTML++;
		}
	};
	btn2.onclick = function(){
		if(btn2.innerHTML=="-"&&num.innerHTML>1){
			num.innerHTML--;
		}
	}
});

document.body.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.id === 'add-to-cart') {
        if (!localStorage.token) {
            alert('请先登录再购买');
            localStorage.backurl = location.href
            location.href = "login.html";
            return;
        }
        console.log('添加到购物车');
        myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
        {goods_id, number:1},
        function(err, responseText) {
            var json = JSON.parse(responseText);
            console.log(json);
            if (json.code === 0) {
                alert('添加到购物车成功');
            }
        })
    }
}