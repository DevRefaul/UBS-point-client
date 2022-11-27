
// function for promote btn
// this will let the post be promoted in home page;
export const promote = async (id) => {

    const res = await fetch(`http://localhost:5000/promotepost`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id })
    })
    const promoteResponse = await res.json()
    console.log(promoteResponse)
    return promoteResponse
}


export const deletePost = async (id) => {
    const res = await fetch(`http://localhost:5000/deletesellerpost/${id}`, {
        method: "DELETE"
    })
    const promoteResponse = await res.json()
    console.log(promoteResponse)
    return promoteResponse
}


