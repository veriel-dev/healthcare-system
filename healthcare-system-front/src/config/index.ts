export const config = {
  auth: {
    front: {
      login: '/auth/login',
      profile: '/auth/profile',
      settings: '/auth/settings',
      get routesSettings() {
        const base = this.settings;
        return {
          profile: base + '/profile',
          account: base + '/account',
          appearance: base + '/appearance',
          notifications: base + '/notifications',
          display: base + '/display',
        };
      },
      get routesProfile() {
        const base = this.profile;
        return {
          users: base + '/users',
          patients: base + '/patients',
          calendar: base + '/calendar',
          reports: base + '/reports',
        };
      },
    },
    backend: {
      authUrlBackend: import.meta.env.VITE_BASE_URL_BACKEND + '/api/v1/auth',
      usersUrlBackend: import.meta.env.VITE_BASE_URL_BACKEND + '/api/v1/users',
      routes: {
        login: '/login',
        register: '/register',
        me: '/me',
        changePassword: '/change-password',
        google: '/google',
        googleCallback: '/google/callback',
        profile: '/profile',
      },
      get fullRoutes() {
        const base = this.authUrlBackend;
        return {
          login: base + this.routes.login,
          register: base + this.routes.register,
          me: base + this.routes.me,
          changePassword: base + this.routes.changePassword,
          google: base + this.routes.google,
          googleCallback: base + this.routes.googleCallback,
        };
      },
    },
  },
};
