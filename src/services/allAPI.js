import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";


//1 upload a video api call - post- reqBody

export const uploadVideo = async(reqBody)=>{
    return await commonAPI("post",`${serverURL}/Videos`,reqBody)
} 

//2 get all videos
export const getAllVideos = async()=>{
    return await commonAPI("get",`${serverURL}/Videos`,'')
}

//3 get a particular video
export const getAVideo = async (id)=>{
    return await commonAPI("get",`${serverURL}/Videos/${id}`,'')
} 

//4 delete a video
export const deleteAVideo= async(id)=>{
    return await commonAPI("delete",`${serverURL}/Videos/${id}`,{})
}

//5 store watching video history to json sever
export const watchVideoHistory=async(VideoDetails)=>{
    return await commonAPI("post",`${serverURL}/history`,VideoDetails)
}

//6 get video history from server
export const getVideoHistory=async()=>{
    return await commonAPI("get",`${serverURL}/history`,"")
}

//7 add category
export const addCategory=async(reqBody)=>{
    return await commonAPI("post",`${serverURL}/categories`,reqBody)
}

//8 get category
export const getCategory=async()=>{
    return await commonAPI("get",`${serverURL}/categories`,"")
}

//9 delete catagory
export const deleteCategory=async(id)=>{
    return await commonAPI('delete',`${serverURL}/categories/${id}`,{})
}

//10 update a category
export const updateCategory=async(id,reqBody)=>{
    return await commonAPI('put',`${serverURL}/categories/${id}`,reqBody)
}
