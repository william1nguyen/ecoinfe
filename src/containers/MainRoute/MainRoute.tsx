import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const MainRoute = (props: any) => {
    const [cookies] = useCookies(['access-token']);
    let isLoggedIn = false;

     if (cookies['access-token'] !== undefined) {
        isLoggedIn = true;
    }

    return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />
};
