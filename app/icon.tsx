export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/svg+xml";

export default function Icon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f7c46"/>
          <stop offset="50%" stop-color="#0c5e43"/>
          <stop offset="100%" stop-color="#083f53"/>
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#bg)"/>
      <rect x="66" y="66" width="380" height="380" rx="88" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
      <text x="110" y="170" fill="#d8f6e6" font-size="34" font-family="Segoe UI, Arial, sans-serif" letter-spacing="10">KFUPM</text>
      <text x="110" y="255" fill="#ffffff" font-size="84" font-weight="700" font-family="Segoe UI, Arial, sans-serif">Hub</text>
      <text x="110" y="312" fill="rgba(255,255,255,0.82)" font-size="24" font-family="Segoe UI, Arial, sans-serif">Student services</text>
      <text x="110" y="344" fill="rgba(255,255,255,0.82)" font-size="24" font-family="Segoe UI, Arial, sans-serif">in one place</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
