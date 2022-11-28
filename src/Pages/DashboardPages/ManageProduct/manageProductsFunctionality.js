
// function for promote btn
// this will let the post be promoted in home page;
export const promote = async (id) => {

    const res = await fetch(` https://ubs-point-server-side.vercel.app/promotepost`, {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: `bearer ${localStorage.getItem("accessToken")}` },
        body: JSON.stringify({ id })
    })
    const promoteResponse = await res.json()
    return promoteResponse
}


export const deletePost = async (id) => {
    const res = await fetch(` https://ubs-point-server-side.vercel.app/deletesellerpost/${id}`, {
        method: "DELETE",
        headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` }
    })
    const deleteResponse = await res.json()
    return deleteResponse
}


export const updateProductAvailability = async (id, available) => {
    const res = await fetch(` https://ubs-point-server-side.vercel.app/updateProductAvalablity`, {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: `bearer ${localStorage.getItem("accessToken")}` },
        body: JSON.stringify({ id, available })
    })
    const updateProductResponse = await res.json()
    console.log(updateProductResponse)
    return updateProductResponse
}