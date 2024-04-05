import {useAuth0} from "@auth0/auth0-vue";
function authGuard(to, from, next) {
    const auth0 = useAuth0();
    const isAuthenticated = auth0.isAuthenticated.value;
    const isLoading = auth0.isLoading;
    
    if(isAuthenticated){
        next();
    }else{
        auth0.loginWithRedirect();
        next("/");
    }
}
export default authGuard;