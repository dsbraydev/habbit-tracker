import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Habitus",
    short_name: "Habitus",
    description: "Build better habits. Become your best self.",
    start_url: "/",
    display: "standalone",
    background_color: "#090812",
    theme_color: "#090812",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
