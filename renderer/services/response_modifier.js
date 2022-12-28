const errorCss = "color:white; background:red"
const successCss = "color:white; background: green"
const responseModifier = response => {
    try{ 

        const jsonResponse = JSON.parse(response); 
        console.log("%c Success response:", successCss, jsonResponse)
        
        return jsonResponse;
    }catch(e){
        console.log("%c Error response: ", errorCss, response)
         

        throw e;
    }
}

export default responseModifier;