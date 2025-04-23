const axios = require("axios");

const puppeteer = require("puppeteer");

async function getDownloadLink(url) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set a User-Agent similar to a real browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45"
    );

    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Wait for the download button to appear
    // await page.waitForSelector('a[aria-label="Download file"]', { timeout: 6000 });

    // Get the download link
    const downloadLink = await page.$eval('a[aria-label="Download file"]', (el) => el.href);

   console.log(downloadLink);
    

    await browser.close();
    return downloadLink;

  } catch (error) {
    console.error("Error fetching MediaFire link:", error.message);
    return null;
  }
}


const serversEndpoints = {
  SVLink: "https://sendvid.com/embed/",
  OKLink: "https://ok.ru/videoembed/",
  MALink: "https://mega.nz/embed/",
  FRLink: "https://www.mediafire.com/file/",
  SVLowQ: "https://sendvid.com/embed/",
  FRLowQ: "https://www.mediafire.com/file/",
  GDFhdQ: "https://www.googleapis.com/drive/v3/files/",
  FRFhdQ: "https://www.mediafire.com/file/",
};

const StreamAnime = async (name, episode) => {
// return  getDownloadLink("https://www.mediafire.com/file/hn7hipfvbs36iph")
  let urls = Object.keys(serversEndpoints);
  let sources = [];

  try {
    let body = `UserId=0&AnimeId=${name}&Episode=${episode}&AnimeType=SERIES&Token=8cnY80AZSbUCmR26Vku1VUUY4`;
    console.log(body, body.length);

    let animefyStream = await axios.post(
      "https://animeify.net/animeify/apis_v4/anime/load_servers.php",
      body,
      {
        headers: {
          "Content-Length": Buffer.byteLength(body, "utf8").toString(),
          "Content-Type": "application/x-www-form-urlencoded",
          "Expect": "100-continue",
          "Host": "animeify.net",
        },
      }
    );

    let resultUrls = Object.keys(animefyStream.data.CurrentEpisode);

    for (let i = 0; i < resultUrls.length; i++) {
      let serverKey = urls[i];
      let episodeLink = animefyStream.data.CurrentEpisode[serverKey];
      animefyStream.data.CurrentEpisode["FRLink"];

      if (episodeLink) {
        if ((serverKey === "FRLink" && animefyStream.data.CurrentEpisode["FRLink"] )|| (serverKey === "FRLowQ" && animefyStream.data.CurrentEpisode["FRLowQ"]) || (serverKey === "FRFhdQ"&& animefyStream.data.CurrentEpisode["FRFhdQ"])) {
          let mediaFireLink = await getDownloadLink(serversEndpoints[serverKey] + episodeLink);
          if (mediaFireLink) sources.push(mediaFireLink);
        } else {
          sources.push(serversEndpoints[serverKey] + episodeLink);
        }
      }
    }
console.log(sources.length);

    return sources;
  } catch (error) {
    console.error(`Error fetching movie data: ${error}`);
    return { error: "Failed to fetch movie data" };
  }
};

module.exports = { StreamAnime };
