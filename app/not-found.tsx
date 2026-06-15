import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The page you are looking for does not exist or has been moved.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description:
      "The page you are looking for does not exist or has been moved.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Error Page",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
