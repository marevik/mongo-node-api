const mongoose =require ('mongoose');
const exoress = require ('express');

const router =exoress.Router();

const Order = require ("../models/order");

router.post('/add', (req, res)=>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price
    },{versionKey: false});

    order.save().then(result=>{
        res.status(200).json({
            "message":"ADDED",
            "created": result
        });  
    }).catch(err => {
        res.status(500).json({
            "error": err
        });
    });
});

router.delete('/:orderId', (req, res)=>{
    const _id =req.params.orderId;
    Order.findByIdAndRemove({"_id":_id}).then(orderData=>{
        console.log(orderData);
        res.status(200).json(orderData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({"error":err})
    });
})

module.exports= router;