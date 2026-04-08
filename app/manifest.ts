import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KFUPM Student Hub",
    short_name: "Student Hub",
    description: "One-stop student service platform for KFUPM students.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f8f7f2",
    theme_color: "#0d573f",
    orientation: "portrait",
    icons: [
      {
        src: "/KFUPM.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
