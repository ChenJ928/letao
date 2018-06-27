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

    // 添加分类模块狂显现
    $('.Sadd').on("click", function () {
        $('.smodal').modal('show');
    })
    
    // 添加分类
    $('#dropdownMenu1').on("click", function () {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                var txt = template('sttem', info);
                $('.dropdown ul').html(txt);
            }
        })
    })

    // 下拉菜单选择
    $('.dropdown-menu').on("click", "a", function () {
        var text = $(this).text();
        $('#btn_seletor').text(text);
        // 获取ID
        var id = $(this).data("id");
        console.log(id);
        $('[name="categoryId"]').val(id);

        $('#form').data("bootstrapValidator").updateStatus('categoryId', 'VALID');  
    })

    // 上传图片
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          $('#upImg').attr("src", data.result.picAddr);
          $('[name="brandLogo"]').val(data.result.picAddr);
          $('#form').data("bootstrapValidator").updateStatus('brandLogo', 'VALID')  
        },
    });

    // 添加校验
    //使用表单校验插件
    $("#form").bootstrapValidator({

        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '品牌名称不能为空'
                    }
                }
            },
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '所属分类id不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '品牌logo图片地址不能为空'
                    }
                }
            },
        }
    
    });

    // 阻止表单自动提交,利用ajax提交
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                if(info.success) {
                    $('.modal').modal("hide")
                    render();
                }
            }
        })
    })
})