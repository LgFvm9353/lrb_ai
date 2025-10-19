import type {CommonComponentProps} from '../../interface'

import {useMaterialDrop} from '../../hooks/useMaterialDrop'
const Container = ({id,name,children}:CommonComponentProps) =>{
   
    const {canDrop,drop} = useMaterialDrop(["Button","Container"],id)
    return (
        <div 
           ref={drop}
           className="border-[1px] border-[#000] min-h-[100px] p-[200px]">
             {children}
        </div>
    )
}

export default Container