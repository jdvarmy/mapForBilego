class DataStore{
    width = window.innerWidth;
    isSmallScreen = window.innerWidth < 721;
    isVerySmallScreen = window.innerWidth <= 375;
}

export const dataStore = new DataStore();