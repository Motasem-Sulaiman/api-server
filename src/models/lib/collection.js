class Collection {
  constructor(model) {
    this.model = model;
  }
  async add(obj) {
    let newRecord = await this.model.create(obj);
    return newRecord;
  }

  async read(data_id) {
    let records = null;
    if (data_id) {
      records = await this.model.findOne({
        where: {
          id: data_id,
        },
      });
    } else {
      records = await this.model.findAll();
    }
    return records;
  }

  async update(obj, authorId) {
    let foundAuthors = await this.model.findOne({
      where: {
        id: authorId,
      },
    });
    let updatedAuthors = await foundAuthors.update(obj);

    return updatedAuthors;
  }

 async delete(data_id) {
   let record= await this.model.destroy({
    where: {
      id: data_id,
    },
  });
     return record;

  }

  async readAuthorBooks(authorId, model) {
    let record = await this.model.findOne({
        where: { id:authorId} ,
        include: model,
    });

    return record;
}
}

module.exports = Collection;
