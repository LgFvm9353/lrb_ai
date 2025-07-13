import { useEffect } from "react"
import { useParams,useSearchParams } from "react-router-dom"
const UserProfile = ()=>{
    const {id} = useParams()
    useEffect(()=>{
        console.log(id) // 打印出id
    },[])
    return (
        <>
        UserProfile
        </>
    )
}
export default UserProfile