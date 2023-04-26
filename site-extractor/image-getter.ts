import puppeteer from "puppeteer";
import https from "https";
import fs from "fs";

const main = async () => {
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto("https://sites.google.com/view/micosyslab/home");
  const imgURLs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img"), ({ src }) => src)
  );
  console.log(imgURLs);
  await browser.close();

  imgURLs.forEach((imgURL, i) => {
    https.get(imgURL, (response) => {
      response.pipe(fs.createWriteStream(`${i++}.jpg`));
    });
  });
};

main().then(() => {});
