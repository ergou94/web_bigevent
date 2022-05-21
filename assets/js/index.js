$(function () { 
  getUserinfo()
  const layer = layui.layer
  $('#btnlogout').click(() => {
		layer.confirm('确认是否退出', { icon: 3, titile: '' }, (index) => {
			localStorage.removeItem('token');
			location.href = '/login.html';
		});
	});
});
const layer = layui.layer
const getUserinfo = () => {
    $.ajax({
			type: 'GET',
			url: '/my/userinfo',
			//       headers: {
			//           Authorization: localStorage.getItem("token"),
			// },
			success: (res) => {
				console.log(res);
				if (res.status !== 0) return layer.msg('获取用户信息失败');
				layer.msg('获取用户信息成功');
				renderAvatar(res.data);
			},
			// complete: (res) => {
			// 	console.log(res);
      //   if (res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！")
      //   {
			// 		localStorage.removeItem('token');
			// 		location.href = `/login.html`;
			// 	}
			// }
		});
}
// 渲染用户头像
const renderAvatar = (user) => {
    // 获取用户名字
    const name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`); 
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
};