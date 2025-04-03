 
export const debounce = (callback,delay) => {
    let clearTimeoutId ;
    return(...args) => {
        if(clearTimeoutId){
            clearTimeout(clearTimeoutId)
        }
        setTimeout(()=>{
            clearTimeoutId =  callback(...args)
        },delay)
    }
}