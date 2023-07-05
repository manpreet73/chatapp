import Bottom from "../../components/chat-window/bottom"
import Messages from "../../components/chat-window/messages"
import Top from "../../components/chat-window/top"
import {useParams} from 'react-router-dom';
import { useRooms } from "../../context/rooms.context";
import { Loader } from "rsuite";

const Chat = () => {
    const {chatId}= useParams();
    const rooms=useRooms();

    if(!rooms){
        return <Loader center vertical size="md"content="Loading" speed="slow"/>
    }

    const currentRoom=rooms.find(room=>room.id===chatId);

    if(!currentRoom){
        return <h6 className="text-center mt-page">Chat {chatId} not found</h6>
    }

  return (
    <>
      <div className="chat-top">
        <Top/>
      </div>
      <div className="chat-middle">
        <Messages/>
      </div>
      <div className="chat-bottom">
        <Bottom/>
      </div>
    </>
  )
}

export default Chat
