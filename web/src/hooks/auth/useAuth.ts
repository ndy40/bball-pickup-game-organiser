import { useQuery } from 'react-query';
import queryKeys from 'utilities/react-query/constant';
import { profile } from 'services/UserService';

export default function useAuth() {
    return useQuery(queryKeys.profile, profile, {
        retry: false,
        onError: () => {
        },
    });
}
