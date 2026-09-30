import { useState } from "react"
import "../styles/contact-form.css"
import { validateContact } from "../tools/validate";
import { LuX } from "react-icons/lu";


export default function AddNewContact({number, createContact, modal}){
    const [form, setForm] = useState({
        name:"",
        contact: number
    })
    const [errors, setErrors] = useState({});

    const manageForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]:value
        }))
    }

    const submitForm = (e) => {
        e.preventDefault();

        const validateFields = validateContact(form);

        setErrors(validateFields);

        if(Object.keys(validateFields).length === 0){
            console.log("Contact created.");
             createContact({
                name: form.name,
                contact: form.contact,
                initials: `${(form.name.charAt(0))}`,
                id: crypto.randomUUID(),
                blocked: false
            })

            modal("");
        }

        

        
    }
    return(
       <div className="form">
         <form onSubmit={submitForm}>
            <span className="close"
            onClick={()=>modal("")}
            >
                <LuX/>
            </span>
            <h3>Create Contact</h3>
            <div className="group">
                <label htmlFor="name">Name</label>
            <input type="text" 
            value={form.name}
            onChange={(e)=>manageForm("name", e.target.value)}
            placeholder="Enter contacts name" />
            {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="group">
                <label htmlFor="number">Number</label>
                <input type="text" placeholder={form.contact}
                onChange={(e)=>manageForm("contact", e.target.value)}
                value={form.contact} />
                {errors.contact && <small>{errors.contact}</small>}
            </div>

            <button type="submit">Save Contact</button>
        </form>
       </div>
    )
}