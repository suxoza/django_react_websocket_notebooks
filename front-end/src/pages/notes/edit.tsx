import { MutableRefObject, useCallback, useEffect, useRef, useState, useReducer } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

import NoteService from "services/noteService";
import FormComponent from "components/formComponent";
import { NoteInterface } from "interfaces/notesInterface";
import { toast } from "react-toastify";

import UserService from "services/userService";
import WebSocketComponent from 'components/webSocket'

interface reducerStete {
    text?: string,
    content?: string,
    default_text?: string,
    default_content?: string,
}

interface reducerContent {
    type: 'text' | 'content' | 'default_text' | 'default_content' | 'all'
    value?: string,
    text?: string,
    content?: string,
    default_text?: string,
    default_content?: string
}

enum response_types {
    saved = 'DATA_SAVED'
}

const EditNote = () => {

    const socketRef = useRef<MutableRefObject<null>>(null)
    const [ service, getNote, setLoadingStatus ] = useOutletContext<NoteService | any>();
    const [ disabledInputs, setDisabledInputs ] = useState<string[]>([])
    const urlParams: any = useParams()

    const reducer = (state: reducerStete, action: reducerContent) => {
        switch (action.type) {
            case 'text': {
                return {
                    ...state,
                    text: action?.value
                }
            }
            case 'default_text': {
                return {
                    ...state,
                    text: action?.value,
                    default_text: action?.value
                }
            }
            case 'content': {
                return {
                    ...state,
                    content: action?.value
                }
            }
            case 'default_content': {
                return {
                    ...state,
                    content: action?.value,
                    default_content: action?.value
                }
            }
            case 'all': {
                return {
                    text: action?.text,
                    content: action?.content,
                    default_text: action?.text,
                    default_content: action?.content
                }
            }
        }
    }

    const [reducerState, dispatch] = useReducer(reducer, {
        text: '',
        content: '',
        default_text: '',
        default_content: ''
    });


    const [ state, setState ] = useState<NoteInterface | null>(null)
    const formRef = useRef<HTMLFormElement>(null)    
    const [ formIsValid, setFormIsValid ] = useState<boolean>(false)
    
    const submitForm = (note: NoteInterface) => {
        if(!formIsValid || disabledInputs.length > 1)return
        setLoadingStatus(true)
        
        const request: any = note
        if(disabledInputs)
            delete request[disabledInputs[0]]
        
        service.editNote(state?.id, request).then((response: NoteInterface) => {
            console.log(response) 
            toast("Note has been updated!") 

            // notify other users about update
            // @ts-ignore
            socketRef?.current?.send_message(response_types.saved)


        }).catch((error: any) => {
            const errorMessage = error?.response?.data?.errors?.message || 'Server Error'
            toast.error(errorMessage)
        }).then(() => {
            setLoadingStatus(false)
        })
    }

    useEffect(() => {
        getNote(urlParams?.note_id, (note: NoteInterface) => {
            setState(note)
            dispatch({type: 'all', text: note?.text, content: note?.content})
        })
    }, [])

    const on_inputs_change = useCallback((data: {text?: string, content?: string}, target: string | null) => {
        
        const requestData = {}
        // @ts-ignore
        requestData[target] = data[target] 
        // @ts-ignore
        dispatch({type: 'default_'+target, value: data[target]})
        send_socket_message(requestData)
        
    }, [])

    const send_socket_message = (message: {text?: string, content?: string}) => {
        console.log('sent messge = ', message)
        // @ts-ignore
        socketRef?.current?.send_message(message)
    }

    const get_socket_message = (data: {message: any, user_id: string}) => {
        if(data?.user_id !== UserService.getInstance().id){
            console.log('received data = ', data?.message, data?.user_id)
            let message: string[] = []
            if(data?.message !== response_types.saved){
                console.log('current data = ', reducerState)
                const items = ['text', 'content']
                items.forEach((item: any) => {
                    let oposit = 'text'
                    let default_oposit = 'default_text'
                    let self_default = 'default_content'
                    if(item === 'text'){
                        oposit = 'content'
                        default_oposit = 'default_content'
                        self_default = 'default_text'
                    }
                    if(data?.message.hasOwnProperty(item) && data.message[item]){
                        dispatch({type: item, value: data?.message[item]})
                        //@ts-ignore
                        if(data?.message[item] !== reducerState[self_default])
                            message.push(item)
                        //@ts-ignore
                        if(reducerState[default_oposit] !== reducerState[oposit])
                            message.push(oposit)
                    }
                })
            }else {
                // other user submitted form
                if(disabledInputs.length){
                    let notifMessage = 'Note: Another user just saved the form' +
                        "if you have any changes your modifications are still there, you can store them at any time."
                    toast.warning(notifMessage)
                }
                
            }
            setDisabledInputs(message)
        }      
    }

    return (
        <>
            {state?.id && <WebSocketComponent 
                ref={socketRef}
                user_id={UserService.getInstance().id}
                room_id={state?.id}
                on_message={get_socket_message}
                on_status_change={(status: any) => console.log(status)}
            />
            }

            <div className="w-full flex items-center justify-center flex-col gap-y-5">
                <div className="text-gray-700 text-3xl border-b-2 w-full flex justify-center pb-3">
                    {state?.file_name}
                </div>
                <div className="flex items-center justify-center flex-col w-11/12 lg:w-1/2 gap-y-4">
                    {reducerState?.text}
                    <FormComponent 
                        disabledInputs={disabledInputs}
                        default_text={reducerState?.text || ''}
                        default_content={reducerState?.content || ''}
                        form_ref={formRef}
                        on_submit={submitForm}
                        setFormIsValid={setFormIsValid}
                        on_inputs_change={on_inputs_change}
                    />
                
                    <div onClick={() => formRef?.current?.requestSubmit()} className={((!formIsValid || disabledInputs?.length === 2)&& 'opacity-25 cursor-auto hover:bg-inherit')+` py-2 w-full bg-blue-500 flex items-center justify-center text-white rounded-xl hover:bg-green-500 cursor-pointer text-xl`}>
                        Store
                    </div>

                    {/* buttons  */}

                    <div className="inline-flex rounded-md shadow-sm gap-x-2 w-full justify-center" role="group">
                        <Link to={`/doc/${state?.id}/view`} type="button" className="px-8 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            View
                        </Link>
                        <Link to={'/'} type="button" className="px-8 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            List
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNote