

$('#new-post').on('click', () => {
    $('.modal').css('display', 'flex')
})

$('#close-modal').on('click', () => { $('.modal').css('display', 'none') })

$("#send-post").on('click', () => {
    let date = new Date()
    let postData = {
        "author": { "name": "Samridh Anand", "SRN": "PES2UG21CS468" },
        "title": $("#new-post-title").val(),
        "query": $("#new-post-content").val(),
        "date": date.toString().slice(0, 24),
        "replies": [],
    }
    $.ajax({
        method: "POST",
        data: postData,
        url: '/forum/'
    }).done((response) => {
        console.log("updated", response)
    }).fail((err) => {
        console.log(err)
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
                $('.post').append(`<a href="/forum/${item._id}">
                <div class="post-container rounded-box">
                    <h4 class="post-author">${item.author.name}</h4>  
                    <h2 class="post-title"> ${item.title}</h2>
                </div>
                </a>`)

                })
        }
    }).fail((err, code) => { console.log(err, code) })
})

