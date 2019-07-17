const {MongoClient}=require('mongodb');
const client= new MongoClient('mongodb://localhost:27017',{ useNewUrlParser: true })
//MongoClient.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true })


const getdb=()=>client.connect().then(()=>{
    const db=client.db('testdb')
    return db;
})

const getTracks=()=>
getdb()
.then((db)=>db.collection('tracks'))
.then((collection)=>collection.find())
.then((cursor)=>cursor.toArray())

const insertTrack=(track)=>
getdb()
.then((db)=>db.collection('tracks'))
.then((collection)=>collection.insertOne(track))

const updateTrack=(track)=>
getdb()
.then((db)=>db.collection('tracks'))
.then((collection)=>collection.updateOne(track))

const deleteTrack=(track)=>
getdb()
.then((db)=>db.collection('tracks'))
.then((collection)=>collection.deleteOne(track))

getTracks().then((tracks)=>console.log(tracks));

module.exports={
    getTracks,
    insertTrack,
    updateTrack,
    deleteTrack
}
