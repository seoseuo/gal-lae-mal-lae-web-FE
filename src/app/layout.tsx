"use client";
// import type { Metadata } from "next";

// const metadata: Metadata = {
//   title: "갈래말래",
//   description: "여행 모임 일정 관리 및 장소 추천 커뮤니티 웹 서비스",
//   manifest: "/manifest.json",
// };

import "./globals.css";
import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noFooterPaths = ["/login", "/forgot-password", "/first", "/signup", "/profile-set"];
  const shouldShowFooter = !noFooterPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ffffff" />
        {/* manifest.json 링크 추가 */}
        <link rel="manifest" href="/manifest.json" />
        {/* title 추가 */}
        <title>갈래말래</title>
      </head>
      <body>
        {children}
        {shouldShowFooter && <Footer />} {/* shouldShowFooter가 true이면 Footer 렌더링 */}
      </body>
    </html>
  );
}
