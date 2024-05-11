import axios from "axios";
import * as cheerio from "cheerio";
const url = "https://myonepiecemanga.online/";
class OnePieceScraper {
  async getHtmlContent(url: string) {
    const response = await axios.get(url);
    const html = response.data;
    return html;
  }

  async getMangaList() {
    const html = await this.getHtmlContent(url);
    const $ = cheerio.load(html);
    const chapterLists = $("#Chapters_List")
      .find("ul")
      .children("li")
      .find("a")
      .toArray();
    const firstEl = chapterLists[0];
    console.log({ firstEl });
  }
}

const opScraper = new OnePieceScraper();
opScraper.getMangaList();
