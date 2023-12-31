const express = require('express');
const router = express.Router();
const model = require("../src/forums/forums.model")
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectId


const fs = require('fs');
const path  =require('path')
const { json } = require("body-parser");

function returnTableWithLinks(headers, data, prefix){
    let headerString = '';
    //Creating table header
    headers.forEach(element => {
        headerString = headerString+`<td>${element}</td>`
    });
    headerString+='<td>Link</td>'
    let dataString='';

    //Creating body of the table
    data.forEach(element=>{
        dataString = dataString + `<tr>`
        headers.forEach(headerElement=>{
            dataString = dataString+ `<td class="${headerElement}" id="${element[headers[0]]+'-'+headerElement}">${element[headerElement]}</td>`
        })
        dataString += `<td class="link" id="${element[headers[0]]+'-'+'link'}"><button class='btn btn-info' style='border-radius:10px; padding:2px;'><a  target="_blank"href='/student/resource/${prefix+'-'+element[headers[0]]}'>View</a></button></td>`
        dataString = dataString + `</tr>`
    })

    //combining header and body
    let final  = `<tr>
        ${headerString}
        </tr>
        ${dataString}`
    // console.log(final)
    return final
}

function writeFile(prefix='',id='',data=''){
    const base64Data = data.replace(/^data:application\/pdf;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(__dirname, '../uploads', `${prefix+'-'+id}.pdf`), buffer);
}


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(session({
  secret: "Ourlittlesecret.",
  resave: false,
  saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());


router.get('/',async (req, res) => {
    if(req.isAuthenticated()){
    let DbOp  = model.DbOp
    let dbManager = new DbOp(process.env.URI)
    let result = await dbManager.fetch("ROOT","resources",{})
    console.log(result)
    res.render('resources',{'data':result, 'type': type})//,{data:returnTableWithLinks(['name','unit'], result, '')})
    }else{
        res.redirect('/login')
    }
});

// Route for uploading and downloading presentations
router.post('/presentation', async (req, res) => {
    let DbOp  = model.DbOp
    let dbManager = new DbOp(process.env.URI)
    // const { semester, subject, unit } = req.body;
    let dataURL = req.body.data['dataURL']
    let name = req.body.data['name']
    let unit = req.body.data['unit']    
    if(fs.existsSync(path.join(__dirname, `../uploads/${name}-${unit}.pdf`))){
        res.send("This file exists")
    }
    else{
        let result = await dbManager.uploadData("ROOT","resources",{name:name,unit:unit, encode:dataURL})
        writeFile(name, unit, dataURL)
    }

});

router.get('/view/:slug', async (req, res)=>{
    const slug = req.params.slug    
    let name = slug.split('-')[0]
    let unit = slug.split('-')[1]
    let DbOp  = model.DbOp
    let dbManager = new DbOp(process.env.URI)
    let result = await dbManager.fetchOne("ROOT","resources",{name:name,unit:unit})
    if(fs.existsSync(path.join(__dirname, `../uploads/${slug}.pdf`))){
        res.sendFile(path.join(__dirname, `../uploads/${slug}.pdf`))
    }
    else{
        res.render('404')
    }
})





module.exports = router;
