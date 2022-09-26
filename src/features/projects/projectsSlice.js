const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    searchedText: '',
};

const projectsSlice = createSlice({
    name: 'searched',
    initialState,
    reducers: {
        searchProject: (state, action) => {
            state.searchedText = action.payload;
        },
    },
});

export default projectsSlice.reducer;
export const { searchProject } = projectsSlice.actions;
