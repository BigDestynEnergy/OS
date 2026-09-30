import { LuChevronLeft, LuContact, LuPhone } from "react-icons/lu";
import "../styles/phone.css"
import { useState } from "react";
import PhoneKeys from "../blocks/keys";
import ContactsList from "../blocks/contacts";
import AddNewContact from "../blocks/contact form";
import Calling from "../blocks/calling";

const tabs = [
    {name: "Phone", icon: LuPhone},
    {name: "Contacts", icon: LuContact}
]

export default function Phone({set}){
    const [value, setValue] = useState("");
    const [contacts, setContacts] = useState(()=>{
        const saved = localStorage.getItem("contacts");
        return saved ? JSON.parse(saved) : [];
    })
    const [openModal, setOpenModal] = useState("");
    const [activePage, setActivePage] = useState(0);
    const [calling,setCalling] = useState(null);
    const returner = () => set("home");

    const createContact = (newContact) => {
        setContacts((prev) => {
            const updatedContacts = [...prev, newContact];
            localStorage.setItem("contacts", JSON.stringify(updatedContacts));

            return updatedContacts
        })
    }

    const removeContact = (id) => {
        setContacts((prev) => {
            const updatedContacts = prev.filter(con => con.id !== id);

            localStorage.setItem("contacts", JSON.stringify(updatedContacts));

            return updatedContacts
        })
    }

    const blockContact = (id) => {
        setContacts((prev) => {
            const updatedContacts = prev.map(contact => 
                contact.id === id 
                ? {...contact, blocked: true}
                : contact
            );

            localStorage.setItem("contacts", JSON.stringify(updatedContacts))
            return updatedContacts
        })
    }


    return(
        <section className="phone page">

            <div className="header">
                <span className="return" onClick={returner}>
                    <LuChevronLeft/>
                </span>
                <div className="items">
                  {tabs.map((tab, index) => (
                    <div className={activePage === index ? "item active" : "item"} key={index}
                    onClick={()=>setActivePage(index)}
                    >
                        <span>{tab.name}</span>
                        <tab.icon/>
                    </div>
                  ))}
                </div>

                <div className="dot"></div>
            </div>
          
          {activePage === 0 && (
            <PhoneKeys
            value={value}
            setValue={setValue}
          setCalling={setCalling}
          modal={setOpenModal}/>)}


          {activePage === 1 && 
          (<ContactsList 
          blockContact={blockContact}
          contacts={contacts} removeContact={removeContact}/>)}

         {openModal === "add" && (<AddNewContact createContact={createContact} number={value} modal={setOpenModal}/>)}
         {openModal === "calling" && <Calling contact={calling} modal={setOpenModal}/>}
        </section>
    )
}