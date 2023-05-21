


import { ElementRef, FormEvent, RefObject, useEffect, useMemo, useReducer } from "react";
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

    useEffect(() => {
        props.setFormIsValid(formIsValid)
    }, [formIsValid])

    return (
        <>
            
            <form ref={props.form_ref} onSubmit={submitForm} className="w-full gap-y-5 flex flex-col">
                
                <div className="w-full">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline">
                        Text
                    </label>
                    <input 
                        id="text"
                        onChange={(evt) => dispatch({type: 'set_value', target: 'text', value: evt.target.value})} 
                        value={reducerState.text} 
                        type="text" 
                        placeholder="Text"
                        className="input-form rounded w-full read-only:opacity-50"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline">
                        Content
                    </label>
                    <textarea 
                        id="content"
                        onChange={(evt) => dispatch({type: 'set_value', target: 'content', value: evt.target.value})} 
                        value={reducerState?.content} 
                        rows={4} 
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 read-only:opacity-50" 
                        placeholder="Content" 
                    />
                </div>


            </form>
        </>
    )
}

export default FormComponent