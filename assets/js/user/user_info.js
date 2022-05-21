$(function () {
	const form = layui.form;
  const layer = layui.layer;
  // 自定义效验规则
	form.verify({
		nickname: (val) => {
			if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
		}
  });
  // 获取用户的基本信息;
	const initUserinfo = () => {
		$.ajax({
			type: 'GET',
			url: '/my/userinfo',
			success: (res) => {
				if (res.status !== 0) return layer.msg('获取用户信息失败');
				layer.msg(`获取用户信息成功`);
				// 为表单快速获值
				form.val('formUserInfo', res.data);
			}
		});
  };
  initUserinfo();
  // 实现表单的重置效果;
  $('#btnReset').click((e) => {
    e.preventDefault();
    initUserinfo();
  })
  // 发起请求更新用户的信息;
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: `/my/userinfo`,
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0)
          return layer.msg('更该用户信息失败')
        layer.msg('更改用户信息成功')
        // 获取index.js的getUserinfo()方法
        window.parent.getUserinfo()
      }
    })
  })
	
});
