import { useLocation , Route , Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import SideBar from './components/SideBar';
import History from './pages/History';
import Posts from './pages/subpages/Posts';
import Meeting from './pages/subpages/LiveChat';
import CommentTable from './pages/subpages/Comments';
import Jobs from './pages/subpages/Jobs';
import MediaLibrary from './pages/subpages/MediaLibrary';
import SEOManagement from './pages/subpages/SEOManagement';
import AddPost from './pages/subpages/AddPost';

function App() {
  const location = useLocation(); 
  const noSidebarPaths = ["/", "/content-manager", "/history"];
  const hideSideBar = !noSidebarPaths.includes(location.pathname);
  return (

      <div className='flex bg-zinc-800 w-full'>
        
        {!hideSideBar && (
          <div className='flex-3/12'>
          <SideBar/>
          </div>
        )}
          
        
        <div className={!hideSideBar ? 'flex-9/12' : 'flex-12/12'}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/content-manager" element={<ContentManager/>} />
            
            <Route path="/history" element={<History/>} />
            <Route path="/content-manager/posts" element={<Posts/>} />
            <Route path="/content-manager/metting" element={<Meeting/>} />
            <Route path="/content-manager/SEO" element={<SEOManagement/>} />
            <Route path="/content-manager/comments" element={<CommentTable/>} />
            <Route path="/content-manager/jobs" element={<Jobs/>} />
            <Route path="/content-manager/media" element={<MediaLibrary/>} />
            <Route path="/content-manager/posts/add-post" element={<AddPost/>} />
          </Routes>
        </div>
        
      </div>

  )
}

export default App
