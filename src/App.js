import './App.css';
import AddPostForm from './features/posts/components/AddPostForm';
import PostsList from './features/posts/components/PostsList';

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
