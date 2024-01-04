//to add the item
export const ADD = (item)=>{
    return{
        type:"ADD_CART",
        payload:item
    }
}
//to delete or remove the item
export const DELETE = (id)=>{
    return{
        type:"REMOVE_CART",
        payload:id
    }
}

//decrement the item
export const RMV = (item)=>{
    return{
        type:"RMV_ONE",
        payload:item
    }
}