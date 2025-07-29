import { useEffect } from "react";
function useTitle(title){
       // 设置标题
       document.title=title;
}
export default useTitle;