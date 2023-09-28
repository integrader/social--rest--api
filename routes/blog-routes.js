import Express from "express";
import {
    UserById,
    addBlog,

    deleteById,

    getAllBlogs,
    getById,

    updateBlog
} from "../controllers/blog-controller";

const blogRouter = Express.Router();

blogRouter.get('/', getAllBlogs)
blogRouter.post('/add', addBlog)
blogRouter.put('/update/:id', updateBlog)
blogRouter.get('/:id', getById)
blogRouter.post('/delete/:id', deleteById)
blogRouter.get('/user/:id', UserById)

export default blogRouter