var fs = require("fs");

const defaultLocale = "en";
const locales = [
  "af",
  "de",
  "es",
  "fr",
  "id",
  "it",
  "ja",
  "ko",
  "nl",
  "pt",
  "ro",
  "ru",
  "tl",
  "zh_CN",
  "zh_TW",
];

const content = [
  {
    contentName: "banner_title",
    fileName: "title",
  },
  {
    contentName: "banner_message",
    fileName: "message",
  },
];

const init = () => {
  for (let index = 0; index < content.length; index++) {
    var data = require(`./locale/input-${defaultLocale}.json`);
    let startString = `{% if \${language} == '${defaultLocale}' %}\n${
      data[content[index].contentName]
    }\n`;

    const endString = `{% else %}\n${
      data[content[index].contentName]
    }\n{% endif %}`;

    startString = loopData(startString);
    startString = startString + endString;

    fs.mkdirSync("./output", { recursive: true });
    fs.writeFile(
      `./output/output-${content[index].fileName}.html`,
      startString,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  }
};

const loopData = (startString) => {
  for (let index = 0; index < locales.length; index++) {
    var data = require(`./locale/input-${locales[index]}.json`);

    startString =
      startString +
      `{% elsif \${language} == '${locales[index]}' %}\n${data.banner_message}\n`;
  }

  return startString;
};

init();
