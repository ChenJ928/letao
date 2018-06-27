$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var txt = template('ftem' , info);
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

    $('.firstAdd').on("click", function () {
        $('.addModal').modal("show"); 
    })
    // 表单校验
    //使用表单校验插件
    $('#form').bootstrapValidator({
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            }
        },
    });

    //阻止默认提交,利用ajax提交
    $('#form').on('success.form.bv', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 通过ajax提交
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                if(info.success) {
                    $('.addModal').modal("hide"); 
                }
            }
        })
    })


})