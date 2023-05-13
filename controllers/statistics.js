const Job = require("../models/Job")
const mongoose = require("mongoose")

const getCompanyStats = async(req,res) =>{
    const {id}=req.params
    try {
        const monthlyApplicants = await Job.aggregate([
            

                { $match: { company: new mongoose.Types.ObjectId(id) } },
                {
                    $group: {
                      _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                      count: { $sum: 1 },
                    },
                  },
                 // Latest jobs come first
                ])
                ;
                // const monthlyApplicantsData = monthlyApplicants.map((item) => {
                //     const {
                //       _id: { year, month },
                //       count,
                //     } = item;
                //     const date = moment()
                //       .month(month - 1)
                //       .year(year)
                //       .format("MMM Y");
              
                //     return { date, count };
                //   })
                //   .reverse();
              console.log(monthlyApplicants)
        const createdJobs = await Job.find({company:id})
        const totalNumberOfApplicants = createdJobs.applicants && createdJobs.applicants.length
        // .aggregate([
        //     { $match: { company: id } },
        //     { $group: { _id: "$", count: { $sum: 1 } } },
        //   ]);

        res.json({
            createdJobs:createdJobs.length,
            monthlyApplicants
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


module.exports={
    getCompanyStats
}