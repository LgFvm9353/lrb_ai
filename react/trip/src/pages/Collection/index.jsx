import useImageStore from '@/store/useImageStore'
import {useEffect} from 'react'
import useTitle from '@/hooks/useTitle'
import styles from './collection.module.css'
import Waterfall from '@/components/Waterfall'
const Collection = () => {
  useTitle('Collection')
  const {images,loading,fetchImages,hasMore} = useImageStore();
  useEffect(() => {
    fetchImages();
  },[])
    return (
      <div>
         <Waterfall images={images} fetchImages={fetchImages} loading={loading}/>
      </div>
    );
  };
  export default Collection;