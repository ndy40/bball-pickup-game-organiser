import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { register } from 'services/UserService';

export default function useRegister() {
    const navigate = useNavigate();
    const { mutate } = useMutation((username: string) => register(username), {
        onSuccess: () => {
            toast.success('Registration successful');
            navigate('/login');
        },
    });
    return mutate;
}
