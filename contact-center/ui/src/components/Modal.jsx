import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Loader from "./Loader"
import floTorchLogo from "../assets/flt-logo.svg"
import { AppContext } from "../context/AppContext"

const Modal = ({data, setShow}) => {
    const [loading,setLoading]=useState(true)
    const {service,model}=useContext(AppContext)
    const [detailedData,setDetailedData]=useState(null)
    console.log(detailedData)
    useEffect(()=>{
        const fetchSummaryData=async(contactId)=>{
            try {
                const {data}=await axios.get(`http://127.0.0.1:8003/${contactId}?service=${service}&model=${model}`)
                setDetailedData(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchSummaryData(data.contactId)
    },[data,model,service])
  return (
    <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50">
    <div className="relative p-4 w-full max-w-5xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Call Details
                </h3>
                <button type="button" onClick={() => setShow(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4 max-h-[32rem] overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <Loader />
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">Generating summary using</p>
                            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{model}</p>
                        </div>
                    </div>
                ) : (
                    <>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <strong className="text-gray-900 dark:text-white">Caller ID:</strong>
                        <p className="text-gray-500 dark:text-gray-400">{detailedData?.contactId}</p>
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-white">Phone Number:</strong>
                        <p className="text-gray-500 dark:text-gray-400">{detailedData?.customerPhoneNumber}</p>
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-white">Call Date:</strong>
                        <p className="text-gray-500 dark:text-gray-400">{detailedData?.callDate}</p>
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-white">Time Stamp:</strong>
                        <p className="text-gray-500 dark:text-gray-400">{detailedData?.callTimestamp}</p>
                    </div>
                </div>
                
                <div>
                    <strong className="text-gray-900 dark:text-white">Summary:</strong>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{detailedData?.summary}</p>
                </div>
                
                <div>
                    <strong className="text-gray-900 dark:text-white">Conversation:</strong>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{detailedData?.conversation}</p>
                </div>
                
                <div>
                    <strong className="text-gray-900 dark:text-white">Customer Transcript:</strong>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{detailedData?.contactTranscriptFromCustomer}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <strong className="text-gray-900 dark:text-white">Mentioned Role:</strong>
                        <p className="text-gray-500 dark:text-gray-400">{detailedData?.didCustomerMentionedRole}</p>
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-white">Customer Brief:</strong>
                        <p className="text-gray-500 dark:text-gray-400">{detailedData?.didCustomerBriefHimself}</p>
                    </div>
                </div>
                
                {detailedData?.metadata && (
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <strong className="text-gray-900 dark:text-white">Metadata:</strong>
                            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
                                {model}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <strong className="text-gray-900 dark:text-white">Input Tokens:</strong>
                                <p className="text-gray-500 dark:text-gray-400">{detailedData.metadata.inputTokens}</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 dark:text-white">Output Tokens:</strong>
                                <p className="text-gray-500 dark:text-gray-400">{detailedData.metadata.outputTokens}</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 dark:text-white">Total Tokens:</strong>
                                <p className="text-gray-500 dark:text-gray-400">{detailedData.metadata.totalTokens}</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 dark:text-white">Latency:</strong>
                                <p className="text-gray-500 dark:text-gray-400">{detailedData.metadata.latencyMs}ms</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 dark:text-white">Input Cost:</strong>
                                <p className="text-gray-500 dark:text-gray-400">${detailedData.metadata.inputTokensCost}</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 dark:text-white">Output Cost:</strong>
                                <p className="text-gray-500 dark:text-gray-400">${detailedData.metadata.outputTokensCost}</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 dark:text-white">Cost Per Million Such Calls:</strong>
                                <p className="text-gray-500 dark:text-gray-400">${detailedData.metadata.costForMillionSuchQuestions}</p>
                            </div>
                        </div>
                    </div>
                )}</>
                )}
            </div>
            <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={() => setShow(false)} type="button" className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Close</button>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Powered by</span>
                    <img src={floTorchLogo} alt="Flotorch-Logo" className="h-12"/>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Modal