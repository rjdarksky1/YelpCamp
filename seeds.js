var mongoose = require('mongoose'),
    User = require('./models/user'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

// const user_seeds = [
//     {
//         username: 'applepen',
//         password: 'password'
//     },
//     {
//         name: 'orangepen',
//         image: 'password'
//     },
//     {
//         username: 'pearlpen',
//         password: 'password'
//     },
//     {
//         name: 'cherrypen',
//         image: 'password'
//     }
// ]

// const users = [];



function seedDB() {
    User.remove({}, err => {
        if (err) {
            console.log(err);
        }
        // console.log('removed all users');
        // user_seeds.forEach(user => {
        //     Comment.create(user, (err, newlyCreatedUser) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log('added a user');
        //             console.log(newlyCreatedUser);
        //             users.push(newlyCreatedUser);
        //         }
        //     });

        // });
        seedCampgrounds();
    });
}

const campground_seeds = [
    {
        name: 'Shenandoah',
        image: 'https://static.rootsrated.com/image/upload/s--uxxfqkR_--/t_rr_large_natural/bvqrnzvre3gfpinodils.jpg',
        description: 'So many campgrounds are here you have plenty of choices!'
    },
    {
        name: 'Greenbelt Park',
        image: 'https://www.nps.gov/common/uploads/grid_builder/gree/crop16_9/1F887D58-1DD8-B71B-0B0FA3BF75F5D2E5.jpg',
        description: 'Lots of green surrounding the "Greenbelt"!'
    },
    {
        name: 'Salmon Creek',
        image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg',
        description: `This is Salmon Creek where you'll find tons of wild salmon swimming around!`
    },
    {
        name: `Cloud's Rest`,
        image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
        description: 'Even clouds can rest here!'
    },
    {
        name: 'Mount Rainier',
        image: 'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg',
        description: 'You can reserve sites at the Cougar Rock and Ohanapecosh Rock campgrounds by visiting the Recreation.gov web site.'
    }
]


function seedCampgrounds() {
    Campground.remove({}, err => {
        if (err) {
            console.log(err);
        }
        // console.log('removed all campgrounds!');

        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            } else {
                // console.log('removed campgrounds!');
                // add a few campgrounds
                campground_seeds.forEach(campground => {
                    Campground.create(campground, (err, newlyCreatedCampground) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('added a campground');
                            // create a comment
                            Comment.create(
                                {
                                    text: 'This place is great, but I wish there was internet',
                                    author: 'Homer'
                                }, (err, comment) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        newlyCreatedCampground.comments.push(comment);
                                        newlyCreatedCampground.save();
                                        console.log(newlyCreatedCampground.comments.length);
                                        console.log('Created new comment');
                                    }
                                });
                        }
                    });
                });
            }
        });
    });
}

module.exports = seedDB;
