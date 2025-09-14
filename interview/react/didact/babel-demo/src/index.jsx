// 告诉babel编译器在转换jsx语法时，不要使用默认的React.createElement,而是使用自定义的Didact,createElement
/** @jsx Didact.createElement */
const element = (
   <div id='foo'>
      <a>bar</a>
      <b/>
   </div>
);