// dp[] 动态规划
let climbStairs = function(n) {
    let dp = [1, 2];
    for (let i = 2; i < n; i++) {
        // 重叠子问题
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n - 1];
};