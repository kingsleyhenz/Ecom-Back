export const ObtainToken = req =>{
    const headerInfo = req.headers.authorization;
    if(headerInfo || !headerInfo.startswith("Bearer ")){
        throw new Error("Invalid Token")
    }else{
        const token = headerInfo.split(" ")[1]
        return token;
    }
}