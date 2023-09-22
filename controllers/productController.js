const Product = require("../models/productModel");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const helper = require("../utils/helper");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");
const { ObjectId } = require("mongodb");
const { verify } = require("crypto");
const { populate } = require("dotenv");
const Category = require("../models/categoryModel");
const Company = require("../models/companyModel");
const SubCategory = require("../models/subCategoryModel"); 

module.exports.createProduct = async (req, res) => {
    try {
        const name = await helper.capitalizeName(req.body.name);
        // console.log(name);
        // return false;
        const { price, description, companyId, subCategoryId, categoryId } = req.body;
        if (!name) {
            res.status(400).send({ success: false, message: "Please Enter a valid Name" });
            return false;
        };
        if (!price) {
            res.status(400).send({ success: false, message: "Please Enter a price" });
            return false;
        };
        if (!description) {
            res.status(400).send({ success: false, message: "Please Enter Description" });
            return false;
        }
        const productExist = await Product.findOne({ name });

        if (productExist) {
            if (req.files) {
                req.files.map(
                    (fileData) => {
                        fs.unlinkSync(fileData.path);
                    }
                )
            }
            res.status(400).send({ success: false, message: "Product already exist" });
        } else {
            const createProduct = new Product({
                name: name,
                price: price,
                description: description,
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                companyId: companyId
            });

            if (req.files) {
                const fileDate = req.files.map((image) => image.filename);
                createProduct.image = fileDate;
            } else {
                createProduct.image = null;
            }
            const savePeoduct = await createProduct.save();
            res.status(200).send({ success: true, message: " Product create successfully" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};


module.exports.viewProduct = async (req, res) => {
    try {
        const Id = req.query._id;
        const categoryId = req.query.categoryId;
        const subCategoryId = req.query.subCategoryId;
        const companyId = req.query.categoryId;

        if (Id) {
            const viewProduct = await Product.findOne({ _id: new ObjectId(Id) }, { _id: 0, name: 1, status: 1, price: 1, description: 1 });

            if (viewProduct) {
                if (viewProduct.image) {
                    var imageURL = viewProduct.image.map((image) =>
                        `${process.env.FILE_PATH}/${image}`
                    )
                    const data = {
                        name: viewProduct.name,
                        status: viewProduct.status,
                        price: viewProduct.price,
                        description: viewProduct.description,
                        image: imageURL
                    }

                    res.status(200).send({ success: true, message: "Product viewed successfully", data });
                }
            } else {
                res.status(400).send({ success: false, message: "Invalid Id" });
            }

        }
        else if (categoryId) {
            const viewAllProductByCategoryId = await Product.find({ categoryId: new ObjectId(categoryId) }, { _id: 0, name: 1, status: 1, price: 1, description: 1 });
            res.status(200).send({ success: true, message: "All Product successfully viewed", data: viewAllProductByCategoryId });
        }
        else if (subCategoryId) {
            const viewAllProductBySubCategoryId = await Product.find({ subcategoryId: new ObjectId(subCategoryId) }, { _id: 0, name: 1, status: 1, price: 1, description: 1 });
            res.status(200).send({ success: true, message: "All Product successfully viewed", data: viewAllProductBySubCategoryId });
        }
        else if (companyId) {
            const viewAllProductByCompanyId = await Product.find({ companyId: new ObjectId(companyId) }, { _id: 0, name: 1, status: 1, price: 1, description: 1 });
            res.status(200).send({ success: true, message: "All Product successfully viewed", data: viewAllProductByCompanyId });
        }else {

            const viewAllProduct = await Product.find({})
           .populate({path:"categoryId",select:"name"})
           .populate({path:"subCategoryId",select:"name"})
           .populate({path:"companyId",select:"name"}); 
            console.log(viewAllProduct);
            return false;
            if (viewAllProduct) {
                var getProduct = viewAllProduct.map((product) => {
                    return {
                        ...product.toObject(),
                        image: product.image.map((avtar) =>
                            `${process.env.FILE_PATH}/${avtar}`
                        )
                    };
                }
                )
            }
            res.status(200).send({ success: true, message: "All Product viewed successfully", data: viewAllProduct });
        };
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const { _id, name, status, price, description } = req.body;
        const productExist = await Product.findOne({ _id: new ObjectId(_id) });

        if (productExist) {
            var condition = {};
            if (name) {
                const firstLetter = name[0];
                if (isNaN(firstLetter)) {
                    condition.name = await helper.capitalizeName(name);
                } else {
                    res.status(400).send({ success: false, message: "Invalid Name" });
                }
            };
            if (status) {
                if (status == "Y" || status == "N") {
                    condition.status = status;
                } else {
                    res.status(400).send({ success: false, message: "Invalid status" });
                }
            };
            if (price) {
                condition.price = price;
            };
            if (description) {
                condition.description = description;
            };

            const updateProduct = await Product.updateOne({ _id }, { $set: condition });
            res.status(200).send({ success: true, message: "Update Successfully", data: condition });
        } else {
            res.status(400).send({ success: false, message: "invalid id" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};


module.exports.deleteProduct = async (req, res) => {
    try {
        const Id = req.query._id;
        const categoryId = req.query.categoryId;
        const subCategoryId = req.query.subCategoryId;
        const companyId = req.query.companyId;

        if (Id) {
            const findProduct = await Product.findOne({ _id: new ObjectId(Id) });
            if (findProduct) {
                const findProduct = await Product.deleteOne({ _id: new ObjectId(Id) });
                res.status(200).send({ success: true, message: "Product delete successfully" });
            } else {
                res.status(400).send({ success: false, message: "Invalid Id" });
            }
        }
        else if (categoryId) {
            const findProductByCategoryId = await Product.deleteMany({ categoryId: new ObjectId(categoryId) });
            res.status(200).send({ success: true, message: "All Product successfully delete" });
        }
        else if (subCategoryId) {
            const findProductBySubCategoryId = await Product.deleteMany({ subCategoryId: new ObjectId(subCategoryId) });
            res.status(200).send({ success: true, message: "All Product successfully delete" });
        }
        else if (companyId) {
            const findProductByCompanyId = await Product.deleteMany({ companyId: new ObjectId(companyId) });
            res.status(200).send({ success: true, message: "All Product successfully delete" });
        }
        else {
            const deleteAllProduct = await Product.deleteMany({});
            res.status(200).send({ success: true, message: "All Product successfully delete" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};



module.exports.searchProduct = async (req, res) => {
    const { name, price, category, company, subCategory } = req.query;
    let filter = {};
    if (name) {
        filter.$or = [
            { name: { $regex: name, $options: 'i' } },
            { description: { $regex: name, $options: 'i' } },
        ];
    }
    if (price) {
        filter.price = { $lte: parseFloat(price) }; // Fixed the price filter
    }
    if (category) {
        const existCat = await Category.findOne({ name: { $regex: category, $options: 'i' } });
        if (existCat) {
            filter.categoryId = existCat._id;
        }
    }
    if (company) {
        const existComp = await Company.findOne({ name: { $regex: company, $options: 'i' } });
        if (existComp) {
            filter.companyId = existComp._id;
        }
    }
    if (subCategory) {
        const existSubCat = await SubCategory.findOne({ name: { $regex: subCategory, $options: 'i' } });
        if (existSubCat) {
            filter.subCategoryId = existSubCat._id;
        }
    }
    try {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const searchProduct = await Product.find(filter)
            .select("-__v")
            .populate({ path: "categoryId", select: "name" })
            .populate({ path: "subCategoryId", select: "name" })
            .populate({ path: "companyId", select: "name" })
            .limit(limit)
            .skip(skip);

        if (searchProduct && searchProduct.length > 0) {
            const getProduct = searchProduct.map((product) => ({
                ...product.toObject(),
                image: product.image.map((getImage) => `${process.env.FILE_PATH}/${getImage}`),
            }));
            const productCount = searchProduct.length;

            res.status(200).send({ success: true, message: "Products found Successfully", data: getProduct, productCount });
        } else {
            res.status(200).send({ success: true, message: "Products not found" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}



// module.exports.searchProduct = async (req, res) => {
// try {
//     const name = req.query.name;
//     const nameExist = await Product.find({name : {$regex : name}});
//     if (nameExist) {
// res.status(200).send({success: true, message:"product are successfully search",data:nameExist});
//     } else {
//       res.status(400).send({success:false, message:"product are not found"});  
//     }
// } catch (error) {
//     res.status(400).send({success: false, message:error.message});
// }
// };


