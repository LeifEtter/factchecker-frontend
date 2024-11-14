export const API = process.env.NEXT_PUBLIC_API_URL;
// export const API = "ec2-18-159-108-204.eu-central-1.compute.amazonaws.com:8080";
export const PLACEHOLDER_DATE = "Joined November 2013";

export const SORTING_OPTIONS = [
  "comment_amount",
  "creation_date",
  "controversial",
];

export const SORTING_OPTION_LABELS = {
  creation_date: "Date Created",
  comment_amount: "Popularity",
  controversial: "Controversial",
};
