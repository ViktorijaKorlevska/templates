import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'locationAddress',
  title: 'Location Address',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Address Label',
      type: 'string',
      placeholder: 'e.g., Main Office, Headquarters',
    }),
    defineField({
      name: 'street',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State/Province',
      type: 'string',
    }),
    defineField({
      name: 'zipCode',
      title: 'ZIP/Postal Code',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      street: 'street',
      city: 'city',
    },
    prepare({label, street, city}) {
      return {
        title: label || 'Address',
        subtitle: `${street}, ${city}`,
      }
    },
  },
})
