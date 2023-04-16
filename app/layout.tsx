import "./globals.css";
import "./buttons.css";

export const config = {
  runtime: "edge",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
