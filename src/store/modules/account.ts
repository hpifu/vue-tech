import api from '@/api';

const states: any = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: '',
    avatar: '',
    isSignedIn: false,
};

const mutations = {
    setID(state: any, value: number) {
        state.id = value;
    },
    setFirstName(state: any, value: string) {
        state.firstName = value;
    },
    setLastName(state: any, value: string) {
        state.lastName = value;
    },
    setEmail(state: any, value: string) {
        state.email = value;
    },
    setPhone(state: any, value: string) {
        state.phone = value;
    },
    setPassword(state: any, value: string) {
        state.password = value;
    },
    setCode(state: any, value: string) {
        state.code = value;
    },
    setBirthday(state: any, value: string) {
        state.birthday = value;
    },
    setGender(state: any, value: number) {
        state.gender = value;
    },
    setIsSignedIn(state: any, value: boolean) {
        state.isSignedIn = value;
    },
    setAvatar(state: any, value: string) {
        state.avatar = value;
    },
};

const actions = {
    getAccount({ commit }: { commit: any }, token: string) {
        api.account.getAccount(token, (res: any) => {
            if (res.status === 200) {
                const account = res.data;
                commit('setID', account.id);
                commit('setFirstName', account.firstName);
                commit('setLastName', account.lastName);
                commit('setEmail', account.email);
                commit('setPhone', account.phone);
                commit('setBirthday', account.birthday);
                commit('setGender', account.gender);
                commit('setAvatar', account.avatar);
                commit('setIsSignedIn', true);
            }
        }, (err: any) => {
            // console.log(err)
        });
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
