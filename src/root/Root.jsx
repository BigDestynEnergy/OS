import { useState } from "react";
import { screens } from "../tools/screens";

export default function Root(){
    const [activeApp, setActiveApp] = useState("home");

    return(
        <main>
            {screens(activeApp, setActiveApp)}
        </main>
    )
}