module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		// console.log(req.session);   
		// var str='var isLogin = true;var userId='+req.session.userInfo._id+";";
		//                                        
		res.send(`var isLogin=true;var userId='${req.session.userInfo._id}'; `)

	}else {
		res.send('var isLogin = false')
	}
};
 