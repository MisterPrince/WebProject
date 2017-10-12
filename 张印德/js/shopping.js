	var oUl1 = document.querySelector('#shopping-list').querySelector('ul');
	var oLi = document.querySelector('#shopping-list').querySelector('ul').querySelectorAll('li');
	myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText){
		var json = JSON.parse(responseText);
		var data = json.data;
		
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			oUl1.innerHTML += `<li><a href="list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`;
		}
		
		for (var z = 0; z < oLi.length; z++) {
	      oLi[z].ontouch = function() {
	        for (var j = 0; j < oLi.length; j++) {
	          oLi[j].className = '';
	        }
	        this.className = 'light';
	      }
	    }
	});

	

	//搜索框的正则表达式
	function getQueryString(name) {
		var search = location.search.substr(1);
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var result = search.match(reg);
		return result === null ? null : decodeURIComponent(result[2]);
	}

//	var cat_id = getQueryString('cat_id');
//	var oUl2 = document.querySelector('#shopping-info').querySelector('ul');
//	myajax.get('http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id, {}, function(error, responseText){
//		var json = JSON.parse(responseText);
//		var data = json.data;
//		for (var i = 0; i < data.length; i++) {
//			var obj = data[i];
//			oUl2.innerHTML += `
//			<li>
//				<a href="goods.html?goods_id=${obj.goods_id}">
//					<div><img src="${obj.goods_thumb}">
//					<em>${obj.goods_desc}</em></div>
//					<h2>${obj.goods_name}</h2>
//					<span>￥${obj.price}</span>
//					<img src="../images/tianmao.png">
//					<p>销量:390</p>
//					
//				</a>
//			</li>`;
//			
//		}
//	});

//	var page = 1;
//	var pagesize = 1000;
//	var cat_id = getQueryString('cat_id');
//	function getContent(){
//		$.get('http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id, {page, pagesize}, function(json){
//			var template = "<li> <a href= goods.html? goods_id= <%=obj.goods_id %> ><div><img src= <%= obj.goods_thumb %> /></div><h2> <%= obj.goods_name %> </h2><span>￥ <%= obj.price %></span> <img src=../images/tianmao.png ><p>销量:390</p></a></li>";
//			var compile = _.template(template);
//			for(var i = 0; i < json.data.length; i++){
//				var data = json.data[i];
//				$('.shop-info-ul').html($('.shop-info-ul').html() + compile(data));
//			}
//			lock = true;
//		});
//	}
//	getContent();
//	
//	//函数截流
//	var lock = true;
//	$(window).scroll(function(){
//		if(!lock) return;
//		var rate = $(document).scrollTop() / $(document).height();
//		console.log(rate);
//		if (rate > 0.7){
//			getContent(++page);
//			lock = false; //加锁
//		}
//	});	
	
	