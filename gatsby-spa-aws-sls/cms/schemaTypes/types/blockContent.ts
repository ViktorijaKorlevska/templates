import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineType({
      name: 'block',
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Code', value: 'code'},
          {title: 'Strike-through', value: 'strike-through'},
        ],
        annotations: [
          defineField({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                title: 'URL*',
                type: 'url',
                validation: (Rule) => Rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineField({
      name: 'customImage',
      type: 'customImage',
    }),
    defineField({
      name: 'customQuote',
      type: 'customQuote',
    }),
    defineField({
      name: 'youtube',
      type: 'youtube',
    }),
    defineField({
      name: 'previewLink',
      type: 'previewLink',
    }),
  ],
})
