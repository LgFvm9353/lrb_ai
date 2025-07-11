import { useContext } from "react"
import { ThemeContext } from "../../ThemeContext"
const Child = ()=>{
    const theme = useContext(ThemeContext)
    return (
      <>
        Child {theme}
      </>
    )
    
}
export default Child