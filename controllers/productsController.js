const fs = require('fs');

exports.getAllProducts = (req, res) => {
    products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    //console.log(req.requestTime);
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: products.length, 
      data: {
        products,
      },
    });
  }
  
  exports.addProduct = (req, res) => {
    products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "success",
      data: {
        products,
      },    
    });
  }
  
  exports.getProductById = (req, res) => {
    products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    
    const foundProduct = products.find(p => p.id == req.params.id);
    if (foundProduct) {
      res.status(200).json({
        status: "success",
        data: {
          products: foundProduct,
        },
      });
    }
  
    else{
      res.status(404).json({
        status: "not found",
      });
    }
    
  }

  exports.upDateProduct = (req, res) => {
    products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));

    let id = req.params.id - 1;
    console.log(id);

    if(id >= 0) {
        products[id].name = req.body.name;
        products[id].price = req.body.price;
        products[id].category = req.body.category;
        
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));


        res.status(200).json({
        status: "success",
        message: "updated",
        data: {
            products,
            },
        });
    }

    else {
        //console.log(id);
        res.status(404).json({
            status: "not found",
          });
    }
    
  }

  exports.deleteProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    modifiedProducts = products.filter(p => p.id != req.params.id);
    
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(modifiedProducts));
    
    res.status(200).json({
      status: "success",
      message: "deleted product with ID "+req.params.id,
      results: modifiedProducts.length,
      data:{
        product: modifiedProducts
      }
    });
    
  }