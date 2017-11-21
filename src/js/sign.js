$('#sign').on('click', function () {
    let name = $('#name').val()
    // if (!name) {
    //     alert('请输入姓名')
    //     return
    // }
    let phone = $('#phone').val()
    // if (!phone) {
    //     alert('请输入手机号')
    //     return
    // }


    $.ajax({
        url: "http://localhost:3000/users",
        type: 'POST',
        data: {
            user_name: '张三',
            phone: '15602221234',
            industry: '互联网'
        },
        success: function (result) {
            console.log('签到成功')
            console.log(result)
            // location.href = '/award.html'
        }
    })

    localStorage.sign = 'true'
    $('#success-box').show()
})

$('input').on('focus', function () {
    $('body').addClass('page-inputing')
})
$('input').on('blur', function () {
    $('body').removeClass('page-inputing')
})

if (localStorage.sign) {
    if (location.award) {
        alert('您已经抽过奖品了')
    } else {
        $('#success-box').show()
    }
}