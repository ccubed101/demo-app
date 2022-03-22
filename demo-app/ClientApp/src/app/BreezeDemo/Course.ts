import { Entity, EntityAspect, EntityType } from 'breeze-client';

export interface ICourse {
    id: string;
    title: string;
    credits: number;
}


//export class Course implements Entity {

//     Construction
//    constructor(
//        id: number,
//        title: string,
//        credits: number
//    ) {
//        this.Id = id;
//        this.Title = title;
//        this.Credits = credits;
//    }


//    // Instance variables.
//    public Id: number;
//    public Title: string
//    public Credits: number;
//    public Enrollments: Enrollment[]


//    // Statis methods

//    static get EntityTypeName(): string {
//        return "Course";
//    }


//    // Property Accessors.

//    get Id(): number {
//        return this.id;
//    }
//    set Id(value: number) {
//        this.id = value;
//    }

//    get Title(): string {
//        return this.title;
//    }
//    set Title(value: string) {
//        this.title = value;
//    }

//    get Credits(): number {
//        return this.credits;
//    }
//    set Credits(value: number) {
//        this.credits = value;
//    }

//    get Enrollments(): Enrollment[] {
//        return this.enrollments;
//    }


//    // Entity Interface Methods

//    get entityAspect(): EntityAspect {
//        return this.entityAspect
//    }

//    get entityType(): EntityType {
//        return this.entityType
//    }
//}
