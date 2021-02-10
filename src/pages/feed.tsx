import { GetServerSidePropsContext } from 'next';
import RSS from 'rss';
import posts from "@.contents/posts.json";

async function generateFeedXml() {
  const feed = new RSS({
    title: "私の記事のRSS",
    description: "各種ブログRSSの集約",
    site_url: "https://team-blog-hub-silk.vercel.appL",
    feed_url: "https://team-blog-hub-silk.vercel.app/feed",
    language: 'ja',
  });
  
  posts?.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.contentSnippet + "",
      date: new Date(post.isoDate),
      url: post.link,
    });
  })
  
  // XML形式の文字列にする
  return feed.xml();
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml(); // フィードのXMLを生成する（後述）

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュする
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
