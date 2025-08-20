import {
    NextResponse
} from 'next/server'

export async function GET(){
    try{
        const response = await fetch('https://api.github.com/users/LgFvm9353/repos');
        const data = await response.json()
        return NextResponse.json({
             repos: data
        })

    }
    catch(err){
        return NextResponse.json({
            err
        },{
            status: 500
        })
    }

}
