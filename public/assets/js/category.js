//添加分类
$('#addCategory').on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:formdata,
        success:function(){
            location.reload();
        }
    })
    return false;
})
//获取分类
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        // console.log(response);
      var html=  template('categoryListTpl',{data:response})
      $('#categoryBox').html(html);
    }
})

//编辑按钮
$('#categoryBox').on('click' ,'.edit',function(){
    //获取要修改的分类数据的id
    var id=$(this).attr('data-id');
    //根据id获取分类信息
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(response){
            // console.log(response);
            //response  是一个对象
           var html= template("modifytpl",response)
            $('#formbox').html(html);
        }
    })
})

//修改提交
$('#formbox').on('submit','#modifyCategory',function(){
    var formdata= $(this).serialize();
    var id=$(this).attr('data-id')
    //发送请求 修改分类数据
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formdata,
        success:function(){
            location.reload();
        }

    })

    return false;
})

//删除分类功能

//编辑按钮
$('#categoryBox').on('click' ,'.delete',function(){
    if(confirm('您真的要执行操作吗')){
   //获取要修改的分类数据的id
    var id=$(this).attr('data-id');
    //根据id获取分类信息
    $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success:function(){
            location.reload();
        }
    })
    }
})