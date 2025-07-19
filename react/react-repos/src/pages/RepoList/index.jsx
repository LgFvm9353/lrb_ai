import {
    useParams,
    useNavigate,
    Link
} from 'react-router-dom'
import {
    useEffect
} from 'react'
import {useRepos} from '@/hooks/useRepos'
import Loading from '@/components/Loading'
const RepoList = () =>{
   
    const {id} = useParams()
    const navigate = useNavigate()
    const {repos,loading,error} = useRepos(id)
    useEffect( ()=>{
        // 判断路由 
        if(!id.trim()){
            navigate('/')
            return 
        }
    },[id])
    if(loading) return<Loading />
    if(error) return (<>Error:{error}</>)
    return (
        <>
            <h2>Repositories of {id}</h2>
            {
                repos.map((repo)=>{
                   return <Link key={repo.id} to={`/users/${id}/repos/${repo.name}`}>
                        <p>{repo.name}</p>
                    </Link>
                })
            }
        </>
    )
}
export default RepoList