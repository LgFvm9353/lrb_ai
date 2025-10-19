import type {
  CommonComponentProps
} from "../../interface";

import {useMaterialDrop} from '../../hooks/useMaterialDrop'
function Page({id,name,children}: CommonComponentProps) {

  const {canDrop,drop}= useMaterialDrop(["Button","Container"],id)
  return (
    <div 
          ref={drop}
          className="p-[20px] h-[100%] box-border">
      {children}
    </div>
  )
}
export default Page;