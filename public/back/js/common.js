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