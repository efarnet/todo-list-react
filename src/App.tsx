import { withAuth } from "./hoc/withAuth";

function App() {
  return <div>Hello World</div>;
}

const AuthApp = withAuth(App);

export default AuthApp;
