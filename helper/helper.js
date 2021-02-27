import {apiDomain} from '../config'
export const formatImageString =(str)=>{
    const formattedString = str.split('/');
    let result = apiDomain.replace("api",formattedString[formattedString.length-1]);
    console.log("Formatted String",result)
    return result 
}