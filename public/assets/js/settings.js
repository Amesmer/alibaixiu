//当管理员选择logo图片时
$('#logo').on('change',function(){
//获取到管理员选择到的图片
var file=this.files[0];
var formdata=new FormData();
formdata.append('logo',file);
$.ajax({
    type:'post',
    url:'/upload',
    data:formdata,
    processData:false,
    contentType:false,
    success: function (response) {
        console.log(response);
        $('#hiddenlogo').val(response[0].logo)
        $('#preview').attr('src',response[0].logo)
    }
})
})

//设置网站
$('#settingsForm').on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/settings',
        data:formdata,
        success: function () {
        location.reload();
            
        }
    })
    return false;
})

//查询网站设置
    var formdata=$(this).serialize();
    $.ajax({
        type:'get',
        url:'/settings',
        data:formdata,
        success: function (response) {
        // console.log(response)
        $('#hiddenlogo').val(response.logo)
        $('#preview').attr('src',response.logo)
        $('input[name="title"]').val(response.title);  
        $('#site_description').val(response.description);  
        $('input[name="keywords"]').val(response.keywords);  
        $('input[name="comment"]').prop('checked',response.comment);  
        $('input[name="reviewed"]').prop('checked',response.reviewed);  
        }
    })

