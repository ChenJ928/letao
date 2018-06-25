$(function () {
    //1 进行表单校验
    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 8,
                        message: '密码长度必须在6到30之间'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            },
        }
    });

    // 2 使用submit提交,如果校验成功则跳转页面;校验失败会提示输入错误
    $('#form').on('success.form.bv', function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 通过ajax提交
        $.ajax({
            type:'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = 'first.html';
                }
                else if (info.error == 1000) {
                    console.log(info.message);
                    $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                }
                else if (info.error == 1001) {
                    console.log(info.message);
                    $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                }
            }
        })
    })

    //  3 解决重置按钮的功能
    $('[type = "reset"]').click(function () {
        $('#form').data('bootstrapValidator').resetForm();
    })
})