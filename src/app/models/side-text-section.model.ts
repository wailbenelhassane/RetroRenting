export interface SideTextSection {
  title: string;
  content: string;
  src: string;
  alt: string;
}

export interface SideTextData {
  [key: string]: SideTextSection;
}
