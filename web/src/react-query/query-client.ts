import { QueryClient } from "react-query"
import { toast } from "react-hot-toast"

export function queryErrorHandler(error: any): void {

    const title = error.response.data.detail
    toast.error(title)

}


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

    }
})


