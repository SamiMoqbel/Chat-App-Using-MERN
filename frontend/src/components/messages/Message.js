import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    const isCurrentUser = message.senderId === authUser._id;
    const chatClass = isCurrentUser ? 'chat-end' : 'chat-start';
    const profPic = isCurrentUser ? authUser.profilePic : selectedConversation.profilePic;
    const chatColor = isCurrentUser ? 'bg-blue-500' : '';
    const formattedTime = extractTime(message.createdAt);
    const shouldShake = message.shouldShake ? 'shake' : '';

    return (
        <div className={`chat ${chatClass} `}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile' src={profPic}/>
                </div>
            </div>
            <div className={`chat-bubble ${chatColor} text-white pb-2 ${shouldShake} max-w-xs break-words`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center pb-4'>{formattedTime}</div>
        </div>
    );
};

export default Message;
