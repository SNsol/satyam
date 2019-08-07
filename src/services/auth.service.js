import { apiUrl } from '../helpers';

export const authService = {
  createAccount,
  verifyMobile,
	login,
  loginOTP,
  validateLoginOTP,
  forgotPassword,
  validateResetOTP,
  resetPassword,
  logout
};

function createAccount(user) {
  const url = apiUrl + '/api/account/register';
  let headers = {
    'Content-Type': 'application/json'
  };
  let body = {
    'email': user.email,
    'password': user.password,
    'confirmPassword': user.password,
    'FullName': user.name,
    'PhoneNumber': user.phone
  };
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text()
      }
      let error = new Error('Failed Registration');
      return Promise.reject(error);
    }).then(tempToken => {
      tempToken = tempToken.replace('"', '');
      let registerDetails = {
        'tempToken': tempToken,
        'phone': user.phone,
        'email': user.email,
        'name': user.name
      };
      return registerDetails;
    });
}

function verifyMobile(tempToken, otp) {
  const url = apiUrl + '/api/CustomAccount/VerifyOTP';

  let headers = {
    'Content-Type': 'application/json'
  };
  let body = {
    'guid': tempToken,
    "OneTime": otp
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text()
      }
      let error = new Error('Failed to Verify OTP');
      return Promise.reject(error);
    }).then(result => {
      return result;
    });
}

function login(username, password) {
	const url = apiUrl + '/token';
  let body = "username="+username+"&password="+password+"&grant_type=password"
  const requestOptions = {
    method: 'POST',
    headers: {},
    body: body
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      let error = new Error('Failed Authentication');
      return Promise.reject(error);
    }).then(json => {
      if (json.access_token && json.UserId) {
        let user = {
        	'token': json.access_token,
        	'customerId': json.UserId,
          'username': username
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        let error = new Error('Failed Authentication');
        return Promise.reject(error);
      }
    });
}

function loginOTP(username) {
  const url = apiUrl + '/api/account/GenerateOTP';
  let headers = {
    'Content-Type': 'application/json'
  };
  let body = {
    'EmailPhone': username
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      let error = new Error('Failed to Generate OTP');
      return Promise.reject(error);
    }).then(tempToken => {
      tempToken = tempToken.replace('"', '');
      let loginOTPDetails = {
        'username': username,
        'tempToken': tempToken
      };
      return loginOTPDetails;
    });
}

function validateLoginOTP(tempToken, username, otp) {
  const url = apiUrl + '/token';

  let body = "uid="+tempToken+"&otp="+otp+"&grant_type=password"

  const requestOptions = {
    method: 'POST',
    headers: {},
    body: body
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      let error = new Error('Failed to Verify Login OTP');
      return Promise.reject(error);
    }).then(json => {
      if (json.access_token && json.UserId) {
        let user = {
          'token': json.access_token,
          'customerId': json.UserId,
          'username': username
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        let error = new Error('Failed to Verify Login OTP');
        return Promise.reject(error);
      }
    });
}

function forgotPassword(username) {
  const url = apiUrl + '/api/account/ForgotPassword';
  let headers = {
    'Content-Type': 'application/json'
  };
  let body = {
    'EmailPhone': username
  };
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      let error = new Error('Failed Forgot Password');
      return Promise.reject(error);
    }).then(tempToken => {
      tempToken = tempToken.replace('"', '');
      let forgotPasswordDetails = {
        'tempToken': tempToken
      };
      return forgotPasswordDetails;
    });
}

function validateResetOTP(tempToken, otp) {
  const url = apiUrl + '/api/CustomAccount/VerifyResetPasswordOTP';

  let headers = {
    'Content-Type': 'application/json'
  };
  let body = {
    'guid': tempToken,
    "OneTime": otp
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      let error = new Error('Failed to Verify Reset OTP');
      return Promise.reject(error);
    }).then(result => {
      return result;
    });
}

function resetPassword(tempToken, newPassword, confirmPassword) {
  const url = apiUrl + '/api/account/ResetPassword';

  let headers = {
    'Content-Type': 'application/json'
  };
  let body = {
    'Code': tempToken,
    "Password": newPassword,
    "ConfirmPassword": confirmPassword
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      let error = new Error('Failed to Reset Password');
      return Promise.reject(error);
    }).then(result => {
      return result;
    });
}

function logout() {
    localStorage.removeItem('user');
}