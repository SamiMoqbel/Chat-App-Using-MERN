import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { loading, messages } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
		}, 50);

	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading ? (
				<span className="loading loading-spinner"></span>
			) : (
				messages.length === 0 ? (
					<p className='text-center text-gray-200'>Start a new Message 7abibibiiiii :P </p>
				) : (
					messages.map((message) => (
						<div key={message._id} ref={lastMessageRef}>
							<Message message={message} />
						</div>
					))
				)
			)

			}
		</div>
	);
};
export default Messages;