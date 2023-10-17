$('#send-reply').on('click', ()=>{
    let comment = $('#post-comment').val()
    let urlString = window.location.href
    let postID = urlString.split('/').pop() 
    console.log(urlString)
    console.log(postID, comment)
    $.ajax({
        type:'POST',
        url: '/forum/updateComments/',
        data: {
            "postID": postID,
            "commentObject":{
                "author":{"name":"Samridh", "SRN":"PES2UG21CS468"},
                "reply":comment,
                "depth":1
            }
        }
    }).done((res)=>{
        console.log(res)
    }).fail((err, code)=>{ 
        console.log(err, code)
    })

})