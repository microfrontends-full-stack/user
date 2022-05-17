import User from "./components/user/UserComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function Root(props) {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/create" element={<User create={true} />} />
					<Route path="/edit/:id" element={<User create={false} />} />
				</Routes>
			</div>
		</Router>
	);
}
