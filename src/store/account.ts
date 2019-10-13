import api from '../api';

const states: any = {
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
    setGender(state: any, value: string) {
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
                commit('setFirstName', account.firstName);
                commit('setLastName', account.lastName);
                commit('setEmail', account.email);
                commit('setPhone', account.phone);
                commit('setBirthday', account.birthday);
                commit('setGender', account.gender);
                commit('setIsSignedIn', true);
                commit('setAvatar', account.avatar);
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
