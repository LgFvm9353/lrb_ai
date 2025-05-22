# 机器学习
- notebook: 记录学习过程中遇到的问题和解决方法。
  你不知道的JavaScript 深入学习
  AI 博客

- modelscope
  阿里开源大模型社区
- python notebook
  ipynb 后缀
  nlp 机器学习文档格式

- python 
  nlp 第一语言
  js 也挺好的

- 引入了pipeline 模块
  model中国第一大模型社区
  魔搭
  from modelscope.pipelines import pipeline
  from modelscope.utils.constant import Tasks
  semantic_cls = pipeline(Tasks.text_classification, model='damo/nlp_text-classification_tiny-bert_base')
  打分 label分类
  result = semantic_cls('遥遥领先')
  print(result)
