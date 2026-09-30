export const formatCurrentTime = (date = new Date()) => {
    const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute:"2-digit"
    });

    return time;
}