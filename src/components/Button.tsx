import { AiOutlineLeft,AiOutlineRight} from "react-icons/ai";
import  '../styles/main.scss'

interface props {
   rotate: boolean;
    handleClick?: () => void;
    }
    //button component :click to transfer checkes tasks
function Button(props:props) {
return (
 <>   
 <div className="button"  onClick={props.handleClick}>{props.rotate ?<AiOutlineLeft/>:<AiOutlineRight/>}</div>
 </>
  )
}

export default Button