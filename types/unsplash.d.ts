export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Exif = {
  __typename?: "Exif";
  make?: Maybe<Scalars["JSON"]>;
  model?: Maybe<Scalars["JSON"]>;
  exposure_time?: Maybe<Scalars["JSON"]>;
  aperture?: Maybe<Scalars["JSON"]>;
  focal_length?: Maybe<Scalars["JSON"]>;
  iso?: Maybe<Scalars["JSON"]>;
};

export type Links = {
  __typename?: "Links";
  self: Scalars["String"];
  html: Scalars["String"];
  download?: Maybe<Scalars["String"]>;
  download_location?: Maybe<Scalars["String"]>;
  photos?: Maybe<Scalars["String"]>;
  likes?: Maybe<Scalars["String"]>;
  portfolio?: Maybe<Scalars["String"]>;
  following?: Maybe<Scalars["String"]>;
  followers?: Maybe<Scalars["String"]>;
};

export type Location = {
  __typename?: "Location";
  title: Scalars["String"];
  name?: Maybe<Scalars["JSON"]>;
  city?: Maybe<Scalars["JSON"]>;
  country?: Maybe<Scalars["JSON"]>;
  position: Position;
};

export type Position = {
  __typename?: "Position";
  latitude?: Maybe<Scalars["JSON"]>;
  longitude?: Maybe<Scalars["JSON"]>;
};

export type Profile_Image = {
  __typename?: "Profile_image";
  small: Scalars["String"];
  medium: Scalars["String"];
  large: Scalars["String"];
};

export type RandomPhoto = {
  __typename?: "RandomPhoto";
  id: Scalars["String"];
  created_at: Scalars["String"];
  updated_at: Scalars["String"];
  width: Scalars["Int"];
  height: Scalars["Int"];
  color: Scalars["String"];
  description: Scalars["String"];
  alt_description: Scalars["String"];
  urls: Urls;
  links: Links;
  categories: Array<Maybe<Scalars["JSON"]>>;
  likes: Scalars["Int"];
  liked_by_user: Scalars["Boolean"];
  current_user_collections: Array<Maybe<Scalars["JSON"]>>;
  user: User;
  exif: Exif;
  location: Location;
  views: Scalars["Int"];
  downloads: Scalars["Int"];
};

export type RandomPhotoInput = {
  query: Scalars["String"];
  orientation: Scalars["String"];
};

export type Root = {
  __typename?: "Root";
  RandomPhoto?: Maybe<RandomPhoto>;
};

export type RootRandomPhotoArgs = {
  input?: Maybe<RandomPhotoInput>;
};

export type Urls = {
  __typename?: "Urls";
  raw: Scalars["String"];
  full: Scalars["String"];
  regular: Scalars["String"];
  small: Scalars["String"];
  thumb: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  updated_at: Scalars["String"];
  username: Scalars["String"];
  name: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  twitter_username?: Maybe<Scalars["JSON"]>;
  portfolio_url?: Maybe<Scalars["JSON"]>;
  bio?: Maybe<Scalars["JSON"]>;
  location?: Maybe<Scalars["JSON"]>;
  links: Links;
  profile_image: Profile_Image;
  instagram_username?: Maybe<Scalars["JSON"]>;
  total_collections: Scalars["Int"];
  total_likes: Scalars["Int"];
  total_photos: Scalars["Int"];
  accepted_tos: Scalars["Boolean"];
};
