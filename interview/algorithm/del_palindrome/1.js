function validPalindrome(s) {
    let left = 0
    let right = s.length - 1
    
    const isPal = (s, i, j) => {
        while(i < j) {
            if(s[i] !== s[j]) {
                return false
            }
            i++
            j--
        }
        return true
    }
    
    while(left < right) {
        if(s[left] === s[right]) {
            left++
            right--
        } else {
            return isPal(s, left+1, right) || isPal(s, left, right-1)
        }
    }
    
    return true  
}

console.log(validPalindrome('abca'))  // true
console.log(validPalindrome('aba'))   // true
console.log(validPalindrome('abc'))   // false
