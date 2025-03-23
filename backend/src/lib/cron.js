import cron from "cron";
import https from "https";

const job= new cron.CronJob("*/14 * * * *",function(){
    https.get(process.env.API_URL,(res)=>{
        if(res.statusCode===200)console.log("GET request sent sucessfully");
        else console.log("GET request failed",res.statusCode);
    }).on("error",(err)=>{
        console.log("Error",err.message);
    });
});
export default job;