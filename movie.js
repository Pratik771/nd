const mysql=require("mysql");
 var express=require("express");
var movie=express();

const connection=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"manager",
        database:"movie"

    }
);
var mydata=[];

connection.connect();

movie.get("/get",function(request,response)
{
    let mmid=parseInt(request.body.mid);
    let mmname=request.body.mname;
    let md=request.body.director;
    let mr=parseInt(request.body.rating);
    let mb=request.body.budget;

    let query=`select * from movies`;

    connection.query(query,function(err,result)
    {
        if(err==null)
        {
            mydata=result;
            response.contentType="application/json";
            response.send(JSON.stringify(mydata));
        }
        else
        {
            response.send("something error");
            console.log("something error");

        }
    });
});
movie.post("/post",function(request,response)
{
    let mmid=parseInt(request.body.mid);
    let mmname=request.body.mname;
    let md=request.body.director;
    let mr=parseInt(request.body.rating);
    let mb=request.body.budget;

    let query=`insert into movies values(${mmid},'${mmname}','${md}',${mr},'${mb}')`;

    connection.query(query,function(err,result)
    {
        if(err==null)
        {
          mydata=result;
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else
        {
            response.contentType("application/json");
            response.send("something error");
            console.log(err);
        }
    });
});
movie.put("/:mid",function(request,response)
{
    let mmid=parseInt(request.params.mid);
    console.log(mmid);
    let mmname=request.body.mname;
    let md=request.body.director;
    let mr=parseInt(request.body.rating);
    let mb=request.body.budget;

    let query=`update movies set mname='${mmname}', director='${md}',rating=${mr}, budget='${mb}' where mid=${mmid}`;

    connection.query(query,function(err,result)
    {
        if(err==null)
        {
          mydata=result;
            response.contentType="application/json";
            response.send(JSON.stringify(mydata));
        }
        else
        {
            response.send("something error");
            console.log("something error");

        }
    });
});
movie.delete("/:mid",function(request,response)
{
    let mmid=parseInt(request.params.mid);
    let mmname=request.body.mname;
    let md=request.body.director;
    let mr=parseInt(request.body.rating);
    let mb=request.body.budget;

    let query=`delete from movies where mid=${mmid}`;

    connection.query(query,function(err,result)
    {
        if(err==null)
        {
          mydata=result;
            response.contentType="application/json";
            response.send(JSON.stringify(mydata));
        }
        else
        {
            response.send("something error");
            console.log("something error");

        }
    });
});

module.exports=movie;