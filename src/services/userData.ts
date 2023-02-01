import { authAPI } from 'api/auth';
import { UserDTO } from 'api/types';
import { userData } from 'api/userData';
import type { Dispatch } from 'core';
import { transformUser } from 'utils';
import { hasError } from 'utils/apiHasError';

export const changeUserProfile = async (dispatch: Dispatch<AppState>, state: AppState, action: UserDTO,) => {
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
}


export const changeUserAvatar = async (dispatch: Dispatch<AppState>, state: AppState, action: File,) => {
    const responseUser = await userData.changeUserAvatar(action)

    dispatch({ user: transformUser(responseUser as UserDTO) });
}

export const changePassword = async (dispatch: Dispatch<AppState>, state: AppState, action: File,) => {
    const response = await userData.password(action)

    if (hasError(response)) {
        dispatch({ loginFormError: response.reason });
        return;
    }

}
