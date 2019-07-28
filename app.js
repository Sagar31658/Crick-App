const request = require('request');
const cricapi = require('cricapi');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

// app.get('/',(req,res) => {
//     res.render('app.ejs');
// });


app.get('/Matches',(req,res) => {

    request('https://cricapi.com/api/matchCalendar?apikey=y2EyXeRkf3hu563aGclP5tfIVVL2',(error, response, body) => {
        if(error){
            console.log("Sorry");
        }
        else{
            let Alldata = JSON.parse(body);
            let data = Alldata.data;
                res.render('user.ejs',{data:data});
            
        }
    });

 });

app.get('/',(req,res) => {
    res.render('app.ejs');
});

 app.post('/playerStats',(req,res) => {
     let pid = req.body.pid;
     console.log(pid);
     request(`https://cricapi.com/api/playerStats?apikey=y2EyXeRkf3hu563aGclP5tfIVVL2&pid=${pid}`,(error,response,body) => {
         if(error){
             console.log('SORRY!');
         }
         else{
             let Alldata = JSON.parse(body);
             let name = Alldata.name;
             let fullname = Alldata.fullName;
             let country = Alldata.country;
             let profile = Alldata.profile;
             let Age = Alldata.currentAge;
             let PRoll = Alldata.playingRole;
             let img = Alldata.imageURL;
             let born = Alldata.born;
             let majorTeams = Alldata.majorTeams;
             let T20Runs = Alldata.data.batting.T20Is.Runs;
             let ODIRuns = Alldata.data.batting.ODIs.Runs;
             let T20Ct = Alldata.data.batting.T20Is.Ct;
             let ODICt = Alldata.data.batting.ODIs.Ct;

             res.render('player.ejs',{
                    img:img,
                    name:name,
                    fullname:fullname,
                    Age:Age,
                    born:born,
                    country:country,
                    profile:profile,
                    majorTeams:majorTeams,
                    PRoll:PRoll,
                    T20Runs:T20Runs,
                    ODIRuns:ODIRuns,
                    T20Ct:T20Ct,
                    ODICt:ODICt
             });
         }
     });
 });

    
app.listen(process.env.PORT || 3000,() => {
    console.log('Server is Running!');
});
