
import { useLocation, useNavigate } from "react-router-dom";

const NoteView = () => {
    
    const navigate = useNavigate()
    const { state } = useLocation();
    return (
        <>
            <div className="flex items-center justify-center w-full">
                <div className="w-11/12 xl:w-1/2 flex flex-col items-center justify-center">
                    {/* file name  */}
                    <div className="text-2xl text-gray-400 border-b-gray-500 border-b  w-full flex justify-center pb-3">
                        { state.file_name }
                    </div>

                    {/* text  */}
                    <div className="text-xl m-3 underline w-full flex items-center justify-center">
                        { state.text}
                    </div>

                    {/* content  */}
                    <div className="text-xl border rounded-xl p-5 m-5 lg:min-w-[25rem] lg:min-h-[10rem]">
                        { state.content}
                    </div>
                    {/* buttons  */}

                    <div className="inline-flex rounded-md shadow-sm gap-x-2" role="group">
                        <button onClick={() => navigate(`/doc/${state.id}/edit`, {state: state})} type="button" className="px-8 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            Edit
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

export default NoteView