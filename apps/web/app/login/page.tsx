export default function LoginPage() {
  return (
    <main>
      <h2>Login</h2>
      <form style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
