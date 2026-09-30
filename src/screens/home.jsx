import {
    LuMessageCircle,
    LuMusic,
    LuPhone,
    LuSettings,
    LuStore,
    LuWifi,
    LuSignal,
    LuBatteryFull,
    LuBatteryCharging,
    LuLockKeyhole,
    LuCloudSun,
    LuSearch,
    LuCamera,
    LuClock3
} from "react-icons/lu";

import { useEffect, useState } from "react";
import "../styles/home.css";

export default function Home({ set }) {

    const apps = [
        { name: "Phone", icon: LuPhone },
        { name: "Messages", icon: LuMessageCircle },
        { name: "Music", icon: LuMusic },
        { name: "Settings", icon: LuSettings },
        { name: "Riot Store", icon: LuStore }
    ];

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const clock = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(clock);
    }, []);

    const manage = (name) => {
        set(name);
    };

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const formattedDate = time.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric"
    });

    return (
        <section className="home page">

         
            <header className="home-topbar">

                <div className="status-left">

                    <div className="network">
                        <LuWifi />
                        <div>
                            <strong>Riot Wi-Fi</strong>
                            <small>Connected</small>
                        </div>
                    </div>

                    <div className="signal">
                        <LuSignal />
                    </div>

                </div>

                <div className="status-right">

                    <div className="battery">
                        <LuBatteryFull />
                        <span>98%</span>
                    </div>

                    <div className="security">
                        <LuLockKeyhole />
                    </div>

                </div>

            </header>


           
            <section className="clock-card">

                <div className="clock-icon">
                    <LuClock3 />
                </div>

                <div>
                    <h1>{formattedTime}</h1>
                    <p>{formattedDate}</p>
                </div>

            </section>


           
            <section className="quick-info">

                <div className="info-card">

                    <div className="info-icon">
                        <LuCloudSun />
                    </div>

                    <div>
                        <small>Today</small>
                        <strong>Clear skies</strong>
                    </div>

                    <span className="temperature">
                        24°
                    </span>

                </div>


                <div className="info-card">

                    <div className="info-icon">
                        <LuBatteryCharging />
                    </div>

                    <div>
                        <small>Battery Health</small>
                        <strong>Excellent</strong>
                    </div>

                    <span className="health">
                        98%
                    </span>

                </div>

            </section>


            
            <div className="home-search">

                <LuSearch />

                <span>Search Riot</span>

            </div>


          
            <section className="apps">

                {apps.map(app => {

                    const Icon = app.icon;

                    return (
                        <div
                            className="app"
                            onClick={() => manage(app.name.toLowerCase())}
                            key={app.name.toLowerCase()}
                        >

                            <div className="app-icon">
                                <Icon />
                            </div>

                            <span>{app.name}</span>

                        </div>
                    );
                })}

            </section>


            
            <footer className="home-dock">

                <div className="dock-item">
                    <LuPhone onClick={()=>manage("phone")}/>
                </div>

                <div className="dock-item" onClick={()=>manage("messages")}>
                    <LuMessageCircle />
                </div>

                <div className="dock-item dock-camera" onClick={()=>manage("camera")}>
                    <LuCamera />
                </div>

                <div className="dock-item" onClick={()=>manage("music")}>
                    <LuMusic />
                </div>

            </footer>

        </section>
    );
}