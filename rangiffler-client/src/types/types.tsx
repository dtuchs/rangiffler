export type User = {
    id: number,
    username: string,
    firstName: string,

    lastName: string,
    avatar: string,
    friends?: User[],
}

export type ApiCountry = {
    id: number,
    code: string,
    name: string,
};

export type MapCountry = {
    country: string,
    value: number,
};

export type Photo = {
    userId?: string,
    src: string,
    countryCode: string,
    description?: string,
}
