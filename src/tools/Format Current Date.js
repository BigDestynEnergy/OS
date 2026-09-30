
export const formatCurrentDate = (date = new Date()) => {
    const todaysDate = date.toLocaleDateString("en-US", {
        day:"2-digit",
        month:"2-digit",
        year:"2-digit"
    });

    return todaysDate;
}