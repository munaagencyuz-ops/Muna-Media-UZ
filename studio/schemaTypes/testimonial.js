export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', validation: Rule => Rule.required()},
    {name: 'author', title: 'Author', type: 'string'},
    {name: 'company', title: 'Company', type: 'string'},
    {name: 'published', title: 'Published', type: 'boolean', initialValue: true},
  ],
}
