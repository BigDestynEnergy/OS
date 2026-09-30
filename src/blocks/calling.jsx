import { useEffect } from "react";
import "../styles/calling.css";
export default function Calling({contact, modal}){
    const closeModal = () => modal("");
    return(
        <div className="calling">
            <div className="circle"/>
               calling
            <b>{contact}</b>

            <span onClick={closeModal}>End call</span>
        </div>
    )
}