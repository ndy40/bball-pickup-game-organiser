from backend.domain.models import User
from backend.infrastructure.rest.requests import LoginRequest
from backend.domain.exceptions import UserExistsError
from backend.use_cases.user_use_cases import register_user_use_case, login_user_use_case, AVATAR_URL
from backend.infrastructure.rest.requests import CreateUserRequest
import pytest


def test_exception_is_raised_if_user_exists(mocker):
    mock_repo = mocker.Mock()
    mock_repo.user_exists.return_value = True
    with pytest.raises(UserExistsError):
        req = CreateUserRequest(username='Ndifreke Ekott')
        register_user_use_case(req, mock_repo)


def test_user_is_created_on_valid_input(mocker):
    mock_repo = mocker.Mock()
    mock_repo.user_exists.return_value = False
    mock_repo.create = mocker.MagicMock()

    req = CreateUserRequest(username='Ndifreke Ekott', auto_login=False)
    register_user_use_case(req, mock_repo)

    mock_repo.create.assert_called()


def test_user_model_has_avatar():
    params = {
        'username': 'user',
        'profile_colour': 'f0f0f0',
        'avatar': AVATAR_URL.format('user', 'f0f0f0')
    }

    user = User(**params)
    assert user.username is not None
    assert user.username == 'user'
    assert user.avatar == AVATAR_URL.format('user', 'f0f0f0')
    assert user.id is None


def test_login_user_fails_when_user_not_exists(mocker):
    repo = mocker.Mock()
    repo.user_exists.return_value = False
    mocker.patch('backend.infrastructure.config.settings')
    with pytest.raises(ValueError) as exp:
        login_request = LoginRequest(username='user1')
        login_user_use_case(login_request, repo, lambda x: 'xxx')


