export class CharacterComicsTransformer {
  static fetch (data) {
    return data.map(item => {
      return {
        id: item.id,
        title: item.title,
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      }
    })
  }
}
