const asyncHandler = require("express-async-handler");
const Products = require('../Models/productModel')
const Category = require('../Models/categoryModel')


const addProduct = asyncHandler(async (req,res)=>{
    const {productname,productdescription,productprice,category,countInStock}=req.body;
    const categoryData = await Category.find({category})

    if (!productname || productname.trim().length < 1) {
        return res.status(400).json({ message: 'Product name is required and must have at least 1 character.' });
      }
    
      if (!productdescription || productdescription.trim().length < 3) {
        return res.status(400).json({ message: 'Product description is required and must have at least 3 characters.' });
      }
    
      if (!productprice || isNaN(productprice) || Number(productprice) <= 0) {
        return res.status(400).json({ message: 'Product price is required and must be a positive number.' });
      }
    
      if (!category || category.trim().length === 0) {
        return res.status(400).json({ message: 'Category is required and cannot be empty.' });
      }
      if (!categoryData) {
        return res.status(400).json({ message: 'Invalid category. Please select a valid category.' });
      }
    
    
      if (!countInStock || isNaN(countInStock) || Number(countInStock) < 0) {
        return res.status(400).json({ message: 'Stock count is required and must be a positive number.' });
      }

      const productData =await Products.create({productname,productdescription,productprice,category,countInStock})
      
      if(productData){
        res.status(200).json({
            _id:productData._id,
            productname:productData.productname,
            productdescription :productData.productdescription ,
            productprice:productData.productprice,
            category:productData.category,
            countInStock:productData.countInStock
            
        })
      } else {
        res.status(400).json({ message: "Product not added" });
      }
    
})

const editProduct = asyncHandler(async (req,res)=>{
    const {productId,nProductname,nProductdescription,nProductprice,nCategory,nCountInStock}=req.body;
    
    const categoryData = await Category.find({nCategory})
    
    if(!productId){
         return res.status(400).json({ message: 'Product-ID is not found' });
    }

    if (!nProductname || nProductname.trim().length < 1) {
        return res.status(400).json({ message: 'Product name is required and must have at least 1 character.' });
      }
    
      if (!nProductdescription || nProductdescription.trim().length < 3) {
        return res.status(400).json({ message: 'Product description is required and must have at least 3 characters.' });
      }
    
      if (!nProductprice || isNaN(nProductprice) || Number(nProductprice) <= 0) {
        return res.status(400).json({ message: 'Product price is required and must be a positive number.' });
      }
    
      if (!nCategory || nCategory.trim().length === 0) {
        return res.status(400).json({ message: 'Category is required and cannot be empty.' });
      }
      if (!categoryData) {
        return res.status(400).json({ message: 'Invalid category. Please select a valid category.' });
      }
    
      if (!nCountInStock || isNaN(nCountInStock) || Number(nCountInStock) < 0) {
        return res.status(400).json({ message: 'Stock count is required and must be a positive number.' });
      }
      
      try {
        const updatedProduct = await Products.findByIdAndUpdate(
          productId,
          {
            productname: nProductname.trim(),
            productdescription: nProductdescription.trim(),
            productprice: Number(nProductprice),
            category: nCategory.trim(),
            countInStock: Number(nCountInStock),
          },
          { new: true } 
        );
    
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
      }
    

})

const deleteProduct = asyncHandler(async (req,res)=>{
  console.log("coming here");
  
  const { productId } = req.body;
  console.log("productId",productId);

  if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
  }
  const product = await Products.findByIdAndDelete({productId});
  
  console.log("PRODUCT DATA",product);
  
  if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
  } else {
      return res.status(200).json({ message: 'Product deleted successfully.' });
  }
})


module.exports = {
    addProduct,
    editProduct,
    deleteProduct
}
