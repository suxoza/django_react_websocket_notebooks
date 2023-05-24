
import { Link } from "react-router-dom"
import { NoteInterface } from "interfaces/notesInterface"
import TimeAgo from 'react-timeago'


interface propsInterface {
    note: NoteInterface,
    deleteNote: CallableFunction
}

const CustomCard = (props : propsInterface) => {
    
    return (
        <div className="block rounded-lg bg-white text-center dark:bg-neutral-700 w-56 border-gray-300 border hover:shadow-xl">
            <div className="border-b-2 border-neutral-100 px-5 py-3 dark:border-neutral-600 dark:text-neutral-50 flex justify-between items-center">
            <div className="text-sm truncate flex gap-x-2 max-w-[85%]">
                    <span>
                        <span className="opacity-75">
                            ID:
                        </span> 
                        <strong className="italic">{props?.note?.id}</strong> 
                    </span>
                    <span>
                        <span className="opacity-75">
                            name: 
                        </span>                    
                        <strong className="italic">{ props?.note?.file_name }</strong> 
                    </span>
                </div>
                <svg onClick={() => props.deleteNote(props?.note?.id)} className="w-5 text-red-500 cursor-pointer hover:shadow-2xl hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
            <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 truncate">
                    { props?.note?.text }
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 h-12 overflow-hidden">
                    { props?.note?.content }
                </p>
                <div className="w-full justify-center items-center gap-x-2 flex">
                    <Link to={`/doc/${props.note?.id}/edit`} type="button" className="w-1/2 inline-block text-black rounded-lg bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border border-gray-500 hover:shadow-xl hover:text-green-800">
                        Edit
                    </Link>
                    <Link to={`/doc/${props.note?.id}/view`} type="button" className="w-1/2 inline-block text-black rounded-lg bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border border-gray-500 hover:shadow-xl hover:text-green-800">
                        View
                    </Link>
                </div>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                <TimeAgo date={(props?.note?.updated_at || props?.note?.created_at) as string} />
            </div>
        </div>
    )
}

export default CustomCard