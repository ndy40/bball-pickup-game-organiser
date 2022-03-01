import { useSetRecoilState } from 'recoil';
import queryKeys from 'utilities/react-query/constant';
import { profile } from 'services/UserService';
import { useQuery } from 'react-query';
import { state as AuthState } from 'app/auth';

export default function useCheckSignedInUser() {
    const setState = useSetRecoilState(AuthState);
    useQuery(queryKeys.profile, profile, {
        retry: false,
        onSuccess: (data) => {
            setState(() => ({ user: { ...data.data } }));
        },
        onError: () => {
        },
    });
}
