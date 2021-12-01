
function authFunc() {
    let authList = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))

    let authToken = ""

    if(document.cookie.indexOf(authList) == -1){
        authToken = document.cookie.indexOf(authList)
    } else {
        authToken = authList.split('=')[1];
    }
    return authToken
}

export default authFunc;