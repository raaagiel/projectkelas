const INITIAL_STATE = {
    id: 0,
    username: '',
    password: '',
    login: false,
    error: '',
    loading: false,
    role: '',
    keranjang: 0,
    totalharga: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, ...action.payload, login: true, loading: false, error: '' }
        case 'LOGIN_LOADING':
            return { ...state, loading: true, error: '' }
        case 'LOGIN_ERROR':
            return { ...state, error: action.payload, loading: false }
        case 'LOGOUT':
            return INITIAL_STATE
        case 'TOTAL_HARGA':
            return { ...state, totalharga: action.payload }
        case 'COUNT_CART':
            return { ...state, keranjang: action.payload }
        default:
            return state
    }
}