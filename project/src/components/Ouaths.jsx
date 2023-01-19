
import Ouathbutton from './Ouathbutton';

function Ouaths() {
  const handleClick = name => {
    if (name === 'google') {
      window.location.href = 'http://pikcha36.o-r.kr:8080/oauth2/authorization/google'
    } else if (name === 'kakao') {
      window.location.href = `http://pikcha36.o-r.kr:8080/oauth2/authorization/google`;
    }
  };
  return (
    <Ouathbutton>
      <button className="goolobutton" onClick={() => handleClick('google')}>
        Log in with Google
      </button>
    </Ouathbutton>
  );
}

export default Ouaths;