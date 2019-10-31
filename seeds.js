var mongoose = require('mongoose'),
    User = require('./models/user'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

const user_seeds = [
    {
        username: 'applepen',
        password: 'password'
    },
    {
        username: 'orangepen',
        password: 'password'
    },
    {
        username: 'pearpen',
        password: 'password'
    },
    {
        username: 'cherrypen',
        password: 'password'
    },
    {
        username: 'melonpen',
        password: 'password'
    }
]

// const comment_text_seeds = [
//     'This place is great, but I wish there was internet',
//     `It's just amazingly beautifual`,
//     'My favorite campsite to go to and catch salmons!',
//     'These clouds cannot stop me from coming!',
//     'Mount Rainer is a must go if you come to Cougar Rock or Ohanapecosh Rock'
// ]

const campground_seeds = [
    {
        name: 'Shenandoah',
        image: 'https://static.rootsrated.com/image/upload/s--uxxfqkR_--/t_rr_large_natural/bvqrnzvre3gfpinodils.jpg',
        description: 'So many campgrounds are here you have plenty of choices!',
        price: 60
    },
    {
        name: 'Greenbelt Park',
        image: 'https://www.nps.gov/common/uploads/grid_builder/gree/crop16_9/1F887D58-1DD8-B71B-0B0FA3BF75F5D2E5.jpg',
        description: 'Lots of green surrounding the "Greenbelt"!',
        price: 50
    },
    {
        name: 'Salmon Creek',
        image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg',
        description: `This is Salmon Creek where you'll find tons of wild salmon swimming around!`,
        price: 30
    },
    {
        name: `Cloud's Rest`,
        image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
        description: 'Even clouds can rest here!',
        price: 35
    },
    {
        name: 'Mount Rainier',
        image: 'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg',
        description: 'You can reserve sites at the Cougar Rock and Ohanapecosh Rock campgrounds by visiting the Recreation.gov web site.',
        price: 25
    }
]

async function seedDB() {
    try {
        await User.remove({});
        await Campground.remove({});
        await Comment.remove({});

        for (let i = 0; i < 5; i++) {
            let user = await User.create(user_seeds[i]);
            console.log('user created');
            // let comment = await Comment.create(
            //     {
            //         text: comment_text_seeds[i],
            //         author: user
            //     });
            await Campground.create({
                author: {id: user.id, username: user.username},
                name: campground_seeds[i].name,
                image: campground_seeds[i].image,
                description: campground_seeds[i].description,
                price: campground_seeds[i].price,
            //    comments: [comment]
            });
            console.log('campground with author created');
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;
