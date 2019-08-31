export default function ({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.state.user.apiToken) {
    return redirect('/login')
  }
}