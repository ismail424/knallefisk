import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Knallefisk',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      {children}
    </>
  );
}
