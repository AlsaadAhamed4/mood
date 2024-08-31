const createURL = (path : string) =>{
    return  window.location.origin + path
}

export const updateEntry =async(id, content)=>{
    const res = await fetch(new Request(createURL(`/api/journal/${id}`),{
        method : 'PATCH',
        body : JSON.stringify({content})  // we need to do stringfy
    }))
    if(res.ok){ // non 400 or  500
        const data = await res.json();
        return data.data
    }
}

export const createNewEntry =async()=>{
    const res = await fetch(new Request(createURL('/api/journal'),{
        method : 'POST',
    }))
    if(res.ok){
        const data = await res.json();
        return data.data
    }
}


