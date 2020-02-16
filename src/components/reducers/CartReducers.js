import Axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-type/CartActions'

const initState =   { 
        Product: [
            {
                id: 1,
                name: 'rohan',
                price : 1000
            }
        ],
        addedItems:[],
        Total: 0
     }
    
     // eslint-disable-next-line no-undef
     getProduct=()=>{
        Axios.get("http://localhost:8080/api/v1/product/")
        .then(res => {
            const product = res.data.result
            this.setState({product})
            console.log(product)
        })
     }

     


const CartActions = (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addItem = state.Product.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addItem.price 
                  }
        }
         else{
            addItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}
 
export default connect(CartActions);