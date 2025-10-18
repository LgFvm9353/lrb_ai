// 编辑区域的数据由store管理
import { create } from 'zustand';
// parentId + children 可以构建出一个树结构
export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[]
}
// store 主要提供 State & Actions 

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
}
// 交叉类型
export const useComponentsStore = create<State & Action>(
  (
    (set, get) => ({
        components: [
          {
            id: 1,
            name: 'Page',
            props: {},
            desc: '页面'
          }
        ],
        addComponent: (component, parentId) => set((state) => {
          if (parentId) {
            const parentComponent = getComponentById(
              parentId,
              state.components
            );
            // 如果父组件存在，将子组件添加到父组件的children中
            if (parentComponent) {
              if (parentComponent.children) {
                parentComponent.children.push(component);
              } else {
                parentComponent.children = [component];
              }
            }
            component.parentId = parentId;
            return {
              components: [...state.components]
            }
          }
          // 如果没有父组件，将子组件添加到根组件中
          return {
            components: [...state.components, component]
          }
        }),
        deleteComponent: (componentId) => {
          if (!componentId) return;
          const component = getComponentById(componentId, get().components);
          // 从父组件的children中移除
          if (component?.parentId) {
            const parentComponent = getComponentById(
              component.parentId,
              get().components
            );
            if (parentComponent) {
              parentComponent.children = parentComponent?.children?.filter(
                (c) => c.id !== componentId
              );
              set({
                components: [...get().components]
              })
            }
          }
        },
        updateComponentProps: (componentId, props) => set((state) => ({
            components: state.components.map(comp => 
                comp.id === componentId ? { ...comp, props } : comp
            )
        }))
    })
  )
)
// 递归查找组件
export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for(const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}