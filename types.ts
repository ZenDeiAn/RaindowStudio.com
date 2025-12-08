
export type Language = 'ko' | 'en' | 'zh';

export interface BlogPost {
  id: string;
  title: Record<Language, string>;
  date: string;
  tags: string[];
  content: Array<{
    type: 'text' | 'image' | 'code';
    value: string; // For text/code, content string. For image, URL.
    caption?: string;
    url?: string;
  }>;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
  size: 'small' | 'wide' | 'tall' | 'large'; // 1x1, 2x1, 1x2, 2x2
  width: number;
  height: number;
}

export interface TagItem {
  src: string;
  alt: string;
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    blog: string;
    gallery: string;
    widgets: string;
    search: string;
  };
  hero: {
    studio: string;
    scrollDown: string;
  };
  home: {
    latestBlog: string;
    latestPhoto: string;
    readMore: string;
  };
  blog: {
    prev: string;
    next: string;
    noMore: string;
    postedOn: string;
    backToList: string;
    readMore: string;
  };
  gallery: {
    prevPage: string;
    nextPage: string;
    page: string;
  };
  common: {
    loading: string;
  };
  about: {
    title: string;
    subtitle: string;
    role: string;
    intro: string;
    techStack: string;
    learning: string;
    skillsTitle: string;
  };
  widgets: { 
    title: string; 
    pomodoro: string; 
    todo: string; 
    notepad: string;
    start: string;
    pause: string;
    reset: string;
    add: string;
    placeholder: string;
    notePlaceholder: string;
    work: string;
    break: string;
    backToTools: string;
    edition: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    found: string;
  };
}
