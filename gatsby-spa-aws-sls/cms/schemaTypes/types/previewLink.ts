export default {
  name: 'previewLink',
  title: 'Preview Link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'string',
      description: 'Enter a URL to generate a preview card with SEO metadata',
      validation: (Rule: any) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection: any) {
      const {url} = selection
      return {
        title: 'CUSTOM PREVIEW LINK: (metadata card will be rendered on the website)',
        subtitle: url,
        media: () => '🔗',
      }
    },
  },
}
