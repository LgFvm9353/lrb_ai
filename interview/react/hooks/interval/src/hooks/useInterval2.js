function useInterval2(callback,delay){
   const id = setInterval(callback,delay)
   return () => clearInterval(id)
}

export default useInterval2