import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import NoteService from "services/noteService";
import FormComponent from "components/formComponent";
import { NoteInterface } from "interfaces/notesInterface";
import { toast } from "react-toastify";


const EditNote = () => {

    const [ service, setLoadingStatus ] = useOutletContext<NoteService | any>();
    const navigate = useNavigate()

    const { state } = useLocation();
    const formRef = useRef<HTMLFormElement>(null)

    
    const [ formIsValid, setFormIsValid ] = useState<boolean>(false)
    
    const submitForm = (note: NoteInterface) => {
        if(!formIsValid)return
        setLoadingStatus(true)
        
        service.editNote(state.id, note).then((response: NoteInterface) => {
            console.log(response) 
            toast("Note has been updated!") 
        }).catch((error: any) => {
            const errorMessage = error?.response?.data?.errors?.message || 'Server Error'
            toast.error(errorMessage)
        }).then(() => {
            setLoadingStatus(false)
        })

        setTimeout(() => {
            setLoadingStatus(false)
        }, 2000);
    }

    useEffect(() => {
        console.log('got answer from child ....', formIsValid)
    }, [formIsValid])

    return (
        <>
            <div className="w-full flex items-center justify-center flex-col gap-y-5">
                <div className="text-gray-700 text-3xl border-b-2 w-full flex justify-center pb-3">
                    {state.file_name}
                </div>
                <div className="flex items-center justify-center flex-col w-11/12 lg:w-1/2 gap-y-4">

                    <FormComponent 
                        default_text={state.text}
                        default_content={state.content}
                        form_ref={formRef}
                        on_submit={submitForm}
                        setFormIsValid={setFormIsValid}
                    />
                
                    <div onClick={() => formRef?.current?.requestSubmit()} className={(!formIsValid && 'opacity-25 cursor-auto hover:bg-inherit')+` py-2 w-full bg-blue-500 flex items-center justify-center text-white rounded-xl hover:bg-green-500 cursor-pointer text-xl`}>
                        Store
                    </div>

                    {/* buttons  */}

                    <div className="inline-flex rounded-md shadow-sm gap-x-2 w-full justify-center" role="group">
                        <button onClick={() => navigate(`/doc/${state.id}/view`, {state: state})} type="button" className="px-8 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            View
                        </button>
                        <button onClick={() => navigate('/')} type="button" className="px-8 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            List
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNote