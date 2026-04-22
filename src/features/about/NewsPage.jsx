import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import './AboutPages.css'

const articles = [
  {
    id: 'ntu-nie',
    tag: 'Press Feature',
    title: 'Featured by NTU National Institute of Education',
    excerpt: 'Little Joy Play was cited by NTU\'s National Institute of Education — Singapore\'s leading teacher education institution — spotlighting the rise in demand for sensory and child-led play.',
    date: '2025',
    image: '/images/press/ntu_ljp.png',
    link: '/press/ntu-nie',
    external: false,
  },
  {
    id: 'straits-times',
    tag: 'Press Feature',
    title: 'Featured in The Straits Times 🥳',
    excerpt: 'Little Joy Play was featured in The Straits Times Life Parenting section, spotlighting the rise in demand for sensory play and child-led activities in Singapore.',
    date: '21 April 2025',
    image: '/images/press/st_ljp.jpg',
    link: '/press/straits-times',
    external: false,
  },
  {
    id: 'smile-tutor',
    tag: 'Press Feature',
    title: 'Top 10 Best Sensory Play Spots in Singapore — Smile Tutor',
    excerpt: 'Little Joy Play was listed among the top sensory play destinations in Singapore by Smile Tutor, recognised for our play-based, child-led approach to early learning.',
    date: '2025',
    image: '/images/press/smile_ljp.png',
    link: 'https://smiletutor.sg/top-10-best-sensory-play-spots-in-singapore-for-kids/',
    external: true,
  },
  {
    id: 'sassy-mama',
    tag: 'Press',
    title: 'Top Baby Classes In Singapore Featured By Sassy Mama',
    excerpt: 'Little Joy Play has been recognised in Sassy Mama\'s guide to top baby classes and playgroups in Singapore — a testament to our commitment to enriching sensory play experiences.',
    date: '2024',
    image: '/images/press/sassy_ljp.png',
    link: '/press/sassy-mama',
    external: false,
  },
]

export default function NewsPage() {
  return (
    <div className="news-page">
      <SEO
        title="News"
        description="Latest news and updates from Little Joy Play — press features, new programmes, and announcements."
        path="/news"
      />

      <section className="page-hero">
        <div className="container">
          <p className="section-label">Latest Updates</p>
          <h1 className="section-title">News</h1>
          <p className="section-subtitle">
            Stay up to date with what's happening at Little Joy Play — press features,
            new programmes, and more.
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--section-pad)', background: 'var(--color-white)' }}>
        <div className="container">
          <div className="news-grid">
            {articles.map((a) => {
              const card = (
                <article className={`news-card${a.link ? ' news-card--linked' : ''}`}>
                  <div className="news-card__image">
                    {a.image
                      ? <img src={a.image} alt={a.title} />
                      : a.emoji}
                  </div>
                  <div className="news-card__body">
                    <p className="news-card__tag">{a.tag}</p>
                    <h2 className="news-card__title">{a.title}</h2>
                    <p className="news-card__excerpt">{a.excerpt}</p>
                    <div className="news-card__meta">
                      <span>📅</span> {a.date}
                    </div>
                    {a.link && <span className="news-card__cta">Read more →</span>}
                  </div>
                </article>
              )
              if (!a.link) return <div key={a.id}>{card}</div>
              if (a.external) return (
                <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{card}</a>
              )
              return <Link key={a.id} to={a.link} style={{ textDecoration: 'none' }}>{card}</Link>
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
