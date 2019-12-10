

//获取文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // console.log(response);
        var html = template('posttpl', { data: response.records })
        $('#postslist').html(html);
        //页码
        var page = template('pagetpl', response);
        $('#page').html(page)

    }
})


//跳转页面
function changepage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);
            var html = template('posttpl', { data: response.records })
            $('#postslist').html(html);
            var page = template('pagetpl', response);
            $('#page').html(page)

        }
    })

}

//获得分类数据
//获取分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categorytpl', { data: response })
        $('#categoryBox').html(html);
    }
})

// 根据分类和状态筛选文章
$('#filterform').on('submit', function () {
    // var formdata=$(this).serialize();
    //如果表单项的值为-1  请求参数就不要携带这一项
    console.log($('#category').val());
    
    var arr = [];
    if ($('#categoryBox').val() !=-1) {
        arr.push('category=' + $('#categoryBox').val())
    }
    if ($('#state').val() != -1) {
        arr.push('state=' + $('#state').val())
    }
    $.ajax({
        type: 'get',
        url: '/posts',
        // data:formdata,
        data: arr.join('&'),
        success: function (response) {
            console.log(response);
            var html = template('posttpl', { data: response.records })
            $('#postslist').html(html);
            var page = template('pagetpl', response);
            $('#page').html(page)
        }
    })
    return false;
})


//删除文章
$('#postslist').on('click','.delete',function(){
    if(confirm('你真的要进行删除操作吗')){
        var id=$(this).attr('data-id')
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function(){
                location.reload();
            }
        })
    }
   
})