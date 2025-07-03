

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit",  async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    try {
       if(username && password)
        {
            const response = await fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            })
         const data = await response.json();
        console.log(data)
        }   
    }catch (error) {
        console.log(error)
    }

    
})

document.addEventListener("DOMContentLoaded", async () => {
    // 检测是否登录
    try {
        const response = await fetch("/checkLogin");
        const data = await response.json();
        if(data.success) {
            document.querySelector("#loginSection").style.display = "none";
        }
        else{
            document.querySelector("#loginSection").style.display = "block";
        }
    }catch (error) {
        console.log(error)
    }
})