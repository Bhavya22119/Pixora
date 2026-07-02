import {createSlice} from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name : "search",
    initialState : {
        query : '',
        activeTab : 'All',
        results : [],
        loading : false,
        error : null 
    },

    reducers : {
        setQuery(state , action){
            state.query = action.payload;
            state.activeTab = 'All';
        },
        setActiveTabs(state , action){
            state.activeTab = action.payload;
        },
        setResults(state , action){
            state.results = action.payload;
            state.loading = false;
            state.error = null;
        },
        appendResults(state , action){
            action.payload.forEach((newItem) => {
                const alreadyAdded = state.results.find((item) => {
                    return item.id == newItem.id && item.type == newItem.type
                })

                if(!alreadyAdded){
                    state.results.push(newItem)
                }
            })

            state.loading = false;
            state.error = null;
        },
        setLoading(state , action){
            state.loading = true;
            state.error = null;
        },
        setError(state , action){
            state.error = action.payload;
            state.loading = false;
        },
        clearResults(state){
            state.results = [];
            state.loading = false;
            state.error = null;
        }
    }
})

export const { setQuery , setActiveTabs , setResults , appendResults , setLoading , setError , clearResults} = searchSlice.actions

export default searchSlice.reducer;
