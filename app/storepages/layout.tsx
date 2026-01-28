
import Header from "../component/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Header always gets the search state */}
        <Header />
        {/* Render children normally */}
        {children}
      </body>
    </html>
  );
}
