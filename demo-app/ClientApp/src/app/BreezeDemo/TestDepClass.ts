export class TestDepClass {

    // Instance variables
    private name: string = "Name #1";


    // Property Accessors

    get Name(): string {
        return this.name;
    }
    set Name(value: string) {
        this.name = value;
    }
}
