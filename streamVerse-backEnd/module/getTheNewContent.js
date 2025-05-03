const { db, admin } = require("../fireBase")





const getTheNewContentModule = async () =>{

    try{
        const snapshot = await db.collection("latestContent").get();
const allData = [];

snapshot.forEach(doc => {
  allData.push({
    id: doc.id,         
    ...doc.data(),      
  });
});
console.log("✅ recently added requested");
return allData

    }catch(error){
console.error(error)
    }

}


module.exports = {getTheNewContentModule}