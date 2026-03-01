/**
 * i18n - Bilingual support (PT-BR / EN)
 * Persists language in localStorage for consistency.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "whoiam-lang";

  const translations = {
    pt: {
      title: "Gabriel Camillo │ Dev — Meus links e redes",
      metaDescription: "Links para minhas redes sociais, YouTube, portfolio e Discord. Gabriel Camillo — Developer.",
      role: "developer",
      hardSkills: "Hard Skills",
      aboutTitle: "Sobre mim",
      aboutText: "Desenvolvedor apaixonado por tecnologia e criação de conteúdo. Aqui você encontra todos os meus links: redes sociais, YouTube, portfolio, Discord e muito mais. Sinta-se à vontade para me seguir e acompanhar o que estou construindo!",
      moreAboutMe: "Mais sobre mim",
      followOnTwitter: "Siga-me no Twitter (:",
      meuYoutube: "Meu YouTube",
      portfolioWebDev: "Portfolio Profissional",
      serverDiscord: "Server Discord",
      listeningTo: "Ando escutando...",
      listeningTo2: "Outra playlist",
      linksSection: "Todos os links",
      linkYoutubeMain: "YouTube — Canal principal",
      linkSaaS: "Meu SaaS",
      linkTiktokMain: "TikTok — Principal",
      linkInstagramMain: "Instagram — Principal",
      linkBeatstars: "Loja Beatstars",
      langPT: "PT",
      langEN: "EN",
    },
    en: {
      title: "Gabriel Camillo │ Dev — My links & socials",
      metaDescription: "Links to my socials, YouTube, portfolio and Discord. Gabriel Camillo — Developer.",
      role: "developer",
      hardSkills: "Hard Skills",
      aboutTitle: "About me",
      aboutText: "Developer passionate about tech and content creation. Here you'll find all my links: socials, YouTube, portfolio, Discord and more. Feel free to follow and see what I'm building!",
      moreAboutMe: "More about me",
      followOnTwitter: "Follow me on Twitter (:",
      meuYoutube: "My YouTube",
      portfolioWebDev: "Professional Portfolio",
      serverDiscord: "Discord Server",
      listeningTo: "Currently listening...",
      listeningTo2: "Another playlist",
      linksSection: "All links",
      linkYoutubeMain: "YouTube — Main channel",
      linkSaaS: "My SaaS",
      linkTiktokMain: "TikTok — Main",
      linkInstagramMain: "Instagram — Main",
      linkBeatstars: "Beatstars Store",
      langPT: "PT",
      langEN: "EN",
    },
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || "pt";
  if (currentLang !== "pt" && currentLang !== "en") currentLang = "pt";

  function t(key) {
    return translations[currentLang][key] ?? translations.pt[key] ?? key;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var text = t(key);
      if (text) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.value = text;
        else el.textContent = text;
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (t(key)) el.placeholder = t(key);
    });
    document.documentElement.lang = currentLang === "en" ? "en" : "pt-BR";
    var titleEl = document.querySelector("title");
    if (titleEl) titleEl.textContent = t("title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("metaDescription"));
  }

  function setLang(lang) {
    if (lang !== "pt" && lang !== "en") return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    updateLangSwitcher();
  }

  function updateLangSwitcher() {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var lang = btn.getAttribute("data-lang-btn");
      btn.textContent = lang === "en" ? t("langEN") : t("langPT");
      btn.setAttribute("aria-pressed", currentLang === lang ? "true" : "false");
      btn.classList.toggle("active", currentLang === lang);
    });
  }

  window.i18n = {
    t: t,
    setLang: setLang,
    getLang: function () {
      return currentLang;
    },
    apply: applyTranslations,
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
    updateLangSwitcher();
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-btn"));
      });
    });
  });
})();
