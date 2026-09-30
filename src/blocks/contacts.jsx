import { useEffect, useRef, useState } from "react";
import "../styles/contacts.css"
import { LuPencil, LuTrash } from "react-icons/lu";
import { BiBlock } from "react-icons/bi";

const options = [
    {name: "Edit", icon: LuPencil, over: "normal"},
    {name: "Delete", icon: LuTrash, over: "danger"},
    {name: "Block", icon: BiBlock, over: "purple"}
]

export default function ContactsList({contacts, removeContact, blockContact}) {
    const [contextMenu, setContextMenu] = useState(null);
    const closeRef = useRef();
   
   const manageContext = (e, user) => {
    e.preventDefault();

    const menuWidth = 180;
    const menuHeight = 180;

    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 10;
    }

  
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 10;
    }

  
    if (x < 10) {
        x = 10;
    }

    if (y < 10) {
        y = 10;
    }

    setContextMenu({
        user,
        x,
        y
    });
};

    useEffect(()=>{
       const listenToOutsideClick = (e) => {
        if (!closeRef.current?.contains(e.target)) {
    setContextMenu(null);
}
       }

       document.addEventListener("click", listenToOutsideClick);

       return () => {
        document.removeEventListener("click", listenToOutsideClick);
       }
    },[])


  const manageMenu = (btn, userId) => {

    if (btn.name === "Delete") {
        removeContact(userId);
        setContextMenu(null);
    }

    if(btn.name === "Block"){
        blockContact(userId);
        console.log(contacts);
        setContextMenu(null);
    }

};

    return (
        <div className="contacts-list">

            {contacts.length === 0 ? (<p>No contacts found</p>)
            : contacts.map((contact) => (

                <div
                    className={contact.blocked ? "contact blocked" : "contact"}
                    onDoubleClick={(e)=>manageContext(e, contact)}
                    onContextMenu={(e)=>manageContext(e, contact)}
                    key={contact.id}
                   
                >

                    <div className="contact-avatar">
                        {contact.initials}
                    </div>

                    <div className="contact-info">

                        <p className="contact-name">
                            {contact.name}
                        </p>

                        <small className="contact-phone">
                            {contact.phone}
                        </small>

                    </div>

                </div>

            ))}

            {contextMenu && (
                <div className="context-menu"
                 ref={closeRef}

                style={{
                    position:"fixed",
                    left: contextMenu.x,
                    top: contextMenu.y
                }}
                >
                    <h4>{contextMenu.user.name}</h4>
                    <div className="buttons">
                        {options.map((btn, index) => (
                            <button
                            onClick={()=>manageMenu(btn, contextMenu.user.id)}
                            className={`btn ${btn.over}`}
                            key={index}>
                                <span>{btn.name}</span>
                                <btn.icon/>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
