const {checkContentExists, checkContentExistsInFavorites, checkContentExistsInRecent} = require ("../module/checkContentExists")



const checkContentExistsInRecentController = async (userId, movieId) => {
    try{
        const response = await checkContentExistsInRecent(userId, movieId)
        return response
    }catch(error){
        console.log(error,"error checking the content controller");
        
    }
}

const checkContentExistsController = async (userId, movieId) => {
    try{
        const response = await checkContentExists(userId, movieId)
        return response
    }catch(error){
        console.log(error,"error checking the content controller");
        
    }
}

const checkContentExistsInFavoritesController = async (userId, movieId) => {
    try{
        const response = await checkContentExistsInFavorites(userId, movieId)
        return response
    }catch(error){
        console.log(error,"error checking the content controller");
        
    }
}

module.exports = {checkContentExistsController, checkContentExistsInFavoritesController, checkContentExistsInRecentController}