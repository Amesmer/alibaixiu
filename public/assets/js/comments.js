//向服务器发送请求获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        // console.log(response);
        var html = template('commentstpl',  response )
        $('#commentsbox').html(html);
        var pages = template('pagetpl',  response )
        $('#pagebox').html(pages);
    }
})

//实现分页
function changepage(page){
    $.ajax({
        type: 'get',
        url: '/comments',
        data:{
            page:page
        },
        success: function (response) {
            // console.log(response);
            var html = template('commentstpl',  response )
            $('#commentsbox').html(html);
            var pages = template('pagetpl',  response )
            $('#pagebox').html(pages);
        }
    })
}