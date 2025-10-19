import { create } from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';
import Page from '../materials/Page';
export interface ComponentConfig {
  name: string;
  // 对象的类型
  // Record<string, any> 是 TypeScript 中的一个工具类型，它表示一个对象，其所有属性的键都是字符串类型，而属性的值可以是任意类型（any）。
  defaultProps: Record<string, any>;
  component: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig}
}

interface Action {
  registerComponent: (name: string, 
    componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) =>({
  componentConfig: {
    Page: {
      name: 'Page',
      defaultProps: {},
      component: Page
    },
    Container: {
      name: 'Container',
      defaultProps: {},
      component: Container
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      component: Button
    }
  },
  registerComponent:(name,componentConfig)=>set((state)=>{
     return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig
        }
     }
  })
}))