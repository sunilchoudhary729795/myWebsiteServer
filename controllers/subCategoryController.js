const subCategory = require("../models/subCategoryModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");

module.exports.createsubCategory = async (req, res) => {
    try {
        const subCategoryName = req.body.name;
        const subCategoryExist = await subCategory.findOne({ name: subCategoryName });
        if (subCategoryExist) {
            res.status(400).send({ success: false, message: "subCategory Already Exist" });

        } else {
            const createsubCategory = new subCategory({
                name: subCategoryName
            });
            const savesubCategory = await createsubCategory.save();
            res.status(200).send({ success: true, message: "subCategory create successfully" });

        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });

    }
};


module.exports.viewsubCategory = async (req, res) => {
    try {
        const Id = req.query._id;
        if (Id) {
            const viewsubCategory = await subCategory.findOne({ _id: new ObjectId(Id) }, { _id: 0, name: 1, status: 1 });
            if (viewsubCategory) {
                res.status(200).send({ success: true, message: "subCategory viewed successfully", data: viewsubCategory });

            } else {
                res.status(400).send({ success: false, message: "Invalid Id" });
            }

        } else {
            const viewAllSubCategory = await subCategory.find({}, { _id: 0, name: 1, status: 1 });
            res.status(200).send({ success: true, message: "All SubCategory viewed successfully", data: viewAllSubCategory });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};


module.exports.updateSubCategory = async (req, res) => {
    try {
      const { _id, name, status } = req.body;
      const subCategoryExist = await subCategory.findOne({ _id });
      if (subCategoryExist) {
  
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
  
        const updateCategory = await subCategory.updateOne({ _id }, { $set: condition });
        res.status(200).send({ success: true, message: "Update Successfully", data: condition })
      } else {
        res.status(400).send({ success: false, message: "Invalid id" });
      }
  
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  
  module.exports.deleteSubCategory = async (req, res) => {
    try {
      const Id = req.query._id;
      if (Id) {
        const findSubCategory = await subCategory.findOne({ _id: new ObjectId(Id) });
        if (findSubCategory) {
          const deleteSubCategory = await subCategory.deleteOne({ _id: new ObjectId(Id) });
          res.status(200).send({ success: true, message: "SubCategory delete successfully" });
        } else {
          res.status(400).send({ success: false, message: "Invalid Id" });
        }
      }
      else {
        const deleteAllSubCategory = await subCategory.deleteMany({});
        res.status(200).send({ success: true, message: "All SubCategory successfully deleted" });
      };
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };