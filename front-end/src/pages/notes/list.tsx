
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom"
import NoteService from "services/noteService";
import { NoteInterface } from "interfaces/notesInterface";
import CustomCard from "components/cards";
import { toast } from "react-toastify";

const NotesList = () => {

    const [ service, setLoadingStatus ] = useOutletContext<NoteService | any>();
    const [ notes, setNotes ] = useState<NoteInterface[] | null>(null)

    useEffect(() => {
        service.getNotesList().then((response: NoteInterface[]) => {
            setNotes(response)
        })
    }, [])

    const deleteNote = (note_id: number) => {
        setLoadingStatus(true)
        service.deleteNote(note_id).then((response: {status: boolean}) => {
            setNotes(notes?.filter(item => item?.id !== note_id) || [])
            toast('Deleted successfully')
        }).catch((error: any) => {
            console.log(error)
            toast.error(error?.message || 'Server Error')
        }).then(() => {
            setLoadingStatus(false)
        })
    }

    return (
        <>
            <div className="border-b-gray-500 border-b w-full flex justify-between px-10 pb-3 text-2xl text-gray-600">
               <span>NotesList</span>
               <Link to={'/doc/create'} className="px-8 py-2 border border-gray-400 rounded-md float-right flex bg-gray-100 text-black font-serif hover:text-blue-500 cursor-pointer">
                    Add New Note
               </Link>
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="flex flex-wrap p-5 gap-5 w-11/12">
                    { notes?.map((note, index) => (
                        <div key={'list_'+index}>
                            <CustomCard {...{note, deleteNote}}/>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default NotesList