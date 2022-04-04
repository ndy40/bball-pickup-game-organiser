import { useMutation } from 'react-query';
import { setToken } from 'services/local-storage';
import { login } from 'services/UserService';

export default function useLogin() {
    const { mutate } = useMutation((username: string) => login(username), {
        onSuccess: (data) => {
            setToken(data.data.access_token);
            window.location.assign('/');
        },
    });
    return mutate;
}
