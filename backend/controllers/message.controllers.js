const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
    try {
        const { id: recieverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        });

        if (newMessage) {
            
            conversation.messages.push(newMessage._id);

            // await newMessage.save();
            // await conversation.save();
            // could be done in parallel using 
            Promise.all([newMessage.save(), conversation.save()])
            
            res.status(201).json({ message: `Message sent ${newMessage}` });
            
        }

    } catch (error) {
        console.log(`Error in sendMessage cont ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getConversation = async (req, res) => {
    try {
        const { id: targetId } = req.params;
        const currentId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [targetId, currentId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log(`Error in sendMessage cont ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { sendMessage, getConversation };