const {getTheNewContentModule} = require ("../module/getTheNewContent")



const getTheNewContentController = async () => {

    try {
     const res = await  getTheNewContentModule()
     return res
    }catch(error){
        console.error(error)
    }

}


module.exports = {getTheNewContentController}