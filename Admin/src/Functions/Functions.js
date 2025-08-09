export const makeStyle = status => {
  switch (status) {
    case "Livré":
      return { background: "rgb(145 254 159 / 47%)", color: "green" };
    case "Retour":
      return { background: "#ffadad8f", color: "red" };
    case "Reçu":
      return { background: "#FFD700", color: "black" };
    case "A vérifier":
      return { background: "#c484f3", color: "white" };
    case "Confirmé":
      return { background: "rgb(200, 200, 200)", color: "black" };
    default:
      return { background: "#59bfff", color: "white" };
  }
}; 
  // Custom date formatting function
export const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  export const getEndOfWeek = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    return today;
};

export const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - 6); // Adjust to 7 days before
    start.setHours(0, 0, 0, 0); // Set to midnight
    return start;
};

export const stripTime = (date) => {
    const strippedDate = new Date(date);
    strippedDate.setHours(0, 0, 0, 0);
    return strippedDate;
};

export const filterOrdersByDateRange = (orders, startDate, endDate) => {
    const strippedStartDate = stripTime(startDate);
    const strippedEndDate = stripTime(endDate);
    return orders.filter(order => 
        stripTime(order.date) >= strippedStartDate && stripTime(order.date) <= strippedEndDate
    );
};

  // Helper function to add one day to a date
  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }; 

  // Function to create an array of formatted dates within the selected period
export  const setXAxis = (startDate, endDate) => {
    let array = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {      
      array.push(formatDate(currentDate));
      currentDate = addOneDay(currentDate);
    }
      
    return array;
  };

    // Total Crée Sum for analytics
export const créeSumFunction = (filteredOrders, xAxis) => {
        const sum = Array(xAxis.length).fill(0);  
    
        filteredOrders.forEach((order) => {
          xAxis.forEach((date, i) => {        
              if(formatDate(order.date) === date){
                sum[i] += 1;
              }
          });
        });
    
        return sum;
      };

        // Total Ventes Sum for analytics
export  const ventesSumFunction = (filteredOrders, xAxis) => {
    const sum = Array(xAxis.length).fill(0);  

    filteredOrders.forEach((order) => {
      xAxis.forEach((date, i) => {        
        if (formatDate(order.date) === date && order.status === "Livré") {
          sum[i] += order.total;
        }
      });
    });

    return sum;
  };

    // Colis Livré Sum for analytics
export    const livréSumFunction = (filteredOrders, xAxis) => {
        const sum = Array(xAxis.length).fill(0);  
    
        filteredOrders.forEach((order) => {
          xAxis.forEach((date, i) => {
            if (formatDate(order.date) === date && order.status === "Livré") {
              sum[i] += 1;
            }
          });
        });
    
        return sum;
      };
  
        // En cours Sum for analytics
     export   const enCoursSumFunction = (filteredOrders, xAxis) => {
            const sum = Array(xAxis.length).fill(0);  
        
            filteredOrders.forEach((order) => {
              xAxis.forEach((date, i) => {
                if (formatDate(order.date) === date && order.status === "En cours") {
                  sum[i] += 1;
                }
              });
            });
        
            return sum;
          };

                // A vérifier Sum for analytics
         export       const aVérifierSumFunction = (filteredOrders, xAxis) => {
                    const sum = Array(xAxis.length).fill(0);  
                
                    filteredOrders.forEach((order) => {
                      xAxis.forEach((date, i) => {
                        if (formatDate(order.date) === date && order.status === "A vérifier") {
                          sum[i] += 1;
                        }
                      });
                    });
                
                    return sum;
                  };

                                // Retour Sum for analytics
                         export       const retourSumFunction = (filteredOrders, xAxis) => {
                                    const sum = Array(xAxis.length).fill(0);  
                                
                                    filteredOrders.forEach((order) => {
                                      xAxis.forEach((date, i) => {
                                        if (formatDate(order.date) === date && order.status === "Retour") {
                                          sum[i] += 1;
                                        }
                                      });
                                    });
                                
                                    return sum;
                                  };
                                
                            export      const sumFunction = (array) => {
                                    let sum = 0;
                                    for (let index = 0; index < array.length; index++) {
                                      sum += array[index];
                                    }
                                    return sum
                                  }