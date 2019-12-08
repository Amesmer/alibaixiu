
//获取分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        // console.log(response);
      var html=  template('categotyTpl',{data:response})
      $('#category').html(html);
    }
})

//封面添加
$('#feature').on('change',function(){
    //获取管理员选择到的文件
    var file=this.files[0];
    //创建formdata对象 实现二进制文件上传
    var formdata=new FormData();
    //           数据属性名称          
    formdata.append("cover",file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formdata,
         //不解析请求参数  
         processData:false,
         //不设置请求参数的类型   在formdata中已经设置
         contentType:false,
        success:function(response){
            //response 返回图片地址
            // console.log(response);
         $('#thumbnail').val(response[0].cover)
         
        }
    })

})

$('#addForm').on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:formdata,
        success:function(){
         location.href='/admin/posts.html'
        }
    })

    return false;
})