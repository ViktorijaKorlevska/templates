import {defineType, defineField} from 'sanity'

const supportedLanguages = [
  {title: 'English', value: 'en'},
  {title: 'Macedonian (.mk)', value: 'mk'},
  {title: 'Serbian (.rs)', value: 'rs'},
  {title: 'Slovenian (.si)', value: 'si'},
  {title: 'Croatian (.hr)', value: 'hr'},
  {title: 'Bosnian (.ba)', value: 'ba'},
  {title: 'Albanian (.al)', value: 'al'},
  {title: 'Greek (.gr)', value: 'gr'},
]

export default defineType({
  name: 'translationSet',
  title: 'Translation Set',
  type: 'object',
  description: 'Translations for each supported language',
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.value,
      title: lang.title,
      type: 'text',
      rows: 3,
    }),
  ),
  preview: {
    select: {
      english: 'en',
      macedonian: 'mk',
    },
    prepare({english, macedonian}) {
      return {
        title: english || macedonian || 'Translation Set',
        subtitle: `${english ? 'EN: ' + english.substring(0, 50) : ''}${english && macedonian ? ' | ' : ''}${macedonian ? 'MK: ' + macedonian.substring(0, 50) : ''}`,
      }
    },
  },
})
