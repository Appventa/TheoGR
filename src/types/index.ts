export interface VideoItem {
  id:          string;
  title:       string;
  thumbnail:   string;
  videoUrl?:   string;
  youtubeId?:  string;
  duration?:   string;
  tags?:       string[];
}

export interface GalleryCategory {
  id:      string;
  label:   string;
  items:   VideoItem[];
  portrait?: boolean;
}

export interface ClientLogo {
  id:     string;
  name:   string;
  src:    string;
  width?: number;
}
