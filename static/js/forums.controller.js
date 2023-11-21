

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
    let checkboxes = document.querySelectorAll('input[type=checkbox].tag-selection:checked')
console.log(checkboxes)
    for (var i = 0; i < checkboxes.length; i++) {
      tags.push(checkboxes[i].value)
    }
    if( $("#new-post-title").val().trim() == '' ||  $("#new-post-content").val().trim() =='' || tags == []){
        alert("Cannot post empty queries")
        return 
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
    
    var tags = `<p class="included-tags"> `
    if(search.trim(' ')== '')
    return
    $.ajax({
        url: `/login/forum/search/${search}`,
        type: 'GET',
    }).done((result) => {
        if (result.data.length == 0) {
            alert("No match found")
        }
        else {

            $('.post').empty()
            result.data.forEach((item)=>{
                var tags = `<p class="included-tags"> `
                if(item.tags.length>0){

                    item.tags.forEach(tag=>{
                        tags+= `
                           <span class='decorated-tags'>${tag}</span>
                        `
                    })

                }
                tags+='</p>'

                $('.post').append(`
                <div class="post-container rounded-box" id='${item._id}'>
                    <a href="/login/forum/${item._id}">
                    <h4 class="post-author">${item.author.fname}</h4>  
                    <h2 class="post-title"> ${item.title}</h2>
                    </a>
                    ${tags}
        
                </div>
                `)
                

                })
        }
    }).fail((err, code) => { console.log(err, code) })
})
