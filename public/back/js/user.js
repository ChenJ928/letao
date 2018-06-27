$(function () {
    // 请求数据
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                var txt = template('tem', info);
                $('.table tbody').html(txt);
    
                // 分页插件设置
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，/必须指定
                    currentPage:info.page,//指定当前页
                    totalPages: Math.ceil(info.total / pageSize),
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

    // 禁用模态框显示
    $('tbody').on("click", ".btn", function () {
        $('#userModal').modal("show");
        currentId = $(this).parent().data("id");
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

        // // 禁用模态框按钮操作
        $('#userTrue').on("click", function () {
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: currentId,
                    isDelete: isDelete,
                },
                dataType: "json",
                success: function (info) {
                    $('#userModal').modal("hide");
                    render();
                }
            })
        })
    })


})