const responseModifier = response => {
    try{ 
        console.log("response : ", response);
        
        return JSON.parse(response);
    }catch(e){
        throw e;
    }
}

export default responseModifier;