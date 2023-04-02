import "./globals.css";
import "./buttons.css";

export const config = {
  runtime: "edge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>testing title placement</title>
      </head>
      <body>
        <button className="button-35">Hi</button>
        {children}
      </body>
    </html>
  );
}
