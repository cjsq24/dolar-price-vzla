import axios from 'axios';

interface IScrapingClass {
   getDolarPrice(): Promise<IDolarPriceScraping[]>;
}

export interface IDolarPriceScraping {
   keyname: string;
   price: string;
}

class Scraping implements IScrapingClass {
   async getDolarPrice(): Promise<IDolarPriceScraping[]> {
      const { data } = await axios.get('https://exchangemonitor.net/dolar-venezuela');
      const elements: string[] = data.split('<div class="col-xs-12 col-sm-6 col-md-4 col-tabla">');

      const dolarPrice: IDolarPriceScraping[] = [];

      elements.map((ele, i) => {
         if (i > 0) {
            const keyname = ele.split('<h6 class="nombre" itemprop="name">')[1]
                           .split('</h6>')[0];
            const price = ele.split('<p class="precio" itemprop="price">')[1]
                           .split('</p>')[0];
            dolarPrice.push({ keyname, price });
         }
      })
      return dolarPrice;
   }
}

export default new Scraping();