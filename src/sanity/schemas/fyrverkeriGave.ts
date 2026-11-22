import { defineField, defineType } from "sanity";

export const fyrverkeriGave = defineType({
  name: "fyrverkeriGave",
  title: "Fyrverkeri-gave",
  type: "document",
  description:
    "Én gave til nyttårsfyrverkeriet. «Betalt» og «Meldt inn» teller i summen og vises på siden. Har noen ikke betalt: sett Status til «Avbrutt». Husk Publish.",
  fields: [
    defineField({
      name: "godkjent",
      title: "Vis navn/logo på siden",
      type: "boolean",
      initialValue: true,
      description:
        "Står på som standard. Slå av for å skjule navnet/logoen. Beløpet teller fortsatt, som en anonym stjerne.",
    }),
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
          { title: "Meldt inn (vises, ikke betalt ennå)", value: "meldt" },
          { title: "Opprettet (vises ikke)", value: "opprettet" },
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
        subtitle: `${status}${godkjent === false ? " · navn skjult" : ""}`,
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
