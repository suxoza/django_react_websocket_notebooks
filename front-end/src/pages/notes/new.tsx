import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { toast } from 'react-toastify';

import NoteService from "services/noteService";
import FormComponent from "components/formComponent";
import { NoteInterface } from "interfaces/notesInterface";


const CreateNote = () => {

    const [ service, setLoadingStatus ] = useOutletContext<NoteService | any>();
    const navigate = useNavigate()
    
    const formRef = useRef<HTMLFormElement>(null)

    const [ formIsValid, setFormIsValid ] = useState<boolean>(false)
    const [ file_name, setFileName ] = useState<string>('')
    
    const submitForm = (note: NoteInterface) => {
        if(!buttonStatus)return
        setLoadingStatus(true)

        service.createNewNote({...note, file_name}).then((response: NoteInterface) => {
            console.log(response)
            toast("Note Created!")
            navigate('/')
        }).catch((error: any) => {
            const errorMessage = error?.response?.data?.errors?.message || 'Server Error'
            toast.error(errorMessage)
            setFileName('')
        }).then(() => {
            setLoadingStatus(false)
        })
    }

    useEffect(() => {
        console.log('got answer from child ....', formIsValid)
    }, [formIsValid])


    const buttonStatus = useMemo(() => {
        return formIsValid && file_name.length
    }, [formIsValid, file_name])

    return (
        <>
            <div className="w-full flex items-center justify-center flex-col gap-y-5">
                <div className="flex items-center justify-center flex-col w-11/12 lg:w-1/2 gap-y-4">
                    <div className="flex flex-col w-full gap-y-3">
                        <label htmlFor="file_name">File Name</label>
                        <input  
                            value={file_name} 
                            onChange={(event) => setFileName(event.target.value)} 
                            onKeyDown={(evt) => {if(evt.key === 'Enter')formRef?.current?.requestSubmit()}}
                            id="file_name" 
                            className="form-input py-3 w-full rounded-lg" 
                            type="text" 
                            placeholder="Please type Note name..." 
                        />
                    </div>

                    <hr className="my-3 border-b border-b-gray-300 w-full" />

                    <FormComponent 
                        default_text=""
                        default_content=""
                        form_ref={formRef}
                        on_submit={submitForm}
                        setFormIsValid={setFormIsValid}
                    />
                
                    <div onClick={() => formRef?.current?.requestSubmit()} className={(!buttonStatus && 'opacity-25 cursor-auto hover:bg-inherit')+` py-2 w-full bg-blue-500 flex items-center justify-center text-white rounded-xl hover:bg-green-500 cursor-pointer text-xl`}>
                        Store
                    </div>

                    {/* buttons  */}

                    <div className="inline-flex rounded-md shadow-sm gap-x-2 w-full justify-center" role="group">
                        <button onClick={() => navigate('/')} type="button" className="px-16 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            Notes List
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNote