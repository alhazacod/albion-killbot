const request = require("./node_modules/node-albion-api/request");

module.exports = async (itemID) => {
    const results = await request(
      `items/${itemID}/data`
    )
    return results
}
