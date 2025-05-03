export interface CatalogImage {
  src: string;
  altText: string;
}

export interface CatalogCard {
  id: string;
  image: CatalogImage;
  info: string[];
  title: string;
}

export interface CatalogSection {
  title: string;
  catalogCards: CatalogCard[];
}
