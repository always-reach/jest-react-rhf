

export async function LoginAPI(data:any):Promise<Response>{
    const response = await fetch("http://localhost:8000/api/login",{
        method: "POST",
        mode:'cors',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })

    return response
}