/**
 * Created by hang on 2017/11/21.
 */
$.ajax({
    url: "http://localhost:3000/users",
    success: function (result) {
        $("#div1").html(result);
        console.log('啊啊啊')
        console.log(result)
    }
});