$(function () {

    // 滚动区域
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // var id = 1;
    // render();
    // function render() {
    //     $.ajax({
    //         type: 'get',
    //         url: '/category/querySecondCategory',
    //         data: {
    //             id: id,
    //         },
    //         dataType: 'json',
    //         success: function (info) {
    //             console.log(info);
    //         }
    //     })
    // }
})