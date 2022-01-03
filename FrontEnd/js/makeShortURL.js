let origin_endpoint = "https://cors-anywhere.herokuapp.com/https://wkw.one/wkw-short-url-generator";
// let origin_endpoint = "https://wkw.one/wkw-short-url-generator";

document.getElementById("generate-button").addEventListener("click", () => {
  let native_url = document.getElementsByClassName("input")[0].value;

  if (isNotValidURL(native_url)) {
    document.getElementById("success-card").style.display = "none";
    document.getElementById("fail-card").style.display = "block";
    document
      .getElementById("fail-card-text")
      .setAttribute("data-lang", "wrong_url_format");

    render(currentLang.substr(0, 2)); // 언어 다시 렌더링

    return;
  }

  fetch(origin_endpoint, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      origin: origin_endpoint,
      "x-api-key": "nS3iFxkIk27ZxRTCnxOLu1oxr1zI639ZW78zYgR9",
    },
    body: JSON.stringify({ native_url: native_url }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.short_id == null) {
      } else {
        document.getElementById("fail-card").style.display = "none";
        document.getElementById("success-card").style.display = "block";
        let shorten_url = data.forward_url + "/" + data.short_id;
        document.getElementById("result").innerHTML =
          "<a target='_blank' href='https://" +
          shorten_url +
          "'>" +
          "https://" +
          shorten_url +
          "</a>";
      }
    })
    .catch((err) => {
      console.log(err);

      document.getElementById("success-card").style.display = "none";
      document.getElementById("fail-card").style.display = "block";

      document
        .getElementById("fail-card-text")
        .setAttribute("data-lang", "shortening_error");

      render(currentLang.substr(0, 2)); // 언어 다시 렌더링
    });
});

document.getElementById("copy-button").addEventListener("click", async () => {
  let copyText = document.getElementById("result").innerText;
  await navigator.clipboard.writeText(copyText);
});

function isNotValidURL(str) {
  let pattern = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );
  return !pattern.test(str);
}
