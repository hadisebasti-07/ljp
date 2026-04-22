import { useEffect } from 'react'

const SITE_NAME = 'Little Joy Play'
const BASE_URL = 'https://www.littlejoyplay.sg'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export default function SEO({ title, description, path = '', image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Spark Your Child's Imagination`
  const url = `${BASE_URL}${path}`
  const ogImage = image || DEFAULT_IMAGE

  useEffect(() => {
    document.title = fullTitle
    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', url, true)
    setMeta('og:image', ogImage, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('twitter:card', 'summary_large_image', true)
    setMeta('twitter:title', fullTitle, true)
    setMeta('twitter:description', description, true)
    setMeta('twitter:image', ogImage, true)
    setCanonical(url)
  }, [fullTitle, description, url, ogImage])

  return null
}

function setMeta(name, content, isProperty = false) {
  if (!content) return
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}
