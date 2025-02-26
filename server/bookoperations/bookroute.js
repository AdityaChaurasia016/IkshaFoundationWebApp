const express= require('express')
const router=express.Router()
const operations=require('./operation')

router.get('/getbooks',operations.getBook)

router.get('/getbooks/:id', operations.getBookById)

router.post('/postbooks', operations.postBook)

router.put('/updatebook/:id', operations.putBook)

router.delete('/deletebook/:id', operations.deleteBook)

module.exports = router;