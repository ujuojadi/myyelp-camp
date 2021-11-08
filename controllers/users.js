const User = require('../models/user');

module.exports.renderRegister= (req, res)=>{
    res.render('users/register')
}

module.exports.register=async(req, res)=>{
    try{
        const {email, password, username} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success', 'You registered Successfully');
            res.redirect('/campgrounds');
        })
        
    }catch(e){
        req.flash('error', e.message);
        res.redirect('register')
    }
    
}
module.exports.renderLogin=(req, res)=>{
    res.render('users/login');
}
module.exports.Login=(req, res)=>{
    req.flash('success', 'You have successfully logged in');
    const redirectUrl  = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);

}

module.exports.Logout=(req, res)=>{
    req.logout();
    req.flash('success', 'Successfully logged you out')
    res.redirect('/campgrounds')
}