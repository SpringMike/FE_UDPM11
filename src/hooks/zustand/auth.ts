import create from 'zustand'

export type RoleType = 'anonymous' | 'user' | 'admin'

export interface updateAuthParams {
    newRole: RoleType
    newAccessToken: string,
    newName: string
}

interface AuthState {
    role: RoleType
    accessToken: string
    name: string
    updateAuth: (params: updateAuthParams) => void
    resetAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    role: localStorage.getItem('UDPM11-role')
        ? (localStorage.getItem('UDPM11-role') as RoleType)
        : 'anonymous',
    accessToken: localStorage.getItem('UDPM11-accessToken')
        ? (localStorage.getItem('UDPM11-accessToken') as string)
        : 'empty access token',
    name: localStorage.getItem('UDPM11-name')
        ? (localStorage.getItem('UDPM11-name') as string)
        : 'default',

    updateAuth: (newAuth) => {
        localStorage.setItem('UDPM11-role', newAuth.newRole)
        localStorage.setItem('UDPM11-accessToken', newAuth.newAccessToken)
        localStorage.setItem('UDPM11-name', newAuth.newName)
        set({ role: newAuth.newRole, accessToken: newAuth.newAccessToken, name: newAuth.newName })
    },
    resetAuth: () => {
        localStorage.removeItem('UDPM11-role')
        localStorage.removeItem('UDPM11-accessToken')
        localStorage.removeItem('UDPM11-name')
        set({ role: 'anonymous', accessToken: "empty access token", name: 'default' })
    },
}))