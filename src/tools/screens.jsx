import Home from "../screens/home"
import Messages from "../screens/messages"
import Music from "../screens/music"
import Phone from "../screens/phone"

export const screens = (state, set) => {
    return(
        <>
        {state === "home" && <Home set={set}/>}
        {state === "phone" && <Phone set={set}/>}
        {state === "messages" && <Messages/>}
        {state === "music" && <Music set={set}/>}
        </>
    )
}