import {commonrequest} from './commonrequest'
import  {base_url}  from './baseurl'

// add video
export const addVideo = async(body)=>{
    return await commonrequest("POST",`${base_url}/videos`,body)
}
// get videos
export const getVideos = async()=>{
   return await commonrequest("GET",`${base_url}/videos`)
}
// delete videos
export const deleteVideos = async(id)=>{
    return await commonrequest("DELETE",`${base_url}/videos/${id}`)
 }
 // add category
export const addcategory = async(body)=>{
    return await commonrequest("POST",`${base_url}/categories`,body)
 }
//  get all category
export const getallcategory =async()=>{
    return await commonrequest("GET",`${base_url}/categories`)
}
// delete categories
export const deletecategories= async(id)=>{
    return await commonrequest("DELETE",`${base_url}/categories/${id}`)
 }

//  get history
export const gethistory =async()=>{
    return await commonrequest("GET",`${base_url}/watchHistory`)
}

// add history
export const addhistory = async(body)=>{
    return await commonrequest("POST",`${base_url}/watchHistory`,body)
 }

// get single video
export const getsinglevideo =async(id)=>{
    return await commonrequest("GET",`${base_url}/videos/${id}`,"")
}

// Update category
export const updateCategory =async(id,body)=>{
    return await commonrequest("PUT",`${base_url}/categories/${id}`,body)
}