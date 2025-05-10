import './body.css';
import { useNavigate } from 'react-router-dom';
function Body() {
 
  const navigate = useNavigate();
  return (
    <div class="landing-page">
    <div class="background"></div>
    <div class="content">
      <div class="container">
        <div class="info">
          <div class="text">Write and Read Blogs</div>
          <button onClick={()=> navigate('/signin')}>Get started</button>
        </div>
        <div class="image">
          <img src="https://i.postimg.cc/65QxYYzh/001234.png" alt="Blog Illustration"/>
        </div>
      </div>
    </div>
  </div>
  );
}
export default Body;