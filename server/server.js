const express = require('express')

app = express();

app.get('/', (req, res) => {
    res.json('OK')
})

app.listen(3000, () => console.log('app is running on port 3000'))