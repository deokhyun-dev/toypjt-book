// function getToken() {
//     return localStorage.getItem('token')
// }

// async function login(event) {
//     // submit하면 href를 통해 이동하거나, 창이 새로고침하여 실행됨
//     // event.preventDefault는 이러한 동작을 막아줌
//     // a태그를 눌렀을 때 href 링크로 이동하지 않게 할 경우
//     // form dksdp submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고 싶은 경우 (submit은 작동됨)
//     event.preventDefault()

//     // 부모 태그로 이벤트를 전파하는 것을 막아줌
//     event.stopPropagation()

//     const emailElement = document.querySelector('#email')
//     const passwordElement = document.querySelector('#password')

//     const email = emailElement.value
//     const password = passwordElement.value

//     try {
//         const res = await axios.post('https://api.marktube.tv/v1/me', {
//             email,
//             password
//         })

//         console.log(res)
//         const {token} = res.data

//         if(token === undefined) {
//             return;
//         }

//         // localStorage.setItem('token', token)
//         // location.assign('/')

//     } catch (error) {
//         const data = error.response.data;
//         console.log(data)

//         if(data) {
//             const state = data.error
//             if(state === 'USER_NOT_EXIST') {
//                 alert('사용자가 존재하지 않습니다.')
//             } else if (state === 'PASSWORD_NOT_MATCH') {
//                 alert('비밀번호가 틀렸습니다.')
//             }
//         }
//     }

// }


// function bindLoginButton() {
//     const form = document.querySelector('#form-login');
//     console.log(form)
//     form.addEventListener('submit', login)
// }


// function main() {
//     // 버튼 이벤트 연결
//     bindLoginButton();


//     // 토큰 체크
//     const token = getToken()
// }

// document.addEventListener('DOMContentLoaded', main)

function getToken() {
    return localStorage.getItem('token')
}


async function login(event) {
    
    // 서밋 이벤트가 페이지를 새로 고치지 않게 막아줘야함
    // 부모 태그로 전파되는 걸 막아야함
    event.preventDefault()
    event.stopPropagation()
    
    
    // 이메일, 패스워드 받아와서 
    // 서버에 보내서 확인
    // 1. 계정이 존재하거나 존재하지 않거나
    // 2. 계정은 존재하는 데 비밀번호가 다른 케이스
    // 예외처리 해야함

    const emailElement = document.querySelector('#email')
    const passwordElement = document.querySelector('#password')

    const email = emailElement.value
    const password = passwordElement.value

    try {
        const res = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password
    })

    const {token} =res.data

    if(token === undefined) {
        return;
    }

    localStorage.setItem('token', token)
    location.assign('/')

    } catch (error) {
        console.log(error)
        const data = error.response.data
        // 가입자 정보가 존재하지 않을 때
        const state = data.error
        if(state === 'PASSWORD_NOT_MATCH') {
            alert('비밀번호가 틀렸습니다.')
        } else if (state === 'USER_NOT_EXIST') {
            alert('사용자가 존재하지 않습니다.')
        }
        
        // 패스워드 다를 때

    }
}


function bindLoginButton() {
    const form = document.querySelector('#form-login')
    form.addEventListener('submit', login)
}



function main() {
    // 버튼 이벤트 연결
    bindLoginButton()

    // 토큰 체크
    const token = getToken()
}

document.addEventListener('DOMContentLoaded', main)
