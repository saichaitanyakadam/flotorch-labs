import { useCallback, useContext, useEffect, useState } from "react"
import Table from "../components/Table"
import { FiUsers, FiBriefcase, FiUserCheck } from "react-icons/fi"
import { models } from "../constants/models"
import Loader from "../components/Loader"
import { AppContext } from "../context/AppContext"

const Home = () => {
  const [tableData,setTableData]=useState([])
  const [analysisData,setAnalysisData]=useState({})
  const [loading,setLoading]=useState(true)
  const [newEntry,setNewEntry]=useState(false)
 const {service,model,setService,setModel}=useContext(AppContext)

  const handleModelSelection=(e)=>{
    const [service,model]=e.target.value.split("/")
    setService(service)
    setModel(model)
  }
  
  const getTableData= useCallback(async()=>{
    console.log("function called")
      try {
        setLoading(true)
        setNewEntry(false)
        const response=await fetch(`http://127.0.0.1:8003`)
        const data=await response.json()
        setTableData(data.tableData)
        setAnalysisData(data.analysisData)
      } catch (error) {
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    },[])
  useEffect(()=>{
    getTableData()
  },[getTableData])

  const handleNewTrascriptBtn=()=>{
    setNewEntry(true)
     setTimeout(() => {
      getTableData()
    }, 15000)
  }
  return (
    <div className="px-20 space-y-8 py-8">
    {/* Header Section */}
    <div className="text-center space-y-4 bg-gradient-to-br from-orange-100 to-red-100 dark:bg-gradient-to-br dark:from-orange-900 dark:to-red-900 rounded-xl p-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Call Analytics Dashboard</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Monitor and analyze customer call data with detailed insights and real-time analytics</p>
      <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 max-w-md mx-auto border border-orange-300 dark:border-orange-600 shadow-lg">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">📞 +1 743-249-8582</div>
            <p className="text-gray-600 dark:text-gray-400">Call this number to test our call analytics system. After your call, click the button below to generate a transcript and analysis.</p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" onClick={handleNewTrascriptBtn}>
              Sync Latest Call Data
            </button>
            {newEntry && <div className="text-xl font-semibold text-gray-900 dark:text-white">Extracting Call Insights...</div>}
          </div>
        </div>
      </div>
      
      {/* Provider and Model Selection */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto border border-orange-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Select AI Provider & Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model</label>
            <select 
              value={`${service}/${model}`} 
              onChange={handleModelSelection}
              disabled={loading || newEntry}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {models.map(ele => (
                <option key={ele.value} value={`${ele.service}/${ele.value}`}>{ele.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
    
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-orange-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Candidates</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{analysisData?.totalCustomers || 0}</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full">
                    <FiUsers className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                </div>
            </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-orange-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Today's Calls</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{analysisData?.todaysCalls || 0}</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full">
                    <FiBriefcase className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>
            </div>
        </div>
    </div>
    
    {/* Call Data Table */}
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-orange-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-orange-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Call Records</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Detailed view of all customer interactions</p>
      </div>
      <div className="p-6">
        {loading?<Loader /> : <Table tableData={tableData}/>}
      </div>
    </div>
    </div>
  )
}

export default Home