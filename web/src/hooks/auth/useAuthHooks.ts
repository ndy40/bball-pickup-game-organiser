import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { state as AuthState } from 'app/auth';
import { removeToken } from 'services/local-storage';
import queryKeys from 'utilities/react-query/constant';

export default function useAuthHooks() {
    const state = useRecoilValue(AuthState);
    const queryClient = useQueryClient();
    const logout = () => {
        removeToken();
        queryClient.removeQueries([queryKeys.profile]);
        window.location.assign('/');
    };
    return { logout, state };
}
