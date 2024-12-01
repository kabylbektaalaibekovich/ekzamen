import { api as index } from "..";

const TOKEN = `${process.env.NEXT_PUBLIC_TOKEN_API}`;

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTODO: build.query<TODO.getTodoResponse, TODO.getTodoRequest>({
      query: () => ({
        url: `${TOKEN}`,
        method: "GET",
      }),
      providesTags: ["api"],
    }),
    postTODO: build.mutation<TODO.postTodoResponse, TODO.postTodoRequest>({
      query: (data) => ({
        url: `${TOKEN}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    deleteTODO: build.mutation<TODO.deleteTodoResponse, TODO.deleteTodoRequest>({
      query: (_id) => ({
        url: `${TOKEN}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["api"],
    }),
    editData: build.mutation<TODO.updateTodoResponse, TODO.updateTodoRequest>({
      query: ({ _id, data }) => ({
        url: `${TOKEN}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["api"],
    })
  }),
});

export const { useGetTODOQuery, usePostTODOMutation, useDeleteTODOMutation , useEditDataMutation} = api;
