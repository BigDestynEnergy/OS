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

export default function PhoneKeys(){
    return(
          <div className="phone-section">
                <input type="text"  readOnly/>
                <div className="tabs">
                    {phonetabs.map(tab => (
                        <button
                        key={tab.id}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
    )
}