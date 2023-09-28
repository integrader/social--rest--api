import mongoose from "mongoose";
import Blog from "../model/blog.js"
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find()

    } catch (err) {
        console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({
            messaage: "Blogs not found"
        })
    }
    return res.status(200).json({
        blogs
    })

}
export const addBlog = async (req, res, next) => {
    const {
        title,
        description,
        img,
        user
    } = req.body
    let existingUser
    try {
        existingUser = await Blog.findById(user)

    } catch (err) {
        console.log(err)
    }
    if (!existingUser) {
        return res.status(404).json({
            message: "no user is found bt this id"
        })


    }
    const blog = new Blog({
        title,
        description,
        img,
        user
    })


    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({
            session
        })
        existingUser.blogs.push(blog)
        await existingUser.save({
            session
        })
        await session.commitTransaction()


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            messaage: err
        })
    }
    return res.status(200).json({
        blog
    })
}

export const updateBlog = async (req, res, next) => {
    const {
        title,
        description
    } = req.body

    const blogId = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (err) {
        console.log(err)
    }
    if (!blog) {
        return res.status(404).json({
            message: "nothing to update"
        })

    }
    return res.status(404).json({
        blog
    })
}


export const getById = async (req, res, next) => {
    const id = req.params.id
    let blog
    try {
        blog = await Blog.findById(id)
    } catch (err) {
        console.log(err)

    }
    if (!blog) {
        return res.status(404).json({
            message: "no blog found by this id"
        })
    }
    return res.status(200).json({
        blog
    })
}

export const deleteById = async (req, res, next) => {
    const id = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()

    } catch (err) {
        console.log(err)

    }
    if (!blog) {
        return res.status(404).json({
            message: "no blog found by this id"
        })
    }
    return res.status(200).json({
        message: "deleted successfully"
    })
}

export const UserById = async (req, res, next) => {
    const id = req.params.id
    let blog
    try {
        blog = await Blog.findById(id).populate("blogs")
    } catch (err) {
        console.log(err)

    }
    if (!blog) {
        return res.status(404).json({
            message: "no blog found by this id"
        })
    }
    return res.status(200).json({
        blog
    })
}