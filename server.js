var express    = require('express');
var fs         = require('fs');
var request    = require('request');
var cheerio    = require('cheerio');
var app        = express();
var x          = require ('./output.json');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var path       = require('path');
var port       = process.env.PORT || 8000;


app.get('/allData', function(req, res){

  var obj={"Pharmaceutical":[],"Medical Equipment":[],"Laboratory Product":[],"Medical Disposable and Consumable":[],"Nutrition and Cosmetic":[]};
  var arr=[],flage1=true;
   
   url = ['http://www.medicaltenders.com/medical_tenders_egypt.htm','http://www.medicaltenders.com/search.php?total=134&off=10&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=20&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=30&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=40&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=50&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=60&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=70&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=80&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=90&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=100&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=120&inc=n&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=130&inc=n&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline=','http://www.medicaltenders.com/search.php?total=134&off=130&inc=y&global=1&region_name[]=EG&notice_type_new[]=1,2,3,7,10,11,16,9,4,8,5&sector=18&deadline='];

for(var i=0 ; i<url.length ; i++){

 request(url[i], function(error, response, html){
      var json={data:[]} ;
        if(!error){
          var $ = cheerio.load(html);
           $('.style5').filter(function(){
          var data = $(this);
           if(data.text()!=="Tender Notice Type:\n\t" && data.text()!=="Tender Notice\n\t" && data.text()!=="View Tender Details:\n\t" && data.text()!=="View Details\n\t"){
           json.data.push(data.text());
            }       
           })

          arr.push(json);

          fs.writeFile('output.json', JSON.stringify(arr, null, 4), function(err){

               console.log("write on json file...");
          })           
       }

    });

}
  
for(var i=0 ; i<x.length ; i++){
   for(var k=0 ; k<x[i]['data'].length ; k++){

      if(x[i].data[k].indexOf("Pharmaceutical")!==-1){
        obj["Pharmaceutical"].push(x[i])
        

       }else if(x[i]['data'][k].indexOf("Equipment")!==-1 ){
        obj["Medical Equipment"].push(x[i])

       }else if(x[i]['data'][k].indexOf("Laboratory")!==-1){
        obj["Laboratory Product"].push(x[i])

       }else if(x[i]['data'][k].indexOf("Medicine")!==-1){
        obj["Medical Disposable and Consumable"].push(x[i])

       }else{
        obj["Nutrition and Cosmetic"].push(x[i])
       }
    }
 
}
res.send(obj)
 
})
app.use(express.static(path.join(__dirname, 'client')));
app.listen(port)

console.log('Magic happens on port '+port);


exports = module.exports = app;