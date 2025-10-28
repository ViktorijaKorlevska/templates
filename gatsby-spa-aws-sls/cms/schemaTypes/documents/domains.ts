import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'domain',
  title: 'Domains',
  type: 'document',
  fieldsets: [
    {
      name: 'domain',
      title: 'Domain Configuration',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'languages',
      title: 'Language Settings',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'seo',
      title: 'SEO & Meta Settings',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'social',
      title: 'Social Media',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'legal',
      title: 'Legal Pages',
      description: 'Legal content that will generate individual pages for this domain',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    // Domain Info
    defineField({
      name: 'domainName',
      title: 'Domain Name',
      type: 'string',
      fieldset: 'domain',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'domainUrl',
      title: 'Domain URL',
      type: 'string',
      fieldset: 'domain',
      validation: (Rule) => Rule.required().uri({allowRelative: false}),
    }),
    // Languages
    defineField({
      name: 'defaultLanguage',
      title: 'Default Language',
      type: 'string',
      fieldset: 'languages',
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
      fieldset: 'languages',
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
      fieldset: 'seo',
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
    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'socialMedia',
      fieldset: 'social',
    }),

    // Legal Pages
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'legalPage',
      fieldset: 'legal',
      description: 'Privacy policy content for this domain. Will be available at /privacy-policy',
    }),
    defineField({
      name: 'termsAndConditions',
      title: 'Terms and Conditions',
      type: 'legalPage',
      fieldset: 'legal',
      description:
        'Terms and conditions content for this domain. Will be available at /terms-and-conditions',
    }),
    defineField({
      name: 'cookiePolicy',
      title: 'Cookie Policy',
      type: 'legalPage',
      fieldset: 'legal',
      description: 'Cookie policy content for this domain. Will be available at /cookie-policy',
    }),
  ],
})
