import { ConnectDataBase } from './../DataBase/DataBase';
import { config } from "dotenv";
import User from "../Models/UserModel";
import bcryptjs from 'bcryptjs';

// ? Load environment variables from .env file
config();

const UserFarm = [
  // ? Woman Users ? \\
  {
    email: "kateBlanchett@example.com",
    fullName: "Kate Blanchett",
    password: "123456",
    profilePicture: "https://hips.hearstapps.com/hmg-prod/images/giorgio-armani-si-edp-intense-cate-blanchett-secondary-visual-6-64e313b22a654.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
  },
  {
    email: "wednesday.addams@example.com",
    fullName: "Wednesday Addams",
    password: "123456",
    profilePicture: "https://tr.web.img2.acsta.net/r_654_368/img/78/f9/78f91d1d65d5ef2452673f6a409d0da5.jpg",
  },
  {
    email: "lady.gaga@example.com",
    fullName: "Lady Gaga",
    password: "123456",
    profilePicture: "https://misterpabloblog.wordpress.com/wp-content/uploads/2016/08/lady-gaga-ahs-hotel-american-horror-story.jpg",
  },
  {
    email: "apollyon@example.com",
    fullName: "Apollyon",
    password: "123456",
    profilePicture: "data:image/jpeg;base64,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",
  },
  {
    email: "alessandra.ambrosio@example.com",
    fullName: "Alessandra Ambrosio",
    password: "123456",
    profilePicture: "https://img.goodfon.com/wallpaper/nbig/8/d8/alessandra-ambrosio-devushka-ulybka-volosy-vzgliad-model.webp",
  },
  {
    email: "adriana.lima@example.com",
    fullName: "Adriana Lima",
    password: "123456",
    profilePicture: "https://e0.pxfuel.com/wallpapers/312/432/desktop-wallpaper-adriana-lima-celebrity-hq-adriana-lima-2019.jpg",
  },
  {
    email: "gal.gadot@example.com",
    fullName: "Gal Gadot",
    password: "123456",
    profilePicture: "https://vipcheck.wageindicator.org/media/416px-Gal_Gadot_cropped_lighting_corrected_2b.jpg",
  },
  {
    email: "monica.bellucci@example.com",
    fullName: "Monica Bellucci",
    password: "123456",
    profilePicture: "https://images.ctfassets.net/3m6gg2lxde82/76kTNkNsK4bQYQVBaec6Xk/a46dcf6d34d39afe22c0984cb1bbdc25/monica-bellucci-malena.png?w=590&h=590&fit=fill&f=faces&q=90&fm=webp",
  },
  // ? Woman Users ? \\


  // ? Man Users ? \\
  {
    email: "count.dooku@example.com",
    fullName: "Count Dooku",
    password: "123456",
    profilePicture: "https://cdn.shopify.com/s/files/1/0768/6805/9419/files/Gummies_7bc19b90-363f-48f7-a1f9-1778af6060c0_480x480.jpg?v=1700703763",
  },
  {
    email: "godfather@example.com",
    fullName: "Vito Corleone",
    password: "123456",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/The_Godfather%2C_The_Game.jpg/220px-The_Godfather%2C_The_Game.jpg",
  },
  {
    email: "sauron@example.com",
    fullName: "Sauron",
    password: "123456",
    profilePicture: "https://images.wallpapersden.com/image/wxl-sauron-lord-of-the-rings_65183.jpg"
  },
  {
    email: "soldier.boy@example.com",
    fullName: "Soldier Boy",
    password: "123456",
    profilePicture: "https://wallpapercave.com/wp/wp11453562.jpg",
  },
  {
    email: "pala@example.com",
    fullName: "Pala",
    password: "123456",
    profilePicture: "https://seyler.ekstat.com/img/max/800/Q/QUfhKIummCKUUEfQ-637686151455156996.jpg",
  },
  {
    email: "mike.ehrmantraut@example.com",
    fullName: "Mike Ehrmantraut",
    password: "123456",
    profilePicture: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/12/image-3.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
  },
  {
    email: "front.man@example.com",
    fullName: "Front Man",
    password: "123456",
    profilePicture: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2025/01/mixcollage-10-jan-2025-03-13-pm-1531.jpg?q=49&fit=crop&w=825&dpr=2",
  },
  {
    email: "billy.butcher@example.com",
    fullName: "Billy Butcher",
    password: "123456",
    profilePicture: "https://www.looper.com/img/gallery/this-is-the-worst-thing-billy-butcher-has-done-on-the-boys/intro-1616676416.jpg",
  }
    // ? Man Users ? \\
];

const UserFarmDatabase = async () => {
  try {
    await ConnectDataBase();
    
    // ? Delete existing users ? \\
    await User.deleteMany({});
    
    // ? Hash passwords before pushing into the database ? \\
    const salt = await bcryptjs.genSalt(10);
    const usersWithHashedPasswords = await Promise.all(
      UserFarm.map(async (user) => ({
        ...user,
        password: await bcryptjs.hash(user.password, salt)
      }))
    );
    
    await User.insertMany(usersWithHashedPasswords);
    console.log("Database Farmed successfully with hashed passwords");
  } catch (error) {
    console.error("Error Farming database:", error);
  }
};

UserFarmDatabase();
