import { v4 as uuid } from "uuid";

export class Todo{


    constructor(title){
        this.id = uuid();
        this.title = title;
        this.done = false;
        this.createdAt = new Date();
    }
}