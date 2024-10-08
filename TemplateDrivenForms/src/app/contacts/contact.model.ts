export interface Contact {
    id: string
    personal: boolean
    firstName: string
    lastName: string
     dateOfBirth: Date | null,
    //dateOfBirth: string
    favoritesRanking: number | null
    phone: Phone
    address: Address
    notes: string
}

export interface Phone {
    phoneNumber: string
    phoneType: string
}

export interface Address {
    streetAddress: string
    city: string
    state: string
    postalCode: string
    addressType: string
}

export const phoneValueTypes = [
    { title: 'Mobile', value: 'mobile' },
    { title: 'Work', value: 'work' },
    { title: 'Other', value: 'other' },
]

export const addressValueTypes = [
    { title: 'Home', value: 'home' },
    { title: 'Work', value: 'work' },
    { title: 'Other', value: 'other' },
]
