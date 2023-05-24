


import { useState, FormEvent, RefObject, useEffect, useMemo, useReducer } from "react";
import { NoteInterface } from "interfaces/notesInterface";



interface actionInterface {
    type: 'set_value', 
    target: 'text' | 'content',
    value: string
}

interface propsInterface {
    default_text: string,
    default_content: string,
    form_ref: RefObject<HTMLFormElement>,
    on_submit: CallableFunction,
    setFormIsValid: CallableFunction
    on_inputs_change?: CallableFunction,
    disabledInputs?: string[]
}

const FormComponent = ({ ...props }: propsInterface) => {

    const reducer = (state: NoteInterface, action: actionInterface) => {
        switch (action.type) {
            case 'set_value':
                return {
                    ...state,
                    [action.target]: action.value
                }
        }
    }
    
    const [ reducerState, dispatch ] = useReducer(reducer, {
        text: props?.default_text,
        content: props?.default_content,
    })
    
    const submitForm = (evt: FormEvent) => {
        evt.preventDefault()
        props.on_submit({
            text: reducerState.text,
            content: reducerState.content,
        })
    }

    const formIsValid = useMemo(() => {
        return Boolean(reducerState.text?.length && reducerState.content?.length)
    }, [reducerState.text, reducerState.content])


    /* edit mode */
    const onChangeTrigger = useMemo(() => {
        if(props.on_inputs_change){
            const changed_items: any = {};
            (['text', 'content'] as Array<string>).forEach((key: string) => {
                // @ts-ignore
                changed_items[key] = reducerState[key]
            })
            return changed_items
        }
    }, [reducerState.text, reducerState.content]);

    useEffect(() => {
        props.setFormIsValid(formIsValid)
    }, [formIsValid])


    useEffect(() => {
        if(props.on_inputs_change && inputActivityStatus)
            props.on_inputs_change(onChangeTrigger, inputActivityStatus)
    }, [onChangeTrigger])

    useEffect(() => {
        ['text', 'content'].forEach(item => {
            // @ts-ignore
            if(reducerState[item] !== props[`default_${item}`]){
                // @ts-ignore]
                dispatch({type: 'set_value', target: item, value: props[`default_${item}`]})
            }
        })
    }, [props?.default_content, props?.default_text])

    const [ inputActivityStatus, setInputActivityStatus ] = useState<string | null>(null)
    
    /* edit mode */

    return (
        <>
            <form ref={props.form_ref} onSubmit={submitForm} className="w-full gap-y-5 flex flex-col">
                
                <div className="w-full">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline">
                        Text
                    </label>
                    <div className="relative flex items-center">
                        <input 
                            onPointerLeave={() => setInputActivityStatus(null)}
                            onKeyDown={() => setInputActivityStatus('text')}
                            onKeyUp={() => setInputActivityStatus('text')}
                            id="text"
                            onChange={(evt) => dispatch({type: 'set_value', target: 'text', value: evt.target.value})} 
                            value={reducerState.text} 
                            type="text" 
                            placeholder="Text"
                            className="input-form rounded w-full read-only:opacity-50"
                            disabled={props.disabledInputs?.includes('text')}
                        />
                        {props.disabledInputs?.includes('text') && 
                            <div className="absolute text-[10px] text-red-500 right-3 opacity-75">someone else is working here</div>
                        }
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline">
                        Content
                    </label>
                    <div className="relative">
                        <textarea 
                            onPointerLeave={() => setInputActivityStatus(null)}
                            onKeyDown={() => setInputActivityStatus('content')}
                            onKeyUp={() => setInputActivityStatus('content')}
                            id="content"
                            onChange={(evt) => dispatch({type: 'set_value', target: 'content', value: evt.target.value})} 
                            value={reducerState?.content} 
                            rows={4} 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 read-only:opacity-50" 
                            placeholder="Content" 
                            disabled={props.disabledInputs?.includes('content')}
                        />
                        {props.disabledInputs?.includes('content') && 
                            <div className="absolute text-[10px] text-red-500 bottom-1 right-1 opacity-75">someone else is working here</div>
                        }
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormComponent