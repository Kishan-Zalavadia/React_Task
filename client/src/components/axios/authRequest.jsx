import { useNavigate } from "react-router-dom";
import axios from "axios";

export default async function login(payload){
    const navigate = useNavigate();
    try{
        const result = await axios.post("http://localhost:3000/login",payload)
        if (result.status == 200) {
            localStorage.setItem("accesstoken", result.headers.accesstoken);
            navigate("/user/card");
        }
    }catch(error){
        console.log(error);
    }
}

export async function axiosReq(reqType,endPoint,payload) {
    switch(reqType){
        case "get":
            try{
                const response = await axios.get(`http://localhost:3000/`+endPoint,{
                    headers:{
                        accesstoken:localStorage.getItem("accesstoken")
                    }
                })
                if(response.status == 200){
                    return response
                }  
            }catch(error)
            {
                if(error.status == 401) return "you need to log in first"
            }
            break;
        case "post":
            try{
                const response = await axios.post(`http://localhost:3000/`+endPoint,{
                    payload,
                    headers:{
                        accesstoken:localStorage.getItem("accesstoken")
                    }
                }) 
                if(response.status == 201){
                    return response
                }
            }catch(error){
                if(error.status == 500) return "server side error"
            }
    }
    
}

export async function axiosPageReq(endPoint,payload) {
    
}