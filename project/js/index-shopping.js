	var cat_id = getQueryString('cat_id');
	var oUl2 = document.querySelector('#shopping-info').querySelector('ul');
	myajax.get('http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id, {}, function(error, responseText){
		var json = JSON.parse(responseText);
		var data = json.data;
		
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			oUl2.innerHTML += `
			<li>
				<a href="goods.html?goods_id=${obj.goods_id}">
					<div><img src="${obj.goods_thumb}">
					<em>${obj.goods_desc}</em></div>
					<h2>${obj.goods_name}</h2>
					<span>￥${obj.price}</span>
					<img src="images/TB1XvjXKVXXXXXwaXXXXXXXXXXX-36-36.png">
					<p>销量:390</p>
					
				</a>
			</li>`;
			
		}
	});
	