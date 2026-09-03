import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* 极简顶部导航 */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            className="font-semibold text-lg text-gray-900 tracking-tight"
          >
            Taoliu's Blog
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-gray-500">
            <Link href="/" className="text-gray-900 transition-colors">
              文章
            </Link>
            <Link
              href="#about"
              className="hover:text-gray-900 transition-colors"
            >
              关于
            </Link>
            <Link
              href="/pages-router_old"
              className="hover:text-gray-900 transition-colors"
            >
              旧版示例
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          {/* 个人简介区 */}
          <section className="mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              你好，我是 Taoliu 👋
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-6">
              我是一名前端开发者，热爱构建干净、高效且用户体验良好的 Web
              应用。这里记录了我的技术探索、学习笔记和生活感悟。
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
              >
                GitHub <ArrowRight size={14} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
              >
                Twitter <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* 文章列表区 */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen size={24} className="text-gray-400" />
                最新文章
              </h2>
            </div>

            <div className="space-y-6">
              {/* SSR 示例入口 */}
              <article className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                <Link href="/ssr" className="block">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                      Dynamic
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> 每次请求刷新
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    SSR: 服务端动态渲染示例
                  </h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    使用 force-dynamic 或 no-store 实现的传统
                    SSR。页面会在每次用户请求时实时在服务端渲染，适用于数据实时性要求高的场景。
                  </p>
                  <div className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    查看示例 <ChevronRight size={16} />
                  </div>
                </Link>
              </article>

              {/* SSG 示例入口 */}
              <article className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                <Link href="/ssg" className="block">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                      Static
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> 构建时生成
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    SSG: 静态站点生成示例
                  </h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    App Router 的默认行为。页面在 npm run build
                    期间被预先渲染为静态
                    HTML，提供极致的首屏加载速度和最低的服务器开销。
                  </p>
                  <div className="text-sm font-medium text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    查看示例 <ChevronRight size={16} />
                  </div>
                </Link>
              </article>

              {/* ISR 示例入口 */}
              <article className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer">
                <Link href="/isr" className="block">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                      Incremental
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> 周期性后台更新
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    ISR: 增量静态再生示例
                  </h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    完美结合了 SSG 的速度和 SSR 的动态能力。使用 revalidate
                    选项让页面在后台定期自动重新构建，无需重启服务器。
                  </p>
                  <div className="text-sm font-medium text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    查看示例 <ChevronRight size={16} />
                  </div>
                </Link>
              </article>
            </div>

            <div className="mt-8 text-center">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50">
                加载更多文章
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* 极简页脚 */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Taoliu's Blog. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition-colors">
              RSS
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Site Map
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
