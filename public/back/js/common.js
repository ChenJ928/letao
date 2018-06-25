$(document).ajaxStart(function () {
    // console.log('ajax提交开始');
    NProgress.start();
});
$(document).ajaxComplete(function () {
    // console.log('ajax提交开始');
    
    // 模拟网络延迟
    setInterval(function () {
        NProgress.done();
    }, 1000)
})

$(function () {
    // 侧边栏点击效果

    $('.aside_nav .aside_manage').click(function () {
        $(".aside_nav .child").stop().slideToggle();
    })

    $('.icon_menu').click(function () {
        $('.lt_aside').toggleClass('hiddenMenu');
        $('.lt_main').toggleClass('hiddenMenu');
        $('.lt_head').toggleClass('hiddenMenu');
    })

    //模态框
    $('.icon_out').click(function () {
        $('.myModal').modal("show");
    })
    $('.modal_out').click(function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function(info) {
                if(info.success) {
                    location.href = 'login.html'
                }
            }
        })
    })
})

