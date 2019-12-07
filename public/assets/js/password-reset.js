$('#modifyForm').on('submit',function(){
   var formdata= $(this).serialize();
   $.ajax({
       url:'/users/password',
       type:'put',
       data:formdata,
       success:function(){
           location.href='/admin/login.html'
       }
   })
    return false;
})