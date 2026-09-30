import { LuChevronLeft, LuCircle, LuMenu, LuSquare } from "react-icons/lu";

export default function Dock({set, app}){
    const docks = [
        {name:"tabs", icon: LuMenu},
        {name:"home", icon: LuCircle},
        {name:"back", icon: LuChevronLeft}
    ]

    const manage = (state) => {
       if(state === "back" && app === "home") return;
       if(state === "back" && app !== "home"){
        set("home");
       };

       if(state === "home" && app === "home") return;
        if(state === "home" && app !== "home"){
        set("home");
       };

    }

    return(
        <div className="dock-page">
            {docks.map(dock => (
                <div className="dock-item"
                onClick={()=>manage(dock.name)}
                key={dock.name}>
                    <dock.icon/>
                </div>
            ))}
        </div>
    )
}