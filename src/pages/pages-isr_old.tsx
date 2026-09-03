import { GetStaticProps } from "next";
import Link from "next/link";

interface ISRProps {
  buildTime: string;
  randomFact: string;
}

export default function ISRPage({ buildTime, randomFact }: ISRProps) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "40px" }}>
      <h1>ISR (Incremental Static Regeneration) 增量静态再生</h1>
      <p>
        这个页面在构建时生成，但会在后台根据设置的 <code>revalidate</code>{" "}
        时间定期自动重新生成。
      </p>

      <div
        style={{
          background: "#f6ffed",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>增量静态生成的数据：</h3>
        <p>
          <strong>生成时间:</strong> {buildTime}
        </p>
        <p>
          <em>
            (注意：如果在 10 秒内频繁刷新，此时间不会变；超过 10
            秒后的下一次访问会触发后台重建，再下一次访问时就会看到新时间。)
          </em>
        </p>

        <h4>随机冷知识：</h4>
        <p>{randomFact}</p>
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

// 在构建时生成静态文件，并支持增量更新
export const getStaticProps: GetStaticProps<ISRProps> = async () => {
  // 模拟获取随机数据
  const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
  const data = await res.json();

  return {
    props: {
      buildTime: new Date().toISOString(),
      randomFact: data.text || "无法获取冷知识",
    },
    // ISR 核心配置：最多每 10 秒重新生成一次页面
    revalidate: 10,
  };
};
