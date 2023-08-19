const mongoose=require('mongoose');
mongoose.set('strictQuery',false);
const connection=mongoose.connect('mongodb://localhost:127.0.0.1:27017/restfulapi',{
     useNewUrlParser:true,
     useUniFiedTopology:true,
}).then(()=>{
     console.log('connect with mongo db ');
}).catch((erro)=>{
     console.log('error accured during connection with mongodbs'+erro);
});