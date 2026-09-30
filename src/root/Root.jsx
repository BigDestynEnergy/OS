import { useState } from "react";
import { screens } from "../tools/screens";

export default function Root(){
    const [activeApp, setActiveApp] = useState("phone");

    return(
        <main>
            {screens(activeApp, setActiveApp)}
        </main>
    )
}