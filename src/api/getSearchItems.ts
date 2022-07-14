export interface ISearchResult {
  categories?: {
    title: string
    href: string
  }[]
  items?: {
    title: string
    price: number
    image: string
    href: string
  }[]
}

export default async function GetSearchItems(): Promise<ISearchResult> {
  return await new Promise((resolve) => {
    let result

    if (Math.random() > 0.1) {
      result = {
        categories: [
          {
            title: 'Ламинат бытовой' + Math.ceil(10 * Math.random()),
            href: '/catalog/1',
          },
          {
            title: 'Ламинат полукоммерческий' + Math.ceil(10 * Math.random()),
            href: '/catalog/2',
          },
          {
            title: 'Ламинат бытовой2' + Math.ceil(10 * Math.random()),
            href: '/catalog/3',
          },
        ],
        items: [
          {
            title:
              'Ламинат 32 класса Kronostar, коллекция Eco-Tec,«Дуб Миллениум»',
            price: Math.ceil(1000 * Math.random()),
            image: './upload/dev/img/search/search-item-1.png',
            href: '/item/1',
          },
          {
            title:
              'Ламинат 33 класса Kronostar, коллекция Eco-Tec,«Дуб Миллениум»',
            price: Math.ceil(1000 * Math.random()),
            image: './upload/dev/img/search/search-item-2.png',
            href: '/item/2',
          },
          {
            title:
              'Ламинат 34 класса Kronostar, коллекция Eco-Tec,«Дуб Миллениум»',
            price: Math.ceil(1000 * Math.random()),
            image: './upload/dev/img/search/search-item-3.png',
            href: '/item/3',
          },
        ],
      }
    } else {
      result = {}
    }

    resolve(result)
  })
}
