class BookModel{
    

    constructor(
        id,
        title,
        author,
        description,
        copies,
        copiesAvailable,
        category,
        img
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
    }
}
export default BookModel;