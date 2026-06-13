export default {
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    {name: 'brand', title: 'Brand', type: 'string', validation: Rule => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'brand'}, validation: Rule => Rule.required()},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'summary', title: 'Summary', type: 'text'},
    {name: 'metrics', title: 'Metrics', type: 'array', of: [{type: 'object', fields: [
      {name: 'label', title: 'Label', type: 'string'},
      {name: 'value', title: 'Value', type: 'string'},
    ]}]},
    {name: 'body', title: 'Body', type: 'blockContent'},
    {name: 'published', title: 'Published', type: 'boolean', initialValue: true},
  ],
  preview: {select: {title: 'brand', subtitle: 'title'}},
}
