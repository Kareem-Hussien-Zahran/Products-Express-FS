
        /** Return all products in un array of objects */
       function getALLProducts(){
                    
                    
                    const fs = require('fs');
                    let products=fs.readFileSync('products.json','utf-8');
                    
                    return JSON.parse(products);

        }

        /** return product object by its id.*/
        function getById(id){

            const fs=require('fs');

                let data= fs.readFileSync('products.json');
                let products = JSON.parse(data);
                
                for(let index=0;index<products.length;index++){
                    if(products[index].id ==id){
                        return products[index];
                    }
                }
                
                return {message :"not found"};

        }
        /* delete product by id*/
        function ifExitDeleteById(id){

            const fs = require('fs');

            let data= fs.readFileSync('products.json');

                let products = JSON.parse(data);

                if(!products.find(product=>product.id==id)) return false;

                products = products.filter(product => product.id !=id);

                fs.writeFileSync('products.json',JSON.stringify(products));

                return true;
            
        }

        /** add product */
        function addProduct(id,name,description,price){
            const fs = require('fs');

            let products = fs.readFileSync('products.json','utf-8');
                products = JSON.parse(products);
                
                products.push({
                    "id":Number(id),
                    "name":name,
                    "description":description,
                    "price":Number(price)
                });

                fs.writeFileSync('products.json',JSON.stringify(products))
            

        }
        /** return product by its name*/
        function filterByName(name){

                const fs = require('fs');
                let products = fs.readFileSync('products.json','utf-8');
                    products = JSON.parse(products);
                    
                return products.filter(product => new String(product.name).includes(name));

        }
        /* return all products names */
        function getProductsNames(){

            const fs = require('fs');

            let data = fs.readFileSync('products.json','utf-8');
          
            let {NumberOfProducts} = Number(String(fs.readFileSync('NumberOfProducts.txt','utf-8')).trim())
            console.log(NumberOfProducts)
            let products = JSON.parse(data);

            let names=[]

            for(let index =0 ; index < NumberOfProducts ; index++)[
                names[index] = products[index].name
            ]

            return names;
        }
        /* update product by id and  this function must recieve the product name , description and price */
        function updateById(id, name, description, price){

            const fs = require('fs');

            let data = fs.readFileSync('products.json','utf-8');

            let products = JSON.parse(data);
          
            
            
            for(let index =0 ; index < products.length ; index++){
                
                    if(products[index].id == Number(id)){

                    
                        
                            products[index].name=name;
                            products[index].description=description;
                            products[index].price=price;
                        fs.writeFileSync('products.json',JSON.stringify(products));
                        return true ;
                    } 
            }

            return false;

        }


        // let allProducts =  getALLProducts();

        // let filteredProducts = filterByName('shirt');

        // deleteById(5);

        // updateById(6,'t-shirt','Basic cotton t-shirt',25);

        // let names = getProductsNames();

            console.log(getProductsNames())
        // let products = getById(6);

        //console.log(updateById(6,'kareem Hussien','AI Softeware Engineer have hand-on experience in end-to-end machine learning model, Deepl LEarning, natural languaege Processing , and specialist in AI Agent And Web developments using MEAN stack and passioante about .NET and SpringBoot',80000))

        module.exports={addProduct,getALLProducts,getProductsNames,getById,ifExitDeleteById,updateById,filterByName}
