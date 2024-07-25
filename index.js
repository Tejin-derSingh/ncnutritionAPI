const express = require("express");
const {connect} = require("./connect");
const app = express();
const bodyparser = require("body-parser");
const users = require("./MOCK_DATA.json")
const multer = require('multer');
const cors = require("cors");
const PORT1 = 2000;
const PORT = 3000;
// const Products = require("./model/products.model");
 const {Products,Poster} = require("./model/products.model");
const timesheet = require("./model/productss.model")

app.use(cors());
app.use(express.json());
 app.use(bodyparser.json());

 //Middleware body parser
 app.use(bodyparser.urlencoded({extended:false}))
 app.use(express.static("public/uploadedimages"))

connect();
app.listen(2000,()=>{
    console.log("Started");
})

    //storage
   const storage = multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, `public/uploadedimages/`);
          },
        filename:(req,file,cb)=>{
             cb(null,`${Date.now()}-${file.originalname}`);              
        },
})

    //upload setting
    const upload = multer({
        storage:storage,
        limits:{fileSize:2000000},
    })


    // Reference - https://www.youtube.com/watch?v=gQ5ou0G_frw
    //             https://www.youtube.com/watch?v=XRnDFkLnBlo
    app.post('/Addproduct',upload.single('productimage'),(req,res)=>{
        console.log(req.file)
        const file = req.file

const createdproduct = new Products({
    productname:req.body.productname,
    productdescription:req.body.productdescription,
    productprice:req.body.productprice,
    productimage:req.file.filename,
    //  productimage:{
    //              data:req.file.filename,
    //               contentType:"image/jpeg",
    //                               }
//
 })
// res.status(201).send(createdproduct);
createdproduct.save().then(()=>{res.send("successfully uploaded")}).catch(err=>console.log(err))
    })



    app.get("/Addproduct",async(req,res,next)=>{
        try{
            const createdproduct = await Products.find({})
            res.send(createdproduct)
    }
    catch(err){
        res.status(404).send(err);
    }
    });
    
    app.get("/Productinfo/:id",async(req,res,next)=>{
        const id = req.params.id;
        try{
            const productid = await Products.findById(id);
            res.send(productid)
    }
    catch(err){
        res.status(404).send(err);
    }
    });

    app.delete('/Product/:id',async(req,res)=>{
        const deleteProduct = await Products.deleteOne({_id:req.params.id});
        res.status(201).send(deleteProduct)
    });

    //Upload Poster
    const PosterStorage = multer.diskStorage({
        destination: (req, file, cb)=> {    
            cb(null, `public/uploadedPoster/`);
          },
        filename:(req,file,cb)=>{
             cb(null,`${Date.now()}-${file.originalname}`);              
        },
    })

         //upload setting Poster
    const PosterUpload = multer({
        storage:PosterStorage,
        limits:{fileSize:2000000},
    })

    app.post('/AddPoster',PosterUpload.single('Posterimage'),(req,res)=>{
        console.log(req.file)
        const file = req.file

const createdposter = new Poster({
    Postername:req.body.Postername,
    Posterimage:req.file.filename,
    //  productimage:{
    //              data:req.file.filename,
    //               contentType:"image/jpeg",
    //                               }
//
 })
// res.status(201).send(createdproduct);
createdposter.save().then(()=>{res.send("successfully uploaded")}).catch(err=>console.log(err))
    })


//get Uploaded poster list
    app.get("/AddPoster",async(req,res,next)=>{
        try{
            const createdPoster = await Poster.find({})
            res.send(createdPoster)
    }
    catch(err){
        res.status(404).send(err);
    }
    });

