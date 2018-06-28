$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];
    var picName = [];

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var txt = template('ptem', info);
                $('.table tbody').html(txt);
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentPage,//指定当前页
                    totalPages: Math.ceil(info.total / pageSize),//指定总页数
                    // 改变按钮文字
                    itemTexts: function (type, page, current) {
                        switch(type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return '上一页';
                            case 'page':
                                return page;
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                        }
                    },
                    // 改变提示文字
                    tooltipTitles: function (type, page, current) {
                        switch(type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return '上一页';
                            case 'page':
                                return '前往第'+ page + '页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                        }
                    },
                    // 是否添加提示样式
                    useBootstrapTooltip: true,
                    
                    onPageClicked: function (a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        })
    }

    // 添加分类按钮
    $('.Sadd').click(function () {
        $('#pModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize:100
            },
            dataType: 'json',
            success: function (info) {
                var txt = template('ttem', info);
                // console.log(txt);
                $('.dropdown-menu').html(txt);
            }
        })
        $('')
    })

    // 添加二级分类
    $('.dropdown').on( "click", "a", function () {
        var text = $(this).text();
        var a = $('#btn_seletor').text(text);
        var id = $(this).data('id');
        console.log(id);
        $('#inBrandId').val(id);
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");

    })  

    // 文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        console.log(data.result);
          picArr.unshift(data.result.picAddr);
          picName.unshift(data.result.picName);
          var picUrl = data.result.picAddr;
          $('#upImg').prepend("<img src='"+ picUrl +"'width='100' height='100'>");

          if(picArr.length > 3) {
              picName.pop();
              picArr.pop();
              $('#upImg img:last-of-type').remove();
          }

          if(picArr.length === 3) {
              $('#form').data('bootstrapValidator').updataStatus("picStatus", "VALID");
          }
        }
    });

    // 表单校验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
      
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
      
        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          brandId: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请选择二级分类'
              },
            }
          },
          brandName: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入商品名称'
              },
            }
          },
          proDesc: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入商品描述'
              },
            }
          },
          num: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入商品库存'
              },
            }
          },
          size: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入商品尺码'
              },
            }
          },
          oldPrice: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入商品原价'
              },
            }
          },
          price: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入商品现价'
              },
            }
          },
          picStatus: {
            validators: {
              notEmpty: {
                message: "请上传 3 张图片"
              }
            }
          }
        }
      
      });

    // 表单提交
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();
        var picData = $('#form').serialize();
        picData += "&picAddr1="+ picArr[0] + "&picName1=" + picName[0];
        picData += "&picAddr2="+ picArr[1] + "&picName2=" + picName[1];
        picData += "&picAddr3="+ picArr[2] + "&picName3=" + picName[2];
        // console.log(picData);

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: picData,
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if(info.success) {
                    render();
                    $('#pModal').modal('hide');
                    $('#upImg img').remove()
                }
            }
        })
    })
    
})