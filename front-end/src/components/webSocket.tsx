// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface propsInterface {
    room_id: string,
    send_message: CallableFunction,
    on_message: CallableFunction,
    on_status_change: CallableFunction
}

const WebSocketComponent = ({ ...props }: propsInterface) => {
    // const [socketUrl, setSocketUrl] = useState(`ws://127.0.0.1:8000/ws/${props.room_id}/`);
    // const [messageHistory, setMessageHistory] = useState([]);
    // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);


    // useEffect(() => {
    //     props.on_status_change({
    //         [ReadyState.CONNECTING]: 'Connecting',
    //         [ReadyState.OPEN]: 'Open',
    //         [ReadyState.CLOSING]: 'Closing',
    //         [ReadyState.CLOSED]: 'Closed',
    //         [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    //     })
    // }, [ReadyState])

    return (
    <>
        <div></div>
    </>)
        
    

}

export default WebSocketComponent