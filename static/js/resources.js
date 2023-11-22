document.getElementById('fileUpload').addEventListener('change', async function(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      const pdfAsDataURL = event.target.result;
      data['dataURL']=pdfAsDataURL
    }
    reader.readAsDataURL(selectedFile)
})



  
var data = {}
        $('#uploadButton').on('click', ()=>{
            data['name']= $("#subject-name").val()
            data['unit']= $("#unit").val()
            //sends to server
            

            console.log(data)
            $.ajax({
                type:'POST',
                data:{data:data},
                url: '/login/resources/presentation'
            }).done((res)=>alert(res)).fail((res)=>console.log(res))
        }
        )