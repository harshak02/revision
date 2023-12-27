import express from "express";
import { getUserBlogs,deleteBlog,getById,addBlog, getAllBlogs, updateBlog } from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getUserBlogs);

export default blogRouter;