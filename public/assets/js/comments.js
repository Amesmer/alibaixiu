//向服务器发送请求获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        // console.log(response);
        var html = template('commentstpl', response)
        $('#commentsbox').html(html);
        var pages = template('pagetpl', response)
        $('#pagebox').html(pages);
    }
})

//实现分页
function changepage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            var html = template('commentstpl', response)
            $('#commentsbox').html(html);
            var pages = template('pagetpl', response)
            $('#pagebox').html(pages);
        }
    })
}

//评论状态修改
$('#commentsbox').on('click', '.status', function () {
    var state = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    })
})

//评论删除
$('#commentsbox').on('click', '.delete', function () {
    if (confirm('您真的要删除评论吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})
