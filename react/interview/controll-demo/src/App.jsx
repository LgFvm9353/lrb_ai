import { useState ,useRef} from 'react'
import './App.css'

function ControlledInput({onSubmit}) {
  const [value, setValue] = useState('') // 响应式状态
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value, '//////');
    onSubmit(value)
  }
  const handleChange = (e) => {
    setValue(e.target.value)
    // 频繁触发 实时判断表单是否合格
    if(e.target.value.length < 3) {
      setError('输入的内容不能少于3个字符')
    }else setError('') // 清空错误信息 即nul
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="controlled-input">受控组件</label>
      <input 
        type="text" 
        value={value}
        // onChange={(e) => setValue(e.target.value)}
        onChange={handleChange}
        required
      />
      {error && <p>{error}</p>}
      <input type="submit" value="提交" />
    </form>
  )
}

function UncontrolledRef({onSubmit}) {
  const inputRef = useRef(null) // 非响应式状态
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputRef.current.value);
    onSubmit(inputRef.current.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="uncontrolled-input">非受控组件</label>
      <input
        type="text"
        id='uncontrolled-input'
        ref={inputRef}
      />
      <input type="submit" value="提交" />
    </form>
  )

}

function App() {
  const handleSubmit = (value) => {
    console.log(value, '??????????')
  }

  return (
    <>
      <ControlledInput onSubmit={handleSubmit}/>
      <UncontrolledRef onSubmit={handleSubmit}/>
    </>
  )
}

export default App