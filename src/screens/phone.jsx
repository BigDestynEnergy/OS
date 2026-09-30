import { LuChevronLeft, LuContact, LuPhone } from "react-icons/lu";
import "../styles/phone.css"
import { useState } from "react";
import PhoneKeys from "../blocks/keys";
import ContactsList from "../blocks/contacts";

const tabs = [
    {name: "Phone", icon: LuPhone},
    {name: "Contacts", icon: LuContact}
]

export default function Phone({set}){
    const [activePage, setActivePage] = useState(0);
    const returner = () => set("home");
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
          
          {activePage === 0 && (<PhoneKeys/>)}
          {activePage === 1 && (<ContactsList/>)}
        </section>
    )
}