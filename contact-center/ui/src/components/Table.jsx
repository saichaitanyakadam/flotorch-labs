import { useState } from "react"
import Modal from "./Modal"

const Table = ({tableData}) => {
    const [show,setShow]=useState(false)
    const [rowData,setRowData]=useState(null)
    
  return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-   dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Caller ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Call Time Stamp
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transcript From Customer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {tableData && tableData?.map((data,idx)=>(
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" key={idx}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-32 truncate">
                            {data.contactId}
                        </th>
                        <td className="px-6 py-4">
                            {data.customerPhoneNumber}
                        </td>
                        <td className="px-6 py-4">
                            {data.callTimestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap dark:text-white max-w-xl truncate">
                            {data.contactTranscriptFromCustomer}
                        </td>
                        <td className="px-6 py-4" onClick={()=>{setShow(true);setRowData(data)}}>
                            More
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {show && <Modal data={rowData} setShow={setShow}/>}
        </div>

  )
}

export default Table