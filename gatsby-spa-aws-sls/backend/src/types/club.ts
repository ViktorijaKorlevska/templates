export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  fitkit?: string;
  sportmaster?: string;
}

export interface MediaItem {
  url: string;
  type: "image" | "video";
}

export interface Club {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  clubName: string;
  email: string;
  city: string;
  address: string;
  category: string;
  subcategory: string;
  phone?: string;
  website?: string;
  description?: string;
  socialMedia?: SocialMedia;
  googleMapsUrl?: string;
  mainImage?: string; // single image URL
  media?: MediaItem[]; // up to 10 items (photos/videos)
  slug: {
    _type: "slug";
    current: string;
  }; // Sanity slug field for URL-friendly identifiers
}

export interface CreateClubInput {
  clubName: string;
  email: string;
  city: string;
  address: string;
  category: string;
  subcategory: string;
}

export interface UpdateClubInput {
  clubName: string;
  email: string;
  city: string;
  address: string;
  category: string;
  subcategory: string;
  phone?: string;
  website?: string;
  description?: string;
  socialMedia?: SocialMedia;
  googleMapsUrl?: string;
  mainImage?: string;
  media?: MediaItem[];
}
