export default function({ store, redirect }) {
  // 開発環境以外でユーザーが認証されていないとき
  if (process.env.NODE_ENV !== 'development' && !store.state.user.apiToken) {
    return redirect('/login');
  }
}
