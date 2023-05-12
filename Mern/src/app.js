require("dotenv").config();
const express = require("express");
const Register = require("./models/registers");
const Admin = require("./models/admin");
const Cart = require("./models/cart");
const MyOrder = require("./models/order");
const Item = require("./models/items");
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { log } = require("console");
const { readFileSync } = require("fs");
require("./db/conn");
const bcrypt = require("bcrypt");
const multer = require("multer");
const saltRounds = 10;

app.use(express.static(__dirname + '/public'));
app.use('/uploads',express.static("uploads"));

const Storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req,file,cb) => {
      const unique =  Date.now() + Math.round(Math.random() * 1E9)
      cb(null, unique + file.originalname)
  }
})

const upload = multer({storage: Storage})

// const static_path = path.join(__dirname, "../public");

// const template_path = path.join(__dirname, "../templates/views");

// const partials_path = path.join(__dirname, "../templates/partials");

const corsoptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const roles = {
  user: 101,
  admin:102,
};

app.use(cors(corsoptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
// app.use(express.static(static_path));

app.get("/", (req, res) => {
  res.render("index");
});

// SignUp......=>
app.post("/register", (req, res) => {
  Register.findOne({ Email: req.body.email }).then((result) => {
    if (result) {
      res.status(402).json("Email already exist");
    } else {
      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        hash;
        const user = new Register({
          Name: req.body.name,
          Email: req.body.email,
          Password: hash,
          Confirm_Password: hash,
        });
        user.save();
        res.status(200).json("Registration Successfull");
      });
    }
  });
});


// Admin register
app.post("/adminregister", (req, res) => {
  Admin.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      res.status(402).json("Email already exist");
    } else {
      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        hash;
        const user = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
          shopname: req.body.shopname,
        });
        user.save();
        res.status(200).json("Registration Successfull");
      });
    }
  });
});

//  login  .......=>
app.post("/login",(req, res) => {
  Register.findOne({ Email: req.body.email }).then((foundUser) => {
    if (foundUser) {
      bcrypt.compare(req.body.password, foundUser.Password).then((result) => {
        if (result) {
          const role = roles.user;
          const accessToken = jwt.sign(
            {
              UserInfo: {
                id: foundUser._id,
                name: foundUser.Name,
                email: foundUser.Email,
                role: role,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
          );
          const refreshToken = jwt.sign(
            {
              name: foundUser.Name,
              email: foundUser.Email,
              role: role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          foundUser.refreshToken = refreshToken;
          foundUser.save();
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000*60*24*7,
          });
          Item.find({}).then((items) => {
            res.status(200).json({ accessToken, role, foundUser,items });
          }) 
        } else {
          res.json("Invalid Password");
        }
      });
    } else {
      res.json("Invalid Email");
    }
  })
  //
});

// admin login
app.post("/admin",(req, res) => {
  Admin.findOne({ email: req.body.email }).then((foundAdmin) => {
    if (foundAdmin) {
      bcrypt.compare(req.body.password, foundAdmin.password).then((result) => {
        if (result) {
          const role = roles.admin;
          const accessToken = jwt.sign(
            {
              AdminInfo: {
                id: foundAdmin._id,
                name: foundAdmin.Name,
                email: foundAdmin.Email,
                role: role,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
            );
            const refreshToken = jwt.sign(
              {
                name: foundAdmin.Name,
                email: foundAdmin.Email,
                role: role,
              },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
              );
              foundAdmin.refreshToken = refreshToken;
              foundAdmin.save();
              res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 1000*60*24*7,
              });
             Item.find({}).then((items) => {
               res.status(200).json({ accessToken, role, foundAdmin,items });
             }) 
        } else {
          res.json("Invalid Password");
        }
      });
    } else {
      res.json("Invalid Email");
    }
  })
  //
});

// view cart
app.get("/cart", (req, res) => {
  Cart.find({}).then((result) => {
    if (result) {
      res.send(result);
      // console.log(result);
    }
  });
});

// view items
app.get("/items", (req, res) => {
  Item.find({}).then((result) => {
    if (result) {
      res.send(result);
      // console.log(result);
    }
  });
});

// add items
app.post("/items", (req, res) => {
  const item = new Item({
    category: req.body.category,
  });
  item.save().then(res.send("added"));
});

// add to cart
app.post("/cart", (req, res) => {
  const cart = new Cart({
    product: req.body.name,
    type: req.body.type,
    price: req.body.price,
    quantity: req.body.quantity,
    total: req.body.total,
  });
  cart.save().then(res.send("added"));
});

// remove from cart
app.delete("/cart/:id", (req, res) => {
  Cart.findByIdAndRemove(req.params.id).then((result) => {
    res.send("Done");
  });
});

// view cart
app.get("/cart", (req, res) => {
  Cart.find(
    {}.then((result) => {
      if (result) {
        res.send(result);
      }
    })
  );
});

// delete cart
app.delete("/cart", (req, res) => {
  Cart.deleteMany({}).then((res) => console.log(res));
});

//Place Order
app.post("/order/:id/:name/:total", (req, res) => {
  let currTime = new Date().toLocaleTimeString();
  const order = new MyOrder({
    cart: req.body,
    username: req.params.name,
    userid: req.params.id,
    ordertime: currTime,
    total: Number(req.params.total),
  });
  order.save().then((result) => {
    Register.findByIdAndUpdate(req.params.id, {
      $push: { order_id: result._id },
    }).then();
  });
});

// get items
app.get("/add/:id", (req, res) => {
  Item.findOne({ _id: req.params.id }).then((result) => {
    if (result) {
      res.send(result.items);
    }
  });
});

// add items
app.post("/items/:id", (req, res) => {
  // console.log(req.body);
  Item.findOne({category:req.body.category}).then((result) => {
    if (result) {
      var item = {
        itemName: req.body.name,
        quantity: req.body.quantity,
        price: Number(req.body.price),
        shopid:req.params.id,
        image:req.body.image
      };
      Item.updateOne(
        { category: req.body.category },
        { $push: { items: item } }
      ).then((response, err) => {
        console.log(response);
        if (err) {
          res.json(err);
        } else {
          res.json(" Items Added");
        }
      });
    }
  })
});

//Handle Refresh for User
app.get("/refresh", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await Register.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const role = roles.user;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );Item.find({}).then((items) => {
      res.status(200).json({ accessToken, role, foundUser,items });
    }) 
  });
});

