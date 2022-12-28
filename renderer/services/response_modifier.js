const responseModifier = response => {
    try{ 
    console.log(response)

        const jsonResponse = JSON.parse(response);
        console.log("jsonResponse : ", jsonResponse);
        
        return jsonResponse;
    }catch(e){
        throw e;
    }
}

export default responseModifier;