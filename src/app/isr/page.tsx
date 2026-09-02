import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

// 这等同于 Pages Router 中的 revalidate 选项
// 设置页面级别的重验证时间（秒）
export const revalidate = 10;
export const dynamic = 'force-static'; // 明确告诉 Next.js 这是一个静态页面，配合 revalidate 实现 ISR

async function getRandomFact() {
  // App Router 也支持在单个 fetch 请求上配置 next.revalidate
  const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', {
    next: { revalidate: 10 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function ISRPage() {
  const factData = await getRandomFact();
  const generateTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> 返回首页
        </Link>

        <article className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <RefreshCw size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ISR (增量静态再生) 在 App Router 中的实现</h1>
              <p className="text-sm text-gray-500">Incremental Static Regeneration</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-8">
            <p>
              ISR 允许我们在不重新构建整个站点的情况下，在后台更新静态页面。
            </p>
            <p>
              在 App Router 中，我们可以通过导出 <code>export const revalidate = 10</code>，或者在 <code>fetch</code> 中配置 <code>{'{'} next: {'{'} revalidate: 10 {'}'} {'}'}</code> 来实现。
            </p>
            <p className="text-sm bg-gray-50 p-3 rounded text-gray-600">
              💡 <strong>测试方法</strong>：如果在 10 秒内刷新页面，数据不会改变。当超过 10 秒后第一次刷新时，会触发后台重新生成，再下一次刷新就能看到新数据了。
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">增量更新的数据</h3>
            
            <div className="mb-6 pb-6 border-b border-amber-100/50">
              <span className="block text-amber-700/70 font-medium mb-2">最近一次后台生成时间:</span>
              <span className="font-mono text-amber-900 bg-white px-2 py-1 rounded border border-amber-100">{generateTime}</span>
            </div>

            <div>
              <span className="block text-amber-700/70 font-medium mb-2">随机冷知识:</span>
              <p className="text-amber-900 text-lg font-medium leading-relaxed bg-white/50 p-4 rounded-lg">
                {factData.text}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}