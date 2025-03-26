"use client";

// import type { Metadata } from "next";
import "./globals.css";
import Footer from "./footer";
import { usePathname } from "next/navigation";

// const metadata: Metadata = {
//   title: "갈래말래",
//   description: "여행 모임 일정 관리 및 장소 추천 커뮤니티 웹 서비스",
//   manifest: "/manifest.json",
// };

export default function RootLayout({
  children,
  showFooter = true,
}: Readonly<{
  children: React.ReactNode;
  showFooter?: boolean;
}>) {
  const pathname = usePathname();
  const noFooterPaths = ["/login", "/forgot-password", "/first" , "/signup"];
  const shouldShowFooter = showFooter && !noFooterPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        {children}
        {shouldShowFooter && <Footer />} {/* shouldShowFooter가 true일 경우에만 Footer 렌더링 */}
      </body>
    </html>
  );
}
