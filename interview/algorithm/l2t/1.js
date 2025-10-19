const flatList = [
  { id: 1, parentId: null, name: 'A' },
  { id: 2, parentId: 1, name: 'B' },
  { id: 3, parentId: 1, name: 'C' },
  { id: 4, parentId: 2, name: 'D' },
  { id: 5, parentId: null, name: 'E' },
];

function listToTree(flatList) {
    const map = {};
    const tree = [];
    
    // 第一步：创建节点映射，确保每个节点都有 children 属性
    flatList.forEach(item => {
        map[item.id] = { ...item, children: [] };
    });
    
    // 第二步：构建树结构
    flatList.forEach(item => {
        const node = map[item.id];
        if (item.parentId === null) {
            // 根节点
            tree.push(node);
        } else if (map[item.parentId]) {
            // 找到父节点并添加子节点
            map[item.parentId].children.push(node);
        }
        // 如果 parentId 不存在，忽略该节点（可做其他处理）
    });
    
    return tree;
}

console.log(JSON.stringify(listToTree(flatList), null, 2));