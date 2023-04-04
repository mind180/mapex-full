const Connection = require('../models/Connection')

class ConnectionController {
    async createConnections(req, res) {
        try {
            const mapId = req.params.mapId
            const connectionsData = req.body
            connectionsData.forEach(connection => {
                connection.board = mapId  
            })
            const connections = await Connection.insertMany(connectionsData)
            res.send(connections)
        } catch(e) {
            console.error(e);
            res.status(200).json({ message: 'Internal server error' })
        }
    }

    async updateConnections(req, res) {
        try {
            const connections = req.body
            for (const connection of connections) {
                await Connection.findByIdAndUpdate(connection._id, connection)
            }
            res.send(connections)
        } catch(e) {
            console.error(e);
            res.status(200).json({ message: 'Internal server error' })
        }
    }

    async deleteConnection(req, res) {
        try {
            const connectionIds = req.query.ids ? req.query.ids.split(',') : []
            await Connection.deleteMany({ _id: { $in: connectionIds }})
            res.json({ message: 'deleted' })
        } catch(e) {
            console.error(e);
            res.status(200).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new ConnectionController()