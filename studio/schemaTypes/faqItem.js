export default {
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  fields: [
    {name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required()},
    {name: 'answer', title: 'Answer', type: 'text', validation: Rule => Rule.required()},
    {name: 'order', title: 'Order', type: 'number'},
    {name: 'published', title: 'Published', type: 'boolean', initialValue: true},
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
}
