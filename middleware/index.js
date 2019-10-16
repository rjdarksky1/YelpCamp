var Campground = require('../models/campground'),
    Comment = require('../models/comment');

var middlewareObj = {};


middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user.username);
        return next();
    }
    console.log('user is not logged in');
    req.flash('error', 'Please log in first');
    res.redirect('/login');
}


middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err || !foundCampground) {
                req.flash('error', 'Campground not found');
                res.redirect('back');
            } else {
                // does user own the campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', `You don't have the permission to do this`);
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please log in');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err || !foundComment) {
                req.flash('error', 'Something went wrong');
                res.redirect('back');
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', `You don't have the permission to do this`);
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please log in');
        res.redirect('back');
    }
}

// console.log('middlewareObj.isLoggedIn type is ' + typeof(middlewareObj.isLoggedIn));
module.exports = middlewareObj;