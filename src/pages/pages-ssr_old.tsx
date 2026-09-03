import { GetServerSideProps } from "next";
import Link from "next/link";

interface SSRProps {
  serverTime: string;
  randomUser: {
    name: string;
    email: string;
  };
}

export default function SSRPage({ serverTime, randomUser }: SSRProps) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "40px" }}>
      <h1>SSR (Server-Side Rendering) 服务端渲染</h1>
      <p>这个页面是在每次用户请求时，由 Node.js 服务端实时渲染出来的。</p>

      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>服务端实时获取的数据：</h3>
        <p>
          <strong>渲染时间:</strong> {serverTime} (每次刷新页面时间都会更新)
        </p>
        <p>
          <strong>随机用户姓名:</strong> {randomUser.name}
        </p>
        <p>
          <strong>随机用户邮箱:</strong> {randomUser.email}
        </p>
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

// 每次请求该页面时，都会在服务端执行此函数
export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context,
) => {
  // 模拟从数据库或外部 API 获取数据
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users/" +
      Math.floor(Math.random() * 10 + 1),
  );
  const data = await res.json();

  return {
    props: {
      serverTime: new Date().toISOString(),
      randomUser: {
        name: data.name,
        email: data.email,
      },
    },
  };
};
