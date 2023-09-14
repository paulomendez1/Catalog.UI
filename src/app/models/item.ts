export class Item {
    public constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.labelName = '';
        this.price = new Price();
        this.pictureUri = '';
        this.releaseDate = new Date();
        this.format = '';
        this.availableStock = 0;
        this.genreId = '';
        this.artistId = '';
    }

    id: string;
    name: string;
    description: string;
    labelName: string;
    price: Price;
    pictureUri: string;
    releaseDate: Date;
    format: string;
    availableStock: number;
    genreId: string;
    artistId: string;
}

export class Price {
    public constructor() {
        this.amount = 0;
        this.currency = '';
    }
    amount: number;
    currency: string;
}