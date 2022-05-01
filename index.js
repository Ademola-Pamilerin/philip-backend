const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const app = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const validator = require("validator");

//setting middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//file filter
const fileFilter = (req, file, cb) => {
  if (
    !(
      file.mimetype.includes("image") ||
      file.mimetype.includes("pdf") ||
      file.mimetype.includes("msword") ||
      file.mimetype.includes("wordprocessingml")
    )
  ) {
    if (file.mimetype.includes("application")) {
      return cb(new Error("File not allowed"), false);
    } else {
      return cb(
        new Error(
          `file of type ${file.mimetype.replace("/", " ")} not allowed`
        ),
        false
      );
    }
  }
  cb(null, true);
};

//stores in disk
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "infos";
    if (!fs.existsSync(path.join(__dirname, dir))) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//uploading function
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage: diskStorage,
  fileFilter: fileFilter,
}).single("document");

//renaming function

const renamIngFunc = (pathToFile, newName) => {
  if (!fs.existsSync(path.join(__dirname, "infos", pathToFile))) {
    return 0;
  }
  fs.renameSync(
    path.join(__dirname, "infos", pathToFile),
    path.join(__dirname, "infos", "/") +
      newName +
      "." +
      pathToFile.split(".")[1]
  );
  return {
    filename: newName + "." + pathToFile.split(".")[1],
    filepath:
      path.join(__dirname, "infos", "/") +
      newName +
      "." +
      pathToFile.split(".")[1],
  };
};

const docxConverter = require("docx-pdf");
const { SendResetEmail, feedback } = require("./mail");

//converts to pdf documents(word)
const convert_to_pdf = (file_path, new_path, cb) => {
  docxConverter(file_path, new_path, (err, result) => {
    cb(err, result);
  });
  if (fs.existsSync(file_path)) {
    fs.unlinkSync(file_path);
  }
};

app.post("/feedback", async (req, res, next) => {
  try {
    const { name, email, data } = req.body;
    if (!name || !email || !data) {
      return next({ message: "All field are required", status: 500 });
    }
    if (!validator.isEmail(email)) {
      return next({ message: "Not a valid Email Address", status: 500 });
    }
    await feedback(name, email, data);
    res.status(200).json({ message: "feedback sent" });
  } catch (error) {
    next(error);
  }
});

//endPoint
app.post("/send_cv", async (req, res, next) => {
  upload(req, res, async (err) => {
    
    if (err instanceof multer.MulterError) {
      //check for multer error
      const errorMsg = { message: err.message, status: 500 };
      return next(errorMsg);
    } else if (err) {
      // check for my owm validation on mulgter
      const errorMsg = { message: err.message, status: 500 };
      return next(errorMsg);
    } else {
      
      const email = req.body.email;
      // if (!email) {
      //   return next({ message: "All field is required" });
      // }
      if (!validator.isEmail(email)) {
        return next({ message: "Email is not a valid Email" });
      }
      try {
        if (!req.file) {
          const error = new Error("File not found");
          error.status = 406;
          throw error;
        }
        const Name = req.body.name;
        const description = req.body.description;
        const image = req.file;
        //renaming the file here and save to disk
        const result = renamIngFunc(image.originalname, Name.split(" ")[0]);
        if (image.mimetype.includes("image")) {
          // send file after renaming for images
          await SendResetEmail(
            "",
            Name,
            result.filename,
            result.filepath,
            req.file.mimetype,
            description
          );
          //  delete file after renaming
          fs.unlinkSync(result.filepath);
          return res.status(200).json({ msg: "Ademola" });
        } else {
          // cehck if file is pdf or conver to pdf
          if (result.filename.includes(".pdf")) {
            await SendResetEmail(
              "",
              Name,
              result.filename,
              result.filepath,
              req.file.mimetype,
              description
            );
            // delete file after sending if pdf
            fs.unlinkSync(result.filepath);
            return res.status(200).json({ msg: "Ademola" });
          } else {
            //convert file to pdf uses callback method
            // send mail in the callback and delete the newly created file
            convert_to_pdf(
              result.filepath,
              path.join(__dirname, "/infos", Name.split(" ")[0]) + ".pdf",
              async (err, value) => {
                if (err) {
                  next({ message: err.message, status: 500 });
                }
                if (value) {
                  await SendResetEmail(
                    "",
                    Name,
                    Name.split(" ")[0] + ".pdf",
                    value.filename,
                    "application/pdf",
                    description
                  );
                  fs.unlinkSync(value.filename);
                  res.status(200).json({ msg: "Ademola" });
                }
              }
            );
          }
        }
      } catch (error) {
        next(error);
      }
    }
  });
});

//let express handle some error for us
//thank you express
//😄😁😂😂😁😁😁😀😍😎😋😘🥰

app.use((error, req, res, next) => {
  const status = error.status || 500;
  
  const message =
    error.message === "getaddrinfo ENOTFOUND api.sendgrid.com"
      ? "Please try again"
      : error.message === "error is not a constructor"
      ? "Please try again"
      : error.message;
  res.status(status).json({ message: message });
});

//creating an instance of http server using express anfd http end points
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("server started on port", process.env.PORT);
});
