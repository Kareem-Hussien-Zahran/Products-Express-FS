function getALLProducts(req,res){
                const { getALLProducts, getAllNames} = require('./productModel');
                let products=getALLProducts();
                // console.table(products)
                return res.json(products).status(200);
        }

function getByName(req,res){
                const {filterByName} = require('./productModel');
                const name = req.query.name;
                let product = filterByName(name);
              //  console.table(product);
                return res.json(product) ;
                
        }

function getById(req,res){
                const {getById} = require('./productModel');
                const id =req.params.id;
                let product = getById(id);
              //  console.table(product);
                return res.json(product) ;
                
}

function deleteById(req, res){
                const {ifExitDeleteById} = require('./productModel');
                
                
                const isExist = ifExitDeleteById(req.params.id);

                    if(isExist){
                        return res.json({message:"deleted successfilly"});

                    }
                    else{
                        return res.json({message:"this product not found"})
                    }

                
        }

function addProduct(req,res){
                    const {addProduct,getALLProducts} = require('./productModel')

                    console.log(req.file)
                    addProduct(req.body.id,req.body.name,req.body.description,req.body.price);

                    res.json(getALLProducts());
        }

function updateById(req,res){

    const {updateById} = require("./productModel");

    console.log(req.body);

    const updatedSuccessfully = updateById(req.body.id,req.body.name, req.body.description,req.body.price)
    
    if( updatedSuccessfully ){
        res.status(202).json({message:"product updated successfully."})
    }
    else{
        res.status(400).json({message:"this product not found"})
    }
    
}

/**  return all products names*/
function getAllNames(req,res){

    const {getProductsNames} = require("./productModel");
    const params = req.params;
    return res.json(getAllNames());
}

module.exports = {getALLProducts,getByName,getById,deleteById,addProduct,updateById,getAllNames}