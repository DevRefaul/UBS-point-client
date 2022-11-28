
const handleUpdateProductBooking = async (id, available) => {
    const res = await fetch(" https://ubs-point-server-side.vercel.app/updateProductBooking", {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: `bearer ${localStorage.getItem("accessToken")}` },
        body: JSON.stringify({ id, available }),
    });
    const bookedInfo = await res.json();
    return bookedInfo;
};

export default handleUpdateProductBooking