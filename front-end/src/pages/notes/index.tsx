
import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import NoteService from "services/noteService"
import LoadingComponent from "components/loading";

import { NoteInterface } from "interfaces/notesInterface";
import { toast } from "react-toastify";

const Notes = () => {
    const service = new NoteService()
    
    const [ loadingStatus, setLoadingStatus ] = useState<boolean>(false)

    const getNote = useCallback(async (note_id: number, callback: CallableFunction) => {
        setLoadingStatus(true)
        try {
            const note: NoteInterface = await service.getNote(Number(note_id))
            callback(note)
             
        } catch (error: any) {
            const errorMessage = error?.response?.data?.errors?.message || 'Server Error'
            toast.error(errorMessage)
        } finally {
            setLoadingStatus(false)
        }
    }, [])
    
    return (
        <>
            <ToastContainer />  
            <LoadingComponent status={loadingStatus} />
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="bg-gray-200 h-10 w-full mb-3 flex items-center justify-center text-2xl font-serif">
                    Notes
                </div>
                <Outlet context={[service, getNote, setLoadingStatus]}/>
            </div>
        </>
    )
}

export default Notes