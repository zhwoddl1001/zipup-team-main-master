let isEmailChecked = false; // 이메일 중복 확인 여부
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const userNameInput = document.getElementById("userName");
    const userForm = document.querySelector(".signup-user-form");
    const userEmailInput = document.getElementById("email");

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{8,}$/;
    const namePattern = /^[A-Za-z가-힣]+$/;

    // 이메일 입력 필드 변경 시 이메일 중복 확인 상태 초기화
    userEmailInput.addEventListener("input", function () {
        isEmailChecked = false; // 이메일 변경 시 중복 확인 초기화
    });

    // 폼 제출 시 비밀번호 및 이름 검사
    userForm.addEventListener("submit", function (event) {
        const password = passwordInput.value;
        const userName = userNameInput.value;

        //비밀번호 검증
        if (!passwordPattern.test(password)) {
            alert("비밀번호는 영문, 숫자, 특수문자 조합으로 8자리 이상이어야 합니다.");
            event.preventDefault(); // 폼 제출 방지
        }

        // 이름 검증
        if (!namePattern.test(userName)) {
            alert("이름은 영문 또는 한글만 입력할 수 있으며, 숫자는 포함할 수 없습니다.");
            event.preventDefault(); // 폼 제출 방지
        }

        // 이메일 중복 확인 여부 체크
        if (!isEmailChecked) {
            alert("이메일 중복 확인을 먼저 해주세요.");
            event.preventDefault(); // 폼 제출 방지
        }
    });
});


/******************** 아이디(이메일) 중복************************************************/

document.addEventListener("DOMContentLoaded", function () {
    const userCheckEmailBtn = document.getElementById("user-check-email-btn");
    const emailInput = document.getElementById("email");



    userCheckEmailBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        // 이메일 패턴 체크
        if (!emailPattern.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }


        if (!email) {
            alert("이메일을 입력하세요.");
            return;
        }

        // 서버로 이메일 중복 확인 요청
        fetch(`/check-email?email=${encodeURIComponent(email)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("서버 응답 실패");
                }
                return response.json();
            })
            .then(data => {
                if (data.isTaken) {
                    alert("중복된 이메일입니다. 다른 이메일을 입력하세요.");
                    isEmailChecked = false; // 중복 확인 실패
                } else {
                    alert("사용 가능한 이메일입니다.");
                    isEmailChecked = true; // 중복 확인 성공
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("이메일 중복 확인 중 문제가 발생했습니다.");
            });
    });
});

/********************  판매자 아이디(이메일) 중복 확인 필수 여부*********************************/
let sellerEmailChecked = false; // 이메일 중복 확인 여부
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const form = document.querySelector(".signup-form");
    const checkEmailBtn = document.getElementById("check-selleremail-btn");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.com$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{8,}$/;

    // 이메일 입력 필드의 값이 변경될 때마다 상태 초기화
    emailInput.addEventListener("input", function () {
        sellerEmailChecked = false;  // 이메일 변경 시 중복 확인 상태 초기화
    });

    checkEmailBtn.addEventListener("click", function () {
        const email = emailInput.value;

        // 이메일 패턴 체크
        if (!emailPattern.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }

        // 서버에 이메일 중복 확인 요청
        fetch(`/check-email?email=${email}`)
            .then(response => response.json())
            .then(data => {
                if (data.isTaken) {
                    alert("중복된 이메일입니다. 다른 이메일을 입력하세요.");
                    sellerEmailChecked = false; // 이메일 중복
                } else {
                    alert("사용 가능한 이메일입니다.");
                    sellerEmailChecked = true; // 이메일 사용 가능
                }
            })
            .catch(error => {
                alert("이메일 중복 확인에 실패했습니다.");
                sellerEmailChecked = false; // 실패 시 중복 확인 안됨
            });
    });

    // 폼 제출 시 비밀번호 및 이메일 검사
    form.addEventListener("submit", function (event) {
        const email = emailInput.value;
        const password = passwordInput.value;

        // 이메일 검증
        if (!emailPattern.test(email)) {
            alert("이메일은 이메일 형식으로 영문자 및 숫자 조합으로 제출해주세요.");
            event.preventDefault(); // 폼 제출 방지
        }

        //비밀번호 검증
        if (!passwordPattern.test(password)) {
            alert("비밀번호는 영문, 숫자, 특수문자 조합으로 8자리 이상이어야 합니다.");
            event.preventDefault(); // 폼 제출 방지
        }

        // 이메일 중복 확인 여부 체크
        if (!sellerEmailChecked) {
            alert("이메일 중복 확인을 먼저 해주세요.");
            event.preventDefault(); // 폼 제출 방지
        }
    });
});