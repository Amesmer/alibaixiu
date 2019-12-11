
//用户退出
$('#logout').on('click',function(){
    var isconfirm= confirm("you really wanna to leave?")
    if(isconfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
          location.href='login.html';
        },
        error:function(){
          alert('退出失败')
        }
      })
    }
   })

   //时间格式拼接
function formateDate(date) {
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

//向服务端发送请求 获取用用户信息
$.ajax({
  type:'get',
  url:'/users/'+userId,
  success:function(response){
    $('.avatar').attr('src',response.avatar)
    $('.profile .name').html(response.nickName);

  }
})