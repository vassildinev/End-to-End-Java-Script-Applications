var mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrls: [String],
    category: String,
    creator: String,
    creationDate: Date,
    isPrivate: Boolean,
    visibleTo: [String],
    rating: Number,
    totalRatings: Number,
    comments: [{
        author: { type: String },
        text: { type: String }
    }]
});

var Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.seedInitialPlaylists = function() {
    Playlist.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            Playlist.create({
                title: "Seeded playlist #1",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 25,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #2",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 26,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #3",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 24,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #4",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 23,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #5",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 22,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #6",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 21,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #7",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 20,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #8",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 18,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #9",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 16,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #10",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: false,
                visibleTo: [],
                rating: 14,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #11",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: true,
                visibleTo: ["nikiniki"],
                rating: 6,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            Playlist.create({
                title: "Seeded playlist #12",
                description: "Seeded playlist",
                videoUrls: ["https://www.youtube.com/embed/_xENDpb1Zr8"],
                category: "Pop",
                creator: "ivoivo",
                creationDate: new Date(),
                isPrivate: true,
                visibleTo: ["nikiniki"],
                rating: 15,
                totalRatings: 6,
                comments: [{
                    author: "nikiniki",
                    text: "Nice music!"
                }]
            });

            console.log('Playlists added to database...');
        }
    });
};