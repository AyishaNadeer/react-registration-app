export class PersonalInfo{
    
    name = '';
    email = ''; 
    mobile = ''; 
    address1 = '';
    address2 = '';
    address3 = '';
	
    
    constructor(object){
        Object.assign(this, object);
    }
//  constructor(init?: PersonalInfo){
//         Object.assign(this, init);
//     }
}


export class OfficeInfo{
    
    building = '';
    city = ''; 
    landline = ''; 
    address1 = '';
    address2 = '';
    poBox = '';
	
    
    // constructor(object){
    //     Object.assign(this, object);
    // }
//  constructor(init: PersonalInfo){
//         Object.assign(this, init);
//     }
}