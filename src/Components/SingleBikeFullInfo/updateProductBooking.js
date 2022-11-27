
const handleUpdateProductBooking = async (id, available) => {
    const res = await fetch("http://localhost:5000/updateProductBooking", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, available }),
    });
    const bookedInfo = await res.json();
    return bookedInfo;
};

export default handleUpdateProductBooking