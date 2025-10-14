import supabase from './lib/supabaseClient.mjs'

// Backend as a Service (api)
// 异步 
const {err} = await supabase.from("todos").insert({
    title: "从0-1开发应用",
    is_complete: false
})
console.log(err)