
export const signup = async (email, password) => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdx5rdaz5zVnbUnrDVZJqxMUVkW-xI9KU',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        }
    );
    if (!response.ok) {
        alert("Put a valid email address or choose another!");
        throw new Error('Something went wrong in the Auth screen!');
    }
    const resData = await response.json();
    console.log(resData);

}
