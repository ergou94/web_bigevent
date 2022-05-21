$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: (val) => {
      if (val === $('[name = oldPwd').val())
       return '新旧密码不能相同！';
    },
    rePwd: (val) => {
      if(val !== $('[name = newPwd]').val())
      return "两次密码不一致！"
    }
  });
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
			type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('密码跟账号密码不符');
        layer.msg('更新密码')
        localStorage.removeItem(`token`)
        window.parent.location.href = `/login.html`
      }
		});
  })
})