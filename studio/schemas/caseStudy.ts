import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * One flexible "section" object with all-optional fields. This mirrors
 * `CaseStudySection` in src/components/CaseStudyModal.tsx exactly, so GROQ
 * results can be handed to the existing modal renderer without a mapper.
 */
export const caseStudySection = defineType({
  name: 'caseStudySection',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({ name: 'title', type: 'string', title: 'Heading' }),
    defineField({
      name: 'paragraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [{ type: 'string' }],
      options: { layout: 'textarea' },
    }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'num', type: 'string', title: 'Number' }),
            defineField({ name: 'desc', type: 'string', title: 'Description' }),
          ],
          preview: { select: { title: 'num', subtitle: 'desc' } },
        }),
      ],
    }),
    defineField({
      name: 'cards',
      type: 'array',
      title: 'Cards',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'body', type: 'text', title: 'Body' }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'steps',
      type: 'array',
      title: 'Steps',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'step', type: 'string', title: 'Step label', description: 'e.g. "01"' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'body', type: 'text', title: 'Body' }),
          ],
          preview: { select: { title: 'title', subtitle: 'step' } },
        }),
      ],
    }),
    defineField({
      name: 'bullets',
      type: 'array',
      title: 'Bullets',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tech',
      type: 'array',
      title: 'Tech pills',
      description: 'Small label pills, e.g. "Next.js"',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'results',
      type: 'array',
      title: 'Results',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'body', type: 'text', title: 'Body' }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'table',
      type: 'object',
      title: 'Table',
      fields: [
        defineField({
          name: 'headers',
          type: 'array',
          title: 'Headers',
          description: 'Exactly two column headers',
          validation: (rule) => rule.min(2).max(2).required(),
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'col1', type: 'string', title: 'Left cell' }),
                defineField({ name: 'col2', type: 'string', title: 'Right cell' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'quote',
      type: 'object',
      title: 'Quote',
      fields: [
        defineField({ name: 'text', type: 'text', title: 'Quote' }),
        defineField({ name: 'cite', type: 'string', title: 'Attribution' }),
      ],
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description:
        'Absolute image URLs, e.g. "/img/case-0.webp" (files served from public/img). Uploading to Sanity assets directly is a later upgrade.',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'eyebrow', subtitle: 'title' },
  },
});

/** The case study document — mirrors `CaseStudyData` in CaseStudyModal.tsx. */
export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used to match this document to a project on the site.',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverMeta',
      type: 'array',
      title: 'Cover meta',
      description: 'The small label/value rows on the case study cover.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [defineArrayMember({ type: 'caseStudySection' })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
});
