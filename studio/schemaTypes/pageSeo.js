export default {
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fields: [
    {
      name: 'path',
      title: 'Page path',
      type: 'string',
      description: 'Examples: /, /about.html, /services-uzbekistan.html, /seo-optimization.html',
      validation: Rule => Rule.required(),
    },
    {name: 'metaTitle', title: 'Meta title', type: 'string', validation: Rule => Rule.max(70)},
    {name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, validation: Rule => Rule.max(170)},
    {name: 'h1', title: 'H1 heading', type: 'string'},
    {name: 'subtitle', title: 'Hero subtitle', type: 'text', rows: 3},
    {name: 'canonicalUrl', title: 'Canonical URL', type: 'url'},
    {name: 'noindex', title: 'Noindex', type: 'boolean', initialValue: false},
  ],
  preview: {
    select: {title: 'path', subtitle: 'metaTitle'},
  },
}
