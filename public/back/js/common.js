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

// 侧边栏点击效果
$(function () {

    $('.aside_nav .aside_manage').click(function () {
        $(".aside_nav .child").stop().slideToggle();
    })

    $('.icon_menu').click(function () {
        $('.lt_aside').toggleClass('hiddenMenu');
        $('.lt_main').toggleClass('hiddenMenu');
        $('.lt_head').toggleClass('hiddenMenu');
    })
})