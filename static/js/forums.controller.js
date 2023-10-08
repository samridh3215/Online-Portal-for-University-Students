
$(document).on("load", ()=>{
    $.ajax({
        url:"http://localhost:3000/forums",
        method: "POST",
        success: (data)=>{console.log(data); return data },
        error: (xhr, status, error)=>{console.log(error, status)}
    })
})