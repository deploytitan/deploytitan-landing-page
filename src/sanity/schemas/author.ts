import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
    }),
    defineField({
      name: 'showOnAboutPage',
      title: 'Show on About page',
      type: 'boolean',
      initialValue: false,
      description: 'Enable this to include the author in the About page Team section.',
    }),
    defineField({
      name: 'teamOrder',
      title: 'Team order',
      type: 'number',
      description:
        'Lower numbers appear first in the About page Team section, for example Founder/CEO before CTO.',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
