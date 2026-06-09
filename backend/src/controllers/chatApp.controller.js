const ChatAppService = require('../services/chatapp.service');
const asyncHandler = require('../utils/asyncHandler');

class ChatAppController {
    getChat = asyncHandler(async (req, res) => {
        const chat = req.query.roomId;

        const result = await 
            ChatAppService.getChat(chat);

        res.json(result);
    });
}

module.exports = new ChatAppController();