import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'domain',
  title: 'Domains',
  type: 'document',
  fields: [
    // Domain Info
    defineField({
      name: 'domainName',
      title: 'Domain Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'domainUrl',
      title: 'Domain URL',
      type: 'string',
      validation: (Rule) => Rule.required().uri({allowRelative: false}),
    }),
    // Languages
    defineField({
      name: 'defaultLanguage',
      title: 'Default Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Macedonian (.mk)', value: 'mk'},
          {title: 'Serbian (.rs)', value: 'rs'},
          {title: 'Slovenian (.si)', value: 'si'},
          {title: 'Croatian (.hr)', value: 'hr'},
          {title: 'Bosnian (.ba)', value: 'ba'},
          {title: 'Albanian (.al)', value: 'al'},
          {title: 'Greek (.gr)', value: 'gr'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'supportedLanguages',
      title: 'Supported Languages',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'English', value: 'en'},
              {title: 'Macedonian (.mk)', value: 'mk'},
              {title: 'Serbian (.rs)', value: 'rs'},
              {title: 'Slovenian (.si)', value: 'si'},
              {title: 'Croatian (.hr)', value: 'hr'},
              {title: 'Bosnian (.ba)', value: 'ba'},
              {title: 'Albanian (.al)', value: 'al'},
              {title: 'Greek (.gr)', value: 'gr'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    // SEO Settings
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Title'}),
        defineField({name: 'description', type: 'text', title: 'Meta Description'}),
        defineField({
          name: 'image',
          type: 'image',
          title: 'SEO Image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()},
          ],
        }),
        defineField({
          name: 'tags',
          type: 'array',
          title: 'SEO Tags',
          of: [{type: 'string'}],
          options: {layout: 'tags'},
        }),
      ],
    }),
    // Social Media (must exist in your schema)
    defineField({name: 'socialMedia', title: 'Social Media', type: 'socialMedia'}),
    // Policies (must exist in your schema)
    defineField({name: 'termsAndConditions', title: 'Terms and Conditions', type: 'blockContent'}),
    defineField({name: 'privacyPolicy', title: 'Privacy Policy', type: 'blockContent'}),
    defineField({name: 'cookiePolicy', title: 'Cookie Policy', type: 'blockContent'}),
  ],
})
