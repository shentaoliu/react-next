import Link from 'next/link';
import { ArrowLeft, FileBox } from 'lucide-react';

// 模拟构建时获取静态数据
async function getPosts() {
  // 在 App Router 中，fetch 默认是开启缓存的 (force-cache)
  // 这等同于 Pages Router 中的 getStaticProps
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function SSGPage() {
  const posts = await getPosts();
  const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> 返回首页
        </Link>

        <article className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <FileBox size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SSG (静态站点生成) 在 App Router 中的实现</h1>
              <p className="text-sm text-gray-500">Static Site Generation / Static Rendering</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-8">
            <p>
              在 Next.js App Router 中，路由默认就是<strong>静态渲染</strong>的（除非使用了动态函数或动态配置）。
            </p>
            <p>
              原生的 <code>fetch</code> API 默认会缓存数据 (<code>cache: 'force-cache'</code>)，这意味着在 <code>npm run build</code> 时，
              页面就会被编译成静态 HTML 和静态的数据载荷，带来极致的访问速度。
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">构建时固定的数据 (刷新页面不会改变)</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-emerald-700/70 font-medium">静态构建时间:</span>
              <span className="font-mono text-emerald-900 bg-white px-2 py-1 rounded border border-emerald-100">{buildTime}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">预渲染的文章列表</h3>
            <div className="space-y-4">
              {posts.map((post: any) => (
                <div key={post.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <h4 className="font-medium text-gray-900 capitalize">{post.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}