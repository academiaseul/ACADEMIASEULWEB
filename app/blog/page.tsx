import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog · Cultura e idioma coreano",
  description:
    "Artículos sobre la lengua y la cultura coreana: Hangul, historia, K-drama, comida y más. Escrito para hispanohablantes por Academia Seúl.",
  alternates: { canonical: "https://www.academiaseul.com/blog" },
  openGraph: {
    title: "Blog · Cultura e idioma coreano · Academia Seúl",
    description: "Artículos sobre el idioma, la cultura y las palabras intraducibles de Corea.",
    url: "https://www.academiaseul.com/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

const posts = [
  {
    slug: "hangeulnal-el-dia-del-alfabeto-coreano",
    korean: "한글날",
    title: "한글날: por qué Corea celebra su alfabeto cada 9 de octubre",
    excerpt:
      "Corea tiene un feriado para su alfabeto. El rey Sejong, el 훈민정음, los letrados que dijeron «mejor no», el ejemplar de 1446 que apareció en 1940 y fijó la fecha, y un reto para leer 한글 en 30 segundos.",
    date: "30 de septiembre, 2026",
    readTime: "9 min",
    tag: "Mitos y fiestas",
  },
  {
    slug: "chuseok-el-dia-de-accion-de-gracias-coreano",
    korean: "추석",
    title: "Chuseok (추석): el Día de Acción de Gracias coreano, con luna llena, 송편 y sets de spam",
    excerpt:
      "Luna llena, pastelitos de arroz en media luna, una mesa servida para los antepasados y millones de personas en la carretera. Qué es 추석, cuándo cae, por qué el spam se regala en caja y cómo saludar en coreano.",
    date: "30 de septiembre, 2026",
    readTime: "9 min",
    tag: "Mitos y fiestas",
  },
  {
    slug: "como-se-pronuncia-seul-en-coreano",
    korean: "서울",
    title: "En coreano, Seúl no se dice «Se-úl»: así se pronuncia 서울",
    excerpt:
      "En español, «Seúl» está perfecto. En coreano la ciudad es 서울: dos sílabas parejas, una vocal que el español no tiene y una l final como la de «sol». De yapa, 감사합니다, 안녕하세요 y 오빠, que casi todos decimos a la española.",
    date: "30 de septiembre, 2026",
    readTime: "9 min",
    tag: "Pronunciación",
  },
  {
    slug: "gestos-que-delatan-a-un-coreano",
    korean: "인사",
    title: "6 gestos que delatan a un coreano (aunque haya crecido en Chile)",
    excerpt:
      "La venia al teléfono, el vuelto con las dos manos, la edad apenas después del nombre, un «¿comiste?» en vez de «¿cómo estás?», los zapatos fuera y el mito del ventilador: seis costumbres coreanas, cada una con su palabra en coreano.",
    date: "30 de septiembre, 2026",
    readTime: "9 min",
    tag: "Cultura y costumbres",
  },
  {
    slug: "dangun-por-que-corea-nacio-de-una-osa",
    korean: "단군",
    title: "Dangún y el 개천절: por qué Corea nació de una osa (y no de un tigre)",
    excerpt:
      "Una osa y un tigre entran a una cueva con ajo y artemisa; solo una sale humana. El mito de Dangún, el feriado del 3 de octubre y la paciencia en coreano.",
    date: "18 de septiembre, 2026",
    readTime: "8 min",
    tag: "Mitos y fiestas",
  },
  {
    slug: "sopa-de-algas-antes-de-un-examen-supersticion-coreana",
    korean: "미역국",
    title: "Por qué en Corea nadie come sopa de algas antes de un examen",
    excerpt:
      "La sopa de algas (미역국) es la de cumpleaños y del posparto, pero antes de un examen está prohibida: en coreano reprobar es «resbalarse». Regalos pegajosos y el día en que Corea se detiene.",
    date: "18 de septiembre, 2026",
    readTime: "8 min",
    tag: "Cultura y comida",
  },
  {
    slug: "por-que-en-corea-no-existe-el-piso-4",
    korean: "4층",
    title: "El piso F: por qué en muchos edificios de Corea no existe el piso 4",
    excerpt:
      "Entras a un ascensor en Seúl y los botones dicen 1, 2, 3, F, 5. El 4 se pronuncia igual que «muerte» y por eso muchos edificios lo esconden. De paso, los números sino-coreanos.",
    date: "18 de septiembre, 2026",
    readTime: "7 min",
    tag: "Curiosidades",
  },
  {
    slug: "nunchi-el-arte-coreano-de-leer-el-ambiente",
    korean: "눈치",
    title: "눈치 (nunchi): el superpoder coreano de leer el ambiente",
    excerpt:
      "Existe una palabra coreana para esa habilidad de entrar a un lugar y, sin que nadie diga nada, saber exactamente qué está pasando. Una vez que la conoces, la ves en todas partes — incluso en tus K-dramas favoritos.",
    date: "7 de junio, 2026",
    readTime: "5 min",
    tag: "Palabras intraducibles",
  },
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
    <main className="min-h-screen bg-[#F4F7FF]">
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
            className="group block border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] hover:shadow-[10px_10px_0_#3D2EE8] hover:border-seoul-red hover:-translate-x-1 hover:-translate-y-1 transition-all p-8 md:p-10 mb-8"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold tracking-wider uppercase mb-4">
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
