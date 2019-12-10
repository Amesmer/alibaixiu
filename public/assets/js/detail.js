












//查看网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        // console.log(response);
        // var html = template('categotyTpl', { data: response })
        // $('#category').html(html);
    }
})


//评论