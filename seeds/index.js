const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
};


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6127c7fb08e4b218840d1401',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,            
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum labore sunt aspernatur sed possimus dolores optio ratione maiores suscipit, provident quidem natus odit. Maiores aspernatur quis beatae voluptates vel! Ut. Consequatur recusandae commodi nisi officiis consectetur cupiditate, voluptatem ullam enim odio deleniti in reprehenderit illo pariatur dignissimos iure adipisci minus accusantium quibusdam vitae blanditiis natus vel. Nemo quibusdam maxime quaerat.',
            price: price,
            geometry: {
               type: 'Point',
               coordinates: [
                   cities[random1000].longitude,
                   cities[random1000].latitude
               ]
            },
            images: [
                {                  
                  url: 'https://res.cloudinary.com/dfwdhldvw/image/upload/v1630513965/YelpCamp/ypeficijgs3xxdygkgfg.jpg',
                  filename: 'YelpCamp/ypeficijgs3xxdygkgfg.jp'
                },
                {                  
                  url: 'https://res.cloudinary.com/dfwdhldvw/image/upload/v1630513965/YelpCamp/gb3op7fe6iabgjlsmazv.jpg',
                  filename: 'YelpCamp/gb3op7fe6iabgjlsmazv.jpg'
                }
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})