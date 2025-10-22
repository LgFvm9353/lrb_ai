const wordDictionary = function(){

    // 初始化一个对象，承担map的角色
    this.words = {}
    wordDictionary.prototype.addWord = function(word){
        if(this.words[word.length]) {
            this.words[word.length].push(word)
        } else {
            this.words[word.length] = [word]
        }
    }
}
wordDictionary.prototype.search = function(word){
    if(!this.words[word.length]) return false
    const len = word.length
    if(!word.includes('.'))
    {
        return this.words[len].includes(word)
    }
    const reg = new RegExp(word)
    return this.words[len].some(w => reg.test(w))
}