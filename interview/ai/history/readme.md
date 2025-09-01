# LLM 历史记录


## AI chat 无状态的，让大模型更好的了解对话，手动管理messages数组
  将提问好回答都 push messages 
  

## 如果messages 无线增长，tokens 开销太大 
  - tokens 是由上限的
  - 开销会越来越大 

## 平衡点
    
   最近最少使用原则 
   维护一定轮数的对话 