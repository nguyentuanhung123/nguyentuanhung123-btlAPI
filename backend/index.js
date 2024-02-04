import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "contact"
})

//If there is a auth problems

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.json("Hello this is the backend");
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM user"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

// app.post("/users", (req, res) => {
//     const q = "INSERT INTO user (`name`,`email`,`phone`,`address`) VALUES (?)"
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.phone,
//         req.body.address
//     ]

//     db.query(q, [values], (err, data) => {
//         if (err) {
//             return res.json(err)
//         }
//         return res.json("User has been created successfully")
//     })
// })

app.post("/users", (req, res) => {
    const q = "INSERT INTO user (`name`,`email`,`phone`,`address`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address
    ]

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("User has been created successfully")
    })
})

app.delete("/users/:id", (req, res) => {
    //const userId = req.params.id;
    const {id} = req.params;

    const q = "DELETE FROM user WHERE id = ?"

    db.query(q, [id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("User has been deleted successfully")
    })
})

app.get("/users/:id", (req, res) => {
    //const userId = req.params.id;
    const {id} = req.params;

    const q = "SELECT * FROM user where id = ?";

    // db.query(q, [userId], (err, data) => {
    //     if (err) {
    //         return res.json(err)
    //     }
    //     return res.json(data)
    // })
    db.query(q, [id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.put("/users", (req, res) => {
    //const userId = req.params.id;

    //Phải để đúng thứ tự theo q
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.id
    ]

    const q = "UPDATE user SET `name` = ? , `email` = ?, `phone` = ? , `address` = ? WHERE id = ?";

    // db.query(q, [...values, userId], (err, data) => {
    //     if (err) {
    //         return res.json(err)
    //     }
    //     return res.json("User has been update successfully")
    // })
    db.query(q, [...values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("User has been update successfully")
    })
})

app.listen(8801, () => {
    console.log("Connected to backend");
})