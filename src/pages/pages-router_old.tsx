import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "40px" }}>
      <h1>React + Next.js 渲染方案演示</h1>
      <p>
        这是一个基于 Next.js (Pages Router) + TypeScript 的基础渲染方案示例。
      </p>

      <ul style={{ lineHeight: "1.8" }}>
        <li>
          <Link href="/pages-ssr_old" style={{ color: "blue" }}>
            查看 SSR (服务端渲染 - Server-Side Rendering) 示例
          </Link>{" "}
          — 每次请求时在服务端动态生成页面内容。
        </li>
        <li>
          <Link href="/pages-ssg_old" style={{ color: "blue" }}>
            查看 SSG (静态站点生成 - Static Site Generation) 示例
          </Link>{" "}
          — 在构建时预先生成静态 HTML，访问速度极快。
        </li>
        <li>
          <Link href="/pages-isr_old" style={{ color: "blue" }}>
            查看 ISR (增量静态再生 - Incremental Static Regeneration) 示例
          </Link>{" "}
          — SSG 的进阶版，允许在不重新构建整个站点的情况下更新静态页面。
        </li>
      </ul>
    </div>
  );
}
