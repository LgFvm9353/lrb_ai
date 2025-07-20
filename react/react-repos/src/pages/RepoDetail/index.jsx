
import {useRepoDetail} from '@/hooks/useRepoDetail'
import {useEffect} from'react'
import {useParams,useNavigate} from 'react-router-dom'
import Loading from '@/components/Loading'
const RepoDetail = ()=>{
    const navigate = useNavigate()
    const {id,repoId} = useParams()
    useEffect(()=>{
        if(!id?.trim() || !repoId?.trim()){
            navigate('/')
            return
        }
    },[id,repoId])
    console.log(id,repoId)
    const {repos,loading,error} = useRepoDetail(id,repoId)
    if(loading) return <Loading />
    if(error) return <p>Error:{error}</p>
    console.log(repos)
    return(
        <div>
            <h1>{repos?.name}</h1>
            <p>{repos?.description}</p>
            <p>Stars: {repos?.stargazers_count}</p>
            <p>Forks: {repos?.forks_count}</p>
            <p>Language: {repos?.language}</p>
            <a href={repos?.html_url} target="_blank" rel="noreferrer">
                View on GitHub
            </a>
        </div>
    )
}
export default RepoDetail