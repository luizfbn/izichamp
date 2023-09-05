import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Champions from './Pages/Champions';
import Champion from './Pages/Champion';
import NotFound from './Pages/NotFound';
import Footer from './Components/Footer';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/champions' element={<Champions />} />
					<Route path='/champions/:id' element={<Champion />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
