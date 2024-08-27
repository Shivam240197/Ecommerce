const express=require("express");
require("./Db/config");
const User=require("./Db/User");
const Product=require("./Db/Products")
const cors=require('cors');

const app=express()
app.use(express.json());
app.use(cors())

app.post("/register",async(req,resp)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    resp.send(result);
})
app.post("/login",async(req,res)=>{
    if(req.body.email && req.body.password){
        let user=await User.findOne(req.body).select("-password");
        if(user)
        {
            res.send(user);
        }
        else{
            res.send({result:"No Error Find"});
        }
    }else{
        res.send({result:"No Error Find"});
    }

})
app.post("/add-product",async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);
})
app.get("/products",async(req,res)=>{
    const products=await Product.find();
    if(products.length>0){
        res.send(products);
    }
    else{
        res.send({Result:"No product find"});
    }
})
app.delete("/product/:id",async(req,res)=>{
    let result=await Product.deleteOne({_id:req.params.id});
    res.send(result);

})
app.get("/product/:id",async(req,res)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result)
    {
        res.send(result);
    }
    else
    {
        res.send({"Err0r":"record Not found"});
    }
})
app.put("/product/:id",async(req,res)=>{
    let result=await Product.updateOne({_id:req.params.id},{$set:req.body})
    res.send(result);
})
// search product route
app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: "i" } },
            { category: { $regex: req.params.key, $options: "i" } },
            { company: { $regex: req.params.key, $options: "i" } }
        ]
    });
    res.send(result);
});

app.listen(5000,()=>{
    console.log(`working Port is 5000`)
});