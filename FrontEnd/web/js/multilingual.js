// 언어별 JSON 파일
const lang = {
  en: {
    title: "wkw.one - wookingwoo short URL",
    ISO_639_1_Language_Codes: "en",
    now_sys_lang: "System locale",
    create: "create",
    copy: "copy",
    wrong_url_format: "Not a valid URL. Add https:// or http://",
    description: "Free URL shortener. wkw.one makes simple URL for you.",

    animal_face: "animal face",
    wookingwoo_maptool: "maptool",
    wookingwoo_msg: "web SMS",

    description1: "wkw.one is a free service that shortens long URLs.",
    description2: "You can use simple URLs for link sharing or text transmission.",
    description3: "If you use this for malicious purposes, it can be deleted.",
    description4: "It can be restricted if daily allowed traffic is exceeded. If you have a lot of usage, please contact us by email.",
    description5: "If you need a custom domain(designated URL), please contact us by email.",
    email_inquiry: "Email inquiry: ",

  },
  ko: {
    title: "wkw.one - 우킹우 단축 URL",
    ISO_639_1_Language_Codes: "ko",
    now_sys_lang: "시스템 지역",
    create: "줄이기",
    copy: "복사",
    wrong_url_format:
      "URL 형식이 올바르지 않습니다. https:// 혹은 http:// 를 붙여서 작성해주세요",
    description: "우킹우 단축 URL 무료 서비스",

    animal_face: "동물상 테스트",
    wookingwoo_maptool: "지도",
    wookingwoo_msg: "인터넷 문자",

    description1: "wkw.one은 긴 URL 주소를 짧게 줄여주는 무료 서비스입니다.",
    description2: "링크공유, 문자전송등에 간편한 URL을 사용할 수 있습니다.",
    description3: "악의적 목적으로 사용될 경우 삭제조치 될 수 있습니다.",
    description4: "일일 허용 트래픽 초과시 주소 변환이 제한될 수 있습니다. (일일 사용량이 많을 경우 이메일 문의 바랍니다.)",
    description5: "커스텀 도메인, 지정 URL이 필요한 경우 이메일 문의 바랍니다.",
    email_inquiry: "이메일 문의: ",

  },
};

// 현재 브라우저의 언어 가져오기
function getLanguage() {
  return navigator.language || navigator.userLanguage;
}

// 언어별 적용
function init(localeStr) {
  document.getElementById("locale").textContent = localeStr;
}

// 초기 작업
const systemLang = getLanguage(); // systemLang = 브라우저의 언어
let currentLang = localStorage.getItem("lang"); // localStorage에 저장된 'lang'값 가져오기 (마지막 언어 선택값)

if (currentLang == "" || currentLang == null || currentLang == undefined) {
  currentLang = systemLang; // currentLang가 null일 경우 브라우저 언어로 사용
}

init(systemLang);
render(currentLang.substr(0, 2));

// 언어별 렌더링
function render(locale) {
  const $lang = document.querySelectorAll("[data-lang]");
  $lang.forEach((el) => {
    const code = el.dataset.lang;

    try {
      el.textContent = lang[locale][code];
    } catch (error) {
      el.textContent = lang["en"][code];
    }
  });
}

// 버튼 이벤트
document.getElementById("btn-en").addEventListener("click", (e) => {
  render("en");
  localStorage.setItem("lang", "en"); // localStorage에 선택 언어 저장
});
document.getElementById("btn-ko").addEventListener("click", (e) => {
  render("ko");
  localStorage.setItem("lang", "ko"); // localStorage에 선택 언어 저장
});
