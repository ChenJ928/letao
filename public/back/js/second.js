$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var txt =  template('stem', info);
                $('.table tbody').html(txt);

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage:currentPage,//指定当前页
                    totalPages:Math.ceil(info.total/pageSize),//指定总页数
                    onPageClicked:function (a,b,c, page) {
                    //page指的是点击的页码,修改了当前页
                    currentPage = page;
                    //重新渲染
                    render();
                    }
                });
            }
        })
    }

    // 添加分类
    $('.Sadd').on("click", function () {
        $('.smodal').modal('show');
    })
    
})