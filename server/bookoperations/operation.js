const Book = require('../bookmodels/bookschema')

const operations={
    getBook:async(req,res)=>{
        try{
        const resp=await Book.find({});

        res.status(200).json(resp)
        }
        catch(error){
            res.status(500).json({msg:"Server error", error:error.message})
        }
    },
    getBookById: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);
    
            if (!book) {
                return res.status(404).json({ msg: "Book not found" });
            }
    
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    },
    
    postBook: async (req, res) => {
        try {
            const { title, author, genre, publishedYear, condition, schoolName, schoolCity, donatedBy, quantity, description, imageUrl } = req.body;
    
            const newBook = new Book({
                title,
                author,
                genre,
                publishedYear,
                condition,
                schoolName,
                schoolCity,
                donatedBy,
                quantity,
                description,
                imageUrl
            });
    
            await newBook.save();
            res.status(201).json({ msg: "Book added successfully", book: newBook });
    
        } catch (error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    },
    putBook: async (req, res) => {
        try {   
            const { id } = req.params;
            const updatedData = req.body;
    
            const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
    
            if (!updatedBook) {
                return res.status(404).json({ msg: "Book not found" });
            }
    
            res.status(200).json({ msg: "Book updated successfully", book: updatedBook });
    
        } catch (error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    },
    
    deleteBook: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);
    
            if (!deletedBook) {
                return res.status(404).json({ msg: "Book not found" });
            }
    
            res.status(200).json({ msg: "Book deleted successfully" });
        } catch (error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }    
}
module.exports = operations;