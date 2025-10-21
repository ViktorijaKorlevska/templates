import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'customImage',
  title: 'Image',
  type: 'object',
  initialValue: {
    position: 'center',
    width: 'big',
  },
  fields: [
    defineField({
      name: 'image',
      title: 'Image*',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          {title: 'Big', value: 'big'},
          {title: 'Medium', value: 'medium'},
          {title: 'Small', value: 'small'},
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      width: 'width',
      position: 'position',
      media: 'image',
    },
    prepare(selection) {
      const {title, width, position, media} = selection
      return {
        title: title || 'Image',
        subtitle: `TYPE: Image - WIDTH: ${width} - POSITION: ${position}`,
        media,
      }
    },
  },
})
