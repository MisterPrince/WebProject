$(function () {
    $("#enter").click(function () {
            var username = $("#username").val();
            var password = $("#password").val();
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_user.php",
                "type": "POST",
                "dataType": "json",
                "data": {
                    "status": "login",
                    "username": username,
                    "password": password
                },
                "success": function (response) {
                    console.log(response);
                    if (response.code === 0) {
                        var data = response.data;
                        for (var prop in data) {
                            if (data.hasOwnProperty(prop)) {
                                localStorage.setItem(prop, data[prop]);
                            }
                        }
                        location.href = 'index.html';
                    } else {
                        alert('用户不存在或密码错误');
                    }
                }
            });
            console.log([username, password]);
        });
    
    
    var clickTop = $("#clickTop");
    clickTop.click(function () {
        $("body").animate({"scrollTop":"0px"},500);
    })
});
