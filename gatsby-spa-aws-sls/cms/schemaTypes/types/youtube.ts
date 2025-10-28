import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL*',
      type: 'url',
      description: 'Enter a YouTube video URL',
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ['http', 'https'],
            allowRelative: false,
          })
          .custom((url: string) => {
            if (!url) return true
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
            return youtubeRegex.test(url) || 'Please enter a valid YouTube URL'
          }),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const {url} = selection
      return {
        title: 'YouTube Video',
        subtitle: url,
        media: () => '🎥',
      }
    },
  },
})
