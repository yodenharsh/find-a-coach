export default {
  userId(state: { userId: any }) {
    return state.userId;
  },
  token(state: { token: string | null }): string | null {
    return state.token;
  },
  isAuthenticated(state: { token: string | null }): boolean {
    return !!state.token;
  },
};
