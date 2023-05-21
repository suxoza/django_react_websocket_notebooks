
import { useState } from "react";
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import NoteService from "services/noteService"
import LoadingComponent from "components/loading";

const Notes = () => {
    const service = new NoteService()
    const [ loadingStatus, setLoadingStatus ] = useState<boolean>(false)
    
    return (
        <>
            <ToastContainer />  
            <LoadingComponent status={loadingStatus} />
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="bg-gray-200 h-10 w-full mb-3 flex items-center justify-center text-2xl font-serif">
                    Notes
                </div>
                <Outlet context={[service, setLoadingStatus]}/>
            </div>
        </>
    )
}

export default Notes