const Login = () => {
	return (
		<div className="bg-slate-400 w-1/2">
			<h1>Login</h1>
			<form action="#">
				<div>
					<label htmlFor="email">email</label>
					<input type="email" name="email" id="email" required />
				</div>
				<div>
					<label htmlFor="password">password</label>
					<input type="password" name="password" id="password" required />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Login;
