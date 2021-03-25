const db = require('./firebase');
const api = {
    createError: (message, data) => {
        return {
            success: false,
            message,
            ...data
        };
    },
    createSuccess: (data) => {
        return {
            success: true,
            ...data
        };
    },
    getNextUserId: async () => {
        let ref = db.ref('global');
        let result = await ref.once('value');

        if (result.exists()) {
            let old = result.val()['user_id'];
            await ref.update({
                user_id: (old + 1)
            });

            return old;
        } else {
            await ref.set({
                post_id: 1
            });

            return 0;
        }
    },
    getUser: async (uid) => {
        let ref = db.ref(`users/${uid}`);
        let result = await ref.once('value');

        if (result.exists()) {
            return api.createSuccess({
                user: result.val()
            });
        } else {
            return api.createError(`User with id: ${uid} does not exist.`);
        }
    },
    createUserEntry: async () => {
        let uid = await api.getNextUserId();
        let result = await api.getUser(uid);
        if (result.success)
            // odd? should not exist....
            return api.createError(`User with id: ${uid} already exists somehow?`);

        try {
            let ref = db.ref(`users/${uid}`);
            await ref.set({
                uid,
                transcript: null,
                time: null,
                startDate: null,
                endDate: null,
                status: '0',
                name: null,
                address: null,
                lat: null,
                long: null
            });

            return api.createSuccess({
                uid
            });
        } catch (e) {
            return api.createError(`Error creating initial user entry [id: ${uid}]: ${e.message}`);
        }
    },
    updateUserEntry: async (uid, newData) => {
        let result = await api.getUser(uid);
        if (!result.success)
            return api.createError(`User with id: ${uid} does not exist.`);
        
        try {
            let ref = db.ref(`users/${uid}`);
            await ref.update(newData);

            return api.createSuccess();
        } catch (e) {
            return api.createError(`Error updating user entry [id: ${uid}]: ${e.message}`);
        }
    },
    getUsers: async () => {
        let ref = db.ref('users');
        let result = await ref.once('value');
        if (!result.exists()) return api.createSuccess({ users: [] });

        let users = [];
        for (let [name, data] of Object.entries(result.val()))
            users.push(data);
        
        return api.createSuccess({ users });
    }
};

module.exports = api;