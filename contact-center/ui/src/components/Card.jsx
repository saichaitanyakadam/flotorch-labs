import { BsGraphUpArrow } from "react-icons/bs"

const Card = ({tag,value}) => {
  return (
    <div className="h-[200px] w-[200px] bg-white shadow-lg rounded flex flex-col justify-center items-center">
      <BsGraphUpArrow size={60}/>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-lg text-center">{tag}</p>
    </div>
  )
}

export default Card