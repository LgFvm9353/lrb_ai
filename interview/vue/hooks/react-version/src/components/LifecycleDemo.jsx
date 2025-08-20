import {Component} from 'react'
import Child from './Child'
class LifecycleDemo extends Component
{

    constructor (props)
    {
        super(props)
        this.state = {
            count : 0
        }
    }

    doIncrement(){
      this.setState({
        count : this.state.count + 1
      })
    }

    componentDidMount(){
        console.log('组件挂载了')

    }

    componentDidUpdate(){
        console.log('组件更新了')
    }

    componentWillUnmount(){
        console.log('组件要卸载了')

    }

    // 状态，生命周期
    // 早期是有函数组件的，只是只负责渲染部分
    render(){
        
        return (
            <>
                <h1>LifecycleDemo</h1>
                <p>当前计数：{this.state.count}</p>
                <button onClick={this.doIncrement}>+1</button>
                <Child title="hello child" />
            </>
        );
    }

}

export default LifecycleDemo
