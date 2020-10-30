import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
/*import Trade from "../Trade";*/
export default () => {

    const login = async (email ,password) => {
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdx5rdaz5zVnbUnrDVZJqxMUVkW-xI9KU', {email ,password});
        return response;
    }
    return login
}
