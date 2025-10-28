import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date',
      description: 'When this policy becomes effective',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Override the default page title for SEO',
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      lastUpdated: 'lastUpdated',
      effectiveDate: 'effectiveDate',
    },
    prepare(selection) {
      const {lastUpdated, effectiveDate} = selection
      return {
        title: 'Legal Page Content',
        subtitle: `Updated: ${lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Not set'}`,
      }
    },
  },
})
