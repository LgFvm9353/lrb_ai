import useTitle from '@/hooks/useTitle'
import {
  useState,
  useEffect
} from 'react'
import {chat,kimiChat} from '@/llm'
import styles from './trip.module.css';
import {
  Button,
  Input,
  Loading,
  Toast
}from 'react-vant'

import {
  ChatO,
  UserO 
}from '@react-vant/icons'

const Trip = () => {
  // useEffect(()=>{
  //    const fetchChat = async()=>{
  //     const res = await chat([
  //       {
  //         role: 'user',
  //         message:'重庆旅游推荐'
  //       }
  //     ])
  //     console.log(res)
  //    }
  //    fetchChat()
  // },[])
  useTitle('旅游智能客服')
  const [text,setText] = useState('')
  const [isSending,setIsSending] = useState(false)
  // 数据驱动界面
  // 静态
  const [messages,setMessages] = useState([
    {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    },

    {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    },
    {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    },
    {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }
    , {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    {
      id: 1,
      content: 'hello I am your assistant',
      role: 'assistant'
    }, {
      id:2,
      content: 'hello world',
      role: 'user'
    },
    // {
    //   id: 1,
    //   content: 'hello I am your assistant',
    //   role: 'assistant'
    // },
    // {
    //   id:2,
    //   content: 'hello world',
    //   role: 'user'
    // },
    // {
    //   id: 1,
    //   content: 'hello I am your assistant',
    //   role: 'assistant'
    // },
    // {
    //   id:2,
    //   content: 'hello world',
    //   role: 'user'
    // },
    // {
    //   id: 1,
    //   content: 'hello I am your assistant',
    //   role: 'assistant'
    // },
    // {
    //   id:2,
    //   content: 'hello world',
    //   role: 'user'
    // },
    // {
    //   id: 1,
    //   content: 'hello I am your assistant',
    //   role: 'assistant'
    // },
    // {
    //   id:2,
    //   content: 'hello world',
    //   role: 'user'
    // },
    // {
    //   id: 1,
    //   content: 'hello I am your assistant',
    //   role: 'assistant'
    // },
    // {
    //   id:2,
    //   content: 'hello world',
    //   role: 'user'
    // },
    // {
    //   id: 1,
    //   content: 'hello I am your assistant',
    //   role: 'assistant'
    // }

  ])
  const handleChat = async()=>{
    if (text.trim() === "") {
      Toast.info({
          message: '内容不能为空'
      })
      return 
  }
    setIsSending(true)
    setText("")
    setMessages(prev=>([
      ...prev,
      {
        role:'user',
        content: text
      }
    ]))
    const newMessage = await chat([
      {
        role:'user',
        message: text
      }
    ])
    setMessages(prev=>([
      ...prev,
      newMessage.data 
  ]))
    setIsSending(false)
  }
 
    return (
      <div className='flex flex-col h-all'>
        <div className={`flex-1 ${styles.chatArea}`}>
            {
                messages.map((msg, index) => (
                  <div 
                      key={index}
                      className={
                          msg.role === 'user'? 
                          styles.messageRight :
                          styles.messageLeft
                      }
                  >
                      {
                          msg.role === 'assistant'?
                          <ChatO />:
                          <UserO/>
                      }
                      {msg.content}
                  </div>
              ))
            }
        </div>
        <div className={`flex ${styles.inputArea}`}>
             <Input type="text"
                  value={text}
                  onChange={(val)=>setText(val)}
                  placeholder='请输入消息'
                  className={`flex-1 ${styles.input}`}
            />
            <Button type='primary' 
                    onClick={handleChat} 
                    text="发送"
                    disabled={isSending}/>
        </div>
        {isSending && 
          <div className='fixed-loading'>
            <Loading type='ball'/>
          </div>
        }
      </div>
    );
  };
  export default Trip;