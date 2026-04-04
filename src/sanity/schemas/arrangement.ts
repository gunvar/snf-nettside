import { defineField, defineType } from "sanity";

export const arrangement = defineType({
  name: "arrangement",
  title: "Arrangement",
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
      title: "Dato og tid",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sluttdato",
      title: "Sluttdato og tid",
      type: "datetime",
    }),
    defineField({
      name: "type",
      title: "Type arrangement",
      type: "string",
      options: {
        list: [
          { title: "Medlemsarrangement", value: "Medlemsarrangement" },
          { title: "Faglig", value: "Faglig" },
          { title: "Nettverk", value: "Nettverk" },
          { title: "Internt", value: "Internt" },
          { title: "Festival", value: "Festival" },
        ],
      },
    }),
    defineField({
      name: "sted",
      title: "Sted",
      type: "string",
    }),
    defineField({
      name: "beskrivelse",
      title: "Kort beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "innhold",
      title: "Detaljert beskrivelse",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "bilde",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pamelding",
      title: "Påmelding åpen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "maksAntall",
      title: "Maks antall deltakere",
      type: "number",
      description: "La stå tom for ubegrenset",
    }),
    defineField({
      name: "pris",
      title: "Pris (kr)",
      type: "number",
      description: "0 eller tom = gratis",
      initialValue: 0,
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description: "Fylles inn kun for betalte arrangementer",
      hidden: ({ document }) => !document?.pris || (document.pris as number) <= 0,
    }),
  ],
  preview: {
    select: { title: "tittel", subtitle: "dato", media: "bilde" },
  },
  orderings: [
    {
      title: "Dato, neste først",
      name: "datoAsc",
      by: [{ field: "dato", direction: "asc" }],
    },
  ],
});
