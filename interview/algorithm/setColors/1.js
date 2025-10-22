// 颜色分类排序 原地

function sortColors(nums){
    let left = 0
    let right = nums.length -1
    let i =0 
    while(i <= right)
    {
        if(nums[i] === 0)
        {
            [nums[i],nums[left]] = [nums[left],nums[i]]
            left++
            i++
        }
        else if(nums[i] === 2)
        {
            [nums[i],nums[right]] = [nums[right],nums[i]]
            right--
        }
        else
        {
            i++
        }
    }
}
const nums = [2,0,2,1,1,0]
sortColors(nums)
console.log(nums)