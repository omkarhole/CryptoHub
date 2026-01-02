import "./Signup.css";
import { FiLogIn } from 'react-icons/fi';

function Signup({ loginWithRedirect }) {

  return (
    <button
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
      className="signup-btn"
    >
      <span>Sign Up</span>
      <FiLogIn size={20} />
    </button>
  );
}

export default Signup;
