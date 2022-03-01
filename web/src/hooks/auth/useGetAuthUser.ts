import { useQuery } from 'react-query';
import queryKeys from 'utilities/react-query/constant';
import { useSetRecoilState } from 'recoil';
import { profile } from 'services/UserService';
import { state } from 'app/auth';

export default function useGetAuthUser() {
    const setState = useSetRecoilState(state);
    useQuery(queryKeys.profile, profile, {
        retry: false,
        onSuccess: (data) => {
            setState(() => ({ user: { ...data.data } }));
        },
        onError: () => {
        },
    });
}
