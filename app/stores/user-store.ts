import { PersonDTO } from '../api/person/route';

class UserStore {
    currentUser: PersonDTO | null = null;
}

export const userStore = new UserStore();
