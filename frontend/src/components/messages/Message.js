import React from 'react'


const Message = ({ message }) => {

	return (
		<div className={`chat chat-end`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src="https://icons8.com/icon/23239/circled-user-female-skin-type-1-and-2"/>
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2`}>HIIIII</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
		</div>
	);
};
export default Message;
