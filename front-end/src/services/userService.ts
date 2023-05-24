


export default class UserService {

    private static instance: UserService;
    private static _name: string;
    private static storage: any;
    private static key_name: string = 'user_name';

    private constructor() { 
        UserService.storage = sessionStorage
        if(!this.id){
            UserService._name = btoa(Math.random().toString()).substring(10,25)
            UserService.storage.setItem(UserService.key_name, UserService._name)
        }
    }
    
    public static getInstance(): UserService {
        if (!UserService.instance) 
            UserService.instance = new UserService();
        return UserService.instance;
    }
    
    public get id() : string {
        return UserService._name || UserService.storage?.getItem(UserService.key_name) || ''
    }
}