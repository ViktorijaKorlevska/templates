import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'phoneNumber',
  title: 'Phone Number',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Phone Label',
      type: 'string',
      placeholder: 'e.g., Main, Support, Sales',
    }),
    defineField({
      name: 'number',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number'),
    }),
    defineField({
      name: 'type',
      title: 'Phone Type',
      type: 'string',
      options: {
        list: [
          {title: 'Office', value: 'office'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Fax', value: 'fax'},
          {title: 'Support', value: 'support'},
          {title: 'Sales', value: 'sales'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      label: 'label',
      number: 'number',
      type: 'type',
    },
    prepare({label, number, type}) {
      return {
        title: label || 'Phone',
        subtitle: `${number} (${type})`,
      }
    },
  },
})
