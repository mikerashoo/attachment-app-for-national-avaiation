const responseModifier = response => {
    try{ 
        return JSON.parse(response);
    }catch(e){
        throw e;
    }
}

export default responseModifier;