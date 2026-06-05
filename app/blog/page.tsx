import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog | Academia Seúl — Cultura e idioma coreano",
  description:
    "Artículos sobre la lengua y la cultura coreana: Hangul, historia, K-drama, comida y más. Escrito para hispanohablantes por Academia Seúl.",
  alternates: { canonical: "https://www.academiaseul.com/blog" },
};

const posts = [
  {
    slug: "hangul-el-alfabeto-mas-cientifico",
    korean: "한글",
    title: "Hangul: el alfabeto que un rey inventó para su pueblo",
    excerpt:
      "Hace casi 600 años, un rey decidió que leer no podía ser un privilegio. El resultado es uno de los sistemas de escritura más lógicos del mundo — y puedes aprender a leerlo en una hora.",
    date: "5 de junio, 2026",
    readTime: "6 min",
    tag: "Cultura",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <Navigation solid />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-14 px-6 md:px-12 text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          블로그 · Blog
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-4">
          Cultura coreana, <span className="text-seoul-red">sin filtros</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Historias del idioma, la comida, los dramas y todo lo que hace única a
          Corea — contado para hispanohablantes.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] hover:shadow-[10px_10px_0_#C8001E] hover:border-seoul-red hover:-translate-x-1 hover:-translate-y-1 transition-all p-8 md:p-10 mb-8"
          >
            <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-4">
              <span className="bg-seoul-red text-white px-3 py-1">{post.tag}</span>
              <span className="text-gray-400">{post.date}</span>
              <span className="text-gray-400">· {post.readTime} de lectura</span>
            </div>
            <div className="flex items-start gap-6">
              <span
                className="text-6xl md:text-7xl font-black text-seoul-red leading-none"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {post.korean}
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-seoul-black leading-tight mb-3 group-hover:text-seoul-red transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
            <div className="mt-6 text-seoul-red font-bold text-sm">
              Leer artículo →
            </div>
          </Link>
        ))}

        <p className="text-center text-gray-400 text-sm mt-12">
          Más artículos muy pronto. 화이팅 chingu! 🇰🇷
        </p>
      </section>

      <Footer />
    </main>
  );
}
