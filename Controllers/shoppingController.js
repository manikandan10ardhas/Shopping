var database = require('./../config/mysql');
var session = require('express-session');
var dateFormat = require('dateformat');

exports.addProduct = function(req,res)
{
    res.render('addProduct');
};

exports.index = function(req,res)
{
    if (typeof req.session.msg !== '') 
    {
        var sessionmsg = req.session.msg;
    }else
    {
        var sessionmsg = "";
    }

    res.render('index',{'sessionmsg':sessionmsg});
}

exports.buyProduct = function(req,res)
{
    var productId = req.params.productId;

    var sql = "SELECT * FROM products WHERE `product_id`="+productId+"";

    database.query(sql,function(err,result){

        if(err) throw err;

        res.render('buyProduct',{
            'product_name':result[0].product_name,
            'product_id':result[0].product_id,
            'catefory':result[0].catefory,
            'price':result[0].price,
            'image_name':result[0].image_name});

        res.end();
    });
}

exports.confirmOrder = function(req,res)
{
    var product_id = req.body.product_id;
    var category = req.body.catefory;
    var name = req.body.name;
    var email = req.body.emailid;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var quantity = req.body.Quantity;
    var product_price = req.body.price;
    var order_status = 1;

    var total_price = parseInt(product_price) * parseInt(quantity);

    var created_date=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    var sql = "INSERT INTO `orders` SET `product_id`="+product_id+",`category`="+category+",`name`='"+name+"',`email`='"+email+"',`mobile`='"+mobile+"',`address`='"+address+"',`quantity`='"+quantity+"',`product_price`='"+product_price+"',`order_status`="+order_status+",`total_price`="+total_price+",`created_date`='"+created_date+"' ";

    database.query(sql,function(err,result){

        if(err) throw err;

        req.session.msg = "Order Confirmed!";
        
        res.redirect('/index');
    });
}

exports.destroy = function(req,res)
{
    if(req.session)
    {
        req.session.destroy();
    }
    
    res.redirect('/index');
}