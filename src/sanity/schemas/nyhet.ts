import { defineField, defineType } from "sanity";

export const nyhet = defineType({
  name: "nyhet",
  title: "Nyhet",
  type: "document",
  fields: [
    defineField({
      name: "tittel",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-slug",
      type: "slug",
      options: { source: "tittel", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dato",
      title: "Dato",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Strategi", value: "Strategi" },
          { title: "Organisasjon", value: "Organisasjon" },
          { title: "Næringsliv", value: "Næringsliv" },
          { title: "Bosetting", value: "Bosetting" },
          { title: "Sentrum", value: "Sentrum" },
          { title: "Arrangement", value: "Arrangement" },
        ],
      },
    }),
    defineField({
      name: "ingress",
      title: "Ingress",
      type: "text",
      rows: 3,
      description: "Kort oppsummering som vises i oversikten",
    }),
    defineField({
      name: "innhold",
      title: "Innhold",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "bilde",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "vedlegg",
      title: "Vedlegg",
      type: "array",
      description: "Dokumenter til nedlasting (f.eks. PDF, referat, brosjyre)",
      of: [
        defineField({
          name: "vedleggsfil",
          title: "Vedlegg",
          type: "object",
          fields: [
            defineField({
              name: "fil",
              title: "Fil",
              type: "file",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "tittel",
              title: "Visningsnavn",
              type: "string",
              description:
                "Tekst som vises på lenken. Står dette tomt, brukes filnavnet.",
            }),
          ],
          preview: {
            select: { title: "tittel", fil: "fil.asset.originalFilename" },
            prepare({ title, fil }) {
              return { title: title || fil || "Vedlegg" };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "tittel", subtitle: "dato", media: "bilde" },
  },
  orderings: [
    {
      title: "Dato, nyeste først",
      name: "datoDesc",
      by: [{ field: "dato", direction: "desc" }],
    },
  ],
});
