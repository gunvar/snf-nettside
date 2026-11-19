import { defineField, defineType } from "sanity";

export const fyrverkeriHenvendelse = defineType({
  name: "fyrverkeriHenvendelse",
  title: "Fyrverkeri – henvendelse fra bedrift",
  type: "document",
  description:
    "Kommer fra bedriftsskjemaet på kampanjesiden. Send faktura (eller sjekk Vipps), og sett deretter den tilhørende gaven til «Betalt» og «Godkjent».",
  fields: [
    defineField({ name: "bedrift", title: "Bedrift", type: "string" }),
    defineField({ name: "belop", title: "Beløp (kr)", type: "number" }),
    defineField({
      name: "betaling",
      title: "Betaling",
      type: "string",
      options: {
        list: [
          { title: "Faktura", value: "faktura" },
          { title: "Vipps", value: "vipps" },
        ],
      },
    }),
    defineField({ name: "kontaktNavn", title: "Kontaktperson", type: "string" }),
    defineField({ name: "kontaktEpost", title: "E-post", type: "string" }),
    defineField({ name: "orgnr", title: "Org.nr.", type: "string" }),
    defineField({
      name: "gaveRef",
      title: "Referanse til gaven",
      type: "string",
      description: "Samme referanse står på gaven under «Fyrverkeri-gave».",
    }),
    defineField({ name: "mottatt", title: "Mottatt", type: "datetime" }),
    defineField({
      name: "behandlet",
      title: "Behandlet (faktura sendt / betaling sjekket)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { bedrift: "bedrift", belop: "belop", betaling: "betaling", behandlet: "behandlet" },
    prepare({ bedrift, belop, betaling, behandlet }) {
      return {
        title: `${bedrift || "Ukjent"} – ${(belop ?? 0).toLocaleString("nb-NO")} kr`,
        subtitle: `${betaling || ""}${behandlet ? " · behandlet" : " · NY"}`,
      };
    },
  },
  orderings: [
    { title: "Nyeste først", name: "nyeste", by: [{ field: "mottatt", direction: "desc" }] },
  ],
});
