import {defineField, defineType} from 'sanity'

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
  name: 'translations',
  title: 'Translations',
  type: 'document',
  icon: () => '🌐',
  fields: [
    defineField({
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      description:
        'Unique identifier for this translation (e.g., "header_welcome", "button_submit")',
      validation: (Rule) => [
        Rule.required().error('Translation key is required'),
        Rule.regex(/^[a-z0-9_]+$/).error(
          'Key can only contain lowercase letters, numbers, and underscores',
        ),
        Rule.min(2).error('Key must be at least 2 characters'),
        Rule.max(100).error('Key cannot exceed 100 characters'),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Group translations by category (e.g., "navigation", "forms", "errors")',
      options: {
        list: [
          {title: 'Navigation', value: 'navigation'},
          {title: 'Forms', value: 'forms'},
          {title: 'Buttons', value: 'buttons'},
          {title: 'Messages', value: 'messages'},
          {title: 'Errors', value: 'errors'},
          {title: 'Content', value: 'content'},
          {title: 'SEO', value: 'seo'},
          {title: 'Common', value: 'common'},
          {title: 'Other', value: 'other'},
        ],
      },
      initialValue: 'common',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description to provide context for translators',
      rows: 2,
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
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
      validation: (Rule) => Rule.required().error('At least one translation is required'),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active translations will be published',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'category',
      description: 'description',
      isActive: 'isActive',
      englishText: 'translations.en',
    },
    prepare(selection) {
      const {title, subtitle, description, isActive, englishText} = selection
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle || 'uncategorized'} ${!isActive ? '(inactive)' : ''}`,
        description: description || englishText || 'No description',
      }
    },
  },
  orderings: [
    {
      title: 'Key A-Z',
      name: 'keyAsc',
      by: [{field: 'key', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'key', direction: 'asc'},
      ],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{field: '_updatedAt', direction: 'desc'}],
    },
  ],
})
