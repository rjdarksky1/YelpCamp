var express = require('express'),
    router = express.Router({ mergeParams: true }),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');

// console.log('middleware.isLoggedIn type is ' + typeof(middleware.isLoggedIn)); 

router.get('/new', middleware.isLoggedIn,
    (req, res) => {
        // find campground by id
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                console.log(err);
            } else {
                res.render('comments/new', { campground: campground });
            }
        });
    });

router.post('/', middleware.isLoggedIn,
    (req, res) => {
        //lookup campground using ID
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                // console.log(err);
                req.flash('error', 'The campground does not exist');
                res.redirect('/campgrounds');
            } else {
                // Comment.create(req.body.comment, (err, comment) => {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         comment.author.id = req.user._id;
                //         comment.author.username = req.user.username;
                //         comment.save();
                //         campground.comments.push(comment);
                //         campground.save();
                //         res.redirect('/campgrounds/' + campground._id);
                //     }
                // });

                var newComment = {
                    text: req.body.comment.text,
                    author:
                    {
                        id: req.user._id,
                        username: req.user.username
                    }
                }

                Comment.create(newComment, (err, newlyCreated) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('newly created comment: ' + newlyCreated);
                        campground.comments.push(newlyCreated);
                        campground.save();
                        req.flash('success', 'Your comment has been posted');
                        res.redirect('/campgrounds/' + campground._id);
                    }
                });

            }
        });
    });

// show COMMENT edit form
router.get('/:comment_id/edit', middleware.checkCommentOwnership,
    (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err || !foundCampground) {
                req.flash('error', 'No campground found');
                return res.redirect('back');
            }
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if (err || !foundComment) {
                    req.flash('error', 'Something went wrong');
                    res.redirect('back');
                } else {
                    res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
                }
            });
        });
    });

// COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership,
    (req, res) => {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
            if (err) {
                res.redirect('back');
            } else {
                // redirect back to campground
                res.redirect('/campgrounds/' + req.params.id);
            }
        });
    });

// COMMENT destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success', "Comment has been deleted");
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


module.exports = router;