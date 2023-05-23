import { Toaster } from 'react-hot-toast';
import BookCatalog from './components/bookCatalog/BookCatalog';
import './styles/App.css';

export default function App() {
  return (
    <div className="App">
      <Toaster toastOptions={{ duration: 4000 }} />
      <BookCatalog />
    </div>
  );
}
