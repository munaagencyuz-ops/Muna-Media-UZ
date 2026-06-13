export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: Rule => Rule.required()},
    {name: 'shortDescription', title: 'Short description', type: 'text'},
    {name: 'body', title: 'Body', type: 'blockContent'},
    {name: 'order', title: 'Order', type: 'number'},
    {name: 'published', title: 'Published', type: 'boolean', initialValue: true},
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
}
