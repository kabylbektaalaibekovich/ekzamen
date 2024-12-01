import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        upload : build.mutation<{url: string}, FormData>({
            query: (data) => ({
                url: `/upload/file`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["upload"],
        })
})})

export const { useUploadMutation } = api