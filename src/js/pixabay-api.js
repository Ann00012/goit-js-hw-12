import axios from "axios"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const API="52799161-b762ef396431272d847d94f09";
const BASE_URL="https://pixabay.com/api/";

export async function getImagesByQuery(query, page=1){
   try{
       const response= await axios.get(BASE_URL,{
        params:{
            key:API,
            q:query,
            image_type: "photo",
            orientation:"horizontal",
            safesearch:true,
            page:page,
            per_page:16
        }
    });
    return response;
   }catch(error){
    throw error;
   }
}