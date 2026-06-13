export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {name: 'title', title: 'Site title', type: 'string'},
    {name: 'description', title: 'Meta description', type: 'text'},
    {name: 'email', title: 'Email', type: 'string'},
    {name: 'telegram', title: 'Telegram', type: 'string'},
    {name: 'calendlyUrl', title: 'Calendly URL', type: 'url'},
  ],
}
