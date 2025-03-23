import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
    try {
      const { title, caption, rating, image } = req.body;
  
      console.log("Received data:", { title, caption, rating, image });
      console.log("User info:", req.user);
  
      if (!title || !caption || !rating || !image) {
        console.log("Validation failed");
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(image);
      console.log("Cloudinary upload response:", uploadResponse);
  
      const imageUrl = uploadResponse.secure_url;
  
      const newBook = new Book({
        title,
        caption,
        rating,
        image: imageUrl,
        user: req.user._id,
      });
  
      console.log("Saving book:", newBook);
  
      await newBook.save();
  
      res.status(201).json(newBook);
    } catch (err) {
      console.error("Error in POST /api/books:", err);
      res.status(500).json({ message: err.message || "Something went wrong" });
    }
  });
  

router.get("/",protectRoute,async (req,res)=>{
    try{
        const page= req.query.page || 1;
        const limit= req.query.limit || 5;
        const skip= (page-1)*limit;
        const books= await Book.find().sort({createdAt:-1}).skip(skip).limit(limit).populate("user","username profileImage");
        const total= await Book.countDocuments();
        res.send({books,currentPage: page,totalBooks:total,totalPages:Math.ceil(total/limit)});
    }catch(err){
        console.log("Error in book route",err);
        res.status(500).json({message:"Something went wrong"});
    }
})

router.get("/user",protectRoute,async (req,res)=>{
    try{
        const books= await Book.find({user:req.user._id}).sort({createdAt:-1});
        res.json(books);
    }catch(err){
        console.log("Error in book route",err);
        res.status(500).json({message:"Something went wrong"});
    }
})

router.delete("/:id", protectRoute, async (req, res) => {
    try {
      console.log("Deleting book with ID:", req.params.id);
      const book = await Book.findById(req.params.id);
      console.log("Book found:", book);
  
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      console.log("Authenticated user ID:", req.user._id);
      console.log("Book user ID:", book.user);
  
      if (book.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "You are not authorized" });
      }
  
      if (book.image && book.image.includes("cloudinary")) {
        try {
          const publicId = book.image.match(/([^\/]+)$/)[0].split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Error in deleting image from Cloudinary", err);
        }
      }
  
      await book.deleteOne();

      res.json({ message: "Book deleted successfully" });
  
    } catch (err) {
      console.log("Error in book route", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  
export default router;
