$(function () {
    // 点击注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击登录链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 从layui获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过layui校验
    form.verify({
        // 密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能有空格'],
        // 两次密码校验规则
        repwd: function (value) {
            // 判断，失败提示消息
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd !== value) {
                return '密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form-reg').on('submit', function (e) {
        // 1.阻止默认行为
        e.preventDefault();
        var data = {
            username: $('#form-reg [name="username"]').val(),
            password: $('#form-reg [name="password"]').val()
        }
        $.post("/api/reguser", data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                // 注册成功跳转登录界面
                $('#link_login').click();
            }
        );
    })

    // 监听登录表单提交事件
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功')
                // 将token存储到本地数据
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    });
})