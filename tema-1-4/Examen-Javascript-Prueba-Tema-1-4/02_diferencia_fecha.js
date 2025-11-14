function dateDiff(start, end){
    if(typeof(start) === "string")
        start = new Date(start);
    if(typeof(end) === "string")
        end = new Date(end);
    resultado = (start > end) ? new Date(start - end): new Date(end - start);
    console.log("Years: " + (resultado.getFullYear() - 1970)+ " Months: "+ resultado.getMonth() + " Days: " + (resultado.getDate()-1));
    }
dateDiff("2001-08-1", "2001-08-2");