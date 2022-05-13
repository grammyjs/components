import uk from "vuetify/src/locale/uk";

export default {
  ...uk,
  qrScanner: {
    pointCamera: "Наведіть камеру на QR-код",
    sendButtonText: "Відправити",
    errors: {
      notAllowed: "Помилка: Потрібно надати доступ до камери",
      notFound: "Помилка: На цьому пристрої немає камери",
      unknown: "Помилка: {0}",
    },
  },
  colorPicker: {
    pickColor: "Виберіть колір",
    sendButtonText: "Відправити",
  },
};
