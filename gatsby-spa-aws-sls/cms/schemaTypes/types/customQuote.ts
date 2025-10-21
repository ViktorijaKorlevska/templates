import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'customQuote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'quoteContent',
      title: 'Content*',
      type: 'string',
      description: 'Add your quote here.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'quoteContent',
      author: 'author',
    },
    prepare(selection) {
      const { title, author } = selection
      return {
        title: title || 'Quote',
        subtitle: `TYPE: Quote - AUTHOR: ${author}`,
      }
    },
  },
})
