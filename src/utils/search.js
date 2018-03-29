export let elasticSearch = fields => query => obj =>
  fields.some(
    field =>
      obj &&
      obj[field] &&
      JSON.stringify(obj[field])
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
