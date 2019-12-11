
// 从地址栏中获取文章id
var postId = getUrlParms('id');
var review;
$.ajax({
	type: 'get',
	url: '/posts/' + postId,
	success: function (response) {
        // console.log(response)
        var html = template('postTpl', response);
		$('#article').html(html)
	}
})


//查看网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
		// console.log(response);
		var review=response.review;
		if (response.comment) {
			// 管理员开启了评论功能 渲染评论模板
			var html = template('commentTpl');
			// console.log(html);
			
			// 渲染评论模板
			$('#comment').html(html);
		}
    }
})


// 当点赞按钮发生点击事件时
$('#article').on('click', '#like', function () {
	// 向服务器端发送请求 执行点赞操作
	$.ajax({
		type: 'post',
		url: '/posts/fabulous/' + postId,
		success: function () {
			alert('点赞成功, 感谢您的支持')
		}
	})
})

// 使用事件委托，给评论表单注册事件
$('#comment').on('submit', 'form', function() {
    // 获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    // 代表评论的状态
    var state;

    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        // 不需要经过人工审核
        state = 1;
    }
    // 向服务器端发送请求 执行添加评论操作
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            author: userId
        },
        success: function() {
            alert('评论成功')
            location.reload();
        },
        error: function() {
            alert('评论失败')
        }
    })
    // 阻止表单默认提交行为
    return false;
})