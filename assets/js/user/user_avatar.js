$(function () {
  const layer = layui.layer
	// 1.1 获取裁剪区域的 DOM 元素
	var $image = $('#image');
	// 1.2 配置选项
	const options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: '.img-preview'
	};

	// 1.3 创建裁剪区域
  $image.cropper(options);
  // 模拟文件选择框
  $('#btnclick').click(() => {
    $('#file').click()
  })
  $('#file').change((e) => {
    let files = e.target.files.length
    if (files === 0)
      return layer.msg('上传图片失败')
    const file = e.target.files[0]
    let imgUrl = URL.createObjectURL(file);
     $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", imgUrl) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
    
  })
  // 提交
  $('#btnok').click(function (e) {
     const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({
      type: 'POST',
      url:`/my/update/avatar`,
        data: {avatar: dataURL},
      success: (res) => {
        if (res.status !== 0) return layer.msg('上传图片失败')
        layer.msg('上传图片成功')
        window.parent.getSelection()
      }
    })
  })
});