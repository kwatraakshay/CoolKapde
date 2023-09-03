import res from "express/lib/response.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/gnerateToken.js";

// @dec Auth user & get token
//@route POST/ api/users/login
//@access Public 


const authUser = asyncHandler(async(req,res) => {
 
    const {email, password} = req.body;
    const user = await User.findOne({email});
   

   if(user && (await user.matchPassword(password))){
    generateToken(res,user._id);
    
    res.status(200).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    });  
   }
   else{
        res.status(401);
        throw new Error('Invalid email or password');
   }
   
});

// @dec Register user
//@route POST / api/users/
//@access Public 


const registerUser = asyncHandler(async(req,res) => {
    
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email});
    
    if(userExists)
    {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if(user){

        generateToken(res,user._id);

        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.staus(400);
        throw new Error('Invalid user data');
    }

    res.send('register user');
 });
 
// @dec Logout user/clear cookie  
//@route POST/ api/users/logout
//@access Private


const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'Logged out successfully'});
    //cookie need to expire in logout
 });
 

 // @dec Get user profile
//@route GET/ api/users/profile
//@access Private 


const getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user)
    {
        res.status(200).json(
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
            }
        );
    }else{
        res.status(404);
        throw new Error('User not found');
    }


 });
 

  // @dec put user profile
//@route PUT/ api/users/profile
//@access Private 


const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user)
    {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
    
    if(req.body.password)
    {
        user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email:updatedUser.email,
        isAdmin:updateUser.isAdmin,
    });
}
else{
    res.status(404);
    throw new Error('User not found');
}


 });

// @dec Get all user profile
//@route GET/ api/users/
//@access Private/admin 


const getUsers = asyncHandler(async(req,res) => {
    res.send('get user');
 });

// @dec Get user by id
//@route GET/ api/users/profile/:id
//@access Private/Admin


const getUserById = asyncHandler(async(req,res) => {
    res.send('Get User by id');
 }); 


// @dec Delete user profile
//@route DELETE/ api/users/profile/:id
//@access Private/admin 


const deleteUser = asyncHandler(async(req,res) => {
    res.send('delete user');
 });

// @dec Update User
//@route PUT/ api/users/profile
//@access Private/Admin 


const  updateUser = asyncHandler(async(req,res) => {
    res.send('update user');
 });

 export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
 }