import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'object',
  fields: [
    defineField({name: 'instagram', type: 'url', title: 'Instagram'}),
    defineField({name: 'facebook', type: 'url', title: 'Facebook'}),
    defineField({name: 'tiktok', type: 'url', title: 'TikTok'}),
    defineField({name: 'youtube', type: 'url', title: 'YouTube'}),
    defineField({name: 'linkedin', type: 'url', title: 'LinkedIn'}),
    defineField({name: 'fitkit', type: 'url', title: 'FitKit'}),
    defineField({name: 'sportmaster', type: 'url', title: 'SportMaster'}),
  ],
})
