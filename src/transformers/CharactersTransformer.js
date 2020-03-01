export class CharactersTransformer {
  static fetch (data) {
    return data.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description.length ? item.description : '-',
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      }
    })
  }
}
