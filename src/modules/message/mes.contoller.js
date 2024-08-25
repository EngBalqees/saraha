import messageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { receiverId } = req.params;

        const user = await userModel.findById(receiverId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        await messageModel.create({ message, receiverId });
        return res.status(201).json({ message: "success" });

    } catch (error) {
        return res.status(500).json({ message: 'catch error', error: error.stack });

    }
}
export const getMessages = async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, process.env.LOGINSIGNTURE);
        if (!decoded) {
            return res.status(400).json({ message: "invalid token" });
        }
        const id = decoded.id;
        const messages = await messageModel.find({ receiverId: req.id});
        return res.status(200).json({ message: "success", messages })
    } catch (error) {
        return res.status(500).json({ message: 'catch error', error: error.stack });
    }
}
