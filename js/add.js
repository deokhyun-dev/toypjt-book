function getToken() {
  return localStorage.getItem("token");
}

async function getUserByToken(token) {
  try {
    const res = await axios.get("https://api.marktube.tv/v1/me", {
      headers: {
        // api에서 약속한 형식, 토큰을 보내서 유저 데이터를 받아온다.
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("getUserByToken error", error);
    // main 함수에서 user에서 null을 받아 로그인 페이지로 넘기기 위해 null을 리턴한다.
    return null;
  }
}

async function save(event) {
  event.preventDefault();
  // form을 가지고 있는 상위 DOM에 이벤트가 전파되지 않도록하는 함수
  event.stopPropagation();
  // bootstrap에 있는 기능으로 입력했을 떄 문제가 없다는 GUI로 변경
  event.target.classList.add("was-validated");

  const titleElement = document.querySelector("#title");
  const messageElement = document.querySelector("#message");
  const authorElement = document.querySelector("#author");
  const urlElement = document.querySelector("#url");

  const title = titleElement.value;
  const mesage = messageElement.value;
  const author = authorElement.value;
  const url = urlElement.value;

  // 기본적인 유효성 검사는 해줘야한다.
  if (title === "" || message === "" || author === "" || url === "") {
    return;
  }

  const token = getToken();
  if (token === null) {
    location.assign("/login");
    return;
  }

  try {
    await axios.post(
      "https://api.marktube.tv/v1/book",
      {
        title,
        mesage,
        author,
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    location.assign("/");
  } catch (e) {
    console.log("책 값 넣는 데 오류남");
    alert("책 추가 실패");
  }
}

function bindSaveButton() {
  const form = document.querySelector("#form-add-book");
  form.addEventListener("submit", save);
}

async function main() {
  // 버튼에 이벤트 연결
  bindSaveButton();

  // 토큰 체크
  const token = getToken();
  if (token === null) {
    location.assign("/login");
    return;
  }
  // 토큰으로 서버에서 나의 정보를 받아오기
  // 이 토큰이 유효한지 확인하기 위해
  const user = await getUserByToken(token);
  if (user === null) {
    localStorage.clear();
    location.assign("/login");
    return;
  }
  console.log(user);
}

document.addEventListener("DOMContentLoaded", main);
