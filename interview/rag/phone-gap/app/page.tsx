"use client"

import {
  useChat
} from "@ai-sdk/react";

import ChatInput from "@/components/ChatInput";
import ChatOutput from "@/components/ChatOutPut";
export default function Page() {
  // chat llm 业务 抽离
  const {
    input,    // 输入框的值
    messages, // 消息列表
    status,   // 状态（loading, success, error）
    handleInputChange, // 输入框值改变时的回调函数
    handleSubmit   // 提交表单时的回调函数
  } = useChat()
  return (
    <main className="max-w-3xl mx-auto p-4">
       <h1 className="text-xl font-semibold mb-4">phoneGPT</h1>
       <div className="space-y-4 mb-4 max-h-[80vh] overflow-y-auto">
         <ChatOutput messages={messages} status={status} />
       </div>
       <ChatInput 
         input={input}
         handleInputChange={handleInputChange}
         handleSubmit={handleSubmit}
         />
    </main>
  );
}