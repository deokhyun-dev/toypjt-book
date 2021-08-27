function getToken() {
    return localStorage.getItem('token')
}

async function login(event) {
    // submit하면 href를 통해 이동하거나, 창이 새로고침하여 실행됨
    // event.preventDefault는 이러한 동작을 막아줌
    // a태그를 눌렀을 때 href 링크로 이동하지 않게 할 경우
    // form dksdp submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고 싶은 경우 (submit은 작동됨)
    event.preventDefault()

    // 부모 태그로 이벤트를 전파하는 것을 막아줌
    event.stopPropagation()

    const emailElement = document.querySelector('#email')
    const passwordElement = document.querySelector('#password')

    const email = emailElement.value
    const password = passwordElement.value

    try {
        const res = await axios.post('https://api.marktube.tv/v1/me', {
            email,
            password
        })

        const {token} = res.data
        console.log(token)

        if(token === undefined) {
            return;
        }

        localStorage.setItem('token', token)
        location.assign('/')

    } catch (error) {
        const data = error.response.data;
        console.log(data)

        if(data) {
            const state = data.error
            if(state === 'USER_NOT_EXIST') {
                alert('사용자가 존재하지 않습니다.')
            } else if (state === 'PASSWORD_NOT_MATCH') {
                alert('비밀번호가 틀렸습니다.')
            }
        }
    }

}


function bindLoginButton() {
    const form = document.querySelector('#form-login');
    form.addEventListener('submit', login)
}


function main() {
    // 버튼 이벤트 연결
    bindLoginButton();


    // 토큰 체크
    const token = getToken()
}

document.addEventListener('DOMContentLoaded', main)

