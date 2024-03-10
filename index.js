const express = require('express');
const uuid = require('uuid');
const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const users = []    


app.get('/users', (request, response) => {
    return response.json(users);
});

app.post('/users', (request, response) => {
    const { order, clientName} = request.body;
    const user = { id: uuid.v4(), order, clientName, price, status: "Em preparação" };
    users.push(user);
    return response.status(201).json(user);
});

app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const { order, clientName, price } = request.body;
    const index = users.findIndex(user => user.id === id);
    if (index < 0) {
        return response.status(404).json({ message: "User not found" });
    }
    const updatedUser = { id, order, clientName, price, status: users[index].status };
    users[index] = updatedUser;
    return response.json(updatedUser);
});

app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    const index = users.findIndex(user => user.id === id);
    if (index < 0) {
        return response.status(404).json({ message: "User not found" });
    }
    users.splice(index, 1);
    return response.status(204).json();
});


app.patch('/order/:id', (request, response) => {
    const { id } = request.params;
    const index = users.findIndex(user => user.id === id);
    if (index < 0) {
        return response.status(404).json({ message: "Order not found" });
    }
    
    if (users[index].status !== "Em preparação") {
        return response.status(400).json({ message: "Pedido não está em preparação" });
    }
    
    users[index].status = "Pronto";
    return response.json(users[index]);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});