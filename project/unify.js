$(function () {
    
    var clickTop = $("#clickTop");

    clickTop.click(function () {
        $("body").animate({"scrollTop":"0px"},500);
    })
});
