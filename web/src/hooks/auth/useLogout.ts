import { useQueryClient } from 'react-query';
import { removeToken } from 'services/local-storage';
import queryKeys from 'utilities/react-query/constant';

export default function useLogout() {
    const queryClient = useQueryClient();
    return () => {
        removeToken();
        queryClient.removeQueries([queryKeys.profile]);
        window.location.assign('/');
    };
}
