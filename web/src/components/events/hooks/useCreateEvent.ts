import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { create, CreateEventInput } from "services/EventService"

export const useCreateEvent = () => {
    const navigate = useNavigate()
    const { mutate } = useMutation((data: CreateEventInput) => create(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg)
        },
        onSuccess: () => {
            toast.success("Event created Successfully")
            navigate("/")
        }
    })
    return mutate
}