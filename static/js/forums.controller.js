

$('#new-post').on('click', ()=>{
    $('.modal').css('display', 'flex')
})

$('#close-modal').on('click', ()=>{$('.modal').css('display', 'none')})

$("#send-post").on('click', ()=>{
    let postData = {
        "author": {"name": "Samridh Anand", "SRN":"PES2UG21CS468"},
        "title": $("#new-post-title").val(),
        "query":$("#new-post-content").val(),
        "replies": [],
    }
    $.ajax({
        method:"POST",
        data:postData,
        url:'http://localhost:3000/forum'
    }).done((response)=>{
        console.log("updated", response)
    }).fail((err)=>{
        console.log(err)
    })
})