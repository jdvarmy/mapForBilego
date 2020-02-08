import { action, observable } from 'mobx';

class DataStore{
    width = window.innerWidth;
    @observable isSmallScreen = false;

    constructor(){
        this.setScreen();

        window.addEventListener("resize", this.setScreen);
    }

    @action
    setScreen = () => {
        this.isSmallScreen = window.innerWidth < 577 && window.innerWidth !== 0;
    }
}

export const dataStore = new DataStore();
