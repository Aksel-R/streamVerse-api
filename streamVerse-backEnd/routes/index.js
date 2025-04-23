https://www.animeparadise.moe/_next/data/P3ghZyCDYvSSHIAunGsFx/en/anime/Ore-Dake-Level-Up-na-Ken.json?id=Ore-Dake-Level-Up-na-Ken




let body = `UserId=0&Language=AR&FilterType=SEARCH&FilterData=${name}&Type=SERIES&From=0&Token=8cnY80AZSbUCmR26Vku1VUUY4`;

let animefySearch = await axios.post(
  "https://animeify.net/animeify/apis_v4/anime/search.php", // Added missing URL
  body,
  {
    headers: {
      "Content-Length": body.length.toString(),
      "Content-Type": "application/x-www-form-urlencoded",
      "Expect": "100-continue",
      "Host": "animeify.net",
    },
  }
);

// Ensure animefySearch.data exists before accessing urls
if (!animefySearch.data || !animefySearch.data.urls) {
  throw new Error("No search results found.");
}

let sources = animefySearch.data.urls.map(
  (url) => `${url}${query}/${season}/${episode}`
);

return [sources, animefySearch.data];
