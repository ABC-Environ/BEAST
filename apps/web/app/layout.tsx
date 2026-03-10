export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, Arial', margin: 0, padding: 16 }}>{children}</body>
    </html>
  );
}
