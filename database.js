const {
    createPool
} = require ('mysql');

const pool= createPool ({
   host : "localhost",
   user :  "root",
   password : "",
   database : "loki",
   connectionLimit : 10
})
pool.query('select *from users', (err,result, field)=>{
    if (err){
        return console.log(err);
    } return console.log(result)
})