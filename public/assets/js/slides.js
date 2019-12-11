//轮播图片上传
$('#image').on('change',function(){
   var file=this.files[0];
   //创建formData对象是想二进制文件上传
   var formData=new FormData(); 
   //将管理员选择到的文件添加到formData对象中
   formData.append('image',file);
   $.ajax({
    type: 'post',
    url: '/upload',
    data:formData,
    processData:false,
    contentType:false,
    success: function (response) {
        // console.log(response);
        $('#hiddenimage').val(response[0].image)
        
    }
    })
})

//上传轮播数据
$('#slidesform').on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data:formdata,
        success: function (response) {
            // console.log(response);
       location.reload();
            
        }
    })
    return false;
})

//获取轮播数据列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response);
//    location.reload();
        var html=template('slidestpl',{
            data:response
        })
        $('#slidesbox').html(html);
    }
})


//轮播图删除
$('#slidesbox').on('click','.delete',function(){
    if(confirm('您真的要执行删除操作吗')){
        var id=$(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/slides/'+id,
            success: function (response) {
                // console.log(response);
           location.reload();
            }
        })
    }
})

