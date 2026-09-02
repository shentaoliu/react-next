import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextEnterprise | 下一代企业级 Web 架构',
  description: '基于 Next.js App Router 和 Tailwind CSS 构建的现代企业级官方网站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
