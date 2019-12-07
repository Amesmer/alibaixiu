//添加用户
$('#userform').on('submit', function () {
    var formdata = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formdata,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    //阻止表单默认提交行为
    return false;
})

// //上传用户头像
// $('#avatar').on('change', function () {
 
// })
$('#modifybox').on('change','#avatar',function(){
    var formdata = new FormData();
    //属性名称   
    formdata.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        //不解析请求参数  
        processData: false,
        //不设置请求参数的类型   在formdata中已经设置
        contentType: false,
        success: function (response) {
            //实现头像预览
            $('#preview').attr('src', response[0].avatar);
            //给隐藏域图片地址
            $('#hiddenavatar').val(response[0].avatar);
        }
    })
})


//获取用户列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        var html = template('usertpl', {
            data: response
        })
        $('#userBox').html(html);

    }
})

//左边修改显示
//通过事件委托为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            var html = template('modifytpl',
                response
            )
            $('#modifybox').html(html);
        }
    })
})

//为修改表单添加表单提交事件
$('#modifybox').on('submit', '#modifyform', function () {
    //获取表单中的数据
    var formdata = $(this).serialize();
    //获取要修改的ID值
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formdata,
        success: function (response) {
            location.reload();
        }
    })
    //阻止默认行为
    return false;
})

//用户删除
$('#userBox').on('click','.delete',function(){
    if(confirm('您真的要删除用户吗')){
       var id=$(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})




//获取全选按钮
  var  selectall=$('#selectall');
  var deletemany= $('#deletemany');
  //全选按钮状态发生改变
  selectall.on('change',function(){
     var status= $(this).prop('checked');
     //获取到所有用户
     $('#userBox').find('input').prop('checked',status);
     if(status){
       deletemany.show();
     }else{
         deletemany.hide();
     }
  })
//下级全选
$('#userBox').on('change','.userStatus',function(){
    //获取所有用户数量 和选中用户 比较数量
   var inputs= $('#userBox').find('input');
   if(inputs.length==inputs.filter(':checked').length){
      selectall.prop('checked',true)
   }else{
    selectall.prop('checked',false)
   }
   //批量删除显示与隐藏
   if(inputs.filter(':checked').length>0){
    deletemany.show();
   }else{
    deletemany.hide();
   }
})
//为批量删除按钮添加点击事件
deletemany.on('click',function(){
    var ids=[];
    //获取选中的用户                              
   var checkedUser= $('#userBox').find('input').filter(':checked');
   //循环复选框从复选框身上获取data-id
   checkedUser.each(function(index,element){
     ids.push( $(element).attr('data-id')) 
   })

   if(confirm('真的要进行批量删除操作吗')){
    $.ajax({
        type:'delete',
        url:'/users/'+ids.join("-"),
        success:function(response){
             location.reload();
        }
    })
   }
   

})