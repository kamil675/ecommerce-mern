import { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
function Card({ name, image, id, price }) {
  let { currency } = useContext(ShopDataContext);
  let navigate = useNavigate();
  return (
    <div
      className="w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg 
  rounded-lg hover:scale-[102%] flex flex-col p-[10px] 
  cursor-pointer border border-[#80808049]"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <img
        src={image}
        alt=""
        className="w-full h-[80%] rounded-sm object-cover"
      />

      {/* Name */}
      <div className="text-[#c3f6fa] text-[20px] mt-3">{name}</div>

      {/* Price */}
      <div className="text-[#c3f6fa] text-[14px] mt-1">
        {`${currency} ${price}`}
      </div>
    </div>
  );
}

export default Card;
