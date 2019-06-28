class DataStore{
    constructor(){
        this.isSmallScreen = window.innerWidth < 768;
    }
}

export const dataStore = new DataStore();