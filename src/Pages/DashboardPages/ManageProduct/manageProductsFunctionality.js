
// function for promote btn
// this will let the post be promoted in home page;
export const promote = async (id) => {

    const res = await fetch(`http://localhost:5000/promotepost`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id })
    })
    const promoteResponse = await res.json()
    return promoteResponse
}


export const deletePost = async (id) => {
    const res = await fetch(`http://localhost:5000/deletesellerpost/${id}`, {
        method: "DELETE"
    })
    const deleteResponse = await res.json()
    return deleteResponse
}


export const updateProductAvailability = async (id, available) => {
    const res = await fetch(`http://localhost:5000/updateProductAvalablity`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, available })
    })
    const updateProductResponse = await res.json()
    console.log(updateProductResponse)
    return updateProductResponse
}