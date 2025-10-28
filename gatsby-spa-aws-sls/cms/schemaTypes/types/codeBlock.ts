import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code*',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'Python', value: 'python'},
          {title: 'JSON', value: 'json'},
          {title: 'Bash', value: 'bash'},
          {title: 'SQL', value: 'sql'},
          {title: 'React JSX', value: 'jsx'},
          {title: 'React TSX', value: 'tsx'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      code: 'code',
      language: 'language',
    },
    prepare(selection) {
      const {code, language} = selection
      return {
        title: 'Code Block',
        subtitle: `Language: ${language || 'Plain text'} - ${code?.substring(0, 50)}...`,
        media: () => '💻',
      }
    },
  },
})
