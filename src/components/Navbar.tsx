import { FaRegUserCircle } from "react-icons/fa";

const Navbar = (props : { header : string}) => {
    return (
      <div>
        <div className="bg-[#eaecee] py-2 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{props.header}</h1>
        <div className="flex items-center gap-3">
            <FaRegUserCircle size={35} />
            <div>
                <p className="font-semibold text-md">Rohit Sharma</p>
                <p className="text-xs">rohit@gmail</p>
            </div>         
        </div>
      </div>
      <hr className="h-px border-0 bg-gray-500" />
      </div>
    );
  };
  
  export default Navbar;
  