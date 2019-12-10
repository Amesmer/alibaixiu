
//获取分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categotyTpl', { data: response })
        $('#category').html(html);
    }
})

//封面添加
$('#feature').on('change', function () {
    //获取管理员选择到的文件
    var file = this.files[0];
    //创建formdata对象 实现二进制文件上传
    var formdata = new FormData();
    //           数据属性名称          
    formdata.append("cover", file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        //不解析请求参数  
        processData: false,
        //不设置请求参数的类型   在formdata中已经设置
        contentType: false,
        success: function (response) {
            //response 返回图片地址
            // console.log(response);
            $('#thumbnail').val(response[0].cover)
        }
    })
})


//提交文章
$('#addForm').on('submit', function () {
    var formdata = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formdata,
        success: function () {
            location.href = '/admin/posts.html'
        }
    })

    return false;
})

var id = getUrlParms('id');
//返回-1 说明不在修改操作    
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            //获取分类列表
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    //将返回值添加给response对象 方便模板拼接
                    response.categories = categories;
                    // console.log(response);
                    var html = template('modifytpl', response)
                    // console.log(html);
                    $('#parentbox').html(html);
                }
            })


        }
    })
}


//从浏览器的地址栏中获取查询参数
function getUrlParms(name) {
    //substr 从1下标截取到最后
    //split    
    //location.search获取地址栏参数 ?id=12313412
    var parmsAry = location.search.substr(1).split('&');
    for (var i = 0; i < parmsAry.length; i++) {
        temp = parmsAry[i].split('=')
        if (temp[0] == name) {
            return temp[1];
        };
    }
    return -1;
}


//当修改表单信息表单发生提交行为的时候
$('#parentbox').on('submit','#modifyForm',function(){
    var formdata=$(this).serialize();
   var id= $(this).attr('data-id');
   $.ajax({
    type: 'put',
    url: '/posts/'+id,
    data: formdata,
    success: function () {
        location.href = '/admin/posts.html'
    }
})

   return false;
})