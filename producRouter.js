        const express = require('express');
        
        const productRouter = express.Router();

        const productController = require('./productController')
//---------------------------------------------------------------------------------------------------
        /** return all products */
        productRouter.get('/',productController.getALLProducts);
//---------------------------------------------------------------------------------------------------
        /** return filtered array of products based n the passed product name.*/
        productRouter.get('/name',productController.getByName)

//---------------------------------------------------------------------------------------------------
        /** return product by its id.*/
        productRouter.get('/:id',productController.getById)
//---------------------------------------------------------------------------------------------------
        // all product names
        productRouter.get('/allNames',productController.getAllNames)

//---------------------------------------------------------------------------------------------------
        /** delete product by its id. */
        productRouter.delete('/:id',productController.deleteById)

//---------------------------------------------------------------------------------------------------
        // add product with image
        const uploads = require('./upload.Middeware');  // image middleware using multer

        productRouter.post('/',uploads.single('image'),productController.addProduct)
//---------------------------------------------------------------------------------------------------
        // replace all resource
        productRouter.put('/',productController.updateById);
//---------------------------------------------------------------------------------------------------
        
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

       module.exports =productRouter;


