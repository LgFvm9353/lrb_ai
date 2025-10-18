import {
  Children,
  useEffect
} from 'react';
import {
  useComponentsStore
}from '../../stores/components'
export function EditArea() {
  const {components,addComponent,deleteComponent} = useComponentsStore()
  useEffect(()=>{
     addComponent({
      id: 2,
      name: 'container',
      props: {},
      children: []
     },1)
  },[])


  return (
    <div>
      <pre>
        {JSON.stringify(components, null, 2)}
      </pre>
    </div>
  )
}