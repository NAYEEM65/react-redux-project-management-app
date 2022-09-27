import { apiSlice } from '../api/apiSlice';

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (email) => `/projects?email=${email}`,
        }),

        addProject: builder.mutation({
            query: (data) => ({
                url: '/projects',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg);
                try {
                    const resData = await queryFulfilled;
                    // pasimistic update of projects cache
                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', arg.email, (draft) => {
                            draft.unshift(resData.data);
                        }),
                    );
                } catch (error) {}
            },
        }),

        editProject: builder.mutation({
            query: ({ id, data, email }) => ({
                url: `/projects/${id}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted({ id, data, email }, { queryFulfilled, dispatch }) {
                // optimistic update of projects cache
                const statusUpdateResult = dispatch(
                    apiSlice.util.updateQueryData('getProjects', email, (draft) => {
                        draft.forEach((project) => {
                            if (Number(project.id) === Number(id)) {
                                project.status = data.status;
                            }
                        });
                    }),
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    statusUpdateResult.undo();
                }
            },
        }),

        deleteProject: builder.mutation({
            query: ({ id, email }) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiSlice.util.updateQueryData('getProjects', arg.email, (draft) => {
                        draft.forEach((element, index) => {
                            if (Number(element.id) === Number(arg.id)) {
                                draft.splice(index, 1);
                            }
                        });
                    }),
                );
                try {
                    await queryFulfilled;
                } catch (err) {
                    response.undo();
                }
            },
        }),
    }),
});

export const {
    useAddProjectMutation,
    useGetProjectsQuery,
    useDeleteProjectMutation,
    useEditProjectMutation,
} = projectsApi;
