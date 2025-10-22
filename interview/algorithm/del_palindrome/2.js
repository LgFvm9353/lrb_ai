class WordDictionary {
    constructor() {
        this.root = {}
    }
    
    addWord(word) {
        let node = this.root
        for (let char of word) {
            if (!node[char]) node[char] = {}
            node = node[char]
        }
        node.isEnd = true
    }
    
    search(word) {
        return this.searchInNode(word, 0, this.root)
    }
    
    searchInNode(word, index, node) {
        if (index === word.length) return !!node.isEnd
        
        const char = word[index]
        
        if (char === '.') {
            // 正则表达式 . 匹配任意字符
            for (let key in node) {
                if (key !== 'isEnd' && this.searchInNode(word, index + 1, node[key])) {
                    return true
                }
            }
            return false
        } else {
            if (!node[char]) return false
            return this.searchInNode(word, index + 1, node[char])
        }
    }
}