import { useQuery } from 'react-query';
import queryKeys from 'utilities/react-query/constant';
import { profile } from 'services/UserService';

export default function useAuth() {
    return useQuery(queryKeys.profile, profile, {
        staleTime: 60000 * 60,
        cacheTime: 60000 * 60 * 24,
        retry: false,
        onError: () => {
        },
    });
}
