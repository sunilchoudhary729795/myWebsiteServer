const Banner = require("../models/bannerModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");


module.exports.createBanner = async (req, res) => {
    try {
        const name = await helper.capitalizeName(req.body.name);
        const  image  = req.file;
        if(!name){
            fs.unlinkSync(req.file.path);
            res.status(400).send({success: false, message: "Please enter a name"});
        }else if(!image){
            res.status(400).send({success:false, message: "Please send a image"});
        }
        else{
            const findName = await Banner.findOne({name});
            if(findName){
                if(image) {
                    fs.unlinkSync(req.file.path);
        }
        res.status(400).send({ success: false, message: "Name already Exist"});
    }else{
            const createData = new Banner({
                name: name,
                image: image.filename
            })
            const saveData = await  createData.save();
            res.status(200).send({success: true, message: "Banner create successfully"});
        }
    };
                
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};


