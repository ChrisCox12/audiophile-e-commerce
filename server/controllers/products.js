import Product from "../models/product.js";
import uploadImage from "../utils/uploadImage.js";


export async function getAllProducts(req, res) {
    try {
        const products = await Product.find();

        if(!products) return res.json({ success: false, msg: 'Could not find any products' });

        res.json({ success: true, msg: 'Successfully retrieved products', products: products });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieve products' });    
    }
}

export async function getProductsByCategory(req, res) {
    const { category } = req.params;

    try {
        const products = await Product.find({ category: category });

        if(!products) return res.json({ success: false, msg: 'Could not find any products' });

        res.json({ success: true, msg: 'Successfully retrieved products by category', products: products });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieve products' });  
    }
}

export async function getProductBySlug(req, res) {
    const { slug } = req.params;

    try {
        const product = await Product.findOne({ slug: slug });

        if(!product) return res.json({ success: false, msg: 'Could not find that product' });

        res.json({ success: true, msg: 'Successfully retrieved product', product: product });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieve product' });
    }
}

export async function createProduct(req, res) {
    const productInfo = req.body;
    const image = productInfo.image;
    const galleryImages = productInfo.gallery;
    
    try {
        /* const productImage = uploadImage(image);
        const galleryImageFirst = uploadImage(galleryImages.first);
        const galleryImageSecond = uploadImage(galleryImages.second);
        const galleryImageThird = uploadImage(galleryImages.third);

        const imageResponses = await Promise.all([
            productImage,
            galleryImageFirst,
            galleryImageSecond,
            galleryImageThird
        ]);

        const toSave = { 
            ...productInfo, 
            image: imageResponses[0], 
            gallery: {
                first: imageResponses[1],
                second: imageResponses[2],
                third: imageResponses[3]
            } 
        }; */

        //const product = new Product(toSave);
        const product = new Product(req.body);

        await product.save();

        console.log(`Creating product: \n ${product}`);
        res.json({ success: true, msg: 'Successfully created product', product: product });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to create product' });
    }
}

export async function updateProduct(req, res) {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if(!product) return res.json({ success: false, msg: 'Could not find that product' });

        await Product.findByIdAndUpdate(id, req.body);
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to update product' });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
 
        if(!product) return res.json({ success: false, msg: 'Could not find that product' });

        await Product.findByIdAndDelete(id);
        
        res.json({ success: true, msg: 'Successfully deleted product' });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to delete product' });
    }
}

