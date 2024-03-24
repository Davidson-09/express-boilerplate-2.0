// this is where miscellaneous helper functions are defined

export const assert =(condition:boolean, message: string)=>{
    if (!condition){
        throw new Error(message)
    }
}