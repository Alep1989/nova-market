import Login from '../pages/Login';

const LoginModal = ({ onSuccess }) => {
  return (
    <div>
      <Login onSuccess={onSuccess} />
    </div>
  );
};

export default LoginModal;