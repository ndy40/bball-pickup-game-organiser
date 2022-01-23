import { QueryClient } from "react-query"
import { toast } from "react-hot-toast"

export function queryErrorHandler(error: any): void {
<<<<<<< HEAD
    const title = error.response.data.detail
    toast.error(title)
}

=======

    const title = error.response.data.detail
    toast.error(title)

}


>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: queryErrorHandler,
            staleTime: 60000,
            cacheTime: 900000,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnMount: false
        },
        mutations: {
            onError: (error: any) => {
                toast.error(error.response.data.detail)
            },
        }
<<<<<<< HEAD
=======

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
    }
})


