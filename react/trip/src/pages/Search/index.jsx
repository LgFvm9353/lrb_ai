import SearchBox from "@/components/SearchBox";
import { useCallback } from "react";
import useSearchStore from "@/store/useSearchStore";
import styles from "./search.module.css";
import { useState,useEffect,memo } from "react";

const HotListItems = memo(({hotList})=>{
  // console.log(hotList);
  return (
    <div className={styles.hot}>
    {
      hotList.map(item => (
        <div key={item.id} className={styles.item}>
            {item.city}
        </div>
    ))
    }
    </div>
  )
   
})
const Search = () => {
  const [query, setQuery] = useState("");
  const {
    suggestList,
    hotList,
    setSuggestList,
    setHotList,
  } = useSearchStore();
  useEffect(() => {
    // 与api交互
    setHotList();
  },[])
  // 单项数据流 
  // 反复生成 useCallback
  const handleQuery =  (query) => {
    // 与api交互
    setQuery(query);
    if(!query) return 
     setSuggestList(query);
  }
  const suggestListStyle = query !== '' ? {display: 'block'} : {display: 'none'};
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <SearchBox handleQuery={useCallback(handleQuery)} />
          {/* 维护性更好 */}
          <HotListItems hotList={hotList}/>
          <div className={styles.list} style={suggestListStyle}>
              {
                 suggestList.map((item, index) => (
                  <div key={index} className={styles.item}>
                    {typeof item === 'object' ? item.title : item}
                  </div>
                ))
              }
          </div>
        </div>
      </div>
    );
  };
  export default Search;