//Handle Refresh for admin
app.get("/refresh1", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundAdmin = await Admin.findOne({ refreshToken }).exec();
  if (!foundAdmin) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const role = roles.user;
    const accessToken = jwt.sign(
      {
        AdminInfo: {
          id: foundAdmin._id,
          name: foundAdmin.name,
          email: foundAdmin.email,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    Item.find({}).then((items) => {
      res.json({ accessToken, role, foundAdmin,items });
    })
  });
});

// lagout user
app.get("/logout", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await Register.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
});

// lagout admin
app.get("/logout1", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await Admin.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
});

// Update Password.....=>
app.post("/update/:id",(req,res)=>{
  Register.findOne({_id:req.params.id}).then((foundUser)=>{
    if(foundUser){
      bcrypt.compare(req.body.password,foundUser.Password).then((result)=>{
        if(result){
          bcrypt.hash(req.body.npassword,saltRounds).then((hash)=>{
            Register.updateOne({_id:req.params.id},{$set:{Password:hash,Confirm_Password:hash}}).then((user)=>{
              if(user){

                res.json("Update Successfull")
              }else{
                res.json("Updation Failed")
              }
            })
          })
        }
      })
    }
  })
})

// view order
app.get("/vieworder/:id",(req,res) => {
  MyOrder.find({userid:req.params.id}).then((result) => {
    res.send(result)
  })
})

// get allOrder
app.get("/allorder/:id", (req, res) => {
  MyOrder.find({ userid: req.params.id }).then((result) => {
    if (result) {
      res.send(result);
    }
  });
});

// delete items
app.delete("/item/:id/:category",async(req,res) => {
  const item = await Item.findOne({category:req.params.category})
  item.items = item.items.filter(item => {
    return item._id != req.params.id
  })
  const result = await item.save();
  res.send(result)
  console.log(result); 
})

app.get('/uploadimage', async(req,res)=>{
  res.send("Upload Image")
})

app.post('/uploadimage', async(req,res)=>{
  res.send("Photo Uploaded");
})

// get filename 
app.post('/uploadimage/:cid',upload.single('testimg') , async(req,res)=>{
  // console.log(req.file.filename)
  res.json({"imagepath": req.file.filename});
})

app.listen(4000, () => {
  console.log("Server running at port no 4000");
});
