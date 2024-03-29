const express=require('express');
const app=express();
const {getTracks,insertTrack}=require('./database')

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'))
 
app.use(express.urlencoded({extended: true}))

 const tracks = [{
   _id: 1,
   title: 'Man Who Sold the World',
   singer: 'Nirvana',
   image: 'https://upload.wikimedia.org/wikipedia/en/3/36/With_the_lights_out_nirvana.jpg',
   file: 'man.mp3'
 }, {
   _id: 2,
   title: 'Numbers',
   singer: 'Radiohead',
   image: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2019/03/radiohead_2000-620x394.jpg',
   file: 'numbers.mp3'
 }]

app.get('/',(req,res)=>{
  /*  const {id} =req.query;           (before adding database)
    const selectedTrack= tracks.find(t=>t._id==id)
    res.render('index',{selectedTrack,tracks})*/
    const {id}=req.query;
    getTracks().then(tracks => { 
        const selectedTrack = tracks.find(t => t._id == id)
        res.render('index', { tracks, selectedTrack })
      })
      
})

app.get('/add',(req,res)=>{
    res.render('add')
})

/*app.post('/add',(req,res)=>{
   /* tracks.push({
        _id:tracks.length+1,
       title:req.body.title,
       singer: req.body.singer,
       image:req.body.image,
       file: req.body.file
    })
})*/

app.post('/add', (req, res) => {
  const newTrack = req.body
  insertTrack(newTrack).then(result => {
    console.log(result)
    res.redirect('/?id=' + result.ops[0]._id)
  })
})

app.listen(8081);

