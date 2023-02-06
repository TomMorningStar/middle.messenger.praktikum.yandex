import { authAPI } from 'api/auth';
import { UserDTO } from 'api/types';
import { userData } from 'api/userData';
import { transformUser } from 'utils';
import { hasError } from 'utils/apiHasError';

export const changeUserProfile: DispatchStateHandler<UserDTO> = async (dispatch, _state, action) => {
    try {
        await userData.changeUserProfile({
            first_name: action.first_name,
            second_name: action.second_name,
            display_name: action.display_name,
            login: action.login,
            email: action.email,
            phone: action.phone
        })

        const responseUser = await authAPI.me();

        dispatch({ user: transformUser(responseUser as UserDTO) });
    } catch (error) {
        console.error(error);
    }
}


export const changeUserAvatar: DispatchStateHandler<File> = async (dispatch, _state, action) => {
    try {
        const responseUser = await userData.changeUserAvatar(action)

        dispatch({ user: transformUser(responseUser as UserDTO) });
    } catch (error) {
        console.error(error);
    }
}

export const changePassword: DispatchStateHandler<{oldPassword: string, newPassword: string}> = async (dispatch, _state, action) => {
    try {
        const response = await userData.password(action)

        if (hasError(response)) {
            dispatch({ loginFormError: response.reason });
            return;
        }
    } catch (error) {
        console.error(error);
    }
}
