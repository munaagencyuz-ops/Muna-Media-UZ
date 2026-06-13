export default {
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required()},
    {name: 'company', title: 'Company', type: 'string', validation: Rule => Rule.required()},
    {name: 'task', title: 'Task / Budget', type: 'text', validation: Rule => Rule.required()},
    {name: 'page', title: 'Page', type: 'string'},
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {list: ['new', 'contacted', 'qualified', 'rejected']},
    },
    {name: 'submittedAt', title: 'Submitted at', type: 'datetime'},
  ],
  preview: {
    select: {title: 'company', subtitle: 'name'},
  },
}
