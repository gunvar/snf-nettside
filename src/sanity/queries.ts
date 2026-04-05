export const NYHETER_QUERY = `*[_type == "nyhet"] | order(dato desc) {
  _id,
  tittel,
  slug,
  dato,
  kategori,
  ingress,
  bilde {
    asset-> {
      _id,
      url
    }
  }
}`;

export const NYHETER_SISTE_QUERY = `*[_type == "nyhet"] | order(dato desc) [0...3] {
  _id,
  tittel,
  slug,
  dato,
  kategori,
  ingress,
  bilde {
    asset-> {
      _id,
      url
    }
  }
}`;

export const NYHET_SLUG_QUERY = `*[_type == "nyhet" && slug.current == $slug][0] {
  _id,
  tittel,
  slug,
  dato,
  kategori,
  ingress,
  innhold,
  bilde {
    asset-> {
      _id,
      url
    }
  }
}`;

export const ARRANGEMENTER_QUERY = `*[_type == "arrangement" && dato >= now()] | order(dato asc) {
  _id,
  tittel,
  slug,
  dato,
  sluttdato,
  type,
  sted,
  beskrivelse,
  bilde {
    asset-> {
      _id,
      url
    }
  },
  pamelding,
  pris
}`;

export const ARRANGEMENTER_AVHOLDTE_QUERY = `*[_type == "arrangement" && dato < now()] | order(dato desc) [0...10] {
  _id,
  tittel,
  slug,
  dato,
  type,
  sted,
  bilde {
    asset-> {
      _id,
      url
    }
  }
}`;

export const ARRANGEMENTER_SISTE_QUERY = `*[_type == "arrangement" && dato >= now()] | order(dato asc) [0...3] {
  _id,
  tittel,
  slug,
  dato,
  type,
  bilde {
    asset-> {
      _id,
      url
    }
  }
}`;

export const ARRANGEMENT_SLUG_QUERY = `*[_type == "arrangement" && slug.current == $slug][0] {
  _id,
  tittel,
  slug,
  dato,
  sluttdato,
  type,
  sted,
  beskrivelse,
  innhold,
  bilde {
    asset-> {
      _id,
      url
    }
  },
  pamelding,
  maksAntall,
  pris,
  prisIkkeMedlem,
  stripePriceId
}`;
