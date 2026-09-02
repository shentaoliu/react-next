import Link from 'next/link';
import { ArrowLeft, Server } from 'lucide-react';

// 在 App Router 中，默认组件就是 Server Component
// 如果我们需要强制动态渲染（相当于 Pages Router 的 getServerSideProps）
// 可以导出动态配置，或者在组件内使用诸如 cookies(), headers() 这样的动态函数
export const dynamic = 'force-dynamic';

async function getData() {
  // 模拟从数据库或外部 API 获取数据，这里添加了 no-store 来确保每次请求都重新获取
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10 + 1)}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function SSRPage() {
  // 服务端组件支持直接 await 异步数据
  const userData = await getData();
  const serverTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> 返回首页
        </Link>

        <article className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Server size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SSR (服务端渲染) 在 App Router 中的实现</h1>
              <p className="text-sm text-gray-500">Server-Side Rendering / Dynamic Rendering</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-8">
            <p>
              在 Next.js App Router 中，所有的组件默认都是 <strong>Server Components（服务端组件）</strong>。
            </p>
            <p>
              为了实现传统意义上的 SSR（每次请求时重新渲染），我们可以通过导出 <code>export const dynamic = 'force-dynamic'</code>，
              或者在 fetch 请求中设置 <code>{'{'} cache: 'no-store' {'}'}</code> 来告诉 Next.js 不要缓存这个页面。
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">实时请求的数据 (刷新页面会改变)</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-blue-100/50 pb-3">
                <span className="text-blue-700/70 w-32 font-medium">服务端渲染时间:</span>
                <span className="font-mono text-blue-900 bg-white px-2 py-1 rounded border border-blue-100">{serverTime}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-blue-100/50 pb-3">
                <span className="text-blue-700/70 w-32 font-medium">随机用户姓名:</span>
                <span className="font-medium text-blue-900">{userData.name}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-blue-700/70 w-32 font-medium">随机用户邮箱:</span>
                <span className="text-blue-900">{userData.email}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}