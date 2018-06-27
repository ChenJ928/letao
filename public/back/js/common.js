$(document).ajaxStart(function () {
    // console.log('aja4u提交开始');
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
    $('.aside_nav li a').click(function () {
        console.log($(this));
    })

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

    //拦截未登录状态
    if(location.href.indexOf("login.html") === -1) {
        $.ajax({
            type: 'get',
            url: '/employee/checkRootLogin',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if(info.error == 400) {
                    location.href = "login.html";                
                }
                if(info.success) {
                    console.log("用户已经登录");
                }
            }
        })
    }
})

