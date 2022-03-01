import { useRecoilValue } from 'recoil';
import { state } from 'app/auth';

export default function useUser() {
    const data = useRecoilValue(state);
    return data.user;
}
