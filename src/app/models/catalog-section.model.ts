export interface CatalogCard {
  id: string;
  title: string;
  image: {
    src: string;
    altText: string;
  };
  info: string[];
  button: {
    text: string;
    link: string;
  };
}

export interface CatalogSection {
  title: string;
  catalogCards: CatalogCard[];
}
