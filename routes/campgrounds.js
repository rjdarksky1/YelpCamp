var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware');

// SHOW ALL CAMPGROUNDS
router.get('/', (req, res) => {
    Campground.find({}, (err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', { campgrounds: foundCampgrounds });
        }
    });
});

// CREATE - add new campground to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name, image: image, price: price,
        description: description, author: author
    };
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            console.log('newly created campground: ' + newlyCreated);
            // redirect back
            res.redirect('/campgrounds');
        }
    }
    );

});

// NEW - show form to create new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

// SHOW - show more info on each one
router.get('/:id', (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id)
        .populate('comments')
        .exec((err, foundCampground) => {
            if (err) {
                console.log(err);
            } else {
                // render show template with that campground
                res.render('campgrounds/show', { campground: foundCampground });
            }
        });
});

// Edit - show make changes form
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', { campground: foundCampground });
    });
});

// use method override to pass a put request
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,
        (err, updatedCampground) => {
            if (err) {
                res.redirect('/campgrounds');
            } else {
                //redirect somewhere(show page)
                res.redirect('/campgrounds/' + updatedCampground._id);
            }
        });
});


router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id,
        () => {
            res.redirect('/campgrounds');
        });
});


module.exports = router;