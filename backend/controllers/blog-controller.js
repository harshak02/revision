import Blog from "../model/Blog";
import User from "../model/User";
import mongoose from "mongoose";
export const getAllBlogs = async (req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        console.log(err);
    }
    if(!blogs){
        return res.status(404).json({
            message : "No Blogs Found"
        })
    }
    else{
        return res.status(200).json({
            message : "Success",
            blogs
        })
    }
};

export const addBlog = async (req,res,next) => {
    const {title,description,image,user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
    }

    if(!existingUser){
        return res.status(500).json({
            message : "Unable to find user by this Id"
        })
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();

    } catch (err) {
        console.log(err);
    }
    return res.status(200).json({
        message : "Created",
        blog
    })
}

export const updateBlog = async (req,res,next) => {
    const blogId = req.params.id;
    const {title,description} = req.body;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        },{new : true});
    } catch (err) {
        console.log(err);
    }
    if(!blog){
        return res.status(500).json({
            message : "Unable to update the blog"
        })
    }
    else{
        return res.status(200).json({blog});
    }

}


export const getById = async (req,res,next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        console.log(err);
    }  
    if(!blog){
        return res.status(404).json({
            message : "No blog exists"
        })
    }
    else{
        return res.status(200).json({blog});
    }
}


export const deleteBlog = async (req,res,next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
    }  
    if(!blog){
        return res.status(400).json({
            message : "Unable to delete"
        })
    }
    else{
        return res.status(200).json({
            message : "Deleted!"
        });
    }
}

export const getUserBlogs = async (req,res,next) => {
    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        console.log(err);
    }

    if(userBlogs){
        return res.status(200).json({
            blogs : userBlogs.blogs
        })
    }
    else{
        return res.status(404).json({
            message : "No blogs found!"
        })
    }
}

// I got the reason findByIdAndRemove returns the deleted document & findByIdAndDelete does not return. If we want the deleted document then we can use findByIdAndRemove otherwise can use findByIdAndDelete.