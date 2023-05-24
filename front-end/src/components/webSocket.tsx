// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface propsInterface {
    user_id: string,
    room_id: number,
    on_message: CallableFunction,
    on_status_change: CallableFunction,
    ref: any
}

const WebSocketComponent = forwardRef(({ ...props }: propsInterface, ref: any) => {
    // const [socketUrl, setSocketUrl] = useState(`ws://127.0.0.1:8000/ws/${props.room_id}/`);
    console.log(`new socket server = ws://192.168.100.7:8000/ws/${props.room_id}/ `)
    const [socketUrl, setSocketUrl] = useState(`ws://192.168.100.7:8000/ws/${props.room_id}/`);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const sendFilter = (message: string): string => {
        return JSON.stringify({user_id: props.user_id, message})
    }

    const getFilter = (message: string) => {
        return JSON.parse(message)
    }

    useImperativeHandle(ref, () => {
        
        return {
            send_message: (message: string) => {
                sendMessage(sendFilter(message))
            }
        }
    })

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    
    const receivedWebSocketMessage = useMemo(() => {
        return getFilter(lastMessage?.data || null)
    }, [lastMessage])

    useEffect(() => {
        props.on_status_change({
            connectionStatus
        })
    }, [connectionStatus])


    useEffect(() => {
        // console.log(lastMessage)
        props.on_message(receivedWebSocketMessage)
    }, [receivedWebSocketMessage])

    return (
    <>
        <div></div>
    </>)
        
    

})

export default WebSocketComponent