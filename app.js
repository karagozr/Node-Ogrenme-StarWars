var app = require('express')();
var request = require('request')
var fs = require('fs')

app.set('view engine', 'ejs')
/* middleware  */

app.use((req,res,next)=>{
    var zaman = new Date().toString()
    var log = zaman +" ---- "+ req.url
    console.log(log)

    fs.appendFile('server.log',log + '\n',(error)=>{
        if(error){
            console.log(error)
        }
    })

    next()
})

// app.use((req,res,next)=>{
//     res.render('calisma')
// })

app.get('/',(req,res)=>{
    res.render("arama");
})

app.get('/sonuc',(req,res)=>{
    var sorgu = req.query.sorgu;
    var url ="https://swapi.co/api/people/?search="+sorgu; 
    request(url,(error,response,body)=>{
        if(!error && response.statusCode==200){
            var veri = JSON.parse(body);
            res.render('ara',{
                veri : veri
            });
        }
    })
})

/*uygulamanın çalıştığı server ne portu verirse */
app.listen(process.env.PORT);