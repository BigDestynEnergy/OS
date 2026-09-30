import { LuDelete, LuPhoneCall, LuPlus } from "react-icons/lu";

const phonetabs = [
    { id: 1, label: "1", type: "number" },
    { id: 2, label: "2", type: "number" },
    { id: 3, label: "3", type: "number" },

    { id: 4, label: "4", type: "number" },
    { id: 5, label: "5", type: "number" },
    { id: 6, label: "6", type: "number" },

    { id: 7, label: "7", type: "number" },
    { id: 8, label: "8", type: "number" },
    { id: 9, label: "9", type: "number" },

    { id: 10, label: "*", type: "action" },
    { id: 11, label: "0", type: "number" },
    { id: 12, label: "#", type: "action" }
];

export default function PhoneKeys({ modal, setCalling, value, setValue }) {


    const addNumber = (number) => {
        setValue((previous) => previous + number);
    };

    const addPlus = () => {

        setValue((previous) => {

          
            if (previous.includes("+")) {
                return previous;
            }

            
            return "+" + previous;

        });

    };

    const options = [
        {name: "create", icon: LuPlus},
        {name:"call", icon: LuPhoneCall},
        {name:"delete", icon: LuDelete}
    ]

const manageOptions = (key) => {

    if (key === "create") {
        addPlus();
    }

    if (key === "call" && value.length >= 9) {
        setCalling(value);
        modal("calling");
    }

    if (key === "delete" && value.trim()) {
        setValue(prev => prev.slice(0, -1));
    }
};

    return (
        <div className="phone-section">

            <div className="options">
            {options.filter(opp => opp.name !== "Delete").map(opp => {
                const Icon = opp.icon;
                return(
                    <span 
                title={opp.name}
                onClick={()=>manageOptions(opp.name)}
                key={opp.name.toLowerCase()}>
                    <Icon/>
                </span>
                )
            })}

            <span
            onClick={()=>{
                if(value.length <= 9) return
                modal("add")

            }}
            >Add to contacts</span>

            {options.filter(opp => opp.name === "Delete").map(opp => (
                <span key={opp.name.toLowerCase()}
                title={opp.name}
                onClick={()=>manageOptions(opp.name)}
                >
                    <opp.icon/>
                </span>
            ))}
            </div>

            <input
                type="text"
                value={value}
                readOnly
            />

            <div className="tabs">

                {phonetabs.map((tab) => (

                    <button
                        key={tab.id}
                        onClick={() => addNumber(tab.label)}
                    >
                        {tab.label}
                    </button>

                ))}

            </div>

        </div>
    );
}
