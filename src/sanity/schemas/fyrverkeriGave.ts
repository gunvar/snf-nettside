import { defineField, defineType } from "sanity";

export const fyrverkeriGave = defineType({
  name: "fyrverkeriGave",
  title: "Fyrverkeri-gave",
  type: "document",
  description:
    "Én gave til nyttårsfyrverkeriet. Gaver med status «Betalt» teller i summen. Navn og logo vises først når «Godkjent» er huket av.",
  fields: [
    defineField({
      name: "ref",
      title: "Referanse",
      type: "string",
      description: "Unik id. Fylles automatisk for Vipps. For manuelle gaver: f.eks. faktura-2026-01.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "belop",
      title: "Beløp (kr)",
      type: "number",
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: "kilde",
      title: "Kilde",
      type: "string",
      initialValue: "faktura",
      options: {
        list: [
          { title: "Vipps", value: "vipps" },
          { title: "Faktura", value: "faktura" },
          { title: "Kontant / manuell Vipps", value: "kontant" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "betalt",
      options: {
        list: [
          { title: "Opprettet", value: "opprettet" },
          { title: "Autorisert", value: "autorisert" },
          { title: "Betalt", value: "betalt" },
          { title: "Avbrutt", value: "avbrutt" },
          { title: "Utløpt", value: "utlopt" },
          { title: "Refundert", value: "refundert" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "synlighet",
      title: "Synlighet",
      type: "string",
      initialValue: "navn",
      options: {
        list: [
          { title: "Vis navn", value: "navn" },
          { title: "Vis logo", value: "logo" },
          { title: "Anonym", value: "anonym" },
        ],
      },
    }),
    defineField({
      name: "navn",
      title: "Navn som vises",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "PNG, JPG eller WebP. Vises fra 5 000 kr.",
    }),
    defineField({
      name: "godkjent",
      title: "Godkjent for visning",
      type: "boolean",
      initialValue: false,
      description:
        "Huk av når navnet/logoen er sjekket. Uten dette vises gaven som en anonym stjerne.",
    }),
    defineField({ name: "opprettet", title: "Opprettet", type: "datetime" }),
    defineField({
      name: "betaltTidspunkt",
      title: "Betalt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      navn: "navn",
      belop: "belop",
      status: "status",
      godkjent: "godkjent",
      media: "logo",
    },
    prepare({ navn, belop, status, godkjent, media }) {
      return {
        title: `${(belop ?? 0).toLocaleString("nb-NO")} kr – ${navn || "Anonym"}`,
        subtitle: `${status}${godkjent ? " · godkjent" : " · ikke godkjent"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Nyeste først",
      name: "nyesteFirst",
      by: [{ field: "betaltTidspunkt", direction: "desc" }],
    },
  ],
});
