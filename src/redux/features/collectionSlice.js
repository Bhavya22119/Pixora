import { createSlice } from '@reduxjs/toolkit'

const savedCollection = JSON.parse(localStorage.getItem('collection')) || []

const collectionSlice = createSlice({
    name : "collection",
    initialState : {
        collection : savedCollection
    },

    reducers : {
        addCollection(state , action){
            const alreadySaved = state.collection.find((item) => {
                return item.id == action.payload.id && item.type == action.payload.type
            })

            if(!alreadySaved){
                state.collection.push(action.payload)
                localStorage.setItem('collection', JSON.stringify(state.collection))
            }
        },
        removeCollection(state , action){
            state.collection = state.collection.filter((item) => {
                return !(item.id == action.payload.id && item.type == action.payload.type)
            })

            localStorage.setItem('collection', JSON.stringify(state.collection))
        }
    }
})

export const { addCollection , removeCollection } = collectionSlice.actions

export default collectionSlice.reducer
