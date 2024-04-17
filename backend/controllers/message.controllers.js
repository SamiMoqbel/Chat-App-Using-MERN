const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");

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
        }

            // await newMessage.save();
            // await conversation.save();
            // could be done in parallel using 
            await Promise.all([newMessage.save(), conversation.save()])

            const recieverSocketId= getReceiverSocketId(recieverId);
            if(recieverSocketId){
                io.to(recieverSocketId).emit("newMessage", newMessage);
            }
            
            res.status(201).json(newMessage);
            

    } catch (error) {
        console.log(`Error in sendMessage cont ${error.message}`);
        res.status(500).json({ error: `Internal server error : ${error.message}` });
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