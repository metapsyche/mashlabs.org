import { createServer } from "miragejs";

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api";

      // Endpoint for /api/videos
      this.get("/videos", (schema) => {
        return schema.db.videos;
      });

      // Endpoint for /api/videos/:id
      this.get("/videos/:id", (schema, request) => {
        let id = request.params.id;
        return schema.db.videos.find(id);
      });

      // Endpoint for /api/audios
      this.get("/audios", (schema) => {
        return schema.db.audios;
      });

      // Endpoint for /api/audios/:id
      this.get("/audios/:id", (schema, request) => {
        let id = request.params.id;
        return schema.db.audios.find(id);
      });

      // Endpoint for /api/collections
      this.get("/collections", (schema) => {
        // Add IDs to the videos within collections
        return schema.db.collections.map((collection) => {
          const videosWithIds = collection.videos.map((video) => ({
            ...video,
            id: video.id || `${collection.name}-${video.title}`, // Ensure IDs are set
          }));

          return {
            ...collection,
            videos: videosWithIds,
          };
        });
      });

      // Pass through all other requests
      this.passthrough("https://mash-server.onrender.com/**");
      this.passthrough("https://api.mashlabs.xyz/**");
      this.passthrough("https://www.googleapis.com/**");
      this.passthrough("https://apis.google.com/**");
      this.passthrough("**");
    },

    
    seeds(server) {
      const collection1 = {
        name: "Those Were The Days",
        musician: "Fre$hah",
        musicianCharity: "FFTP",
        musicianAvatar: "/images/musician2.jpg", // No replacement link provided
        visualArtist: "Charlie Frey",
        visualArtistCharity: "Art Start",
        visualArtistAvatar:
          "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?q=80&w=1581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // No replacement link provided
        aerialCollection: "0xa6794dec66df7d8b69752956df1b28ca93f77cd7",
        royalties: 10,
        availableMints: 11,
        totalMints: 70,
        suppliedMints: 20,
        videos: [
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/vacationcity.mp4",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/vacationcity.png",
            title: "Vacation City",
            artist: "Charley Frey",
            duration: 30,
            price: 1,
          },
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/brooklyn.mp4",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/brooklyn.png",
            title: "Brooklyn",
            artist: "Charley Frey",
            duration: 30,
            price: 1,
          },
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/theoldcity.mp4",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/theoldcity.png",
            title: "The Old City",
            artist: "Charley Frey",
            duration: 30,
            price: 1,
          },
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/theoldcity2.mp4",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/theoldcity2.png",
            title: "The Old NYC",
            artist: "Charley Frey",
            duration: 30,
            price: 1,
          },
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/brooklyn2.mp4",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/brooklyn2.png",
            title: "Brooklyn in 80s",
            artist: "Charley Frey",
            duration: 30,
            price: 1,
          },
        ],
        audios: [
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/wine.mp3",
            title: "Wine",
            art: "https://i.scdn.co/image/ab67616d00001e02162f1ee771e7992b4155882f",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/checkdamethod.mp3",
            title: "Check Da Method",
            art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOJL9FUFrKqyb_VHHHWtCi2qhRiQDZrNking&s",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/figaro.mp3",
            title: "Figaro",
            art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Gp6UheHtLVW18neYPqCkAEdAHnN9gHnUkg&s",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/fantastic.mp3",
            title: "Fantastic",
            art: "https://i.scdn.co/image/ab67616d00001e026788e61537b60d1c326d1662",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/blackcoffee.mp3",
            title: "Black Coffee",
            art: "https://i.scdn.co/image/ab67616d00001e02966c2cc962a2d8970f8caa84",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/cousins.mp3",
            title: "Cousins",
            art: "https://i.scdn.co/image/ab67616d00001e02be7d2a1e3874334581d6fcf4",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/tightroots.mp3",
            title: "Tight Roots",
            art: "https://i.scdn.co/image/ab67616d00001e028a82421a9a8ea0b7ef7d584f",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection1/clanof.mp3",
            title: "Clan Of...",
            art: "https://i.scdn.co/image/ab67616d00001e026788e61537b60d1c326d1662",
            artist: "Fre$ah",
            duration: 91,
            price: 1,
          },
        ],
      };
      
      const collection2 = {
        name: "Player Orc",
        musician: "Amarthi",
        musicianCharity: "The Borgen Project",
        musicianAvatar: "/images/musician3.png", // No replacement link provided
        visualArtist: "Tej",
        visualArtistCharity: "SERUDS",
        visualArtistAvatar: "/images/artist3.png", // No replacement link provided
        aerialCollection: "0xa6794dec66df7d8b69752956df1b28ca93f77cd7",
        royalties: 12,
        availableMints: 31,
        totalMints: 444,
        suppliedMints: 20,
        videos: [
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/battletime.webp",
            type: "gif",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/battletime.png",
            title: "Battle time",
            artist: "Magic Specs",
            duration: 5,
            price: 0.05,
          },
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/battlecry.webp",
            type: "gif",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/battlecry.png",
            title: "Battle cry",
            artist: "Magic Specs",
            duration: 5,
            price: 0.05,
          },
          {
            videoLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/barehands.gif",
            type: "gif",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/barehands.png",
            title: "Bare hands",
            artist: "Magic Specs",
            duration: 5,
            price: 0.05,
          },
          {
            videoLink:
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXY0dHI2NHNremk4dWVjMnV3aWJyaWozeWxvaXd4bTdoeHhoZHFzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kHOk0z9MCkMzKjDPRY/giphy.webp",
            type: "gif",
            thumbnail: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/elderwarrior.png",
            title: "Elder warrior",
            artist: "Magic Specs",
            duration: 5,
            price: 0.05,
          },
        ],
        audios: [
          {
            audioLink: "/audio/audio3.mp3", // No replacement link provided
            art: "https://i.scdn.co/image/ab67616d00001e026d6ff77fa88bc76062f6c02e",
            title: "For the Glory",
            artist: "Stone Hammer",
            duration: 97,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/blackdiamonds.mp3",
            art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWxKGZJYp4KBuFt9juvdiyDvs-Hiwt6yp9kA&s",
            title: "Black Diamonds",
            artist: "Amartha",
            duration: 341,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/electric.mp3",
            art: "https://upload.wikimedia.org/wikipedia/en/1/1a/Electricwizardalbum.jpg",
            title: "Electric Wizard",
            artist: "Stone Hammer",
            duration: 558,
            startAt: 40,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/earthen.mp3",
            art: "https://i.scdn.co/image/ab67616d0000b273daad24158e5ad65dc65b585d",
            title: "Earthen Dweller",
            artist: "Amartha",
            duration: 176,
            startAt: 100,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/elrodeo.mp3",
            art: "https://images.genius.com/037b15a4b347e5c6ab9766795e394f3b.640x640x1.jpg",
            title: "El Rodeo",
            artist: "Stone Hammer",
            startAt: 100,
            duration: 329,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/dusk.mp3",
            art: "https://i.scdn.co/image/ab67616d0000b2732bdcb339402ebd78651f09c8",
            title: "Dusk",
            artist: "Amartha",
            startAt: 70,
            duration: 125,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/youngblood.mp3",
            art: "https://i1.sndcdn.com/artworks-000427217799-6749ua-t500x500.jpg",
            title: "Youngblood",
            artist: "Stone Hammer",
            duration: 452,
            startAt: 40,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/brewing.mp3",
            art: "https://i.scdn.co/image/ab67616d00001e02ae1c5d9aee0f14adf28feeed",
            title: "Brewing The Storm",
            artist: "Amartha",
            duration: 116,
            startAt: 40,
            price: 0.05,
          },
          {
            audioLink: "https://mashlabsbucket.s3.us-east-1.amazonaws.com/collection2/thedays.mp3",
            art: "https://i.scdn.co/image/ab67616d0000b273e7d15da7d7af8391a8f32f41",
            title: "The Days We Loved",
            artist: "Magic Specs",
            duration: 241,
            startAt: 15,
            price: 0.05,
          },
        ],
      };
      
      

      const collections = [collection1, collection2];

      // Initialize counters for unique IDs
      let videoId = 1;
      let audioId = 1;

      // Process collections to assign IDs and flatten videos and audios
      const videos = [];
      const audios = [];

      collections.forEach((collection) => {
        collection.videos.forEach((video) => {
          video.id = videoId++;
          video.collectionName = collection.name;
          videos.push(video);
        });
        collection.audios.forEach((audio) => {
          audio.id = audioId++;
          audio.collectionName = collection.name;
          audios.push(audio);
        });
      });

      // Load data into Mirage's database
      server.db.loadData({
        collections,
        videos,
        audios,
      });
    },
  });
}
