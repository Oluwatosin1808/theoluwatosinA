import { defineField, defineType } from 'sanity';

/**
 * Personal project — side projects, experiments and open source.
 *
 * Published documents are fetched by PERSONAL_PROJECTS_QUERY in
 * src/lib/sanity.ts and rendered in the "Personal projects" section of the
 * site (src/PortfolioV2.tsx). Fields are intentionally flat: the card needs
 * nothing more than a title, a cover image and a link.
 */
export const personalProject = defineType({
  name: 'personalProject',
  title: 'Personal Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'Eyebrow shown on the card, e.g. "Tool · CLI" or "Experiment · WebGL"',
    }),
    defineField({
      name: 'tags',
      type: 'string',
      title: 'Tags',
      description: 'Comma-separated, shown on the card, e.g. "React, Vite"',
    }),
    defineField({
      name: 'year',
      type: 'string',
      title: 'Year',
      description: 'e.g. 2026',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Cover image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      rows: 3,
      description: 'One or two sentences about the project.',
    }),
    defineField({
      name: 'liveUrl',
      type: 'url',
      title: 'Live URL',
      description: 'Where visitors can try it (optional).',
    }),
    defineField({
      name: 'repoUrl',
      type: 'url',
      title: 'Repository URL',
      description: 'GitHub/GitLab link (optional).',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Sort order',
      description: 'Lower numbers come first. Leave empty to sort newest first.',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: true,
      description: 'Uncheck to keep it in the Studio without showing it on the site.',
    }),
  ],
  orderings: [
    {
      title: 'Sort order, ascending',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'image' },
  },
});
