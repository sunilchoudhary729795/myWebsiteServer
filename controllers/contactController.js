const Contact = require("../models/contactModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");


module.exports.createContact = async (req, res) => {
    try {
        const name = await helper.capitalizeName(req.body.name);
        const { email, mobile, reason } = req.body;
       
       
            const createContact = new Contact({
                name: name,
                email: email,
                mobile: mobile,
                reason: reason
            });

            const saveContact = await createContact.save();
            res.status(200).send({ success: true, message: "Contact create successfully", data: saveContact });
        

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};
