import { LuMessageCircle, LuMusic, LuPhone, LuSettings, LuStore } from "react-icons/lu";

export default function Home({set}){
    const apps = [
        {name:"Phone", icon: LuPhone},
        {name:"Messages", icon: LuMessageCircle},
        {name:"Music", icon: LuMusic},
        {name: "Settings", icon: LuSettings},
        {name:"Riot Store", icon: LuStore}
    ]

    const manage = (name) => {
        set(name)
    }

    return(
        <section className="home page">
            {apps.map(app => (
                <div className="app"
                onClick={()=>manage(app.name.toLowerCase())}
                key={app.name.toLowerCase()}>
                    <app.icon/>
                    <span>{app.name}</span>
                </div>
            ))}
        </section>
    )
}