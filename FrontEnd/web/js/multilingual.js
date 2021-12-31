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
