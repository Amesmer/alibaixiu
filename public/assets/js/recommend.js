//向服务端获取热门数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (response) {
        // location.reload();
        var recommendTpl = ` 
        {{each data}}       
   <li>
   <a href="detail.html?id={{$value._id}}">
     <img src="{{$value.thumbnail}}" alt="">
     <span>{{$value.title}}</span>
   </a>
    </li>
    {{/each}}
 `
    var html=template.render(recommendTpl,{data:response})
    $('#recommendbox').html(html);
    }
})

//