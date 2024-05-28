const { default: mongoose } = require('mongoose');
const { Application } = require('../models/applications')

const getStatsBoxs = async (user) => {
    const now = new Date();

    // Fechas para las consultas
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Consultas de MongoDB
    const weeklyApplications = await Application.countDocuments({
        createdAt: { $gte: startOfWeek },
        user
    });

    const monthlyApplications = await Application.countDocuments({
        createdAt: { $gte: startOfMonth },
        user
    });

    const monthlyInterviews = await Application.countDocuments({
        createdAt: { $gte: startOfMonth },
        status: "Entrevista",
        user
    });

    return {
        weeklyApplications,
        monthlyApplications,
        monthlyInterviews
    }
}

const getStatsBar = async (user) => {
    // Obtener la fecha actual
    const now = new Date();
        
    // Obtener el inicio de la semana (lunes)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    // Array para almacenar los conteos de cada día de la semana
    const applicationsPerDay = Array(7).fill(0); // [Lun, Mar, Mié, Jue, Vie, Sáb, Dom]

    // Iterar sobre cada día de la semana
    for (let i = 0; i < 7; i++) {
        const startOfDay = new Date(startOfWeek);
        startOfDay.setDate(startOfWeek.getDate() + i);
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        // Contar las aplicaciones para el día actual
        applicationsPerDay[i] = await Application.countDocuments({
            createdAt: { $gte: startOfDay, $lt: endOfDay },
            user
        })
    }

    return applicationsPerDay
}

const getStatsPie = async (user) => {
    const userId = new mongoose.Types.ObjectId(user)
    const now = new Date();
        
    // Obtener el inicio del mes
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // Obtener el fin del mes
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Agregar pipeline de agregación para contar postulaciones por tecnología
    const aggregationPipeline = [
        {
            $match: {
                user:userId,
                createdAt: { $gte: startOfMonth, $lt: endOfMonth }
            }
        },
        {
            $unwind: '$technologies' // Descomponer el array de tecnologías
        },
        {
            $group: {
                _id: '$technologies',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 } // Ordenar por la cantidad de postulaciones
        },
        {
            $limit: 5 // Limitar a las top 5 tecnologías
        }
    ];

    const topTechnologies = await Application.aggregate(aggregationPipeline);

    // Formatear los datos para el gráfico de torta
    const pieChartData = topTechnologies.map(tech => ({
        id: tech._id,
        value: tech.count,
        label: tech._id
    }));

    return pieChartData

}

const getStatsLine = async (userId) => {
    const now = new Date();
    
    // Obtener el inicio de la semana (lunes)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
    startOfWeek.setHours(0, 0, 0, 0);
  
    // Día de la semana actual (1 para lunes, 7 para domingo)
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
  
    // Crear pipeline de agregación
    const aggregationPipeline = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfWeek }
        }
      },
      {
        $project: {
          origin: 1,
          dayOfWeek: {
            $cond: [
              { $eq: [{ $dayOfWeek: "$createdAt" }, 1] },
              7,
              { $subtract: [{ $dayOfWeek: "$createdAt" }, 1] }
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: "$dayOfWeek",
            origin: "$origin"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $group: {
          _id: "$_id.origin",
          data: {
            $push: {
              k: "$_id.dayOfWeek",
              v: "$count"
            }
          }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      }
    ];
  
    const results = await Application.aggregate(aggregationPipeline);
  
    const formattedData = results.map(result => {
      const data = Array(currentDayOfWeek).fill(0); // Inicializar un array hasta el día actual
      
      result.data.forEach(item => {
        const dayIndex = item.k - 1; // Convertir dayOfWeek (1-7) a índice de array (0-6)
        if (dayIndex < currentDayOfWeek) { // Asegurar que solo se llenen los días hasta el actual
          data[dayIndex] = item.v;
        }
      });
  
      return {
        label: result._id,
        data
      };
    });
  
    return formattedData;
  }
  

module.exports = {
    getStatsBoxs,
    getStatsBar,
    getStatsPie,
    getStatsLine
}