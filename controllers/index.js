const db = require("../db");
const {sendMail} = require("./sendMail")

exports.formdata = (req, res) => {
  try {
    const data = req.body;
    console.log({ data });
    db.query(`INSERT INTO userdata SET ?`, data, (err, dbResult) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          error: "Database error",
          message: "Request failed",
        });
      } else {
        res.json({
          success: true,
          data: data,
          message: "Request success",
        });
      }
    });
  } catch (err) {
    console.log({ err });
    res.json({
      success: false,
      error: err,
      message: "Request fails",
    });
  }
};



exports.getFormDataById = (req, res) => {
  const userId = req.params.id; // Assuming you're passing the ID as a URL parameter

  try {
    db.query(`SELECT * FROM userdata WHERE id = ?`, [userId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          error: "Database error",
          message: "Request failed",
        });
      } else if (results.length === 0) {
        res.status(404).json({
          success: false,
          error: "User not found",
          message: "Request failed",
        });
      } else {
        console.log({ results });
        res.json({
          success: true,
          data: results[0], // Assuming you expect only one user with the given ID
          message: "Request success",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Request failed",
    });
  }
};

exports.updateUserDataById = (req, res) => {
  const userId = req.params.id; // Assuming you're passing the ID as a URL parameter
  const updatedUserData = req.body; // Assuming you're sending updated data in the request body

  try {
    db.query(
      `UPDATE userdata SET ? WHERE id = ?`,
      [updatedUserData, userId],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            error: "Database error",
            message: "Update failed",
          });
        } else if (results.affectedRows === 0) {
          res.status(404).json({
            success: false,
            error: "User not found",
            message: "Update failed",
          });
        } else {
          res.json({
            success: true,
            message: "Update success",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Update failed",
    });
  }
};


exports.complete = async (req, res) => {
  await sendMail(req, res);
};