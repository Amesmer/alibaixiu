

//获取文章列表
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        // console.log(response);
      var html=  template('posttpl',{data:response.records})
      $('#postslist').html(html);
     var page= template('pagetpl',response);
     $('#page').html(page)

    }
})

//时间格式拼接
function formateDate(date){
    date=new Date(date);
   return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}

//跳转页面
function changepage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success:function(response){
            console.log(response);
          var html=  template('posttpl',{data:response.records})
          $('#postslist').html(html);
         var page= template('pagetpl',response);
         $('#page').html(page)
    
        }
    })
    
}

//获得分类数据
//获取分类
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        // console.log(response);
      var html=  template('categorytpl',{data:response})
      $('#categoryBox').html(html);
    }
})

// 根据分类和状态筛选文章
$('#filterform').on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        type:'get',
        url:'/posts',
        data:formdata,
        success:function(response){
            console.log(response);
          var html=  template('posttpl',{data:response.records})
          $('#postslist').html(html);
         var page= template('pagetpl',response);
         $('#page').html(page)
    
        }
    })
    return false;
})