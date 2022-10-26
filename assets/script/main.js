const defaultLocale = "pt";
const supportedLocales = ["pt", "es", "en", "fr", "ja"];

const languageSwitch = document.querySelector("#language-switch")

let translation;

document.addEventListener("DOMContentLoaded", () => {
    languageSwitch.replaceChildren("")
    supportedLocales.forEach((locale) => {
        const option = document.createElement("option")
        option.value = locale;
        option.innerText = locale.toUpperCase()
        languageSwitch.append(option)
    })
})

languageSwitch.addEventListener("change", (event) => {
    changeLocale(event.target.value)
})

async function fetchTranslationOf(locale) {
    const langPath = `./assets/lang/${locale}.json`
    const response = await fetch(langPath);

    return await response.json();
}

async function changeLocale(newLocale) {
    translation = await fetchTranslationOf(newLocale)
    translatePage();
}

function translatePage() {
    const i18nKeys = document.querySelectorAll("[data-i18n-key]");

    document.querySelector("html").setAttribute("lang", `${translation['language-code']}-${translation['country-code']}`)

    i18nKeys.forEach((element) => {
        const key = element.getAttribute('data-i18n-key');
        element.innerHTML = translation['strings'][key]
    })
}