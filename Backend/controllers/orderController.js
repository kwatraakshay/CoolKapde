import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @create new order
// @route POST /api / orders
//@access private

const addOrderItems = asyncHandler(async (req,res) =>{
    res.send('add Order Items');

}); 


// @Get logged in user order
// @route get/ api/orders/myorders
//@access private

const getMyOrders = asyncHandler(async (req,res) =>{
    res.send('Get My orders');

}); 


// @desc Get Order By Id
// @route get/api/orders/:id
//@access private

const getOrderById = asyncHandler(async (req,res) =>{
    res.send('Get Order By Id');

}); 

// @desc Update order to paid
// @route get/api/orders/:id/pay
//@access private

const updateOrderToPaid = asyncHandler(async (req,res) =>{
    res.send('Update Order to paid');

}); 

// @desc Update order to delivered
// @route get/api/orders/:id/deilver
//@access private/admin

const updateOrderToDelivered = asyncHandler(async (req,res) =>{
    res.send('Update Order To delivered');

}); 

// @desc Get all order
// @route get/api/orders/
//@access private/admin

const getOrders = asyncHandler(async (req,res) =>{
    res.send('Get All Orders');

}); 


export {addOrderItems,
        getMyOrders,
    getOrderById,
updateOrderToPaid,
updateOrderToDelivered,
getOrders};