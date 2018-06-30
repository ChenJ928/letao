$(function () {

    // 滚动区域
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 左侧请求
    // 请求数据
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var txt = template('ltem', info);
            // console.log(txt);
            $('#nav_left').html(txt);
        }
    })

    var id = 1;
    render(id)

    $('#nav_left').on("click", "li", function () {
        $(this).addClass('current').siblings().removeClass('current');
        var id = $(this).data("id");
        // 右侧请求
        render(id);
    })

});

function render(id) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {
            id: id,
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var txt = template('rtem', info);
            $('#nav_right').html(txt);
        }
    })
}