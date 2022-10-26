const defaultLocale = "pt"
const supportedLocales = {
    "pt": "Português (BR)",
    "es": "Español",
    "ja": "日本語",
    "fr": "Français",
    "en": "English",
}

const languageSwitch = document.querySelector("#language-switch")

let translation

document.addEventListener("DOMContentLoaded", () => {
    languageSwitch.replaceChildren("")

    Object.entries(supportedLocales).forEach(([key, value]) => {
        const option = document.createElement("option")
        option.value = key
        option.innerText = value
        languageSwitch.append(option)
    });
})

languageSwitch.addEventListener("change", (event) => {
    changeLocale(event.target.value)
})

async function fetchTranslationOf(locale) {
    const langPath = `./assets/lang/${locale}.json`
    const response = await fetch(langPath)

    return await response.json()
}

async function changeLocale(newLocale) {
    translation = await fetchTranslationOf(newLocale)
    translatePage()
}

function translatePage() {
    const i18nKeys = document.querySelectorAll("[data-i18n-key]")

    document.documentElement.lang = `${translation['language-code']}-${translation['country-code']}`

    i18nKeys.forEach((element) => {
        const key = element.getAttribute('data-i18n-key')
        element.innerHTML = translation['strings'][key]
    })
}