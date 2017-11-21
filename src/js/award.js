/**
 * Created by hang on 2017/11/21.
 */

$(window).load(function () {
    $('#redux').eraser({
        size: 50,   //设置橡皮擦大小
        completeRatio: .5, //设置擦除面积比例
        completeFunction: showResetButton   //大于擦除面积比例触发函数
    });
    /*获取随机数*/
    var info = parseInt(Math.random() * 1000);
    var thanks;
    let award = false
    console.log(info)
    /*通过判断设置出现概率*/
    if (info > 500) {
        thanks = true
        $('#bg-thanks').show()
        $('#bg-award').hide()
    } else {
        award = true
        $('#bg-thanks').hide()
        $('#bg-award').show()
    }

    function showResetButton() {
        if (award) {
            $("#success-box").fadeIn(300)
        }
    }

})