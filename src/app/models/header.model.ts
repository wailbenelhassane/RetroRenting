export interface Header {
  authLinks: { [key: string]: AuthLink };
  logo: Logo;
  mainMenu: { [key: string]: MenuItem };
}

export interface AuthLink {
  order: number;
  title: string;
  url: string;
}

export interface Logo {
  alt: string;
  src: string;
}

export interface MenuItem {
  order: number;
  title: string;
  url: string;
}
