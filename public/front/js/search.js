$(function () {
    render();

    // 获取记录函数
    function getHistory() {
        var history = localStorage.getItem('search');
        var arr = JSON.parse(history) || [];
        return arr;
    };

    // 读取历史记录
    function render() {
        var arr = getHistory();
        var txt = template('stem', {arr: arr});
        $('#sul').html(txt);
    }

    //返回历史
    $('.head_left').click(function () {
        history.go(-1);
    })

    // 添加历史记录
    $('.search_btn').click(function () {

        

        var text = $('.main_search input').val();
        // 获取搜索框内容
        if($('.main_search input').val() === '') {
            mui.toast( "请输入搜索关键字");
            return;
        } else {
            var arr = getHistory() || [];

            // 查重记录
            var index = arr.indexOf(text);
            if(index > -1) {
                arr.splice(index, 1);
            }
            arr.unshift(text);
            if(arr.length === 7) {
                arr.pop();
            };
            localStorage.setItem('search', JSON.stringify(arr));
            render();
            $('.main_search input').val('');
        }
    })
    
    //清空历史记录
    $('.history').on("click", ".delete-clear", function () {
        mui.confirm( "你是否要清空全部的历史记录?", "温馨提示", ["取消", "确认"], function( e ) {
            if ( e.index === 1 ) {
              // 点击的确认, 执行清空操作
              localStorage.removeItem( "search" );
              render();
            }
        })
    })

    //删除历史记录
    $('.history').on("click", ".btn_delete", function () {
        var that = this;
        mui.confirm( "你是否要清除这条历史记录?", "温馨提示", ["取消", "确认"], function( e ) {
            if ( e.index === 1 ) {
              // 点击的确认, 执行清空操作
              var index = $(that).data("index");
              var arr = getHistory();
              arr.splice(index, 1);
              localStorage.setItem('search', JSON.stringify(arr));
              render();
            }
        })
    })
    
})