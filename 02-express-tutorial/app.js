const express = require("express")
const { products, people } = require("./data")
const peopleRouter = require('./routes/people')
const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next()
}

app.use(logger)

app.use(express.static("./public"))
app.use("/api/v1/people", peopleRouter);
// app.get('/', logger, (req, res) => {
//   res.send("Middleware works")
// })

app.get('/api/v1/test', (req, res) => {
    res.status(200).json({ message: "It worked!" })
})

// app.get('/api/v1/people', (req, res) => {
//   res.status(200).json(people)
// })

// app.post('/api/v1/people', (req, res) => {
//   const name = req.body.name
//   if(!name) {
//     res.status(400).json({ success: false, message: "Please provide a name" });
//   }
//   people.push({ id: people.length, name });
//   res.status(201).json({ success: true, name });
// })

app.get('/api/v1/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
    if(!product) {
        res.status(404).json({ message: "That product was not found."})
    }
    res.status(200).json(product)
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query
    let searchedProducts = [...products]
    if (search) {
      searchedProducts = searchedProducts.filter((product) => {
        return product.name.startsWith(search)
      })
    }
    if (limit) {
      searchedProducts = searchedProducts.slice(0, Number(limit))
    }
    if (price) {
      searchedProducts = searchedProducts.filter((product) => {
        return product.price === price
    })
    }
    if (searchedProducts.length < 1) {
      return res.status(200).json({ sucess: true, data: ["No data found matching your query"] })
    }
    res.status(200).json(searchedProducts)
  })

app.all('*', (req, res) => {
    res.status(404).send('Oops, page not found 😖')
  })

app.listen(3000, () => console.log("Server is running on port 3000....") )