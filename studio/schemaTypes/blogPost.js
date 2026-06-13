export default {
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title / H1', type: 'string', validation: Rule => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: Rule => Rule.required()},
    {name: 'excerpt', title: 'Excerpt / Subtitle', type: 'text', rows: 3},
    {name: 'publishedAt', title: 'Published at', type: 'datetime', initialValue: () => new Date().toISOString()},
    {name: 'published', title: 'Published', type: 'boolean', initialValue: true},
    {name: 'seoTitle', title: 'SEO title', type: 'string', validation: Rule => Rule.max(70)},
    {name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, validation: Rule => Rule.max(170)},
    {name: 'coverImage', title: 'Cover image', type: 'image', options: {hotspot: true}},
    {name: 'body', title: 'Article body', type: 'blockContent'},
  ],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt', media: 'coverImage'},
  },
  orderings: [
    {title: 'Published date, new', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
}
