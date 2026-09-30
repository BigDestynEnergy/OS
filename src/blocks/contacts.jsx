import { useEffect, useRef, useState } from "react";
import "../styles/contacts.css"
import { LuPencil, LuTrash } from "react-icons/lu";
import { BiBlock } from "react-icons/bi";

const options = [
    {name: "Edit", icon: LuPencil, over: "normal"},
    {name: "Delete", icon: LuTrash, over: "danger"},
    {name: "Block", icon: BiBlock, over: "purple"}
]

 const contacts = [
        {
            id: 1,
            name: "Amanda Banda",
            phone: "+265 991 234 567",
            initials: "AB"
        },
        {
            id: 2,
            name: "Brian Phiri",
            phone: "+265 888 456 123",
            initials: "BP"
        },
        {
            id: 3,
            name: "Chisomo Mwale",
            phone: "+265 999 782 341",
            initials: "CM"
        },
        {
            id: 4,
            name: "Daniel Mbewe",
            phone: "+265 881 654 290",
            initials: "DM"
        },
        {
            id: 5,
            name: "Esther Nkhoma",
            phone: "+265 991 345 678",
            initials: "EN"
        },
        {
            id: 6,
            name: "Grace Zimba",
            phone: "+265 888 901 234",
            initials: "GZ"
        },
        {
            id: 7,
            name: "James Chirwa",
            phone: "+265 999 567 890",
            initials: "JC"
        },
        {
            id: 8,
            name: "Linda Kumwenda",
            phone: "+265 881 234 567",
            initials: "LK"
        }
    ];


export default function ContactsList() {
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

    return (
        <div className="contacts-list">

            {contacts.map((contact) => (

                <div
                    className="contact"
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
