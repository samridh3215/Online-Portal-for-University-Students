

$('#new-post').on('click', () => {
    $('.modal').css('display', 'flex')
})

$('#close-modal').on('click', () => { $('.modal').css('display', 'none') })

$(".delete-post").on('click', (e)=>{
    if(confirm('Are you sure you want to delete the post?')){
        let postID = e.target.id
        $.ajax({
            type:"POST",
            url:'/login/forum/delete',
            data: {'postID':postID}
        }).done((res)=>{
            console.log(res)
            if(res.status_code==200){
                alert(`post deleted`)
            }
            else{
                alert("could not process request")
            }
        }).fail((err)=>{
            console.log(err)
        })
    }
    
})

$("#send-post").on('click', () => {
    let date = new Date()
    let tags = []
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
      tags.push(checkboxes[i].value)
    }
    let postData = {
        "title": $("#new-post-title").val(),
        "tags": tags,
        "query": $("#new-post-content").val(),
        "date": date.toString().slice(0, 24),
        "replies": [],
    }
    $.ajax({
        method: "POST",
        data: postData,
        url: '/login/forum/'
    }).done((response) => {
        console.log("updated", response)
        if(response.status_code==200){
            alert("Post added successfully")
        }
    }).fail((err) => {
        console.log(err)
    })
})

$('.tag-checkbox').on('change', (e)=>{

    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    let posts = $('.post-container').toArray()
    console.log(posts, checkboxes)
    if(checkboxes.length==0){
        console.log('lol')
        $('.post-container').show(300)

        return 
    }
    checkboxes.forEach(box=>{
        posts.forEach(post=>{
            if(!post.children[1].textContent.includes(box.value)){
                $(`#${post.id}`).hide(300)
            }else{
                $(`#${post.id}`).show(300)
            }
        })
    })

})

$('#search-button').on('click', () => {
    let search = $("#search-query").val()
    if(search.trim(' ')== '')
    return
    $.ajax({
        url: `/forum/search/${search}`,
        type: 'GET',
    }).done((result) => {
        if (result.data.length == 0) {
            alert("No match found")
        }
        else {

            $('.post').empty()
            result.data.forEach((item)=>{
                $('.post').append(`<a href="/login/forum/${item._id}">
                <div class="post-container rounded-box">
                    <h4 class="post-author">${item.author.name}</h4>  
                    <h2 class="post-title"> ${item.title}</h2>
                </div>
                </a>`)

                })
        }
    }).fail((err, code) => { console.log(err, code) })
})
