import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'object',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
    }),
    defineField({
      name: 'locationAddress',
      title: 'Location Address',
      type: 'array',
      of: [{type: 'locationAddress'}],
    }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [{type: 'phoneNumber'}],
    }),
  ],
})
