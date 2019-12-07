

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