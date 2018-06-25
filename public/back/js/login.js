$(function () {
    // 进行表单校验
    $('#form').bootstrapValidator({
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
                        min: 6,
                        max: 30,
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
                        min: 6,
                        max: 30,
                        message: '密码长度必须在6到30之间'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
        }
    });

    // $('#form').on('success.form.bv', function (e) {
    //     // 阻止表单提交
    //     e.preventDefault();
        
    //     $.ajax({
    //         type:'get',
    //         url: '../index.html',
    //         data: $('#form').serialize(),
    //         dataType: 'json',

    //     })
    // })
})