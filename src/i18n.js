import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        searchWord: "Search",
        search: "Search",
        placeholder: "Search GitHub user",

        repositories: "Repositories",
        contact: "Contact",
        website: "Website",
        twitter: "Twitter",

        noMore: "No more repositories",
        noBio: "No bio available",

        userNotFound: "User not found",
        emptySearch: "Type a username",

        sort_created: "Most recent",
        sort_updated: "Recently updated",
        sort_pushed: "Last push",
        sort_name: "Name",
      },
    },
    pt: {
      translation: {
        searchWord: "Buscar",
        search: "Buscar",
        placeholder: "Buscar usuário do GitHub",

        repositories: "Repositórios",
        contact: "Contato",
        website: "Site",
        twitter: "Twitter",

        noMore: "Sem mais repositórios",
        noBio: "Sem biografia",

        userNotFound: "Usuário não encontrado",
        emptySearch: "Digite um usuário",

        sort_created: "Mais recentes",
        sort_updated: "Atualizados",
        sort_pushed: "Último push",
        sort_name: "Nome",
      },
    },
  },
  lng: "pt", // idioma padrão
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;