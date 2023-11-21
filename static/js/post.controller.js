$('#send-reply').on('click', ()=>{
    let comment = $('#user-comment').val()
    let urlString = window.location.href
    let postID = urlString.split('/').pop() 
    console.log(urlString)
    console.log(postID, comment)
    $.ajax({
        type:'POST',
        url: '/login/forum/updateComments/',
        data: {
            "postID": postID,
            "commentObject":{
                "reply":comment,
                "depth":1
            }
        }
    }).done((res)=>{
        if(res['status_code']==200){
            alert("Reply added")
        }
        else{
            alert("Error adding a reply")
        }
        console.log(res)
    }).fail((err, code)=>{ 
        console.log(err, code)
    })

})