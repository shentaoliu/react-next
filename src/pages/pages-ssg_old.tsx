import { GetStaticProps } from "next";
import Link from "next/link";

interface SSGProps {
  buildTime: string;
  posts: Array<{ id: number; title: string }>;
}

export default function SSGPage({ buildTime, posts }: SSGProps) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "40px" }}>
      <h1>SSG (Static Site Generation) 静态站点生成</h1>
      <p>
        这个页面是在项目 <code>next build</code> 阶段预先生成好的静态 HTML。
      </p>

      <div
        style={{
          background: "#e6f7ff",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>构建时固定的数据：</h3>
        <p>
          <strong>构建时间:</strong> {buildTime} (刷新页面不会改变，直到下次重新
          build)
        </p>

        <h4>文章列表 (预渲染)：</h4>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Link href="/pages-router_old" style={{ color: "blue" }}>
          返回旧版演示页
        </Link>
        {" | "}
        <Link href="/" style={{ color: "blue" }}>
          前往新版首页
        </Link>
      </div>
    </div>
  );
}

// 在构建时 (build time) 执行，生成静态文件
export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  // 模拟构建时获取静态数据
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
  );
  const posts = await res.json();

  return {
    props: {
      buildTime: new Date().toISOString(),
      posts: posts.map((p: any) => ({ id: p.id, title: p.title })),
    },
  };
};
