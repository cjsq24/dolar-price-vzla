import axios from 'axios';

interface IScrapingClass {
   getDolarPrice(): Promise<IDolarPriceResult[]>;
}

interface IDolarPriceResult {
   name: string;
   price: string;
}

class Scraping implements IScrapingClass {
   async getDolarPrice(): Promise<IDolarPriceResult[]> {
      const { data } = await axios.get('https://exchangemonitor.net/dolar-venezuela');
      const elements: string[] = data.split('<div class="col-xs-12 col-sm-6 col-md-4 col-tabla">');

      const dolarPrice: IDolarPriceResult[] = [];

      elements.map((ele, i) => {
         if (i > 0) {
            const name = ele.split('<h6 class="nombre" itemprop="name">')[1]
                           .split('</h6>')[0];
            const price = ele.split('<p class="precio" itemprop="price">')[1]
                           .split('</p>')[0];
            dolarPrice.push({ name, price });
         }
      })
      return dolarPrice;
   }
}

export default new Scraping();