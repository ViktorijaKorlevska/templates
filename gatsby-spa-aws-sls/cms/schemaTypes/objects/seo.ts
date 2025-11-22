import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'SEO title for this page/domain',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      description: 'Brief description for search engines',
      validation: (Rule) =>
        Rule.max(160).warning('Keep meta description under 160 characters for best SEO'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'SEO Image',
      description: 'Image used when sharing on social media',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'SEO Tags',
      description: 'Keywords and tags for SEO',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'image',
    },
    prepare({title, description, media}) {
      return {
        title: title || 'SEO Settings',
        subtitle: description || 'No description',
        media,
      }
    },
  },
})
